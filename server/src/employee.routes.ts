import * as express from "express";
import { ObjectId } from "mongodb";
import { collections } from "./database";
import crypto from "crypto";

export const employeeRouter = express.Router();
employeeRouter.use(express.json());

// GET all employees with department name
employeeRouter.get("/", async (_req, res) => {
  try {
    const employees = await collections.employees
      ?.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "departmentId",
            foreignField: "_id",
            as: "department"
          }
        },
        {
          $unwind: {
            path: "$department",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            employeeId: 1,
            name: 1,
            position: 1,
            level: 1,
            departmentId: 1,
            departmentName: "$department.name"
          }
        }
      ])
      .toArray();

    res.status(200).send(employees);
  } catch (error: any) {
    console.error("Error fetching employees with department:", error);
    res.status(500).send("Error fetching employees");
  }
});

// ✅ POST new employee
employeeRouter.post("/", async (req, res) => {
  try {
    const employee = req.body;

    if (!employee.name || !employee.position || !employee.level || !employee.departmentId) {
      return res.status(400).send("Missing required fields");
    }

    // Convert departmentId from string → ObjectId
    employee.departmentId = new ObjectId(employee.departmentId);

    // Generate unique employeeId
    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
    employee.employeeId = `EMP-${randomPart}`;

    // Insert employee into MongoDB
    const result = await collections.employees?.insertOne(employee);

    if (result?.acknowledged) {
      res.status(201).send({
        message: "✅ Employee created successfully",
        employeeId: employee.employeeId,
        id: result.insertedId,
      });
    } else {
      res.status(500).send("❌ Failed to create a new employee.");
    }
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).send(error instanceof Error ? error.message : "Unknown error");
  }
});

// ✅ GET single employee by ID (with department info)
employeeRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid employee ID");
    }

    const employee = await collections.employees?.aggregate([
      { $match: { _id: new ObjectId(id) } },
      {
        $lookup: {
          from: "departments",
          localField: "departmentId",
          foreignField: "_id",
          as: "department"
        }
      },
      { $unwind: { path: "$department", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          employeeId: 1,
          name: 1,
          position: 1,
          level: 1,
          departmentId: 1,
          departmentName: "$department.name"
        }
      }
    ]).next();

    if (!employee) {
      return res.status(404).send("Employee not found");
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).send("Error fetching employee by ID");
  }
});



// ✅ PUT update employee
employeeRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const employee = req.body;

    // Convert departmentId if provided
    if (employee.departmentId) {
      employee.departmentId = new ObjectId(employee.departmentId);
    }

    const query = { _id: new ObjectId(id) };
    const result = await collections?.employees?.updateOne(query, { $set: employee });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an employee: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

// ✅ DELETE employee
employeeRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new ObjectId(id) };
    const result = await collections?.employees?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an employee: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an employee: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an employee: ID ${id}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(message);
    res.status(400).send(message);
  }
});

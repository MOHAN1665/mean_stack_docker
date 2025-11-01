// import * as express from "express";
// import * as mongodb from "mongodb";
// import { Department, collections } from "./department";

// export const departmentRouter = express.Router();

// departmentRouter.use(express.json());

// // ➕ Add Department
// departmentRouter.post("/", async (req, res) => {
//   try {
//     const newDept: Department = {
//       name: req.body.name,
//       description: req.body.description,
//     };

//     const result = await collections.departments?.insertOne(newDept);

//     if (result?.acknowledged) {
//       res.status(201).send(result);
//     } else {
//       res.status(500).send("Failed to create department");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

// // 📋 Get All Departments
// departmentRouter.get("/", async (_req, res) => {
//   try {
//     const departments = await collections.departments?.find({}).toArray();
//     res.status(200).send(departments);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// });

import * as express from "express";
import * as mongodb from "mongodb";
import { Department, collections } from "./department";

export const departmentRouter = express.Router();

departmentRouter.use(express.json());

/**
 * ➕ Add Department
 */
departmentRouter.post("/", async (req, res) => {
  try {
    const newDept: Department = {
      name: req.body.name,
      description: req.body.description,
    };

    const result = await collections.departments?.insertOne(newDept);
    if (result?.acknowledged) {
      res.status(201).send(result);
    } else {
      res.status(500).send("Failed to create department");
    }
  } catch (error) {
    console.error("Error adding department:", error);
    res.status(500).send(error);
  }
});

/**
 * 📋 Get All Departments
 */
departmentRouter.get("/", async (_req, res) => {
  try {
    const departments = await collections.departments?.find({}).toArray();
    res.status(200).send(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).send(error);
  }
});

/**
 * 🔍 Get Department by ID
 */
departmentRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const department = await collections.departments?.findOne(query);

    if (!department) {
      res.status(404).send("Department not found");
    } else {
      res.status(200).send(department);
    }
  } catch (error) {
    console.error("Error fetching department:", error);
    res.status(500).send(error);
  }
});

/**
 * ✏️ Update Department
 */
departmentRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const update = {
      $set: {
        name: req.body.name,
        description: req.body.description,
      },
    };

    const result = await collections.departments?.updateOne(query, update);

    if (result && result.matchedCount > 0) {
      res.status(200).send({ message: "Department updated successfully" });
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error("Error updating department:", error);
    res.status(500).send(error);
  }
});

/**
 * ❌ Delete Department
 */
departmentRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.departments?.deleteOne(query);

    if (result && result.deletedCount > 0) {
      res.status(200).send({ message: "Department deleted successfully" });
    } else {
      res.status(404).send("Department not found");
    }
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).send(error);
  }
});

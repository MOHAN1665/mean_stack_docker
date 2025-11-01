import * as mongodb from "mongodb";
import { Employee } from "./employee";
import { Department, collections as departmentCollections } from "./department";


export const collections: {
    employees?: mongodb.Collection<Employee>;
} = {};


export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackExample");
    await applySchemaValidation(db);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;

    // Ensure unique index on employeeId
    await employeesCollection.createIndex({ employeeId: 1 }, { unique: true }).catch((err) => {
        console.error("Could not create unique index on employeeId:", err.message || err);
    });

    // departments collection
    const departmentsCollection = db.collection<Department>("departments");
    departmentCollections.departments = departmentsCollection;
    await departmentsCollection.createIndex({ name: 1 }, { unique: true });


    console.log("✅ Connected to MongoDB and ensured schema & indexes");

}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["employeeId", "name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                employeeId: {
                    bsonType: "string",
                    description: "'employeeId' is required and is a string"
                },
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string"
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string"
                },
                level: {
                    bsonType: "string",
                    enum: ["junior", "mid", "senior"],
                    description: "'level' must be one of 'junior', 'mid', or 'senior'"
                },
                departmentId: {
                    bsonType: ["objectId", "null"], // ✅ allow ObjectId or null (if no department yet)
                    description: "'departmentId' must be an ObjectId or null"
                }
            }
        }
    };

    // Apply the modification to the collection (or create it if not found)
    await db.command({
        collMod: "employees",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("employees", { validator: jsonSchema });
        }
    });
}


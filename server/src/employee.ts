import * as mongodb from "mongodb";

export interface Employee {
    employeeId?: string;
    name: string;
    position: string;
    level: "junior" | "mid" | "senior";
    departmentId?: mongodb.ObjectId;
    _id?: mongodb.ObjectId;
}

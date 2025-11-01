import * as mongodb from "mongodb";

export interface Department {
  _id?: mongodb.ObjectId;
  name: string;
  description?: string;
}

export const collections: {
  departments?: mongodb.Collection<Department>;
} = {};

import "express";
import { Types } from "mongoose";

declare module "express" {
  export interface Request {
    user?: {
      id: Types.ObjectId;
    };
    admin?: {
      id: Types.ObjectId;
      username: string;
    };
  }
}

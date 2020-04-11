import { Document } from "mongoose";

export interface Requests extends Document {
  item: string;
  qty: number;
  fulfilled: boolean;
  madeAt: Date;
}

export interface User extends Document {
  email: string;
  password: string;
  phoneNumber: string;
  requests: Requests[];
};

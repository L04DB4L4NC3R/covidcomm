import { Document } from "mongoose";

export interface Requests extends Document {
  item: string;
  qty: number;
  fulfilled: boolean;
  respondeeID: string;
  madeAt: Date;
}

export interface IUser extends Document {
  email: string;
  password: string;
  phoneNumber: string;
  requests: Requests[];
};

export class User {
  email: string;
  password: string;
  phoneNumber: string;
  requests: Requests[];

  constructor(email: string, password: string, phoneNumber: string, request: Request[]) {
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.requests = [];
  }
};

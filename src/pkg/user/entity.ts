import { Document } from "mongoose";

export interface Requests extends Document {
  item: string;
  qty: number;
  fulfilled: boolean;
  respondeeID: string;
  madeAt: Date;
}

export class RequestsStruct {
  item: string;
  qty: number;
  fulfilled: boolean;
  respondeeID: string;
  madeAt: Date;
	
		constructor(item: string, qty: number) {
				this.item = item;
				this.qty = qty;
				this.fulfilled = false;
				this.respondeeID = "";
				this.madeAt = new Date();
		}
}

export interface IUser extends Document {
  email: string;
  password: string;
  phoneNumber: string;
	subscribed: boolean;
  requests: Requests[];
};

export class User {
  email: string;
  password: string;
  phoneNumber: string;
	subscribed: Boolean;
  requests: Requests[];

  constructor(email: string, password: string, phoneNumber: string, request: Request[], subscribed: boolean) {
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.requests = [];
		this.subscribed = false;
  }
};

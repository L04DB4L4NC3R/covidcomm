import { User, Requests } from "./entity";

export interface Repository {
  FindByID(id: string): any;
  FindByEmail(email: string): any;
  ShowAllUsers(skip: number, limit: number): any;

  AppendRequest(id: string, request: Requests): any;
  RemoveRequest(id: string, request_id: string): any;
  SetFullfilled(id: string, request_id: string): any;
  ShowAllRequests(skip: number, limit: number): any;
}

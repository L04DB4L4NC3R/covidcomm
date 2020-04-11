import { Requests } from "./entity";

export interface Repository {
  CreateUser(email: string, password: string, phoneNumber: string): any;
  FindByID(id: string): any;
  FindByEmail(email: string): any;
  ShowAllUsers(skip: number, limit: number): any;

  AppendRequest(id: string, request: Requests): any;
  RemoveRequest(id: string, request_id: string): any;
  SetFullfilled(id: string, request_id: string): any;
  ShowAllRequests(skip: number, limit: number): any;

  UpdateRespondee(id: string, respondee_id: string, req: string): any;
  ResetRespondee(id: string, request_id: string): any;
}

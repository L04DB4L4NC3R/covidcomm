import { Coordinates } from "./entity";

export interface Repository {
  CreateUser(email: string, password: string, phoneNumber: string, coordinates: Coordinates): any;
  FindByID(id: string): any;
  FindByEmail(email: string): any;
  ShowAllUsers(skip: number, limit: number): any;

  AppendRequest(id: string, request: any): any;
  RemoveRequest(id: string, request_id: string): any;
  SetFullfilled(id: string, request_id: string): any;
  ShowAllRequests(skip: number, limit: number): any;
  ShowAllPhoneNumbers(skip: number, limit: number): any;
	SetSubscribed(id: string): any;
	UnsetSubscribed(id: string): any;

  UpdateRespondee(id: string, respondee_id: string, req: string): any;
  ResetRespondee(id: string, request_id: string): any;
	FindAllRequestsWithoutID(id: string): any;
}

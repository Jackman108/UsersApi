import { UserListResponse } from "src/api/users";

export interface IUserListPage extends UserListResponse {
   isLoading: boolean;
}

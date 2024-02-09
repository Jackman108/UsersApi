import { IUserListPage } from "src/pages/users/typings";

export type AppState = {
    users: {
        list: IUserListPage;
    }
};

import config, { HttpModule } from "src/config";

export type UserListResponse = {
    total: number;
    users: UserDto[];
};

export type UserDto = {
    id: string;
    login: string;
    name: string;
    defaultSalary: number;
    position: string;
}


export class PassesApiService {
    private _baseUrl: string;
    constructor() {
        this._baseUrl = config.apiUrl[HttpModule.Users];
    }
    //Оптимизация Загрузки Пользователей PassesApiService (с пагинацией):
    list = async (page = 1, limit = 50): Promise<UserListResponse> => {
        const response = await fetch(`${this._baseUrl}?page=${page}&limit=${limit}`);
        return response.json();
    };
}
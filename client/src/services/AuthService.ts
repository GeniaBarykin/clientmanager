import $api from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/login', {login, password})
    }

    static async registration(fio: string, login: string, password: string): Promise<AxiosResponse<AuthResponse>>{
        return $api.post('/registration', {fio, login, password})
    }

    static async logout(): Promise <void>{
        return $api.post('/logout')
    }

}
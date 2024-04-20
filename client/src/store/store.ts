import { User } from "../models/User";
import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
    user = {} as User
    isAuth = false;
    isLoading = false;
    constructor (){
        makeAutoObservable(this);
    }

    setAuth(bool: boolean){
        this.isAuth = bool;
    }

    setUser(user: User){
        this.user = user;
    }

    async login (login: string, password: string){
        try {
            const response = await AuthService.login(login,password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e){
            console.log(e)
        }
    }

    async register (fio: string, login: string, password: string){
        try {
            const response = await AuthService.registration(fio, login, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e){
            console.log(e)
        }
    }

    async logout (){
        try {
            await AuthService.logout();
            localStorage.removeItem('token')
            this.setAuth(false);
            this.setUser({} as User)
        } catch (e){
            console.log(e)
        }
    }

    async checkAuth(){
        this.setLoading(true);
        try {
            const response =await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials:true})   
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (e){
            console.log(e)
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(bool: boolean){
        this.isLoading = bool;
    }
}


import { AxiosResponse } from "axios";
import { Client } from "../models/Client";
import $api from "../http";

export default class ClientService {
    static fetchClients(fio_responsible: string): Promise <AxiosResponse<Client[]>> {
        return $api.post(`/clients`, {fio_responsible})
    }

    static async changeStatus(nomer_scheta: number, status: number, fio_responsible: string): Promise<AxiosResponse<Client[]>>{
        return $api.post('/changestatus', {nomer_scheta, status, fio_responsible})
    }
}
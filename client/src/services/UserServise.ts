import IUser from "../../models/IUser";
import $api from "../http/index";
import {AxiosResponse} from "axios";


export default class UserService{

    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users")
    }
    
}
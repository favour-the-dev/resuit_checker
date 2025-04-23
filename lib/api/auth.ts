import axios from "axios";
import { RegisterFormData, verifyLoginCodeDate, ProfileData, AdminData } from "../types/types";
const url = `${process.env.NEXT_PUBLIC_API_URL}/auth`
const token = typeof window !== "undefined"
  ? localStorage.getItem("userToken")
  : null;

class AuthService{
    static async registerUser(formData: RegisterFormData): Promise<void> {
        try {
            console.log('Registering with:', formData);
            console.log(url)
            const res = await axios.post(`${url}/register`, formData, {
                headers: {
                "Content-Type": "application/json",
                },
            });
            const data = res.data;
            console.log(data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async requestLoginCode(email: string): Promise<void>{
        try {
            console.log("user email:", email)
            const res = await axios.post(`${url}/request-login-code`, {email}, {
                headers: {
                    "Content-Type": "application/json",
                    },
            })
            const data = res.data
            console.log(data);
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async verifyLoginCode({email, loginCode}: verifyLoginCodeDate): Promise<string>{
        try {
            console.log("user loginCode:", loginCode)
            const res = await axios.post(`${url}/verify-login-code`, {email, loginCode}, {
                headers: {
                    "Content-Type": "application/json",
                    },
            })
            const data = res.data
            console.log(data);
            return data?.token;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    static async getStudentProfile(): Promise<ProfileData>{
        try {
            const res = await axios.get(`${url}/me`, {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const data = res.data
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            throw Error
        }
    }

    static async loginAdmin({email, password}: AdminData): Promise<string>{
        console.log(email, password)
        try {
            const res = await axios.post(`${url}/admin/login`, {email, password}, {
                headers:{
                    "Content-Type": "application/json",
                }
            })
            const data = res.data
            return data?.token
        } catch (error) {
            console.log(error)
            throw Error
        }
    }
}

export default AuthService
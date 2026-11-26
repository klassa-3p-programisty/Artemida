import { API } from "../../../shared/api/api";
import { env } from "../../../shared/api/env";

export const AuthApi = {

async me() {
    
    const res = await fetch(`${env.API_URL}${API.auth.me}`, {
      credentials: "include",
    });

    if (res.status === 400) {
        return null;
    }

    if (!res.ok) {
        throw new Error("Error of session");
    }

    return res.json();
},

async login(login , password) {

    const res = await fetch(`${env.API_URL}${API.auth.login}`, {
    method: "POST",   
    credentials: "include",
    headers: {
    "Content-Type": "application/json",
    },

    body: JSON.stringify ({login , password}),    
    });

    if (!res.ok) {
        const err = new Error("incorrect login or password");
        err.status = res.status;
        throw err;
        }

    return res.json();
    },

async logout(){

    const res = await fetch(`${env.API_URL}${API.auth.logout}`, {
    method: "POST",
    credentials: "include"
    });

if (!res.ok) {
    throw new Error("error of logout")
}
}
}
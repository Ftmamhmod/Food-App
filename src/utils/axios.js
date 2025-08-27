import axios from "axios";

export const baseImgURL = "https://upskilling-egypt.com:3006/";
export const axiosInstance = axios.create({
    baseURL: "https://upskilling-egypt.com:3006/api/v1",
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const endpoints = {
    recipes: {
        list: "/Recipe/",
        delete: "/Recipe/{id}",
        create: "/Recipe/",
        update: "/Recipe/{id}",

    },

    categories: {
        list: "/Category/",
        delete: "/Category/{id}",
        create: "/Category/",
        update: "/Category/{id}",
    },
    users: {
        list: "/Users/",
        delete: "/Users/{id}",
        register: "/Users/Register",
        changePassword: "/Users/ChangePassword",
        resetPassword: "/Users/Reset",
        forgetPassword: "/Users/Reset/Request",
        login: "/Users/Login",
        current: "/Users/currentUser",
        updateProfile: "/Users/",
    },
    tag: {
        list: "/Tag/",
    },
    userRecipe: {
        list: "/userRecipe/",
        add: "/userRecipe/",
        delete: "/userRecipe/{id}",

    }

}
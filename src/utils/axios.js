import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://upskilling-egypt.com:3006",
});

export const endpoints = {
    recipes: {
        list: "/api/v1/Recipe/?pageSize=5&pageNumber=1",
    },

    categories: {
        list: "/api/v1/Category/?pageSize=5&pageNumber=1",
        delete: "/api/v1/Category/{id}",
        create: "/api/v1/Category/",
    },
    users: {
        list: "/api/v1/Users/?groups=1,2&pageSize=5&pageNumber=1"
    }

}
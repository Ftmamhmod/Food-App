import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://upskilling-egypt.com:3006",
});

export const endpoints = {
    recipes: {
        list: "/api/v1/Recipe/?pageSize=5&pageNumber=1",
        delete: "/api/v1/Recipe/{id}",
        create: "/api/v1/Recipe/",
        update: "/api/v1/Recipe/{id}",

    },

    categories: {
        list: "/api/v1/Category/?pageSize=5&pageNumber=1",
        delete: "/api/v1/Category/{id}",
        create: "/api/v1/Category/",
        update: "/api/v1/Category/{id}",
    },
    users: {
        list: "/api/v1/Users/?groups=1,2&pageSize=5&pageNumber=1"
    }

}
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://upskilling-egypt.com:3006",
});

export const endpoints = {
    recepies: {
        list: "/api/v1/Recipe/?pageSize=5&pageNumber=1",
    },

    categories: {
        list: "/api/v1/Category/?pageSize=5&pageNumber=1",
    }

}
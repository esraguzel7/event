import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode'

const API_URL = "http://localhost:5001";

class Api {
    api_url = API_URL

    getEventCategories = function () {
        const [data, setData] = useState([])

        useEffect(() => {
            fetch(this.api_url + '/event-categories')
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.log(error));
        }, []);

        return data;
    }

    getUserInfo = function () {
        let token = localStorage.getItem('token')
        let data = undefined

        if (token)
            data = jwtDecode(token)

        return data
    }

    isLogined = function () {
        if (localStorage.getItem('token'))
            return true;
        return false;
    }

    getUserEvents = function () {
        const [data, setData] = useState([])

        useEffect(() => {
            fetch(this.api_url + '/user-events?user=' + this.getUserInfo().id)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.log(error));
        }, []);


        if (Array.isArray(data))
            return data;
        return [];
    }

    getSingleEvent = function (id) {
        const [data, setData] = useState([])

        useEffect(() => {
            fetch(this.api_url + '/get-event?id=' + id)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.log(error));
        }, [id]);

        return data;
    }

    getEvents = function (category = undefined, limit = undefined) {
        const [data, setData] = useState([])

        var query = '';

        if (category !== undefined || limit !== undefined)
            query = '?'

        if (category !== undefined) {
            query += 'category=' + String(category)
            query += (limit !== undefined) ? '&&' : ''
        }

        if (limit !== undefined)
            query += 'limit=' + limit

        console.log(query);



        useEffect(() => {
            fetch(this.api_url + '/get-events' + query)
                .then(response => response.json())
                .then(data => setData(data))
                .catch(error => console.log(error));
        }, [query]);

        if (Array.isArray(data))
            return data;
        return [];
    }
}

export default Api;
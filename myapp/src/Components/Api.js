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
}

export default Api;
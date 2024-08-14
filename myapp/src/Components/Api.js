import { useEffect, useState } from "react";

class Api {
    api_url = "http://localhost:5000"

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
}

export default Api;
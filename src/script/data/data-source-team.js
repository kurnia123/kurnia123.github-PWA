import {BASE_URL,API_KEY} from "../key/api-key.js";

class DataSourceTeam {
    static loadData() {
        return fetch(BASE_URL + "competitions/2021/teams",{
            method: 'GET',
            headers: {
                'X-Auth-Token':`${API_KEY}`
            }
        })
            .then(this._status)
            .then(this._json)
            .then(function (data) {  
                return data;
            })
    }

    static _status(response) {
        if (response.status !== 200) {
            console.log("Error : " + response.status)
    
            return Promise.reject(new Error(response.statusText));
        } else {
            return Promise.resolve(response)
        }
    }
    
    static _json(response) {
        return response.json();
    }
}

export default DataSourceTeam;
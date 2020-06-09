import {BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

class DetailTeam {
    getPage(page,callback) {
        let progress = document.getElementById("progress");
        progress.style.visibility = "visible"

        DataSource.loadData(BASE_URL + `teams/${page}`)
            .then(this.renderT)
            .then(callback);
    }

    renderT(data) {
        let bodyContent = document.getElementById("body-content")
        bodyContent.innerHTML = ` 
        <div class="card">
            <div class="card-content">
                <div class="row">
                    <div class="col s4 center-align">
                        <img style="height: 6em; margin:auto;" src="${data.crestUrl}" alt="Logo Club" srcset="">
                        <span class="flow-text center-align"><h5><b style="font-size:5vw">${data.shortName}</b></h5></span>
                    </div>
                    <div class="col s8" style="overflow:auto">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td> : </td>
                                    <td>${data.name}</td>
                                </tr>
                                <tr>
                                    <th>Phone</th>
                                    <td> : </td>
                                    <td>${data.phone}</td>
                                </tr>
                                <tr>
                                    <th>Founded</th>
                                    <td> : </td>
                                    <td>${data.founded}</td>
                                </tr>
                                <tr>
                                    <th>Website</th>
                                    <td> : </td>
                                    <td><a target="_blank" href="${data.website}">Go to Website</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-content">
                <div class="row">
                    <div class="col s12 center-align" style="overflow:auto">
                        <span class="flow-text"><h4><b>Squad</b></h4></span>
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Birth</th>
                                    <th>Shirt Number</th>
                                    <th>Position</th>
                                </tr>
                            </thead>

                            <tbody id="body-tabel-squad">
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `;
        let tabelSquad = document.getElementById("body-tabel-squad")
        let dataHtml = ""
        data.squad.forEach(team => {
            dataHtml += `
            <tr>
                <td>${team.name}</td>
                <td>${team.dateOfBirth.substring(0,10)} (${team.countryOfBirth})</td>
                <td>${team.shirtNumber}</td>
                <td>${team.position}</td>
            </tr>
            `
        });
        tabelSquad.innerHTML = dataHtml;

        let progress = document.getElementById("progress");
        progress.style.visibility = "hidden"

        return new Promise(function (resolve, reject) {  
            resolve(data);
        })
    }

}

export {DetailTeam};
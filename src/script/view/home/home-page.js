import {BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

class HomePage {
    getPage(page,callback) {
        let progress = document.getElementById("progress");
        progress.style.visibility = "visible"

        let title = document.getElementById("title");
        title.innerText = "Spanish League"
        title.style.fontSize = '1.9rem'
    
        const url = `${BASE_URL}competitions/2021/matches`
        if ('caches' in window) {
            caches.match(url).then(function (response) {
                if (response) {
                    response.json().then(function (data) {  
                        render(data)
                    })
                }
            })
        }
        // FETCH DATA FROM Network
        DataSource.loadData(url)
            .then(getDataTeam)
    }
}

function getDataTeam(dataMataches) {
    let url = BASE_URL + "competitions/2021/teams"
    DataSource.loadData(url)
        .then(dataTeams => {
            render(dataMataches,dataTeams.teams)
        })
}

function render(data,teams) {
    var dataHtml = "";
    let urlImageHomeTeam = "";
    let urlImageAwayTeam = "";

    data.matches.forEach(article => {
        teams.forEach(team => {
            if (article.homeTeam.id === team.id) {
                urlImageHomeTeam = team.crestUrl
            } else if (article.awayTeam.id === team.id) {
                urlImageAwayTeam = team.crestUrl
            }
        })

        dataHtml += `
        <div class="card">
            <div class="card-content">
                <div class="row">
                    <div class="col s12 center-align">
                        <span class="flow-text"><h4><b>Matchday ${article.matchday}</b></h4></span>
                        <span class="flow-text" style="color:#95a5a6;"><h6>${article.utcDate.substring(0,10)}</h6></span>
                        <div class="divider"></div>
                    </div>
        
                    <div class="col s4 center-align">
                        <div class="section" style="color:#95a5a6;">Home Team</div>
                        <div class="divider"></div>
                        <div class="sectoin">
                            <span class="flow-text center-align"><b>${article.homeTeam.name}</b></span>
                        </div>
                        <div class="section">
                            <a href="./detail/detail.html?id=${article.homeTeam.id}">
                                <img src="${urlImageHomeTeam}" alt="image" style="height: 100px;">
                            </a>
                        </div>
                        <div class="section">
                            <span class="flow-text ">${article.score.fullTime.homeTeam}</span>
                        </div>
                    </div>
                    <div class="col s4 center-align">
                        <br>
                        <br>
                        <h3><b>VS</b></h3>
                    </div>
                    <div class="col s4 center-align">
                        <div class="section" style="color:#95a5a6;">Away Team</div>
                        <div class="divider"></div>
                        <div class="sectoin">
                            <span class="flow-text "><b>${article.awayTeam.name}</b></span>
                        </div>
                        <div class="section">
                            <a href="./detail/detail.html?id=${article.awayTeam.id}">
                                <img src="${urlImageAwayTeam}" alt="image" style="height: 100px;">
                            </a>
                        </div>
                        <div class="section">
                            <span class="flow-text ">${article.score.fullTime.awayTeam}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    
    let bodyContent = document.getElementById("body-content")
    bodyContent.innerHTML = dataHtml

    let progress = document.getElementById("progress");
    progress.style.visibility = "hidden"
}

export {HomePage};
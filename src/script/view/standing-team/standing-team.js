import {BASE_URL} from "../../key/api-key.js";
import DataSource from "../../data/data-source.js";

class StandingTeam {
    getPage(page,callback) {
        let progress = document.getElementById("progress");
        progress.style.visibility = "visible";

        let standingTeam = document.getElementById("title");
        standingTeam.innerText = "Standing Team";

        DataSource.loadData(BASE_URL + "competitions/2021/standings?standingType=HOME")
            .then(this.renderT)
    }

    renderT(data) {
        let dataHtml = ""
        data.standings[0].table.forEach(item => {
            dataHtml += `
            <tr>
                <th>${item.position}</th>
                <td class="valign-wrapper">
                    <a href="./detail/detail.html?id=${item.team.id}">
                        <img style="height: 20px;" src="${item.team.crestUrl}" alt="logo club">
                        <b style="margin-left: 5px; color: black;">${item.team.name}</b>
                    </a>
                </td>
                <td>${item.playedGames}</td>
                <td>${item.goalDifference}</td>
                <th>${item.points}</th>
            </tr>
            `;
        });
        let bodyContent = document.getElementById("body-table")
        bodyContent.innerHTML = dataHtml

        let progress = document.getElementById("progress");
        progress.style.visibility = "hidden"
    }
}

export {StandingTeam};
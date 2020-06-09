import {getAll} from '../../db/db.js'

class SavePage {
    getPage(page,callback) {
        let progress = document.getElementById("progress");
        progress.style.visibility = "visible"

        let teamFavoriteTitle = document.getElementById("title");
        teamFavoriteTitle.innerText = "Team Favorite";

        getAll()
        .then(this.renderT)
    }

    renderT(clubs) {
        console.log(clubs);
        
        if (clubs.length === 0) {
            let bodyContent = document.getElementById("body-content")
            bodyContent.innerHTML = `<h2>Data Kosong</h2>`;    
        } else {
            let dataHtml = ""
            clubs.forEach(function (club) {
                dataHtml += `
                    <div class="card">
                        <div class="card-content valign-wrapper">
                            <a class="valign-wrapper" href="./detail/detail.html?id=${club.id}&saved=true">
                                <img style="height: 100px;" src="${club.crestUrl}" />
                                <b style="margin-left:10px; font-size: 7vw; color: black;">${club.name}</b>
                            </a>
                        </div>
                    </div>
                `
            })
            let bodyContent = document.getElementById("body-content")
            bodyContent.innerHTML = dataHtml;
        }
        
        let progress = document.getElementById("progress");
        progress.style.visibility = "hidden"
    }
}

export {SavePage};
import {LoadPageService,DetailTeam} from "../../process/process.js";
import {saveForLatter,deleteByid} from "../../db/db.js";

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

document.addEventListener("DOMContentLoaded", function () {  
    console.log("index--getArticles (ambil data)");
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let idTeam = urlParams.get("id");

    let btnSave = document.getElementById("save");

    if (isFromSaved) {
        LoadPageService.load(new DetailTeam(),idTeam)
        btnSave.innerText = "favorite"
        btnSave.onclick = function() {
            console.log("Tombol FAB Delete di klik.");
            btnSave.innerText = "favorite_border"
            deleteByid(idTeam)
                .then(message => {
                    console.log(`data berhasil Dihapus: ${idTeam}`, message)
                })
        }

    } else {
        let item = ""
        LoadPageService.load(new DetailTeam(),idTeam,function (data) {  
            item = data;
        })
        
        btnSave.onclick = function() {
            console.log("Tombol FAB di klik.");
            btnSave.innerText = "favorite"
            saveForLatter(item);
        }
    }

})
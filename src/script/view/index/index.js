import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {registrationServiceWorker,requestPermission} from '../../registration/reg-push-notification.js';

import standingTeamPage from "../../../template/standingTeam/standingTeam.html";

import {
    LoadPageService,
    HomePage,
    StandingTeam,
    SavePage,
} from "../../process/process.js"

document.addEventListener("DOMContentLoaded",function () {  
    registrationServiceWorker();
    requestPermission();

    let elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems)
    loadNav();


    function loadNav() {
        fetch("../nav.html")
            .then(function respons(value) {
                return value.text();
            })
            .then(result => {
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = result
                })

                document.querySelectorAll(".topnav a, .sidenav a").forEach(elm => {
                    elm.addEventListener("click", function (event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                })

            })
            .catch(reject => {
                document.querySelectorAll(".topnav, .sidenav").forEach(elem => {
                    elem.innerHTML = "<h2>file tidak ada</h2>"
                })
            })
    }

    var page = window.location.hash.substr(1);
    if(page === '') page = "home"
    console.log(page)
    loadPage(page);

    function loadPage(page) {
        
        if (page === "home") {
            LoadPageService.load(new HomePage())
        } else if (page === "save") {
            LoadPageService.load(new SavePage())
        } else if(page === "standingTeam") {
            let bodyContent = document.getElementById("body-content")
            bodyContent.innerHTML = standingTeamPage;

            LoadPageService.load(new StandingTeam())
        }
    }

    self.addEventListener('push', function(event) {
        var body;
        if (event.data) {
          body = event.data.text();
        } else {
          body = 'Push message no payload';
        }
        var options = {
          body: body,
          icon: 'img/notification.png',
          vibrate: [100, 50, 100],
          data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
          }
        };
        event.waitUntil(
          self.registration.showNotification('Push Notification', options)
        );
      });
})
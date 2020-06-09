import {HomePage} from '../view/home/home-page.js';
import {StandingTeam} from '../view/standing-team/standing-team.js';
import {DetailTeam} from '../view/detail/detail-item.js';
import {SavePage} from '../view/save/save-page.js';

class LoadPageService {
    static load(loadPage,page=0,callback=0) {
        loadPage.getPage(page,callback);
    }
}

export {
    LoadPageService,
    HomePage,
    StandingTeam,
    DetailTeam,
    SavePage,
}
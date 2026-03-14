matchesLeagueUrl = "https://apiv2.allsportsapi.com/football/?met=Leagues";
let matchesFixturesUrl = "https://apiv2.allsportsapi.com/football/?met=Fixtures";
let matchesLiveUrl = "https://apiv2.allsportsapi.com/football/?met=Livescore";
matchApiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";
// let myHeaders = new Headers();
// myHeaders.append("x-apisports-key", matchApiKey);
// let requestOptions = {
//     headers: myHeaders
// };

// let myHeaders = new Headers();
// myHeaders.append("Access-Control-Allow-Origin", "*");
// let requestOptions = {
//     headers: myHeaders
// };



/* async function updateLeagueList(country, isForceUpdate) {
    let leagueList = localStorage.getItem(`leagueList${country}`);
    if (leagueList == null || isForceUpdate) {
        leagueList = await fetch(`${matchesLeagueUrl}&APIkey=${matchApiKey}&countryId=${country}`, requestOptions)
            .then((result) => result.json());
        localStorage.setItem(`leagueList${country}`, JSON.stringify(leagueList));
    } else {
        leagueList = JSON.parse(leagueList);
    }
    return leagueList;
} */






async function updateMatchesFromTo(from, to, leagueId = -1) {
    // let leagueList = await updateLeagueList(true);
    // let leagueId = leagueList.response[0].league.id;
    // let leagueId = leagueList.response[0].league.name;

    //leagueID = -1 means default value and user hasn't selected a league yet
    if (leagueId == -1) {
        leagueId = localStorage.getItem("selected_league");
    }

    //`${matchesFixturesUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}&from=${from}&to=${to}`

    let liveFromTo = await fetch(`${matchesFixturesUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}&from=${from}&to=${to}`)
        .then((result) => result.json());
    console.log(liveFromTo);

    //clear previous match cards
    let matchesContainer = document.getElementsByClassName("to-from-section")[0];
    matchesContainer.innerHTML = '';

    liveFromTo.result.forEach((node, nodeIndex) => {
        let homeTeam = node.event_home_team;
        let homeLogo = node.home_team_logo;
        let awayTeam = node.event_away_team;
        let awayLogo = node.away_team_logo;
        let score = node.event_final_result;
        let elapsedTime = node.event_status;

        let matchCardDetails = `
                        <div class="live-match-first-team pt-3 col col-md-3  ">
                            <img src="${homeLogo}" class="img-fluid h-100" alt="team logo">
                            <p>${homeTeam}</p>
                        </div>
                        <div class="live-match-score-section col col-md-4">
                            <p class="match-section-score fs-1 fw-bold m-0">${score}</p>
                            <p class="match-section-live-time fs-4 fw-bold m-0">${elapsedTime}</p>
                        </div>
                        <div class="live-match-second-team pt-3 col col-md-3 ">
                            <img src="${awayLogo}" class="img-fluid h-100" alt="team logo">
                            <p>${awayTeam}</p>
                        </div>
        `;
        let matchCardDiv = document.createElement("div");
        matchCardDiv.classList.add("live-match-div", "d-flex", "justify-content-around", "text-center", "p-3", "mb-2");
        matchCardDiv.innerHTML = matchCardDetails;
        matchesContainer.appendChild(matchCardDiv);
    });
}


function getTimeFrame() {
    let dateFromInput = document.getElementById("date-from").value;
    let dateToInput = document.getElementById("date-to").value;

    console.log(dateFromInput);
    console.log(dateToInput);
    updateMatchesFromTo(dateFromInput, dateToInput);
}

document.getElementsByClassName("search-button")[0].addEventListener("click", getTimeFrame);

let matchesContainer = document.getElementsByClassName("to-from-section")[0];
matchesContainer.innerHTML = '';

async function showLiveMatches(leagueId = -1) {
    //leagueID = -1 means default value and user hasn't selected a league yet
    if (leagueId == -1) {
        leagueId = localStorage.getItem("selected_league");
    }

    let todayDate = new Date().toISOString().slice(0, 10); //get only current day not specific time
    let liveMatches;
    console.log(localStorage.getItem(`liveMatches_${leagueId}_date`)); //logs old livematches date

    if (localStorage.getItem(`liveMatches_${leagueId}_date`) === todayDate) {
        liveMatches = JSON.parse(localStorage.getItem(`liveMatches_${leagueId}`));
    } else {
        localStorage.setItem(`liveMatches_${leagueId}_date`, todayDate);
        liveMatches = await fetch(`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`)
            .then((result) => result.json());
        localStorage.setItem(`liveMatches_${leagueId}`, JSON.stringify(liveMatches));
        console.log("sent request to live matches API");
    }


    let matchesContainer = document.getElementsByClassName("live-matches")[0];
    matchesContainer.innerHTML = '';

    liveMatches.result.forEach((node, nodeIndex) => {
        let homeTeam = node.event_home_team;
        let homeLogo = node.home_team_logo;
        let awayTeam = node.event_away_team;
        let awayLogo = node.away_team_logo;
        let score = node.event_final_result;
        let elapsedTime = node.event_status;

        let matchCardDetails = `
                        <div class="live-match-first-team pt-3 col col-md-3  ">
                            <img src="${homeLogo}" class="img-fluid h-100" alt="team logo">
                            <p>${homeTeam}</p>
                        </div>
                        <div class="live-match-score-section col col-md-4">
                            <p class="match-section-score fs-1 fw-bold m-0">${score}</p>
                            <p class="match-section-live-time fs-4 fw-bold m-0">${elapsedTime}</p>
                        </div>
                        <div class="live-match-second-team pt-3 col col-md-3 ">
                            <img src="${awayLogo}" class="img-fluid h-100" alt="team logo">
                            <p>${awayTeam}</p>
                        </div>
        `;
        let matchCardDiv = document.createElement("div");
        matchCardDiv.classList.add("live-match-div", "d-flex", "justify-content-around", "text-center", "p-3", "mb-2");
        matchCardDiv.innerHTML = matchCardDetails;
        matchesContainer.appendChild(matchCardDiv);
    });
}

//show live matches on page load
showLiveMatches();

let leagueSelect = document.getElementsByClassName("league-select")[0];
leagueSelect.addEventListener("change", (e) => {
    showLiveMatches(e.target.value);
    localStorage.setItem("selected_league", e.target.value);
});
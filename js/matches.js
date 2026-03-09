let matchesLeagueUrl = "https://apiv2.allsportsapi.com/football/?met=Leagues";
let matchesFixturesUrl = "https://apiv2.allsportsapi.com/football/?met=Fixtures";
let matchesLiveUrl = "https://apiv2.allsportsapi.com/football/?met=Livescore";
let matchApiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";
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

//free plan function (only 2 random leagues)
async function updateLeagueList(isForceUpdate) {
    let leagueList = localStorage.getItem(`leagueList`);
    if (leagueList == null || isForceUpdate) {
        leagueList = await fetch(`${matchesLeagueUrl}&APIkey=${matchApiKey}`)
            .then((result) => result.json());
        localStorage.setItem(`leagueList`, JSON.stringify(leagueList));
    } else {
        leagueList = JSON.parse(leagueList);
    }
    return leagueList;
}


//only works on paid plan, manually choosing the league as proof of concept
async function updateLiveMatches() {
    let leagueList = await updateLeagueList(false);
    // let leagueId = leagueList.response[0].league.id;
    // let leagueName = leagueList.response[0].league.name;

    let leagueId = 152;
    let leagueName = "Premier League";

    //`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`

    let liveFixtures = await fetch(`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`)
        .then((result) => result.json());
}

async function updateMatchesFromTo(from, to) {
    // let leagueList = await updateLeagueList(true);
    // let leagueId = leagueList.response[0].league.id;
    // let leagueName = leagueList.response[0].league.name;

    let leagueId = 152;
    let leagueName = "Premier League";

    //`${matchesFixturesUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}&from=${from}&to=${to}`

    let liveFromTo = await fetch(`${matchesFixturesUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}&from=${from}&to=${to}`)
        .then((result) => result.json());
    console.log(liveFromTo);

    //clear previous match cards
    let matchesContainer = document.getElementsByClassName("accordion-item")[0];
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
        matchCardDiv.classList.add("live-match-div", "d-flex", "justify-content-around", "text-center", "p-3", "bg-body-secondary", "rounded-4", "border", "border-black", "mb-2");
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

let matchesContainer = document.getElementsByClassName("accordion-item")[0];
    matchesContainer.innerHTML = '';
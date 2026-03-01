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
async function updateLiveMatchesForIndex() {
    let leagueList = await updateLeagueList(true);
    // let leagueId = leagueList.response[0].league.id;
    // let leagueName = leagueList.response[0].league.name;

    let leagueId = 152;
    let leagueName = "Premier League";

    //`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`

    let liveFixtures = await fetch(`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`)
        .then((result) => result.json());
    console.log(liveFixtures);
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
}

updateLiveMatchesForIndex();
updateMatchesFromTo("2026-02-27", "2026-03-01");
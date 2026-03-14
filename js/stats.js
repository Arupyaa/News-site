//all sports api - top scorers section
let topScorersUrl = "https://apiv2.allsportsapi.com/football/?met=Topscorers";
let apiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";



updateTopScorers(false);

async function updateTopScorers(isForceUpdate, leagueId = -1) {
    //leagueID = -1 means default value and user hasn't selected a league yet
    if (leagueId == -1) {
        leagueId = localStorage.getItem("selected_league");
    }

    let topScorersList = localStorage.getItem(`topscorers`);
    if (topScorersList == null || isForceUpdate) {
        topScorersList = await fetch(`${topScorersUrl}&APIkey=${apiKey}&leagueId=${leagueId}`).then((result) => result.json());
        localStorage.setItem(`topscorers`, JSON.stringify(topScorersList));
    } else {
        topScorersList = JSON.parse(topScorersList);
    }

    //clear old table data
    let topScorersTableBody = document.querySelector("#top-scorers table tbody");
    topScorersTableBody.innerHTML = ``;

    topScorersList.result.forEach((node, nodeIndex) => {
        let ranking = node.player_place;
        let name = node.player_name;
        let team = node.team_name
        let goals = node.goals;
        let assists = node.assists;

        let row = document.createElement("tr");
        let rowData = `
                <td>${ranking}</td>
                <td></td>
                <td>${name}</td>
                <td>${team}</td>
                <td>${goals}</td>
                <td>${assists == null ? 0 : assists}</td>
                <td></td>
        `;
        row.innerHTML = rowData;
        topScorersTableBody.appendChild(row);

    });


}

//football-api - top red cards from season 2024

let foulCardsUrl = "https://v3.football.api-sports.io/players/topyellowcards?season=2024";

let foulEnglishPremierLeague = 39;

let foulApiKey = "993b462d72079fb49b006658cb8848ee";
let myHeaders = new Headers();
myHeaders.append("x-apisports-key", foulApiKey);
let requestOptions = {
    headers: myHeaders
}

updateFoulCards(foulEnglishPremierLeague, false);

async function updateFoulCards(league, isForceUpdate) {
    let topFoulCards = localStorage.getItem(`topFoulCards`);
    if (topFoulCards == null | isForceUpdate) {
        topFoulCards = await fetch(`${foulCardsUrl}&league=${foulEnglishPremierLeague}`, requestOptions).then((result) => result.json());
        console.log(topFoulCards);
        localStorage.setItem(`topFoulCards`, JSON.stringify(topFoulCards));
    } else {
        topFoulCards = JSON.parse(topFoulCards);
    }

    //clear old table data
    let foulCardTableBody = document.querySelector("#yellow-red-cards table tbody");
    foulCardTableBody.innerHTML = '';

    topFoulCards.response.forEach((node, nodeIndex) => {
        let name = node.player.name;
        let img = node.player.photo;
        let team = node.statistics[0].team.name;
        let yellowCards = node.statistics[0].cards.yellow;
        let redCards = node.statistics[0].cards.red;

        let row = document.createElement("tr");
        let rowData = `
            <td>${nodeIndex}</td>
            <td><img src="${img}" class="rounded-circle" style="width: 40px;"></td>
            <td>${name}</td>
            <td>${team}</td>
            <td>${yellowCards}</td>
            <td>${redCards}</td>
        `;
        row.innerHTML = rowData;
        foulCardTableBody.appendChild(row);

    });
}

let leagueSelect = document.getElementsByClassName("league-select")[0];
leagueSelect.addEventListener("change", (e) => {
    updateTopScorers(true, e.target.value);
    localStorage.setItem("selected_league", e.target.value);
});
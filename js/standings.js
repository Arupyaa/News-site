let standingsUrl = "https://apiv2.allsportsapi.com/football/?met=Standings";
let apiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";



updateStandings(false);

async function updateStandings(isForceUpdate, leagueId = -1) {
    //leagueID = -1 means default value and user hasn't selected a league yet
    if (leagueId == -1) {
        leagueId = localStorage.getItem("selected_league");
    }

    let standings = localStorage.getItem(`standings${leagueId}`);
    if (standings == null || isForceUpdate) {
        standings = await fetch(`${standingsUrl}&APIkey=${apiKey}&leagueId=${leagueId}`).then((result) => result.json());
        localStorage.setItem(`standings${leagueId}`, JSON.stringify(standings));
    } else {
        standings = JSON.parse(standings);
    }
    console.log(standings);

    //clear old table
    let tableBody = document.querySelector("tbody");
    tableBody.innerHTML = '';

    standings.result.total.forEach((node, nodeIndex) => {
        let row = document.createElement("tr");

        let teamLogo = node.team_logo;
        let teamName = node.standing_team;
        let played = node.standing_P;
        let won = node.standing_W;
        let drawn = node.standing_D;
        let lost = node.standing_L;
        let goalsFor = node.standing_F;
        let goalsAgainst = node.standing_A;
        let goalsDrawn = node.standing_GD;
        let points = node.standing_PTS

        let rowData = `
    <td>${nodeIndex + 1}</td>
    <td><img src="${teamLogo}" class="football-team-logo"></td>
    <td>${teamName}</td>
    <td>${played}</td>
    <td>${won}</td>
    <td>${drawn}</td>
    <td>${lost}</td>
    <td>${goalsFor}</td>
    <td>${goalsAgainst}</td>
    <td>${goalsDrawn}</td>
    <td>${points}</td>
        `;

        row.innerHTML = rowData;
        tableBody.appendChild(row);

    });


}
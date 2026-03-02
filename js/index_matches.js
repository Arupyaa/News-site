let matchesLeagueUrl = "https://apiv2.allsportsapi.com/football/?met=Leagues";
let matchesFixturesUrl = "https://apiv2.allsportsapi.com/football/?met=Fixtures";
let matchesLiveUrl = "https://apiv2.allsportsapi.com/football/?met=Livescore";
let matchApiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";


updateLiveMatchesForIndex();

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
  // let leagueList = await updateLeagueList(true);
  // let leagueId = leagueList.response[0].league.id;
  // let leagueName = leagueList.response[0].league.name;

  let leagueId = 152; //premier league
  let countryId = 44; //england
  let leagueName = "Premier League";

  //`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`

  // let liveFixtures = await fetch(`${matchesLiveUrl}&APIkey=${matchApiKey}&leagueId=${leagueId}`)
  //     .then((result) => result.json());
  let liveFixtures = await fetch(`${matchesLiveUrl}&APIkey=${matchApiKey}`)
    .then((result) => result.json());

  //for debugging 1/3/2026
  console.log(`${matchesLiveUrl}&APIkey=${matchApiKey}`);

  console.log(liveFixtures);
  let matchSection = document.getElementsByClassName("live-match");

  //delete matchSection previous data;
  matchSection[0].innerHTML = '';
  matchSection[1].innerHTML = '';
  if (liveFixtures.result == undefined) {
    return;
  }
  //loop over live matches in json
  liveFixtures.result.forEach((object, objectIndex) => {
    let liveMatchSection = document.createElement("div");
    liveMatchSection.classList.add("live-match-section", "bg-body-tertiary", "p-2", "rounded,shadow");

    let homeTeamName = object.event_home_team;
    let homeTeamLogo = object.home_team_logo;
    let awayTeamName = object.event_away_team;
    let awayTeamLogo = object.away_team_logo;
    let score = object.event_final_result;
    let elapsedTime = object.event_status;

    let liveMatchSectionMobile = `
                        <div class="live-match-tournament d-flex justify-content-between">
                          <div class="d-flex">
                            <img src="images/league.png" alt="league icon" height="30px">
                            <p class="ms-2">Premier Leage</p>
                          </div>
                          <span class="badge rounded-pill text-bg-danger align-self-baseline py-2 px-3">live</span>
                        </div>
                        <div class="live-match-body d-flex justify-content-center align-items-center text-center ">
                          <div class="live-match-first-team pt-3 col col-md-3">
                            <img src="${homeTeamLogo}" class="w-75" alt="team logo">
                            <p>${homeTeamName}</p>
                          </div>
                          <div class="live-match-score-section col col-md-4 h-100 w-auto px-3">
                            <p class="match-section-score fs-1 fw-bold m-0">${score}</p>
                            <p class="match-section-live-time fs-4 fw-bold m-0">${elapsedTime}</p>
                          </div>
                          <div class="live-match-second-team pt-3 col col-md-3">
                            <img src="${awayTeamLogo}" class="w-75" alt="team logo">
                            <p>${awayTeamName}</p>
                          </div>
                        </div>
                                    `;


    liveMatchSection.innerHTML = liveMatchSectionMobile;
    matchSection[0].appendChild(liveMatchSection);



    let liveMatchSectionDesktop = `
                <div class="live-match-tournament d-flex justify-content-between">
                  <div class="d-flex">
                    <img src="images/league.png" alt="league icon" height="30px">
                    <p class="ms-2">Premier Leage</p>
                  </div>
                  <span class="badge rounded-pill text-bg-danger align-self-baseline py-2 px-3">live</span>
                </div>
                <div
                  class="live-match-body d-flex flex-column flex-xxl-row justify-content-center align-items-center text-center ">
                  <div class="live-match-first-team pt-3 col col-md-3">
                    <img src="${homeTeamLogo}" class="w-75" alt="team logo">
                    <p>${homeTeamName}</p>
                  </div>
                  <div class="live-match-score-section col col-md-4 h-100 w-auto px-3">
                    <p class="match-section-score fs-1 fw-bold m-0">${score}</p>
                    <p class="match-section-live-time fs-4 fw-bold m-0">${elapsedTime}</p>
                  </div>
                  <div class="live-match-second-team pt-3 col col-md-3">
                    <img src="${awayTeamLogo}" class="w-75" alt="team logo">
                    <p>${awayTeamName}</p>
                  </div>
                </div>
        `;
    let liveMatchSectionVertical = document.createElement("div");
    liveMatchSectionVertical.classList.add("live-match-section", "bg-body-tertiary", "p-2", "rounded", "shadow");
    liveMatchSectionVertical.innerHTML = liveMatchSectionDesktop;
    matchSection[1].appendChild(liveMatchSectionVertical);

  });

}
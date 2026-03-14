
let matchesLeagueUrl = "https://apiv2.allsportsapi.com/football/?met=Leagues";
let matchApiKey = "37430409c69a57beef8cb10a2b4a71be78cab74dc2656a9ebe4bee2dcb0eaab1";

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

fillLeagueSelect();

async function fillLeagueSelect() {
    let leagueList = await updateLeagueList(true);
    let selectNodes = document.getElementsByClassName("league-select");
    selectNodes = Array.from(selectNodes);
    //loop on different select elements
    selectNodes.forEach((node) => {

        //group league entries within respective countries
        const groupedCountries = leagueList.result.reduce((acc, leagueEntry) => {
            const key = leagueEntry.country_name;
            if (!acc[key]) acc[key] = [];
            acc[key].push(leagueEntry);
            return acc;
        }, {});

        //create optgroup for each country and add its league entry under it in the select element
        Object.keys(groupedCountries).forEach((country) => {
            let countryNode = document.createElement("optgroup");
            countryNode.setAttribute("label", country);
            groupedCountries[country].forEach((league) => {
                let leagueNode = document.createElement("option");
                leagueNode.innerText = league.league_name;
                leagueNode.value = league.league_key;

                countryNode.appendChild(leagueNode);
            });
            node.appendChild(countryNode);

        });

    });

    //save first result from select as savedLeague in localstorage if nothing is saved
    if(localStorage.getItem("selected_league") == null){
        let firstLeagueEntry = selectNodes[0].querySelector("option").value;
        localStorage.setItem("selected_league", firstLeagueEntry);
    }else{
        selectNodes.forEach((selectElement)=>{
            let currentLeague = localStorage.getItem("selected_league");
            selectElement.querySelector(`option[value="${currentLeague}"]`).setAttribute("selected",'');
        });
    }
}
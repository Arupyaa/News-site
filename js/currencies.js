let currencyUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_WxHjTifHK5pzj1VC4uTNtYt9CqEGASPklDInKw2A";

updateCurrencyElement("USD",true);
updateCurrencyElement("SAR",true);

async function updateCurrencyElement(currency,isForceUpdate) {
    let currencyJson = localStorage.getItem("currencyJson");
    if (currencyJson == null || isForceUpdate) {
        let requestUrl = `${currencyUrl}&base_currency=${currency}`
        currencyJson = await fetch(requestUrl).then((result)=>result.json());
        localStorage.setItem("currencyJson", JSON.stringify(currencyJson));
        console.log("sent api request to currency api");
    }
    else {
        currencyJson = JSON.parse(currencyJson);
    }
    
    let currencyBase = document.getElementsByClassName(currency);
    currencyBase = Array.from(currencyBase);
    currencyBase.forEach(node => {
        node.innerText = `${currencyJson.data.EGP.value.toFixed(2)} ${currency}/EGP`;
    });
}
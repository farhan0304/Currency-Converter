const baseurl = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";

let fromCont = document.querySelector(".from select");
let toCont = document.querySelector(".to select");
let btn = document.querySelector(".btn");
let msg = document.querySelector(".msg");

let currencyConvert = () =>{
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    // let response = await fetch(baseurl);
    // let val = await response.json();
    fetch(baseurl).then((response)=>{
        return response.json();
    }).then((res) =>{
        let val = res;
        let fromval = val.eur[fromCont.value.toLowerCase()];
        let toval = val.eur[toCont.value.toLowerCase()];
        let conversionRate = toval/fromval;
        let amt = conversionRate * amtVal;
        // console.log(amt);
        msg.textContent = `${amtVal} ${fromCont.value} = ${amt} ${toCont.value}`;
    })
}

let dropdowns = document.querySelectorAll(".dropdown select");
console.log(dropdowns)
for (let selects of dropdowns){

    for (let curr in countryList){
        let opt = document.createElement("option")
        opt.value = curr;
        opt.innerText = curr;
        if(selects.name=== "from" && curr ==="USD"){
            opt.selected = selects;
        }else if(selects.name=== "to" && curr ==="INR"){
            opt.selected = selects;
        }
        selects.appendChild(opt);
    }

    selects.addEventListener("change",(evt) =>{
        let tar = evt.target;
        let code = tar.value;
        let coutryCode = countryList[code];
        let imgsrc = `https://flagsapi.com/${coutryCode}/shiny/64.png`;
        let img = tar.parentElement.querySelector("img");
        img.src = imgsrc;
    })
}
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    currencyConvert();
});
window.addEventListener("load", () => {
    currencyConvert();
});

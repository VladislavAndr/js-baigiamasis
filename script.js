create()

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  let arr = JSON.parse(localStorage.getItem("data")) || [];
  let obj = {
    method : document.getElementById("method").value,
    country : document.getElementById("country").value,
    region : document.getElementById("region").value,
    coffee : Number(document.getElementById("coffee-amount").value),
    water : Number(document.getElementById("water-amount").value),
    temp: Number(document.getElementById("temp").value)
  };

  if( !obj.method || !obj.country || !obj.region || !obj.coffee || !obj.water || !obj.temp){
    console.log("not enough data");
  } else {
      arr.push(obj);
  }
 
  window.localStorage.setItem("data", JSON.stringify(arr));

  create();
});

function create() {
  const cards = document.getElementById("cards");
  cards.innerHTML = "";
  const arr = JSON.parse(localStorage.getItem("data")) || [];
  arr.forEach((item) => {
    const card = document.createElement("div");
    card.className = ("card");

    const method = document.createElement("p");
    method.textContent = item.method;
    method.className = ("method");

    const country = document.createElement("p");
    country.textContent = item.country;
    country.className = ("country")

    const region = document.createElement("p");
    region.textContent = item.region;
    region.className = ("region");

    const coffee = document.createElement("p");
    coffee.textContent = item.coffee;
    coffee.className = ("coffee");

    const water = document.createElement("p");
    water.textContent = item.water;
    water.className = ("water");

    const temp = document.createElement("p");
    temp.textContent = item.temp;
    temp.className = ("temp");

    card.append(method, country, region, coffee, water, temp);
    cards.append(card);

    
  })


}
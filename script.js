create();
document.forms.add.addEventListener("submit", (event) => {
	event.preventDefault();

	let arr = JSON.parse(localStorage.getItem("data")) || [];
	let obj = {
		method: document.getElementById("method").value,
		country: document.getElementById("country").value,
		region: document.getElementById("region").value,
		coffee: Number(document.getElementById("coffee-amount").value),
		water: Number(document.getElementById("water-amount").value),
		temp: Number(document.getElementById("temp").value),
		time: Number(document.getElementById("time").value),
		id: Math.floor(Math.random() * 100000),
	};

	if (
		!obj.method ||
		!obj.country ||
		!obj.region ||
		!obj.coffee ||
		!obj.water ||
		!obj.temp ||
		!obj.time
	) {
		console.log("not enough data");
	} else if (obj.method === "choose") {
		const err = document.getElementById("method-error");

		err.innerHTML = "";
		err.textContent = "Choose a method";
	} else {
		const err = document.getElementById("method-error");
		err.textContent = "";
		arr.push(obj);
		alert("Item added");
	}

	window.localStorage.setItem("data", JSON.stringify(arr));

	create();
});

function create(arr) {
	if (arr == null) {
		arr = JSON.parse(localStorage.getItem("data")) || [];
	}
	const cards = document.getElementById("cards");
	cards.innerHTML = "";
	arr.forEach((item) => {
		const card = document.createElement("div");
		card.className = "card";

		const img = document.createElement("img");
		img.className = "image";
		switch (item.method) {
			case "Moka Pot":
				img.src = "/images/mokapot.svg";
				card.appendChild(img);
				break;
			case "Aeropress":
				img.src = "/images/aeropress.svg";
				card.appendChild(img);
				break;
			case "V60":
				img.src = "/images/v60.svg";
				card.appendChild(img);
				break;
			case "Chemex":
				img.src = "/images/chemex.svg";
				card.appendChild(img);
				break;
			case "Siphon":
				img.src = "/images/siphon.svg";
				card.appendChild(img);
				break;
			case "French Press":
				img.src = "/images/frenchpress.svg";
				card.appendChild(img);
				break;
		}

		const method = document.createElement("p");
		method.textContent = item.method.toUpperCase();
		method.className = "method";

		const country = document.createElement("p");
		country.textContent = `Country: ${item.country}`;
		country.className = "country";

		const region = document.createElement("p");
		region.textContent = `Region: ${item.region}`;
		region.className = "region";

		const coffee = document.createElement("p");
		coffee.textContent = `Coffee amount: ${item.coffee} g`;
		coffee.className = "coffee";

		const water = document.createElement("p");
		water.textContent = `Water amount: ${item.water} g`;
		water.className = "water";

		const temp = document.createElement("p");
		temp.textContent = `Temperature: ${item.temp} °C`;
		temp.className = "temp";

		const time = document.createElement("p");
		time.textContent = `Brewing time: ${item.time} min`;
		time.className = "time";

		// Adds delete button and functionality

		const trash = document.createElement("i");
		trash.classList.add("far", "fa-trash-alt", "delete");

		trash.id = item.id;

		trash.addEventListener("click", () => {
			let arr = JSON.parse(localStorage.getItem("data"));
			arr = arr.filter((x) => x.id != item.id);
			window.localStorage.setItem("data", JSON.stringify(arr));

			create();
		});

		card.append(method, country, region, coffee, water, temp, time, trash);
		cards.append(card);
	});
}

// sort by method

document.querySelector("#sort-method").addEventListener("change", (e) => {
	if (e.target.value !== "choose") {
		let arr = JSON.parse(localStorage.getItem("data"));
		arr = arr.filter((i) => i.method === e.target.value);
		create(arr);
	} else {
		create();
	}
});

// Search by country of origin
document.getElementById("search-country").addEventListener("keyup", (e) => {
	const cards = document.getElementById("cards");
	let arr = JSON.parse(localStorage.getItem("data"));

	arr = arr.filter((i) =>
		i.country.toLowerCase().includes(e.target.value.toLowerCase())
	);

	create(arr);

	if (arr.length === 0) {
		const errSearch = document.createElement("p");
		errSearch.textContent = "nothing found";

		cards.append(errSearch);
	}

});
import styles from "./maps/styles";

function initMap() {
	const coords = {
		lat: -34.501340,
		lng: -58.660500
	};

	let map = new google.maps.Map(document.getElementById("map"), {
		center: coords,
		zoom: 20,
		styles: styles
	})

	let marker = new google.maps.Marker({
		position: coords,
		map,
		title: "Desarrollo"
	});
}

initMap();
<template>
    <div>
        <div style="height: 500px; width: 100%;">
            <div id="mapContainer"></div>
        </div>
    </div>
</template>
<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { onMounted, onBeforeUnmount } from 'vue';

const viewMap = () => {
    const mapDiv = L.map("mapContainer", { zoom: 10, minZoom: 0 }).setView([12.567564940265195, 123.2030846819095], 4);
    L.tileLayer("https://api.maptiler.com/maps/satellite/{z}/{x}/{y}@2x.jpg?key=krzKaw9ofNACr6EXiZFr", {}).addTo(mapDiv);

    fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((res) => {
            const countries = res.map((country) => ({
                name: country.country,
                value: country.countryInfo,
                status: country,
            }));
            countries.forEach((country) => {
                let circle = L.circle([country.value.lat, country.value.long], { radius: "" + Math.sqrt(country.status.cases) * 400 + "", color: "#DA210E" }).addTo(mapDiv);
                circle.bindPopup(
                    '<img class="img-fluid" src="' +
                    country.value.flag +
                    '">' +
                    '<p class="font-weight-bold">' +
                    country.name +
                    "</p>" +
                    "<p>Cases: " +
                    country.status.cases.toLocaleString() +
                    "</p>" +
                    "<p>Recovered: " +
                    country.status.recovered.toLocaleString() +
                    "</p>" +
                    "<p>Deaths: " +
                    country.status.deaths.toLocaleString() +
                    "</p>"
                );
            });
        })
        .catch((error) => {
            console.error(error);
        });
};

onMounted(() => {
    viewMap();
});

onBeforeUnmount(() => {
    // Clean up any resources or event listeners related to the map
});
</script>
<style scoped>
#mapContainer {
    width: 100%;
    height: 510px;
}
</style>
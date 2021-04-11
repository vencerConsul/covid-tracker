<template>
    <div>
        <div style="height: 500px; width: 100%;">
            <div id="mapContainer"></div>
        </div>
    </div>
</template>

<script>
    import "leaflet/dist/leaflet.css";
    import L from "leaflet";

    export default {
        name: 'Map',
        mounted(){
            const mapDiv = L.map("mapContainer").setView([0, 0], 2);
            L.tileLayer(
            "https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=a6U4uTHrCxiCmtUvyHF2",
            {
                attribution:
                '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
                noWrap: true,
            }
            ).addTo(mapDiv);
        
        fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then(res => {
                const countries = res.map((country) => ({
                    name: country.country,
                    value: country.countryInfo,
                    status: country
                }))

                

                countries.map((country) => {
                    let circle = L.circle([country.value.lat,  country.value.long], {radius: ''+Math.sqrt(country.status.cases)*400+'', color: '#DA210E'}).addTo(mapDiv)
                    circle.bindPopup(
                        '<img class="img-fluid" src="'+country.value.flag+'">'+'<p class="font-weight-bold">'+country.name+'</p>'+'<p>Cases: '+country.status.cases.toLocaleString()+'</p>'+'<p>Recovered: '+country.status.recovered.toLocaleString()+'</p>'+'<p>Deaths: '+country.status.deaths.toLocaleString()+'</p>'
                    )
                });
            })
            .catch(error => {
                return Promise.reject(error);
            });
        }
    }
</script>

<style scoped>
    #mapContainer {
        width: 100%;
        height: 510px;
    }
</style>

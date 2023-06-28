<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import moment from 'moment';

const country = ref('Worldwide');
const confirmed = ref('');
const deaths = ref('');
const recovered = ref('');
const active = ref('');
const lastUpdated = ref('');
const selectCountry = ref([]);

const getCovidCases = async (value) => {
    const url = value == 'Worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${value}`;

    try {
        const res = await axios.get(url);
        country.value = value === 'Worldwide' ? 'Worldwide' : res.data.country;
        confirmed.value = res.data.cases.toLocaleString();
        deaths.value = res.data.deaths.toLocaleString();
        recovered.value = res.data.recovered.toLocaleString();
        active.value = res.data.active.toLocaleString();
        lastUpdated.value = moment(res.data.updated).fromNow();
    } catch (error) {
        return Promise.reject(error);
    }
};

const getAllCovidCases = async () => {
    const url = 'https://disease.sh/v3/covid-19/all';
    try {
        const res = await axios.get(url);
        country.value = res.data.country == undefined ? 'Worldwide' : res.data.country;
        confirmed.value = res.data.cases.toLocaleString();
        deaths.value = res.data.deaths.toLocaleString();
        recovered.value = res.data.recovered.toLocaleString();
        active.value = res.data.active.toLocaleString();
        lastUpdated.value = moment(res.data.updated).fromNow();
    } catch (error) {
        return Promise.reject(error);
    }
    try {
        const res = await axios.get('https://disease.sh/v3/covid-19/countries');
        selectCountry.value = res.data.map((country) => ({ country: country.country }));
    } catch (error) {
        return Promise.reject(error);
    }
};

const onChangeCountry = (event) => {
    getCovidCases(event.target.value);
};

onMounted(async () => {
    await getAllCovidCases();
});
</script>

<template>
    <div>
        <div class="main">
            <div class="text-white container__all">
                <p class="country-title">{{ country }}</p>
                <p><span>Last Updated {{ lastUpdated }}</span></p>
                <select class="custom-select w-auto" @change="onChangeCountry($event)">
                    <option value="Worldwide" selected>Worldwide</option>
                    <option v-for="country in selectCountry" :key="country.country" :value="country.country">{{
                        country.country }}</option>
                </select>
            </div>
        </div>
        <div class="card-cases container__all">
            <div class="row">
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">CONFIRMED</p>
                            <h4 class="cases__number">{{ confirmed }}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/confirmed.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">DEATHS</p>
                            <h4 class="cases__number">{{ deaths }}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/deaths.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">RECOVERED</p>
                            <h4 class="cases__number">{{ recovered }}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/recovered.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">ACTIVE</p>
                            <h4 class="cases__number">{{ active }}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/active.png" alt="confirmed">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container__all {
    width: 500px auto;
}

.main {
    background: url('../assets/hero.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 40vh;
    display: flex;
    align-items: center;
}

.main .country-title {
    font-weight: 900;
    font-size: 60px;
    color: #c9c7c7;
}

.card-cases {
    margin-top: -2rem;
}

.card-cases .card {
    position: relative;
    border-radius: 0;
    border: none;
}

.card-cases .card:before,
.card-cases .card:after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: 15px;
    left: 10px;
    width: 50%;
    top: 80%;
    max-width: 300px;
    background: #777;
    -webkit-box-shadow: 0 15px 10px #777;
    -moz-box-shadow: 0 15px 10px #777;
    box-shadow: 0 15px 10px #777;
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    -o-transform: rotate(-3deg);
    -ms-transform: rotate(-3deg);
    transform: rotate(-3deg);
}

.card-cases .card:after {
    -webkit-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    -o-transform: rotate(3deg);
    -ms-transform: rotate(3deg);
    transform: rotate(3deg);
    right: 10px;
    left: auto;
}

.card-cases .card .card-body {
    color: #8c8c8c;
    text-align: center;
}

.card-cases .card .card-body .cases-title {
    font-size: 12px;
    font-weight: bold;
    color: rgb(89, 37, 37);
}

.card-cases .card .card-body h4 {
    font-weight: bold;
}

.card-cases .card .card-body .image-cases {
    height: 60px;
}
</style>

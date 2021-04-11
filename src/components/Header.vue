a<template>
    <div>
        <div class="main">
            <div class="text-white container__all">
                <p class="country-title">{{country}}</p>
                <p><span>Last Updated {{moment(lastUpdated).fromNow()}}</span></p>
                <select class="custom-select w-auto" @change="onChangeCountry($event)">
                    <option value="Worldwide" selected>Worldwide</option>
                    <option v-for="countries in selectCountry" :key="countries.country" :value="countries.country">{{countries.country}}</option>
                </select>
            </div>
        </div>
        <div class="card-cases container__all">
            <div class="row">
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">CONFIRMED</p>
                            <h4 class="cases__number">{{confirmed}}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/confirmed.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">DEATHS</p>
                            <h4 class="cases__number">{{deaths}}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/deaths.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">RECOVERED</p>
                            <h4 class="cases__number">{{recovered}}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/recovered.png" alt="confirmed">
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-6 mb-4">
                    <div class="card cases__card">
                        <div class="card-body">
                            <p class="cases-title">ACTIVE</p>
                            <h4 class="cases__number">{{active}}</h4>
                            <img class="img-fluid image-cases" src="../assets/cases/active.png" alt="confirmed">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Home',
    data(){
        return {
            country: '',
            confirmed: '',
            deaths: '',
            recovered: '',
            active: '',
            critical: '',
            lastUpdated: '',

            selectCountry: ''
        }
    },
    methods: {
        async GetCovidCases(value){
            const url = this.country == '' ? 'https://disease.sh/v3/covid-19/all' :
                        'https://disease.sh/v3/covid-19/countries/'+value+'';

            await axios.get(url)
            .then(res => {
                // console.log(res.data)
                this.country = this.country == ''? 'Worldwide' : res.data.country;
                this.confirmed = res.data.cases.toLocaleString();
                this.deaths = res.data.deaths.toLocaleString();
                this.recovered = res.data.recovered.toLocaleString();
                this.active = res.data.active.toLocaleString();

                this.lastUpdated = new Date(res.data.updated);
            })
            .catch(error => {
                return Promise.reject(error);
            });
        },

        onChangeCountry(event){
            this.GetCovidCases(event.target.value)
        }
    },
    mounted() {
        this.GetCovidCases();
        
        fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then(res => {
                const country = res.map((countries) => ({
                    country: countries.country
                }))
                this.selectCountry = country
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }
};
</script>

<style scoped>
    .caontainer__all{
        width: 500px auto;
    }
    .main{
        background: url('../assets/hero.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        height: 40vh;
        display: flex;
        align-items: center;
    }
    .main .country-title{
        font-weight: 900;
        font-size: 60px;;
        color: #c9c7c7;
    }
    .card-cases {
        margin-top: -2rem;
    }
    .card-cases .card
    {
    position: relative;
    border-radius: 0;
    border: none;
    }
    .card-cases .card:before, .card-cases .card:after{
        z-index: -1;
        position: absolute;
        content: "";
        bottom: 15px;
        left: 10px;
        width: 50%;
        top: 80%;
        max-width:300px;
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
    .card-cases .card:after{
        -webkit-transform: rotate(3deg);
        -moz-transform: rotate(3deg);
        -o-transform: rotate(3deg);
        -ms-transform: rotate(3deg);
        transform: rotate(3deg);
        right: 10px;
        left: auto;
    }
    .card-cases .card .card-body{
        color: #8c8c8c;
        text-align: center;
    }
    .card-cases .card .card-body .cases-title{
        font-size: 12px;
        font-weight: bold;
        color: rgb(89, 37, 37);
    }
    .card-cases .card .card-body h4{
        font-weight: bold;
    }
    .card-cases .card .card-body .image-cases{
        height: 60px;
    }
</style>

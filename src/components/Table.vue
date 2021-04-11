<template>
    <div>
        <table class="striped w-100" style="height: 500px !important; width: 100%;">
            <thead>
                <tr class="d-flex justify-content-between">
                    <th>Country</th>
                    <th>Cases</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="country in casesPerCountry" :key="country.cases" class="d-flex justify-content-between">
                    <td>{{country.country}}</td>
                    <td>{{country.status.toLocaleString()}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'Table',
        data(){
            return {
                casesPerCountry: ''
            }
        },
        mounted(){
            fetch('https://disease.sh/v3/covid-19/countries')
            .then((response) => response.json())
            .then(res => {
                const country = res.map((countries) => ({
                    country: countries.country,
                    status: countries.cases
                }))
                this.casesPerCountry = country
            })
            .catch(error => {
                return Promise.reject(error);
            });
        }
    }
</script>

<style scoped>
</style>

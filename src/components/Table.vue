<script setup>
import { ref, onMounted } from 'vue';

const casesPerCountry = ref([]);

onMounted(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((res) => {
            const countries = res.map((country) => ({
                country: country.country,
                status: country.cases,
            }));
            casesPerCountry.value = countries;
        })
        .catch((error) => {
            console.error(error);
        });
});
</script>
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
                <tr v-for="country in casesPerCountry" :key="country.country" class="d-flex justify-content-between">
                    <td>{{ country.country }}</td>
                    <td>{{ country.status.toLocaleString() }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<style scoped></style>
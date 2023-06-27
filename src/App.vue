<template>
  <div id="app">
    <Header />
    <div class="container__all">
      <div class="row">
        <div class="col-lg-9">
          <div class="card map__card mb-2">
            <div class="card-header">
              Countries Affected
            </div>
            <div class="card-body map__body">
              <Map />
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="card table__card">
            <div class="card-header">
              Live Cases by Country
            </div>
            <div class="card-body table__body" style="height: 535px;">
              <Table />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from "./components/Header.vue";
import Map from "./components/Map.vue";
import Table from "./components/Table.vue";
import Footer from "./components/Footer.vue";
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

.map__card,
.table__card {
  height: 600px;
}

.table__body {
  overflow: auto;
}

.map__body {
  max-width: 100%;
  height: auto;
}

.container__all {
  width: 100%;
  padding-right: 50px;
  padding-left: 50px;
  margin-right: auto;
  margin-left: auto;
}

.map__card:before,
.map__card:after,
.table__card:before,
.table__card:after {
  z-index: -1;
  position: absolute;
  content: "";
  bottom: 15px;
  left: 10px;
  width: 50%;
  top: 80%;
  border-radius: 0;
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

.map__card:after,
.table__card:after {
  -webkit-transform: rotate(3deg);
  -moz-transform: rotate(3deg);
  -o-transform: rotate(3deg);
  -ms-transform: rotate(3deg);
  transform: rotate(3deg);
  right: 10px;
  left: auto;
}

@media only screen and (max-width: 660px) {
  .container__all {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }

  .cases__card {
    height: 160px;
  }

  .cases__number {
    font-size: 15px;
  }

  .image-cases {
    width: 70px;
    height: 50px !important;
  }

  .country-title {
    font-size: 30px !important;
  }
}
</style>
<template>
  <div class="d-flex gap-4 container px-0 flex-wrap">
    <v-card height="160" width="359" class="rounded-3">
      <v-img src="@/assets/Block1.png" class="card-style"></v-img>
      <div style="height: 128px; width: 327px;" class="subcard">
        <div class="d-flex flex-column gap-5">
          <div class="d-flex justify-content-between">
            <div class="icon-style">
              <v-icon class="mdi mdi-cash" size="large" color="white"></v-icon>
            </div>
            <v-btn-toggle v-model="toggle" variant="text" class="button">
              <v-btn size="small" class="button-style" :value="'Today'">Today</v-btn>
              <v-btn size="small" class="button-style" :value="'Monthly'">Monthly</v-btn>
            </v-btn-toggle>
          </div>
          <div class="d-flex flex-column">
            <p class="text-style"><v-icon class="mdi mdi-currency-inr" size="24" color="white"></v-icon>12400</p>
            <p class="text-type">Total Earning</p>
          </div>
        </div>
      </div>
    </v-card>
    <v-card height="160" width="359" class="rounded-3">
      <v-img src="@/assets/Block2.png" class="card-style"></v-img>
      <div style="height: 128px; width: 327px;" class="subcard">
        <div class="d-flex flex-column gap-5">
          <div class="d-flex justify-content-between">
            <div class="icon-style card2">
              <v-icon class="mdi mdi-ticket-confirmation" size="large" color="white"></v-icon>
            </div>
            <v-btn-toggle v-model="toggle1" variant="text" class="button button2">
              <v-btn size="small" class="button-style" :value="'Today'">Today</v-btn>
              <v-btn size="small" class="button-style" :value="'Monthly'">Monthly</v-btn>
            </v-btn-toggle>
          </div>
          <div class="d-flex flex-column">
            <p class="text-style">215</p>
            <p class="text-type">Total Ticket</p>
          </div>
        </div>
      </div>
    </v-card>
    <div class="d-flex flex-column gap-3">
      <v-card height="72" width="359" class="rounded-3">
        <v-img src="@/assets/Block3.png" class="card-style"></v-img>
        <div style="height: 40px; width: 140px;" class="subcard">
          <div class="d-flex gap-2">
            <div class="icon-style card3 mt-2">
              <v-icon class="mdi mdi-cash" size="large" color="white"></v-icon>
            </div>
            <div class="d-flex flex-column">
              <p class="text-white mb-0"><v-icon class="mdi mdi-currency-inr" size="16" color="white"></v-icon>426728
              </p>
              <p class="text-type mt-0">Yearly Income</p>
            </div>
          </div>
        </div>
      </v-card>
      <v-card height="72" width="359" class="rounded-3">
        <v-img src="@/assets/Block4.png" class="card-style"></v-img>
        <div style="height: 40px; width: 140px;" class="subcard">
          <div class="d-flex gap-2">
            <div class="icon-style card4 mt-2">
              <v-icon class="mdi mdi-ticket-confirmation" size="large" color="white"></v-icon>
            </div>
            <div class="d-flex flex-column">
              <p class="text-white mb-0">8928</p>
              <p class="text-type mt-0">Yearly Tickets</p>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
  <div class="d-flex flex-wrap justify-content-between gap-3 mt-4">
    <v-card height="420" width="741" class="rounded-3 p-3">
      <div class="d-flex justify-content-between px-3 mt-1">
        <p class="mt-2">Total visitors: 8928</p>
        <v-select :items="['2024', '2023', '2022']" density=compact class="year-select" v-model="year"></v-select>
      </div>
      <BarChart />
    </v-card>
    <v-card height="420" width="358" class="rounded-3 d-flex justify-content-center flex-column align-items-center ">
      <div class="d-flex justify-content-between w-100 px-4 mt-1 mb-4">
        <p class="mt-2">Total visitors: 8928</p>
        <v-select :items="['2024', '2023', '2022']" density=compact class="year-select" v-model="year1"></v-select>
      </div>
      <PieChart />
    </v-card>
  </div>
  <v-card class="mt-4">
    <TicketTable />
  </v-card>

</template>

<script>
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';
import TicketTable from './TicketTable.vue';
export default {
  mounted() {
    document.body.style.backgroundColor = '#D7E8CD';
  },
  beforeUnmount() {
    // Reset the background color when the component is destroyed
    document.body.style.backgroundColor = '';
  },
  components: {
    BarChart, PieChart, TicketTable
  },
  data() {
    return {
      toggle: 'Today',
      toggle1: 'Today',
      year: '2024',
      year1: '2024'
    }
  }
};
</script>

<style scoped>
body {
  background-color: aqua;
}

.card-style {
  position: relative;
  background-size: cover;
  background-position: center
}

.subcard {
  position: absolute;
  top: 16px;
  left: 16px;
  /* background-color: aqua; */
}

.icon-style {
  background-color: #67898B;
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-style.card2 {
  background-color: #7C8777;
}

.icon-style.card3 {
  background-color: #568F4E;
}

.button-style {
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 400;
}

:deep(.button.v-btn-group) {
  height: 24px;
}

:deep(.button .v-btn--active) {
  background-color: #BCEBEE;
  color: black;
}

:deep(.button2 .v-btn--active) {
  background-color: #D7E8CD;
}

:deep(.v-input__control) {
  width: 100px;
  border: 1px solid black;
  height: 32px;
  align-items: center;
}

:deep(.v-field) {
  height: 32px;
}

:deep(.year-select.v-input--horizontal) {
  display: flex;
  justify-content: end;
}

.button-style {
  text-transform: capitalize;
  color: white
}

.text-style {
  color: white;
  font-family: Arial;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  letter-spacing: 0.0015em;
  text-align: left;
  margin-bottom: 0;
}

.text-type {
  color: white;
  font-family: Arial;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.0015em;
  text-align: left;

}

:deep(.v-input__details) {
  display: none;
}
</style>
<template>
  <v-main style="background-color: #D7E8CD;">
    <v-container class="py-8 px-6" fluid>
      <div class="d-flex gap-md-4 gap-2 container px-0 flex-wrap justify-content-md-start justify-content-center ms-5">
        <div class="d-flex flex-xl-row flex-column gap-md-4 gap-2 flex-wrap">
          <v-card height="160" width="359" class="rounded-3">
            <v-img src="@/assets/Block1.png" class="card-style"></v-img>
            <div style="height: 128px; width: 327px;" class="subcard">
              <div class="d-flex flex-column gap-5">
                <div class="d-flex button-toggle">
                  <div class="icon-style">
                    <v-icon class="mdi mdi-cash" size="large" color="white"></v-icon>
                  </div>
                  <v-btn-toggle v-model="toggle" variant="text" class="button">
                    <v-btn size="small" class="button-style" :value="'Today'" @click="fetchIncomeDate">Today</v-btn>
                    <v-btn size="small" class="button-style" :value="'Monthly'"
                      @click="fetchIncomeMonth">Monthly</v-btn>
                  </v-btn-toggle>
                </div>
                <div class="d-flex flex-column">
                  <p class="text-style"><v-icon class="mdi mdi-currency-inr" size="24" color="white"></v-icon>{{
                    dailyIncome
                    }}
                  </p>
                  <p class="text-type">Total Earning</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card height="160" width="359" class="rounded-3">
            <v-img src="@/assets/Block2.png" class="card-style"></v-img>
            <div style="height: 128px; width: 327px;" class="subcard">
              <div class="d-flex flex-column gap-5">
                <div class="d-flex button-toggle">
                  <div class="icon-style card2">
                    <v-icon class="mdi mdi-ticket-confirmation" size="large" color="white"></v-icon>
                  </div>
                  <v-btn-toggle v-model="toggle1" variant="text" class="button button2">
                    <v-btn size="small" class="button-style" :value="'Today'" @click="fetchTicketDate">Today</v-btn>
                    <v-btn size="small" class="button-style" :value="'Monthly'"
                      @click="fetchTicketMonth">Monthly</v-btn>
                  </v-btn-toggle>
                </div>
                <div class="d-flex flex-column">
                  <p class="text-style">{{ dailyTickets }}</p>
                  <p class="text-type">Total Bookings</p>
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <div class="d-flex flex-column flex-wrap gap-3">
          <v-card height="72" width="359" class="rounded-3">
            <v-img src="@/assets/Block3.png" class="card-style"></v-img>
            <div style="height: 40px; width: 240px;" class="subcard">
              <div class="d-flex gap-2">
                <div class="icon-style card3 mt-2">
                  <v-icon class="mdi mdi-cash" size="large" color="white"></v-icon>
                </div>
                <div class="d-flex flex-column">
                  <p class="text-white mb-0 text-style py-0"><v-icon class="mdi mdi-currency-inr" size="16"
                      color="white"></v-icon>{{cumulativeIncome}}
                  </p>
                  <p class="text-type mt-0 py-0">Cumulative Income</p>
                </div>
              </div>
            </div>
          </v-card>
          <v-card height="72" width="359" class="rounded-3">
            <v-img src="@/assets/Block4.png" class="card-style"></v-img>
            <div style="height: 40px; width: 240px;" class="subcard">
              <div class="d-flex gap-2">
                <div class="icon-style card4 mt-2">
                  <v-icon class="mdi mdi-ticket-confirmation" size="large" color="white"></v-icon>
                </div>
                <div class="d-flex flex-column">
                  <p class="text-white mb-0 text-style py-0">{{cumulativeTickets}}</p>
                  <p class="text-type mt-0 py-0">Cumulative Bookings</p>
                </div>
              </div>
            </div>
          </v-card>
        </div>
      </div>
      <div class="d-flex flex-wrap  gap-4 mt-4 ms-5">
        <v-card height="430" width="741" max-width="100%" class="rounded-3 p-3">
          <div class="d-flex justify-content-between px-3 mt-1">
            <div>
              <p class=" my-0">Total income:
                &#8377;{{ yearlyIncome }}</p>
              <p class="my-0">Total tickets : {{yearlyTickets }}</p>
            </div>
            <!-- <v-select :items="['2024', '2023', '2022']" density=compact class="year-select" v-model="year"></v-select> -->
            <h6>Current Year: {{ currentYear }}</h6>
            <!-- <v-btn-toggle v-model="toggleBar" variant="text" class="button">
          <v-btn size="small" class=" barbtn" :value="'Current'" @click="fetchIncomeDate">Current</v-btn>
          <v-btn size="small" class=" barbtn" :value="'Cumulative'" @click="fetchIncomeMonth">Cumulative</v-btn>
        </v-btn-toggle> -->
          </div>
          <div v-if="!barError">
            <template v-if="dataBar.length === 0 || data2Bar.length === 0">
              <div class=" d-flex flex-column align-items-center justify-content-center">
                <v-icon class=" mdi mdi-alert-circle-outline" color="success" size="48"></v-icon>
                <h6 class="my-0">No data available.</h6>
              </div>
            </template>
            <template v-else>
              <BarChart :labels="labelsBar" :data="dataBar" :data2="data2Bar" />
            </template>
          </div>
          <div v-else class="mt-5">
            <div class="d-flex flex-column align-items-center justify-content-center pt-3">
              <v-icon class="mdi mdi-alert-outline" color="danger" size="50"></v-icon>
              <h4 class="my-0 text-wrap text-center">{{ errorBar }}</h4>
              <p class="mt-0">Please try again later.</p>
              <v-btn variant="outlined" size="small" color="#1A237E" class="text-capitalize" prepend-icon="mdi-reload"
                @click="fetchBarChart">Retry</v-btn>
            </div>
          </div>
        </v-card>
        <v-card height="430" width="358" class="rounded-3 px-3">
          <div class="d-flex justify-content-between align-items-center">
            <p class="mt-2 ">Scanned Visitors: {{scannedVisitors}}</p>
            <v-btn-toggle v-model="togglePie" variant="text" class="button">
              <v-btn size="small" class=" barbtn" :value="'Today'" @click="fetchPieChart">Today</v-btn>
              <v-btn size="small" class=" barbtn" :value="'All'" @click="fetchPieChartAll">All</v-btn>
            </v-btn-toggle>
          </div>

          <div class="d-flex flex-column align-items-centers justify-content-center" style="height: 300px;">
            <div v-if="!pieError">

              <template v-if="dataPie.length === 0 || dataPie.every(value => value === 0)">
                <div class=" d-flex flex-column align-items-center justify-content-center">
                  <v-icon class=" mdi mdi-alert-circle-outline" color="success" size="48"></v-icon>
                  <h6 class="my-0">No data available.</h6>
                </div>
              </template>
              <template v-else>
                <div class="d-flex mt-1 mb-4">

                  <!-- <v-select :items="['2024', '2023', '2022']" density=compact class="year-select"
                v-model="year1"></v-select> -->
                </div>
                <PieChart :labels="labelsPie" :data="dataPie" />
              </template>
            </div>
            <div v-else>
              <div class=" d-flex flex-column align-items-center">
                <v-icon class=" mdi mdi-alert-outline" color="danger" size="48"></v-icon>
                <h5 class="my-0 text-wrap text-center">{{ errorPie }}</h5>
                <p class="mt-0">Please try again later.</p>
                <v-btn variant="outlined" size="small" color="#1A237E" class="text-capitalize" prepend-icon="mdi-reload"
                  @click="togglePie === 'Today' ? fetchPieChart : fetchPieChartAll">Retry</v-btn>
              </div>
            </div>
          </div>

        </v-card>
      </div>
      <v-card class="mt-4 ms-5 me-4">
        <TicketTable />
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
import BarChart from './BarChart.vue';
import PieChart from './PieChart.vue';
import TicketTable from './TicketTable.vue';
export default {
  components: {
    BarChart, PieChart, TicketTable
  },
  data() {
    return {
      toggle: 'Today', toggle1: 'Today', toggleBar: 'Current', togglePie: 'Today',
      year: '2024', year1: '2024',
      barError: false, pieError: false, bar2Error: false,
      currentDay: '',
      currentMonth: '',
      currentYear: '',
      errorPie: '',
      errorBar: '',
      monthNames : ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 'September', 'October', 'November', 'December']
    }
  },
  computed: {
    labelsPie() {
      return this.$store.getters.getPieLabel;
    },
    labelsBar() {
      return this.$store.getters.getBarLabel;
    },
    dataPie() {
      return this.$store.getters.getPieData;
    },
    dataBar() {
      return this.$store.getters.getBarData;
    },
    data2Bar() {
      return this.$store.getters.getBarData2;
    },
    cumulativeTickets() { 
      return this.$store.getters.getTotalTicket;
    },
    yearlyTickets() {
      return this.$store.getters.getBarTotal2/100;
    },
    dailyTickets() {
      return this.$store.getters.getDailyTicket;
    },
    cumulativeIncome() { 
      return this.$store.getters.getTotalIncome;
    },
    yearlyIncome() {
      return this.$store.getters.getBarTotal;
    },
    dailyIncome() {
      return this.$store.getters.getDailyIncome;
    },
    scannedVisitors() {
      return this.$store.getters.getPieTotal;
    }
  },
  methods: {
    async fetchPieChart() {
      this.pieError = false;
      try {
        const formattedDate = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`; 
        await this.$store.dispatch('fetchPieChartDate', formattedDate)
      }
      catch (error) {
        console.error(error);
        this.errorPie = error.message;
        this.pieError = true;
      }
    },
    async fetchPieChartAll() {
      this.pieError = false;
      try {
        await this.$store.dispatch('fetchPieChartVisited')
      }
      catch (error) {
        console.error(error);
        this.errorPie = error.message;
        this.pieError = true;
      }
},
    async fetchBarChart() {
      this.barError = false;
      try {
        await this.$store.dispatch('totalIncomeBarGraph', this.currentYear)
      }
      catch (error) {
        console.error(error);
        this.errorBar = error.message;
        this.barError = true
      }
    },
    async fetchBarChartTickets() {
      this.bar2Error = false;
      try {
        await this.$store.dispatch('totalTicketsBarGraph', this.currentYear)
      }
      catch (error) {
        console.error(error);
        //this.bar2Error = true
      }
    },
   
    async fetchTotalTickets() {
      try {
        await this.$store.dispatch('totalTickets')
      }
      catch (error) {
        console.error(error.message);
      }
    },
    async fetchTotalIncome() {
      try {
        await this.$store.dispatch('totalIncome')
      }
      catch (error) {
        console.error(error.message);
      }
    },
    async fetchIncomeDate() {
      try {
        const formattedDate = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
        await this.$store.dispatch('fetchIncomeByDate', formattedDate)
      }
      catch (error) {
        console.error(error);
      }
    },
    async fetchIncomeMonth() {
      try {
        const index = parseInt(this.currentMonth, 10);
        const month = this.monthNames[index - 1];
        const payload = {
          year: this.currentYear,
          month: month
        }
        await this.$store.dispatch('fetchIncomeByMonth', payload);
      }
      catch (error) {
        console.error(error);
      }
    },
    async fetchTicketDate() {
      try {
        const formattedDate = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
        await this.$store.dispatch('fetchTicketByDate', formattedDate)
      }
      catch (error) {
        console.error(error);
      }
    },
    async fetchTicketMonth() {
      try {
        const index = parseInt(this.currentMonth, 10);
        const month = this.monthNames[index - 1];
        await this.$store.dispatch('fetchTicketByMonth', {
          year: this.currentYear,
          month: month
        });
      }
      catch (error) {
        console.error(error);
      }
    },
  },
  // mounted() {
  //   document.body.style.backgroundColor = '#D7E8CD';
  // },
  // beforeUnmount() {
  //   document.body.style.backgroundColor = '';
  // },
  created() {
    const today = new Date();
    this.currentDay = String(today.getDate()).padStart(2, '0');
    this.currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    this.currentYear = today.getFullYear();
    this.fetchIncomeDate();
    this.fetchTicketDate();
    this.fetchTotalTickets();
    this.fetchTotalIncome();
    this.fetchPieChart();
    this.fetchBarChart();
    this.fetchBarChartTickets();
  },
};
</script>

<style scoped>
/* body {
  background-color: aqua;
} */

.card-style {
  position: relative;
  background-size: cover;
  background-position: center
}

.subcard {
  position: absolute;
  top: 10px;
  left: 16px;
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
.barbtn{
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 400;
  color: black;
}

:deep(.button.v-btn-group) {
  height: 24px;
}

:deep(.button .v-btn--active) {
  background-color: #BCEBEE;
  color: black;
}
:deep(.barbtn.v-btn--active) {
  background-color: #BCEBEE;
  /* color: white; */
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
:deep(.v-btn__prepend){
  margin-right: 0;
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
.button-toggle{
  justify-content: space-between !important;
}
@media (max-width: 1261px) {
  .cumulative-income-cards {
    flex-direction: row !important;
    flex-wrap: wrap;
  }
}
</style>
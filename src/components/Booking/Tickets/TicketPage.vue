<template>
  <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
  <v-container class="py-4 px-0" fluid v-else>
    <div class="d-flex justify-content-between mb-3">
      <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" class="search" density="compact"
        @click="search"></v-text-field>
      <v-spacer></v-spacer>
      <v-select v-model="sortColumn" :items="category" density="compact" item-title="category" item-value="id"
        prepend-inner-icon="mdi-sort-variant" label="Sort by" class="sort"></v-select>
    </div>
    <v-data-table :headers="headers" :items="filteredTickets" style="background-color: #f9faf1;" max-width="100%"
    item-value="ticketId" :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }" items-per-page="10">
    <template v-slot:item='{ item, index }'>
        <tr style="background-color:#FCFDF6; color:black;">
          <td class="text-center">
            {{ index + 1 }}
          </td>
          <td>
            {{ item.ticketId }}
          </td>

          <td>
            {{ item.visitDate }}
          </td>
          <td>
            {{ formatTime(item.slotTime) }}
          </td>
          <td class="text-start " style="text-transform: capitalize;">
            {{ item.categoryName }}
          </td> 
          <td>
            Rs.{{ item.grandTotal }}/-
          </td>
          <td class="text-center"><v-icon size="20" color="blue-grey-darken-3" class="mdi mdi-eye"
              @click="showDetails(item)"></v-icon>
          </td>
        </tr>
      </template>
  </v-data-table>
  <v-dialog v-model="dialog" width="400px">
      <v-card style="width: 600px; height:560px; border-radius: 16px;">
        <v-card-title class="d-flex justify-content-between px-4 align-items-center"
          style="background-color: #216D17; color: #FFFFFF;">
          <h5 class="mt-2">Ticket Details</h5>
          <v-icon @click="close" class="mdi mdi-window-close" size="20"></v-icon>
        </v-card-title>
        <v-card-text class="ticket-details">
          <v-row>
            <v-col col="3">
              {{
              viewItem.categoryName === 'Institution' ? 'Institution Name' : 'Name' }}
            </v-col>
            <v-col col="5">:{{ viewItem.categoryName === 'Institution' ? viewItem.name : viewItem.name
              }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Mobile Number
            </v-col>
            <v-col col="5">:{{ viewItem.phNumber }}</v-col>
          </v-row>
          <!-- <v-row>
            <v-col col="3">
              Email
            </v-col>
            <v-col col="5">:{{ viewItem.email }}</v-col>
          </v-row> -->
          <v-row>
            <v-col col="3">
              Ticket ID
            </v-col>
            <v-col col="5">:{{ viewItem.ticketId }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Booking date
            </v-col>
            <v-col col="5">:{{ viewItem.visitDate }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Entry date
            </v-col>
            <v-col col="5">:{{ viewItem.visitDate }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Slot
            </v-col>
            <v-col col="5">:{{ formatTime(viewItem.slotTime) }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Category
            </v-col>
            <v-col col="5" class="text-capitalize">:{{ viewItem.categoryName }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              {{
              viewItem.categoryName === 'Institution' ? 'Teachers' : 'Adults' }}
            </v-col>
            <v-col col="5">:{{ viewItem.categoryName === 'Institution' ? viewItem.teacherCount :
              viewItem.adultCount
              }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              {{
              viewItem.categoryName === 'Institution' ? 'Students' : 'Children' }}
            </v-col>
            <v-col col="5">:{{ viewItem.categoryName === 'Institution' ? viewItem.studentCount :
              viewItem.childCount
              }}</v-col>
          </v-row>
          <v-row v-if="viewItem.categoryName === 'Public'">
            <v-col col="3">
              Senior Citizen
            </v-col>
            <v-col col="5">:{{ viewItem.seniorCitizenCount }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">
              Total amount
            </v-col>
            <v-col col="5">:&#8377;{{ viewItem.grandTotal }}</v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>

</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      skeleton: true,
      dialog: false,
      sortColumn: '',
      viewItem: [],
      viewIndex: -1,
      search: '',
      headers: [
        { title: 'Sl No.', sortable: false, align: 'center' },
        { title: 'Ticket ID', align: 'start', sortable: false, key: 'ticketId' },
        { title: 'Entry Date', sortable: true, key: 'visitDate', align: 'start' },
        { title: 'Time', sortable: false, key: 'slotTime', align: 'start' },
        { title: 'Category', sortable: false, key: 'categoryName', align: 'start' },
        { title: 'Price', sortable: false, key: 'grandTotal', align: 'start' },
        { title: 'Details', sortable: false, align: 'center', key: 'detail' },
      ],
    }
  },
  // mounted(){
  //   console.log("Table details",this.tickets)
  // },
  methods: {
    showDetails(item) {
      this.viewIndex = this.tickets.indexOf(item)
      this.viewItem = Object.assign({}, item)
      this.dialog = true
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12;
      hoursInt = hoursInt ? hoursInt : 12; // Handle midnight (0 hours)
      return `${hoursInt}:${minutes} ${ampm}`;
    },

    close() {
      this.dialog = false;
    },
    async fetchTickets() {
      const payload = 1;
      try {
        const res = await this.$store.dispatch('booking/fetchTickets', payload);
        if (res) {
          this.skeleton = false;
        }
      }
      catch (error) {
        console.error(error.message);
      }
    },
    async fetchCategory() {
      try {
        await this.$store.dispatch('booking/fetchCategory')
        }
      catch (error) {
        console.error(error)
      }
    },
  },
  computed: {
    ...mapGetters('booking', ['getTickets','getCategory']),
    // filteredTickets() {
    //   let uniqueTickets = [];
    //   if (this.sortColumn && this.sortColumn !== 'All') {
    //     uniqueTickets = this.tickets.filter(ticket => ticket.category.toLowerCase() === this.sortColumn.toLowerCase());

    //   } else {
    //     uniqueTickets = this.tickets;
    //   }

    //   if (this.search !== '') {
    //     uniqueTickets = uniqueTickets.filter((item) =>
    //       (item.visitDate?.toLowerCase()?.includes(this.search.toLowerCase()) || '') ||
    //       (item.type?.toLowerCase()?.includes(this.search.toLowerCase()) || '') ||
    //       (item.ticketId?.toLowerCase()?.includes(this.search.toLowerCase()) || '')
    //     );
       
    //   }

    //   return uniqueTickets;

    // },
    filteredTickets() {
      // Filters ticketsData based on the ticketId including the search term
      return this.tickets.filter(item =>
        item.ticketId.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    tickets() {
      return this.getTickets;
    },
    category() {
      return this.getCategory;
    },
  },
  created() {
    this.fetchTickets();
  },
  mounted() {
    this.fetchCategory();
  },
  watch: {
    async sortColumn(value) {
      console.log("watcher", value)
      if(value) {
        const payload = value;
      try {
        const res = await this.$store.dispatch('booking/fetchTickets', payload);
        if (res) {
          this.skeleton = false;
        }
      }
      catch (error) {
        console.error(error.message);
      }
      }
    }
  }
 
};
</script>

<style scoped>
:deep(.search.v-input) {
  display: flex;
  justify-content: start;
}
:deep(.sort.v-input) {
  display: flex;
  justify-content: end;
}
:deep(.v-input__details) {
  display: none;
}
:deep(.search .v-input__control),
:deep(.sort .v-input__control) {
  width: 200px !important;
  height: 40px !important;
  background-color: #DFE4D7 !important;
  border-bottom: 2px solid #216D17;
}
:deep(.v-pagination__list .v-btn--variant-plain) {
  opacity: 1;
  background-color: #216D17;
  color: #FCFDF6;
}
:deep(.v-pagination__list .v-btn--disabled) {
  opacity: 0.4;
}
.ticket-details .v-col {
  padding: 8px;
}
:deep(.v-overlay__scrim){
  background: #0c070775;
}
</style>

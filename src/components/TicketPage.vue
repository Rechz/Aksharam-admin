<template>
  <div class="d-flex justify-content-between mb-3">
    <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" class="search" density="compact"
      @click="search"></v-text-field>
    <v-spacer></v-spacer>
    <v-select v-model="sortColumn" :items="['All', 'Public', 'Institution', 'Foreigner']" density="compact"
      prepend-inner-icon="mdi-sort-variant" label="Sort by" class="sort"></v-select>
  </div>
  <v-data-table :headers="headers" :items="filteredTickets" style="background-color: #f9faf1;" max-width="100%"
    :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
    <template v-slot:item='{ item, index }'>
      <v-dialog v-model="dialog" width="400px">
        <v-card style="width: 600px; height:513px; border-radius: 16px;">
          <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: #FFFFFF;">
            <h4>Ticket Details</h4>
            <v-icon @click="close" class="mdi mdi-window-close"></v-icon>
          </v-card-title>
          <v-card-text class="ticket-details">
            <v-row>
              <v-col col="3">
                {{
      viewItem.type === 'institution' ? 'Institution Name' : 'Name' }}
              </v-col>
              <v-col col="5">:{{ viewItem.type === 'institution' ? viewItem.institutionName : viewItem.name }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                Mobile Number
              </v-col>
              <v-col col="5">:{{ viewItem.mobileNumber }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                Email
              </v-col>
              <v-col col="5">:{{ viewItem.email }}</v-col>
            </v-row>
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
              <v-col col="5">:{{ viewItem.bookDate }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                Entry date
              </v-col>
              <v-col col="5">:{{ viewItem.visitDate }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                Category
              </v-col>
              <v-col col="5" class="text-capitalize">:{{ viewItem.type }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                {{
      viewItem.type === 'institution' ? 'Teachers' : 'Adults' }}
              </v-col>
              <v-col col="5">:{{ viewItem.type === 'institution' ? viewItem.numberOfTeachers : viewItem.numberOfAdults
                }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                {{
      viewItem.type === 'institution' ? 'Students' : 'Children' }}
              </v-col>
              <v-col col="5">:{{ viewItem.type === 'institution' ? viewItem.numberOfStudents : viewItem.numberOfChildren
                }}</v-col>
            </v-row>
            <v-row v-if="viewItem.type === 'public'">
              <v-col col="3">
                Senior Citizen
              </v-col>
              <v-col col="5">:{{ viewItem.numberOfSeniors }}</v-col>
            </v-row>
            <v-row>
              <v-col col="3">
                Total amount
              </v-col>
              <v-col col="5">:&#8377;{{ viewItem.totalPrice }}</v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
      <tr style="background-color:#FCFDF6; color:black;">
        <td class="text-center">
          {{ index + 1 }}
        </td>
        <td>
          {{ item.ticketId }}
        </td>
        <td>
          {{ item.bookDate }}
        </td>

        <td>
          {{ item.visitDate }}
        </td>
        <td class="text-start " style="text-transform: capitalize;">
          {{ item.type }}
        </td>
        <td>
          Rs.{{ item.totalPrice }}/-
        </td>
        <td class="text-center"><v-icon size="20" color="blue-grey-darken-3" class="mdi mdi-eye"
            @click="showDetails(item)"></v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      sortColumn: '',
      viewItem: [],
      viewIndex: -1,
      search: '',
      headers: [
        { title: 'Sl No.', sortable: false, align: 'center' },
        { title: 'Ticket ID', align: 'start', sortable: false, key: 'ticketId' },
        { title: 'Booking Date', sortable: false, key: 'bookDate', align: 'start' },
        { title: 'Entry Date', sortable: false, key: 'visitDate', align: 'start' },
        { title: 'Category', sortable: false, key: 'type', align: 'start' },
        { title: 'Price', sortable: false, key: 'totalPrice', align: 'start' },
        { title: 'Details', sortable: false, align: 'center', key: 'detail' },
      ],
    }
  },
  methods: {
    showDetails(item) {
      this.viewIndex = this.filteredTickets.indexOf(item)
      this.viewItem = Object.assign({}, item)
      this.dialog = true
    },
    close() {
      this.dialog = false;
    },
    async fetchTickets() {
      try {
        await this.$store.dispatch('fetchAllTickets');
      }
      catch (error) {
        console.error(error.message);
      }
    }
  },
  computed: {
    filteredTickets() {
      if (this.sortColumn && this.sortColumn !== 'All') {
        return this.tickets.filter(ticket => ticket.type.toLowerCase() === this.sortColumn.toLowerCase());
      }
      if (this.search !== '') {
        return this.tickets.filter((item) =>
        (item.visitDate?.toLowerCase()?.includes(this.search.toLowerCase()) || '') ||
    (item.type?.toLowerCase()?.includes(this.search.toLowerCase()) || '') ||
    (item.ticketId?.toLowerCase()?.includes(this.search.toLowerCase()) || '')
        );
      }
      else {
        return this.tickets;
      }
    },
    tickets() {
      return this.$store.getters.getAllTickets;
    }
  },
  created() {
    this.fetchTickets();
  },
};
</script>

<style scoped>
.v-table {
  width: 76vw;
}

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

/* :deep(.v-data-table-header__content) {
  padding-left: 5px;
} */
</style>

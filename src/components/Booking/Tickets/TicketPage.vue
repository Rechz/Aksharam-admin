<template>
  
  <v-container class="py-4 px-0" fluid >
    <div class="d-flex justify-content-between mb-3">
      <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" class="search" density="compact"
        @click="search"></v-text-field>
      <v-spacer></v-spacer>
      <v-select v-model="sortColumn" :items="category" density="compact" item-title="category" item-value="id"
        prepend-inner-icon="mdi-sort-variant" label="Sort by" class="sort"></v-select>
    </div>
    <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
    <v-data-table v-else :headers="headers" :items="filteredTickets" style="background-color: #f9faf1;" max-width="100%"
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
           <div class="d-flex align-center ml-auto">
            <v-icon class="me-3" @click="printTicket">mdi-printer</v-icon>
            <v-icon @click="close" size="20">mdi-window-close</v-icon>
          </div>
        </v-card-title>
         <!-- <v-icon end class="ms-5">mdi-printer</v-icon> -->
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
    
    <!-- Hidden div for ticket printing -->
    <div id="ticket-print" ref="ticketPrint" style="display: none;">
      <div style="width: 300px; padding: 20px; font-family: Arial, sans-serif; background-color: white;">
        <div style="text-align: center; margin-bottom: 15px;">
          <h2 style="margin: 0; font-size: 24px;">അക്ഷരം</h2>
          <p style="margin: 5px 0; font-size: 14px;">Museum of Letters, Literature and Culture</p>
          <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
        </div>
        
        <div style="text-align: center; margin-bottom: 10px;">
          <p style="margin: 5px 0;">{{ viewItem.ticketCount }} Ticket(s)</p>
          <template v-if="viewItem.categoryName === 'Institution'">
            <p style="margin: 5px 0;">Teachers: {{ viewItem.teacherCount }}</p>
            <p style="margin: 5px 0;">Students: {{ viewItem.studentCount }}</p>
          </template>
          <template v-else>
            <p style="margin: 5px 0;">Adults: {{ viewItem.adultCount || 0 }}</p>
            <p style="margin: 5px 0;">Children: {{ viewItem.childCount || 0 }}</p>
            <p v-if="viewItem.categoryName === 'Public'" style="margin: 5px 0;">Senior Citizens: {{ viewItem.seniorCitizenCount || 0 }}</p>
          </template>
        </div>
        
        <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
        
        <div style="text-align: center; margin-bottom: 15px;">
          <div style="margin: 10px auto; width: 100px; height: 100px; background-color: #f0f0f0; display: flex; justify-content: center; align-items: center;">
            <!-- QR code placeholder -->
            <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" style="max-width: 100%; max-height: 100%;" />
            <p v-else>{{ viewItem.ticketId }}</p>
          </div>
          <p style="margin: 5px 0; font-weight: bold;">{{ viewItem.ticketId }}</p>
          <p style="margin: 5px 0;">Order ID: {{ viewItem.orderId || 'N/A' }}</p>
        </div>
        
        <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
        
        <div style="text-align: center;">
          <p style="margin: 5px 0;">Total Amount: Rs.{{ viewItem.grandTotal }}/-</p>
          <p style="margin: 5px 0;">Thank you visit again.</p>
          <p style="margin: 5px 0; font-size: 12px;">www.aksharammuseum.com</p>
        </div>
      </div>
    </div>
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
      qrCodeUrl: null,
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
  methods: {
    showDetails(item) {
      this.viewIndex = this.tickets.indexOf(item);
    this.viewItem = Object.assign({}, item);
    this.dialog = true;

    // ✅ Always generate QR when opening details
    this.generateQRCode(item.ticketId);
    console.log("QR generated for Ticket:", item.ticketId, " => ", this.qrCodeUrl);
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
      this.qrCodeUrl = null;
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
    // Generate QR code for ticket ID
    generateQRCode(ticketId) {
      // Using Google Charts API to generate QR code
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(ticketId)}&size=200x200`;
      console.log("QR Code URL:", this.qrCodeUrl);
      // this.qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chl=${encodeURIComponent(ticketId)}&chs=200x200&chld=L|0`;
    },
    // Print ticket function
    printTicket() {
    const printContent = this.$refs.ticketPrint.innerHTML;
    const printWindow = window.open('', '_blank');

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <style>
            body { margin: 0; padding: 0; }
            @media print {
              @page { margin: 0; size: 80mm 200mm; }
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Wait for QR to load in new window
    const qrImage = printWindow.document.querySelector("img");
    if (qrImage) {
      qrImage.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }, 1200);
    } else {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
  },
  computed: {
    ...mapGetters('booking', ['getTickets','getCategory']),
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
      this.skeleton = true;
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

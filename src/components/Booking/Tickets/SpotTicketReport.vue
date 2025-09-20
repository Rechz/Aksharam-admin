<template>
    <v-main>
  <v-container class="py-4 px-0" fluid>
    <!-- Date Range Selection -->
    <div class="d-flex align-center mb-4">
      <v-row>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="startDate"
            label="Start Date"
            type="date"
            density="compact"
            class="date-input"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="endDate"
            label="End Date"
            type="date"
            density="compact"
            class="date-input"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="selectedCategory"
            :items="categoryOptions"
            label="Category"
            density="compact"
            item-title="category"
            item-value="id"
            class="category-select"
          ></v-select>
        </v-col>
        <v-col cols="12" md="2">
          <v-select
            v-model="selectedPaymentMode"
            :items="paymentModeOptions"
            label="Payment Mode"
            density="compact"
            item-title="paymentType"
            item-value="id"
            class="payment-mode-select"
          ></v-select>
        </v-col>
        <v-col cols="12" md="4" class="d-flex">
          <v-btn
            color="#216D17"
            class="text-white me-2"
            @click="fetchReportData"
            :loading="loading"
          >
            Search
          </v-btn>
          <v-btn
            color="#216D17"
            class="text-white"
            @click="exportToExcel"
            :disabled="!hasData"
          >
            <v-icon>mdi-microsoft-excel</v-icon>
            Export
          </v-btn>
        </v-col>
      </v-row>
    </div>

    <!-- Loading Skeleton -->
    <v-skeleton-loader v-if="loading" type="table"></v-skeleton-loader>

    <!-- Data Table -->
    <v-data-table
      v-else
      :headers="headers"
      :items="filteredTickets"
      style="background-color: #f9faf1;"
      max-width="100%"
      item-value="ticketId"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }"
      items-per-page="10"
    >
      <template v-slot:item="{ item, index }">
        <tr style="background-color:#FCFDF6; color:black;">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item.ticketId }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phNumber }}</td>
          <td>{{ item.visitDate }}</td>
          <td>{{ formatTime(item.slotTime) }}</td>
          <td class="text-start" style="text-transform: capitalize;">{{ item.categoryName || 'N/A' }}</td>
          <td>{{ item.categoryName === 'Institution' ? item.teacherCount || 0 : item.adultCount || 0 }}</td>
          <td>{{ item.categoryName === 'Institution' ? item.studentCount || 0 : item.childCount || 0 }}</td>
          <td>{{ item.seniorCitizenCount || 0 }}</td>
          <td>Rs.{{ item.grandTotal }}/-</td>
          <td>{{ item.paymentModeName }}</td>
          <td class="text-center">
            <v-icon
              size="20"
              color="blue-grey-darken-3"
              class="mdi mdi-eye"
              @click="showDetails(item)"
            ></v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- No Data Message -->
    <div v-if="!loading && filteredTickets.length === 0" class="text-center py-5">
      <p>No data found for the selected date range.</p>
    </div>

    <!-- Ticket Details Dialog -->
    <v-dialog v-model="dialog" width="400px">
      <v-card style="width: 600px; height:560px; border-radius: 16px;">
        <v-card-title
          class="d-flex justify-content-between px-4 align-items-center"
          style="background-color: #216D17; color: #FFFFFF;"
        >
          <h5 class="mt-2">Ticket Details</h5>
          <div class="d-flex align-center ml-auto">
            <v-icon class="me-3" @click="printTicket">mdi-printer</v-icon>
            <v-icon @click="close" size="20">mdi-window-close</v-icon>
          </div>
        </v-card-title>
        <v-card-text class="ticket-details">
          <v-row>
            <v-col col="3">{{ viewItem.categoryName === 'Institution' ? 'Institution Name' : 'Name' }}</v-col>
            <v-col col="5">:{{ viewItem.name }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Mobile Number</v-col>
            <v-col col="5">:{{ viewItem.phNumber }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Ticket ID</v-col>
            <v-col col="5">:{{ viewItem.ticketId }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Booking date</v-col>
            <v-col col="5">:{{ viewItem.visitDate }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Entry date</v-col>
            <v-col col="5">:{{ viewItem.visitDate }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Slot</v-col>
            <v-col col="5">:{{ formatTime(viewItem.slotTime) }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Category</v-col>
            <v-col col="5" class="text-capitalize">:{{ viewItem.categoryName }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">{{ viewItem.categoryName === 'Institution' ? 'Teachers' : 'Adults' }}</v-col>
            <v-col col="5">:{{ viewItem.categoryName === 'Institution' ? viewItem.teacherCount : viewItem.adultCount }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">{{ viewItem.categoryName === 'Institution' ? 'Students' : 'Children' }}</v-col>
            <v-col col="5">:{{ viewItem.categoryName === 'Institution' ? viewItem.studentCount : viewItem.childCount }}</v-col>
          </v-row>
          <v-row v-if="viewItem.categoryName === 'Public'">
            <v-col col="3">Senior Citizen</v-col>
            <v-col col="5">:{{ viewItem.seniorCitizenCount }}</v-col>
          </v-row>
          <v-row>
            <v-col col="3">Total amount</v-col>
            <v-col col="5">:₹{{ viewItem.grandTotal }}</v-col>
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
  </v-main>
</template>

<script>
import { mapGetters } from 'vuex';
import * as XLSX from 'xlsx';

export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      selectedCategory: 0, // 0 for all categories
      selectedPaymentMode: 0, // 0 for all payment modes
      loading: false,
      dialog: false,
      viewItem: {},
      search: '',
      qrCodeUrl: null,
      headers: [
        { title: 'Sl No.', sortable: false, align: 'center' },
        { title: 'Ticket ID', align: 'start', sortable: false, key: 'ticketId' },
        { title: 'Name', align: 'start', sortable: false, key: 'name' },
        { title: 'Phone', align: 'start', sortable: false, key: 'phNumber' },
        { title: 'Visit Date', sortable: true, key: 'visitDate', align: 'start' },
        { title: 'Time', sortable: false, key: 'slotTime', align: 'start' },
        { title: 'Category', sortable: false, key: 'categoryName', align: 'start' },
        { title: 'Adults/Teachers', sortable: false, key: 'adultTeacherCount', align: 'start' },
        { title: 'Children/Students', sortable: false, key: 'childStudentCount', align: 'start' },
        { title: 'Senior', sortable: false, key: 'seniorCitizenCount', align: 'start' },
        { title: 'Price', sortable: false, key: 'grandTotal', align: 'start' },
        { title: 'Payment Mode', sortable: false, key: 'paymentModeName', align: 'start' },
        { title: 'Details', sortable: false, align: 'center', key: 'detail' },
      ],
      categoryOptions: [
        { id: 0, category: 'All Categories' },
        { id: 1, category: 'Public' },
        { id: 2, category: 'Institution' },
        { id: 3, category: 'Foreigner' },
      ],
      paymentModeOptions: [
        { id: 0, paymentType: 'All Payment Modes' },
      ],
    };
  },
  computed: {
    ...mapGetters('booking', ['getTicketsByDateRange', 'getCategory', 'getPaymentMode']),
    filteredTickets() {
      return this.getTicketsByDateRange || [];
    },
    hasData() {
      return this.filteredTickets && this.filteredTickets.length > 0;
    },
  },
  methods: {
    async fetchReportData() {
      if (!this.startDate || !this.endDate) {
        alert('Please select both start and end dates');
        return;
      }
      
      this.loading = true;
      try {
        const payload = {
          startDate: this.startDate,
          endDate: this.endDate,
          categoryId: this.selectedCategory,
          paymentModeId: this.selectedPaymentMode
        };
        
        await this.$store.dispatch('booking/fetchTicketsByDateRange', payload);
        this.loading = false;
      } catch (error) {
        console.error('Error fetching report data:', error);
        this.loading = false;
        alert('Failed to fetch report data. Please try again.');
      }
    },
    formatTime(timeString) {
      if (!timeString) return 'N/A';
      
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12;
      hoursInt = hoursInt ? hoursInt : 12; // Handle midnight (0 hours)
      return `${hoursInt}:${minutes} ${ampm}`;
    },
    showDetails(item) {
      this.viewItem = Object.assign({}, item);
      this.dialog = true;
      this.generateQRCode(item.ticketId);
    },
    close() {
      this.dialog = false;
      this.qrCodeUrl = null;
    },
    generateQRCode(ticketId) {
      this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(ticketId)}&size=200x200`;
    },
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
    },
    exportToExcel() {
      if (!this.hasData) return;
      
      // Prepare data for export
      const exportData = this.filteredTickets.map((item, index) => {
        const isInstitution = item.categoryName === 'Institution';
        return {
          'Sl No': index + 1,
          'Ticket ID': item.ticketId,
          'Name': item.name,
          'Phone': item.phNumber,
          'Visit Date': item.visitDate,
          'Time': this.formatTime(item.slotTime),
          'Category': item.categoryName || 'N/A',
          'Adults/Teachers': isInstitution ? item.teacherCount || 0 : item.adultCount || 0,
          'Children/Students': isInstitution ? item.studentCount || 0 : item.childCount || 0,
          'Senior Citizens': item.seniorCitizenCount || 0,
          'Total Amount': item.grandTotal,
          'Payment Mode': item.paymentModeName,
          'Payment Status': item.paymentStatusName,
          'Created By': item.createdBy,
          'Generated Time': item.generatedTime
        };
      });
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Spot Bookings');
      
      // Generate file name with date range
      const fileName = `Spot_Bookings_${this.startDate}_to_${this.endDate}.xlsx`;
      
      // Export to Excel
      XLSX.writeFile(workbook, fileName);
    },
  },
  mounted() {
    // Set default date range to current month
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    this.endDate = today.toISOString().split('T')[0];
    this.startDate = firstDay.toISOString().split('T')[0];
    
    // Fetch category data if needed
    if (!this.getCategory || this.getCategory.length === 0) {
      this.$store.dispatch('booking/fetchCategory');
    }
    
    // Fetch payment mode data
    this.$store.dispatch('booking/fetchPaymentMode').then(() => {
      if (this.getPaymentMode && this.getPaymentMode.length > 0) {
        this.paymentModeOptions = [
          { id: 0, paymentType: 'All Payment Modes' },
          ...this.getPaymentMode
        ];
      }
    });
  },
};
</script>

<style scoped>
.date-input, .category-select, .payment-mode-select {
  background-color: #DFE4D7;
  border-bottom: 2px solid #216D17;
}

:deep(.v-input__details) {
  display: none;
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

:deep(.v-overlay__scrim) {
  background: #0c070775;
}
</style>
<template>
    <v-main>
    <v-container class="py-8 px-6" fluid>
        <!-- <div>
            <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="category" item-value="id" v-model="selectedCat">
            </v-select>
            <v-sheet :height="500" rounded>
                <v-container class="pb-0">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-container>
                                <v-text-field v-model="name" label="Name" class="price" density="comfortable"
                                    :rules="nameRules" width="300" variant="outlined"
                                    :disabled="!selectedCat"></v-text-field>
                                <v-text-field v-model="number" label="Phone number" class="price"
                                    density="comfortable" :rules="mobRules" width="300"
                                    variant="outlined" :disabled="!selectedCat"></v-text-field>
                                <v-select clearable density="comfortable" variant="outlined" label="Select a payment mode" 
                                    width="300" :items="paymentMode" item-title="paymentType" 
                                    item-value="id" v-model="selectedMode"></v-select>
                            </v-container>
                        </v-col>
                        <v-col cols="12" md="6">
                            <div style="display: flex; flex-direction: column;">
                                <div v-for="type in types" :key="type.id">
                                    <category-type :cat="type.type" :id="type.id" @updateCount="handleUpdate"></category-type>
                                </div>
                            </div>
                        </v-col>
                        <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="submit">Get Tickets</v-btn>
                    </v-row>
                </v-container>
            </v-sheet>
        </div> -->
        <div class="fw-bold d-flex justify-content-between mx-3 my-0 ">
        <div class="d-flex flex-column  ">
            <div>Date: {{ slot.bookDate }}</div>
            <div>Slot Start Time: {{ slot.slotStartTime }}</div>
          </div>
          <div class="d-flex flex-column  ">
          <div>Present capacity : {{ slot.presentCapacity }}</div>
          <div>Slot End Time: {{ slot.slotEndTime }}</div>
        </div>
        </div>
        <v-sheet :elevation="5" :height="550" class="mt-2">
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" md="6" >
                <v-container>
                  <!-- <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="category" item-value="id" v-model="selectedCat">
            </v-select> -->
      <v-chip-group v-model="selectedCat" selected-class="text-success" column :disabled="showPreview">
      <v-chip 
        v-for="category in category" 
        :key="category.id" 
        :value="category.id" 
        size="large"
      >
        {{ category.category }}
      </v-chip>
    </v-chip-group>
                  <v-text-field v-model="name" label="Name" class="price" density="comfortable"
                                    :rules="nameRules" width="300" variant="outlined"
                                    :disabled="!selectedCat"  color="success"></v-text-field>
                  <v-text-field v-model="number" label="Phone number" class="price"
                                    density="comfortable" :rules="mobRules" width="300"
                                    variant="outlined" :disabled="!selectedCat"  color="success"></v-text-field>
                  <div v-for="type in types" :key="type.id">
                      <category-type :cat="type.type" :id="type.id" @updateCount="handleUpdate"></category-type>
                  </div>
                  <!-- <v-select clearable density="comfortable" variant="outlined" label="Select a payment mode" 
                                    width="300" :items="paymentMode" item-title="paymentType" 
                                    item-value="id" v-model="selectedMode"></v-select> -->
      <v-chip-group v-model="selectedMode" selected-class="text-danger" column>
      <v-chip 
        v-for="mode in paymentMode" 
        :key="mode.id" 
        :value="mode.id" 
        size="large"
        :disabled="!selectedCat"
      >
        {{ mode.paymentType }}
      </v-chip>
    </v-chip-group>
    <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="submit" :disabled="showPreview">Get Tickets</v-btn>
                </v-container>
              </v-col>
              <v-col cols="12" md="6" v-if="showPreview">
              <h3>Preview</h3>
              <p><strong>Name:</strong> {{ details.data.name }}</p>
              <p><strong>Phone Number:</strong> {{ details.data.phNumber }}</p>
              <div v-if="details.id === 1">
                <p><strong>No of Adult:</strong> {{ details.data.adult }}</p>
                <p><strong>No of Children:</strong> {{ details.data.child }}</p>
                <p><strong>No of Senior Citizen:</strong> {{ details.data.seniorCitizen }}</p>
              </div>
              <div v-if="details.id === 2">
                <p><strong>No of Teachers:</strong> {{ details.data.teacher }}</p>
                <p><strong>No of Students:</strong> {{ details.data.student }}</p>
              </div>
              <div v-if="details.id === 3">
                <p><strong>No of Adults:</strong> {{ details.data.adult }}</p>
                <p><strong>No of children:</strong> {{ details.data.child }}</p>
              </div>
              <p><strong>Grand Total: </strong> {{ bookedDetails.grandTotal }}</p>
              <v-chip-group v-model="selectedStatus" selected-class="text-danger" column>
                <v-chip>
        <!-- v-for="status in filteredStatuses"
        :title="status.statusName"
        :key="status.id"
        :value="status.id"
        size="large"
        :disabled="!selectedCat"
      > -->
        {{ filteredStatuses.statusName }}
      </v-chip>
    </v-chip-group>
    <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="confirmBooking">Proceed to print</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
        <!-- <v-dialog v-model="dialog">        Received
          <demo-ticket></demo-ticket>
        </v-dialog> -->
    </v-container>
</v-main>
</template>

<script>
import CategoryType from './CategoryType.vue';
import { mapGetters } from 'vuex';
// import DemoTicket from './DemoTicket.vue';
export default {
  components: { CategoryType,  },
    data(){
        return{
          nameRules: [
        value => {
          if (value) return true
          return 'Name is required.'
        },   
        value => {
          if (/^[^\s\W]/.test(value)) return true;
          return 'Name should not start with a special character.';
        },
        value => {
          if(/^\D+$/.test(value)) return true
          return 'Name should not contain digits.'
        },
        value => {
          if (value?.length >= 3) return true
          return 'Name must contain atleast 3 characters.'
        },
        value => {
          if (!/[^a-zA-Z\s.]/g.test(value)) return true
          return 'Name should not contain special characters'
        }
      ],
      mobRules: [
      value => {
          if (value) return true;
          return 'Mobile is required.';
        },
        value => {
          if (/^\d+$/.test(value)) return true;
          return 'Only digits allowed.';
        },
        value => {
          if (value?.length === 10 ) return true;
          return 'Enter a valid number.';
        }
      ],
      name:null,
      number:null,
      adult: 0,
      child: 0,
      senior: 0,
      selectedCat: null,
      selectedMode: null,
      selectedStatus: null,
      formattedDate: '',
      showPreview: false,
      bookingDetails: [],
      counts: {},
      dialog: false,
   
        }
    },
    methods: {
      async fetchCategory() {
      try {
        await this.$store.dispatch('booking/fetchCategory')
        }
      catch (error) {
        console.error(error)
      }
    },
    printTicket() {
    const printWindow = window.open("", "_blank", "width=300,height=500");
    if (!printWindow) {
  console.error("Failed to open a new window. Ensure popups are not blocked.");
  return;
}
let visitorDetails = "";
  if (this.visitorType === 1 || this.visitorType === 3) {
    visitorDetails += `<p>Adults: ${this.userDetails.adultCount}</p>`;
    visitorDetails += `<p>Children: ${this.userDetails.childCount}</p>`;
  }
  if (this.visitorType === 1) {
    visitorDetails += `<p>Senior Citizens: ${this.userDetails.seniorCitizenCount}</p>`;
  }
  if (this.visitorType === 2) {
    visitorDetails += `<p>Teachers: ${this.userDetails.teacherCount}</p>`;
    visitorDetails += `<p>Students: ${this.userDetails.studentCount}</p>`;
  }

    const ticketContent = `
      <div style="font-family: Arial, sans-serif; width: 280px; padding: 10px; text-align: center;">
        <div style="font-size: 20px; font-weight: bold;">Aksharam Museum</div>
        <div style="margin: 10px 0; border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 5px 0;">
          <p><strong>${this.totalGuests} Ticket(s)</strong></p>
           <p>${visitorDetails}</p>
        </div>
        <div style="margin: 10px 0;">
          <div style="width: 100px; height: 100px; margin: 10px auto; background: url('data:image/png;base64,${this.userDetails.qrCodeImage}'); background-size: cover;"></div>
          <p>Order ID: ${this.userDetails.orderId}</p>
        </div>
        <p style="margin-top: 10px; font-size: 14px;">Cancellation not available</p>
        <p><strong>Total Amount: Rs.${this.userDetails.grandTotal}/-</strong></p>
      </div>
    `;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <style>
            @media print {
              body {
                margin: 0;
                width: 80mm; /* Ensure the ticket fits thermal printer width */
                font-size: 12px;
              }
              div {
                text-align: center;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${ticketContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  },
    close() {
    this.dialog = false
  },
    async submit() {
      const payload = {
        id: this.selectedCat,
        data: {
          name: this.name,
        phNumber: this.number,
        // visitDate: this.formattedDate,
        // slotId: this.slot.slotId,
        paymentMode: this.selectedMode,
        paymentStatusId: 2,
        createdBy: this.role,
        ...this.counts
        }
        
} ;
      console.log("payload",payload);
      this.$store.commit('booking/setDetails',payload)
      this.showPreview =  true;
      try {
       const res = await this.$store.dispatch('booking/spotBooking',payload)
        if(res) {
          // this.$router.push({name: 'confirmbooking'});
      // this.showPreview =  true;
        }
        else {
          console.log('error')
        }
      }
      catch (error) {
        console.error(error)
      }
    
    },
    async confirmBooking() {
      const payload = {
        id: this.bookedDetails.orderId,
        count: this.totalGuests,
        data: {
        //   name: this.name,
        // phNumber: this.number,
        visitDate: this.formattedDate,
        slotId: this.slot.slotId,
        // paymentMode: this.selectedMode,
        paymentStatusId: this.filteredStatuses.id,
        createdBy: this.role,
        // ...this.counts
        }
        
} ;
      console.log("payload",payload);
      try {
        const res =  await this.$store.dispatch('booking/confirmBooking',payload) 
        if(res) {
          this.printTicket();
          this.showPreview = false
          // this.dialog = true;
          this.totalGuests = ''
          this.paymentStatus = ''
          this.bookedDetails = ''
          this.name= null
       this.number= null
       this.selectedCat= null
       this.selectedMode= null
       this.selectedStatus= null
          this.counts = ''
      this.$store.commit('booking/clearType')
      this.$store.commit('booking/setDetails', ' ');
      this.fetchSlotByDate();
        }
      }
      catch (error) {
        console.error(error)
      }
    
    },
    async fetchTypeByCategory() {
      const payload = this.selectedCat;
      try {
        const res = await this.$store.dispatch('booking/getTypeById',payload) 
        if(res){
          this.counts = res;
          console.log(this.counts)
        }
        }
      catch (error) {
        console.error(error)
      }
    },

    async fetchSlotByDate() {
      const payload = this.formattedDate;
      try {
          await this.$store.dispatch('booking/getSlotByDate',payload) 
        }
      catch (error) {
        console.error(error)
      }
    },

    async fetchPaymentMode() {
      try {
        await this.$store.dispatch('booking/fetchPaymentMode')
        }
      catch (error) {
        console.error(error)
      }
    },

    async fetchPaymentStatus() {
      try {
        await this.$store.dispatch('booking/fetchPaymentStatus')
        }
      catch (error) {
        console.error(error)
      }
    },

    handleUpdate(payload) {
      const baseKey = payload.cat.charAt(0).toLowerCase() + payload.cat.slice(1).replace(' ', '');
      this.counts[baseKey] = parseInt(payload.count); 
      console.log(this.counts);
    },
    getCurrentDate() {
      const current = new Date();
      const day = String(current.getDate()).padStart(2, '0'); // Pad single digit days
      const month = String(current.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
      const year = current.getFullYear();
      this.formattedDate = `${year}-${month}-${day}`;
    }
    },
  computed: {
    ...mapGetters(['getRole']),
    ...mapGetters('booking', ['getCategory','getType','getSlot','getPaymentMode','getPaymentStatus','getDetails','getSpotBooking','getConfirmBooking']),
    category() {
      return this.getCategory;
    },
    userDetails() {
        return this.getConfirmBooking;
    },
    types() {
      return this.getType;
    },
    slot() {
      return this.getSlot;
    },
    paymentMode() {
      return this.getPaymentMode;
    },
    paymentStatus() {
      return this.getPaymentStatus;
    },
    filteredStatuses() {
      return this.paymentStatus.find(status => status.statusName === "Received");
    },
    role() {
      return this.getRole;
    },
    details() {
      return this.getDetails;
    },
    bookedDetails() {
      return this.getSpotBooking;
    },
    visitorType() {
      return this.details.id; 
    },
    totalGuests() {
      let total = 0;

      if (this.visitorType === 1) { // Public
        total += (this.details.data.adult || 0);
        total += (this.details.data.child || 0);
        total += (this.details.data.seniorCitizen || 0);
      } else if (this.visitorType === 2) { // Institution
        total += (this.details.data.teacher || 0); // Assuming adults are teachers
        total += (this.details.data.student || 0); // Assuming children are students
      } else if (this.visitorType === 3) { // Foreigner
        total += (this.details.data.adult || 0);
        total += (this.details.data.child || 0);
      }

      return total;
    }
  },
  mounted() {
    this.fetchCategory();
    this.getCurrentDate();
    this.fetchSlotByDate();
    this.fetchPaymentMode();
    this.fetchPaymentStatus();
    console.log('filtered', this.filteredStatuses)
    console.log('time',this.slot);
  },
  watch: {
    selectedCat(value) {
      if(value){
        this.fetchTypeByCategory();
      }
    },
  }
}
</script>
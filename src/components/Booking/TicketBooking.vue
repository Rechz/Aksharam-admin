<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <v-snackbar v-model="snackbar" :color="color"  location="center" multi-line max-width="500" min-width="300">
      {{ message }}
      <template v-slot:actions>
        <v-btn color="black" variant="text" @click="snackbar = false">
          <v-icon class="mdi mdi-close-circle-outline"></v-icon>
        </v-btn>
      </template>
    </v-snackbar>
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
      <v-sheet :elevation="5" :height="580" class="mt-2">
        <v-container class="pb-0">
          <v-row>
            <v-col cols="12" md="6">
              <v-container>
                <!-- <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="category" item-value="id" v-model="selectedCat">
            </v-select> -->
                <p v-if="validationError" class="text-danger errorText">
                  Please fill all required fields and select a category.
                </p>
                <v-chip-group v-model="selectedCat" selected-class="text-success" column :disabled="showPreview || change">
                  <v-chip v-for="category in category" :key="category.id" :value="category.id" size="large">
                    {{ category.category }}
                  </v-chip>
                </v-chip-group>
                <v-text-field v-model="name" label="Name" class="price" density="comfortable" :rules="nameRules"
                  width="300" variant="outlined" :disabled="!selectedCat || change || showPreview" color="success"></v-text-field>
                <v-text-field v-model="number" label="Phone number" class="price" density="comfortable"
                  :rules="mobRules" width="300" variant="outlined" :disabled="!selectedCat || change || showPreview"
                  color="success"></v-text-field>
                <!-- <v-text-field v-if="selectedCat === (category.find(cat => cat.category === 'Institution')?.id)"
                  v-model="district"  label=" District" class="price" density="comfortable" :rules="nameRules"
                  width="300" variant="outlined" :disabled="!selectedCat" color="success"></v-text-field> -->
                  <v-select v-if="selectedCat === (category.find(cat => cat.category === 'Institution')?.id)" class="select mb-2" label='Select District' density="comfortable" :items="districts"
                  v-model="district"  item-title="district" item-value="district" variant="outlined"  width="300" :disabled="!selectedCat || change || showPreview"
                 ></v-select>
                <div v-for="type in types" :key="type.id">
                  <category-type :cat="type.type" :id="type.id" @updateCount="handleUpdate" :disabled="!selectedCat || change || showPreview"></category-type>
                </div>
                <v-text-field v-if="showDiscount" v-model="discountRate" label="DiscountRate" class="price" density="comfortable" 
                  width="300" variant="outlined" :disabled="!selectedCat" color="success"></v-text-field>
                <!-- <v-select clearable density="comfortable" variant="outlined" label="Select a payment mode" 
                                    width="300" :items="paymentMode" item-title="paymentType" 
                                    item-value="id" v-model="selectedMode"></v-select> -->
                <!-- <v-chip-group v-model="selectedMode" selected-class="text-danger" column>
                  <v-chip v-for="mode in filteredModes" :key="mode.id" :value="mode.id" size="large"
                    :disabled="!selectedCat">
                    {{ mode.paymentType }} v-if="selectedCat === category.find(cat => cat.category === 'Institution').id "
                  </v-chip>
                </v-chip-group> -->
                <v-btn 
  class="mt-3 w-50 text-white" 
  color="green-darken-4" 
  @click="change ? update() : validateAndSubmit()" 
  :loading="buttonDisabled"
  :disabled="showPreview">
  {{ change ? 'Update Ticket' : 'Get Tickets' }}
</v-btn>

              </v-container>
            </v-col>
            <v-col cols="12" md="6" v-if="showPreview">
              <div class="d-flex ">
              <h3>Preview</h3>
              <v-icon class="mdi mdi-square-edit-outline ms-3" @click="edit()"></v-icon></div>
              <p class="text-danger">*** only update the ticket count through edit</p>
              <p><strong>Name:</strong> {{ details.data.name }}</p>
              <p><strong>Phone Number:</strong> {{ details.data.phNumber }}</p>
              <div v-if="details.id === 1">
                <p><strong>No of Adult:</strong> {{ details.data.adult }}</p>
                <p><strong>No of Children:</strong> {{ details.data.child }}</p>
                <!-- <p><strong>No of Senior Citizen:</strong> {{ details.data.seniorCitizen }}</p> -->
              </div>
              <div v-if="details.id === 2">
                <p><strong>District:</strong> {{ details.data.district }} </p>
                <p><strong>No of Teachers:</strong> {{ details.data.teacher }}</p>
                <p><strong>No of Students:</strong> {{ details.data.student }}</p>
                <p v-if="showDiscount"><strong>Discount Amount:</strong>₹{{ bookedDetails.discountAmount }}</p>
              </div>
              <div v-if="details.id === 3">
                <p><strong>No of Adults:</strong> {{ details.data.adult }}</p>
                <p><strong>No of children:</strong> {{ details.data.child }}</p>
              </div>
              <p><strong>Total Ticket: </strong> {{ totalGuests}}</p>
              <p><strong>Grand Total: </strong> ₹{{ bookedDetails.grandTotal }}</p>
              <!-- <v-chip
  :value="selectedStatus === filteredStatuses.id"
  @click="selectedStatus = filteredStatuses.id"
  selected-class="text-danger"
>
  {{ filteredStatuses.statusName }}
</v-chip> -->
<div class="d-flex flex-wrap gap-2">
<v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="confirmBooking()" :loading="buttonCnDisabled">Proceed to
  print</v-btn>
<v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="cancelBooking()">Cancel</v-btn></div>

              
              <p v-if="validationStatus" class="text-danger errorText">
                Please fill the payment status...
              </p>
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
      // senior: 0,
      discountRate:0,
      selectedCat: null,
      selectedMode: null,
      selectedStatus: null,
      district:'',
      formattedDate: '',
      showPreview: false,
      bookingDetails: [],
      counts: {},
      dialog: false,
      validationError: false,
      validationStatus: false,
      buttonDisabled: false,
      buttonCnDisabled: false,
      message: '',
      color: 'green',
      snackbar: false,
      timeout: 3000,
      showDiscount: false,
      change:false,
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
    // Open a new window for printing
    const printWindow = window.open("", "_blank", "width=300,height=500");
    if (!printWindow) {
        console.error("Failed to open a new window. Ensure popups are not blocked.");
        return;
    }

    // Prepare visitor details based on visitor type
    let visitorDetails = "";
    if (this.visitorType === 1 || this.visitorType === 3) {
        visitorDetails += `<p>Adults: ${this.userDetails.adultCount}</p>`;
        visitorDetails += `<p>Children: ${this.userDetails.childCount}</p>`;
    }
    // if (this.visitorType === 1) {
    //     visitorDetails += `<p>Senior Citizens: ${this.userDetails.seniorCitizenCount}</p>`;
    // }
    if (this.visitorType === 2) {
        visitorDetails += `<p>Teacher: ${this.userDetails.teacherCount}</p>`;
        visitorDetails += `<p>Student: ${this.userDetails.studentCount}</p>`;
    }

    const formatTo12Hour = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const formattedTime = formatTo12Hour(this.userDetails.createdTime.split(".")[0]);

    // Check if discount is applicable
    const discountSection = this.userDetails.discountAmount > 0
        ? `<p><strong>Discount Amount:</strong> ₹${this.userDetails.discountAmount}/-</p>`
        : "";

    // Construct the ticket content
    const ticketContent = `
      <div style="font-family: Arial, sans-serif; width: 280px; padding: 10px; text-align: center;">
        <div style="font-size: 20px; font-weight: bold;">Aksharam</div>
        <p style="margin-top: 10px; font-size: 12px;">Museum of Letters,Literature and Culture</p>
        <div style="margin: 10px 0; border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 5px 0;">
          <p><strong>${this.totalGuests} Ticket(s)</strong></p>
          <p>${visitorDetails}</p>
        </div>
        <div style="margin: 10px 0;">
          <div style="width: 100px; height: 100px; margin: 10px auto; background: url('data:image/png;base64,${this.userDetails.qrCodeImage}'); background-size: cover;"></div>
          <p><b>${this.userDetails.ticketId}</b></p>
          <p> ${this.userDetails.visitDate}, ${formattedTime}</p>
        </div>
        <p style="margin-top: 10px; font-size: 14px;">Cancellation not available</p>
        ${discountSection}
        <p><strong>Total Amount: ₹${this.userDetails.grandTotal}/-</strong></p>
        <p style="margin-top: 10px; font-size: 14px;">Thank you visit again.</p>
        <p style="margin-top: 10px; font-size: 14px;">www.aksharammuseum.com</p>
      </div>
    `;

    // Write the ticket content to the new window
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
  edit() {
    this.showPreview = false
    this.change = true
  },
  async validateAndSubmit() {
      if (!this.selectedCat || !this.name || !this.number) {
        this.validationError = true; 
        return;
      }
      this.validationError = false; 
      await this.submit();
    },
    async submit() {
      const payload = {
        id: this.selectedCat,
        data: {
          name: this.name,
        phNumber: this.number,
        // visitDate: this.formattedDate,
        // slotId: this.slot.slotId,
        district: this.district,
        paymentMode: this.filteredModes.id,
        paymentStatusId: this.filteredPending.id,
        createdBy: this.role,
        discountRate: this.discountRate,
        ...(this.selectedCat===this.category.find(cat => cat.category === 'Public')?.id?{seniorCitizen:0,seniorCitizenTypeId:3} : null),
        ...this.counts
        }
        } ;
      console.log("payload",payload);
      this.buttonDisabled = true;
      this.$store.commit('booking/setDetails',payload)
      try {
       const res = await this.$store.dispatch('booking/spotBooking',payload)
        if(res) {
          // this.$router.push({name: 'confirmbooking'});
      // this.showPreview =  true;
      this.buttonDisabled = false;
      this.showPreview =  true;
        }
        else {
          this.message = 'Something went wrong!!!'
            this.color = 'red';
          this.snackbar = true;
          console.log('error')
        }
      }
      catch (error) {
        this.buttonDisabled = false;
        this.message = 'Something went wrong!!!'
            this.color = 'red';
          this.snackbar = true;
        console.error(error)
      }
    
    },
    async update() {
      const payload = {
        id: this.selectedCat,
        orderId:this.bookedDetails.orderId,
        data: {
          name: this.name,
        phNumber: this.number,
        visitDate: this.formattedDate,
        slotId: this.slot.slotId,
        district: this.district,
        paymentMode: this.filteredModes.id,
        paymentStatusId: this.filteredPending.id,
        createdBy: this.role,
        discountRate: this.discountRate,
        ...(this.selectedCat===this.category.find(cat => cat.category === 'Public')?.id?{seniorCitizen:0,seniorCitizenTypeId:3} : null),
        ...this.counts
        }
        } ;
      console.log("payload",payload);
      this.buttonDisabled = true;
      this.$store.commit('booking/setDetails',payload)
      try {
       const res = await this.$store.dispatch('booking/updateCount',payload)
        if(res) {
          // this.$router.push({name: 'confirmbooking'});
      // this.showPreview =  true;
      this.buttonDisabled = false;
      this.showPreview =  true;
        }
        else {
          this.message = 'Something went wrong!!!'
            this.color = 'red';
          this.snackbar = true;
          console.log('error')
        }
      }
      catch (error) {
        this.buttonDisabled = false;
        this.message = 'Something went wrong!!!'
            this.color = 'red';
          this.snackbar = true;
        console.error(error)
      }
    
    },
    //   async validateAndConfirm() {
    //   if (!this.selectedStatus) {
    //     this.validationStatus = true; 
    //     return;
    //   }
    //   this.validationStatus = false; 
    //   await this.confirmBooking();
    // },
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
      this.buttonCnDisabled = true;
      try {
        const res =  await this.$store.dispatch('booking/confirmBooking',payload) 
        if(res) {
          this.printTicket();
          this.buttonCnDisabled = false;
          this.showPreview = false
          this.showDiscount = false
          this.change = false
          // this.dialog = true;
          this.totalGuests = ''
          this.paymentStatus = ''
          this.bookedDetails = ''
          this.name= null
       this.number= null
       this.selectedCat= null
       this.selectedMode= null
       this.selectedStatus= null
       this.district= ''
          this.counts = ''
          this.discountRate = 0
      this.$store.commit('booking/clearType')
      this.$store.commit('booking/setDetails', ' ');
      this.fetchSlotByDate();
        }
      }
      catch (error) {
        console.error(error)
        this.buttonCnDisabled = false;
        this.message = 'Please check the capacity !!!'
            this.color = 'red';
          this.snackbar = true;
      }
    
    },
    async cancelBooking() {
      const payload = {
        catId: this.selectedCat,
        id: this.bookedDetails.id,
      }
      try {
        const res =  await this.$store.dispatch('booking/deleteUserReg',payload) 
        if(res) {
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
          console.log("counts",this.counts)
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
    async fetchDistrict() {
      try {
          await this.$store.dispatch('booking/fetchDistrict') 
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
    async fetchDiscountRate() {
      try {
        await this.$store.dispatch('booking/fetchDiscountRate')
        }
      catch (error) {
        console.error(error)
      }
    },
    handleUpdate(payload) {
      const baseKey = payload.cat.charAt(0).toLowerCase() + payload.cat.slice(1).replace(' ', '');
      this.counts[baseKey] = parseInt(payload.count); 
      if (baseKey === 'student') {
        const studentCount = this.counts[baseKey];
        console.log("dias",this.discountCount)
        if(studentCount > this.discountCount) {
          this.showDiscount = true;
        }
    console.log("Student count:", this.counts[baseKey]);

  }
      console.log("discount check",this.counts);
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
    ...mapGetters('booking', ['getCategory','getType','getSlot','getPaymentMode','getPaymentStatus','getDetails','getSpotBooking','getConfirmBooking','getDistrict','getDiscountRate']),
    category() {
      return this.getCategory;
    },
    // filteredCategory() {
    //   return this.category.find(cat => cat.category === "Institution");
    // },
    districts(){
      return this.getDistrict;
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
    filteredModes() {
      return this.paymentMode.find(mode => mode.paymentType === "Cash");
    },
    paymentStatus() {
      return this.getPaymentStatus;
    },
    filteredPending() {
      return this.paymentStatus.find(status => status.statusName === "Pending");
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
    discount() {
      return this.getDiscountRate;
    },
    discountCount() {
      return this.discount[0].disCount;
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
    this.fetchDistrict();
    this.fetchDiscountRate();
    console.log('filtered', this.filteredStatuses)
    console.log('time', this.slot);
  },
  watch: {
    selectedCat(value) {
      if(value){
        this.validationError = false;
        this.fetchTypeByCategory();
      }
    },
    selectedMode(value) {
      if(value){
        this.validationError = false;
      }
    },
    name(newValue) {
      if (newValue) {
        this.validationError = false;
      }
    },
    number(newValue) {
      if (newValue) {
        this.validationError = false;
      }
    },
    // selectedStatus(newValue) {
    //   if (newValue) {
    //     this.validationStatus = false;
    //   }
    // },
  }
}
</script>

<style scoped>
.errorText{
  font-size:smaller
}
</style>
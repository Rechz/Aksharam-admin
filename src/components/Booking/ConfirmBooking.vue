<template>
    <v-main>
    <v-container class="py-8 px-6" fluid>
        <div>
            <!-- <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="category" item-value="id" v-model="selectedCat">
            </v-select> -->
            <v-sheet :height="500" rounded>
                <v-container class="pb-0">
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-container>
                                <v-text-field v-model="formattedDate" label="Date" class="price" density="comfortable"
                                    width="300" variant="outlined" ></v-text-field>
                                <v-text-field v-model="slot.slotStartTime" label="Slot Start Time" class="price"
                                    density="comfortable" width="300" variant="outlined"
                                    ></v-text-field>
                                <v-text-field v-model="slot.slotEndTime" label="Slot End Time" class="price"
                                    density="comfortable" width="300" variant="outlined"
                                    ></v-text-field>
                                <!-- <v-text-field v-model="name" label="Name" class="price" density="comfortable"
                                    :rules="nameRules" width="300" variant="outlined"
                                    :disabled="!selectedCat"></v-text-field>
                                <v-text-field v-model="number" label="Phone number" class="price"
                                    density="comfortable" :rules="mobRules" width="300"
                                    variant="outlined" :disabled="!selectedCat"></v-text-field>
                                <v-select clearable density="comfortable" variant="outlined" label="Select a payment mode" 
                                    width="300" :items="paymentMode" item-title="paymentType" 
                                    item-value="id" v-model="selectedMode"></v-select> -->
                                <v-select clearable density="comfortable" variant="outlined" label="Select a payment status" 
                                    width="300" :items="paymentStatus" item-title="statusName" 
                                    item-value="id" v-model="selectedStatus"></v-select>
                            </v-container>
                        </v-col>
                        <!-- <v-col cols="12" md="6">
                            <div style="display: flex; flex-direction: column;">
                                <div v-for="type in types" :key="type.id">
                                    <category-type :cat="type.type" :id="type.id" @updateCount="handleUpdate"></category-type>
                                </div>
                            </div>
                        </v-col> -->
                        <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="submit">Get Tickets</v-btn>
                    </v-row>
                </v-container>
            </v-sheet>
        </div>
        <v-dialog v-model="dialog">
          <ticket-page></ticket-page>
        </v-dialog>
    </v-container>
</v-main>
</template>

<script>
// import CategoryType from './CategoryType.vue';
import { mapGetters } from 'vuex';
import TicketPage from './TicketPage.vue';
export default {
  components: { TicketPage },
//   components: { CategoryType },
    data(){
        return{
    //       nameRules: [
    //     value => {
    //       if (value) return true
    //       return 'Name is required.'
    //     },   
    //     value => {
    //       if (/^[^\s\W]/.test(value)) return true;
    //       return 'Name should not start with a special character.';
    //     },
    //     value => {
    //       if(/^\D+$/.test(value)) return true
    //       return 'Name should not contain digits.'
    //     },
    //     value => {
    //       if (value?.length >= 3) return true
    //       return 'Name must contain atleast 3 characters.'
    //     },
    //     value => {
    //       if (!/[^a-zA-Z\s.]/g.test(value)) return true
    //       return 'Name should not contain special characters'
    //     }
    //   ],
    //   mobRules: [
    //   value => {
    //       if (value) return true;
    //       return 'Mobile is required.';
    //     },
    //     value => {
    //       if (/^\d+$/.test(value)) return true;
    //       return 'Only digits allowed.';
    //     },
    //     value => {
    //       if (value?.length === 10 ) return true;
    //       return 'Enter a valid number.';
    //     }
    //   ],
    //   name:null,
    //   number:null,
    //   adult: 0,
    //   child: 0,
    //   senior: 0,
    //   selectedCat: null,
    //   selectedMode: null,
      selectedStatus: null,
      formattedDate: '',
      dialog: false,
    //   bookingDetails: [],
    //   counts: {}
   
        }
    },
    methods: {
    //   async fetchCategory() {
    //   try {
    //     await this.$store.dispatch('booking/fetchCategory')
    //     }
    //   catch (error) {
    //     console.error(error)
    //   }
    // },
    async submit() {
      const payload = {
        id: this.bookedDetails.orderId,
        count: this.totalGuests,
        data: {
        //   name: this.name,
        // phNumber: this.number,
        visitDate: this.formattedDate,
        slotId: this.slot.slotId,
        // paymentMode: this.selectedMode,
        paymentStatusId: this.selectedStatus,
        createdBy: this.role,
        // ...this.counts
        }
        
} ;
      console.log("payload",payload);
      try {
        const res =  await this.$store.dispatch('booking/confirmBooking',payload) 
        if(res) {
          this.dialog = true;
        }
      }
      catch (error) {
        console.error(error)
      }
    
    },
    // async fetchTypeByCategory() {
    //   const payload = this.selectedCat;
    //   try {
    //     const res = await this.$store.dispatch('booking/getTypeById',payload) 
    //     if(res){
    //       this.counts = res;
    //       console.log(this.counts)
    //     }
    //     }
    //   catch (error) {
    //     console.error(error)
    //   }
    // },

    async fetchSlotByDate() {
      const payload = this.formattedDate;
      try {
          await this.$store.dispatch('booking/getSlotByDate',payload) 
        }
      catch (error) {
        console.error(error)
      }
    },

    // async fetchPaymentMode() {
    //   try {
    //     await this.$store.dispatch('booking/fetchPaymentMode')
    //     }
    //   catch (error) {
    //     console.error(error)
    //   }
    // },

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
    ...mapGetters('booking', ['getCategory','getType','getSlot','getPaymentMode','getPaymentStatus','getSpotBooking','getDetails']),
    // category() {
    //   return this.getCategory;
    // },
    // types() {
    //   return this.getType;
    // },
    slot() {
      return this.getSlot;
    },
    // paymentMode() {
    //   return this.getPaymentMode;
    // },
    paymentStatus() {
      return this.getPaymentStatus;
    },
    role() {
      return this.getRole;
    },
    bookedDetails() {
        return this.getSpotBooking;
    },
    details() {
        return this.getDetails;
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
        total += (this.details.data.adult || 0); // Assuming adults are teachers
        total += (this.details.data.child || 0); // Assuming children are students
      } else if (this.visitorType === 3) { // Foreigner
        total += (this.details.data.adult || 0);
        total += (this.details.data.child || 0);
      }

      return total;
    }
  },
  mounted() {
    // this.fetchCategory();
    this.getCurrentDate();
    this.fetchSlotByDate();
    // this.fetchPaymentMode();
    this.fetchPaymentStatus();
    console.log("details",this.bookedDetails);
    console.log("total", this.totalGuests);
  },
//   watch: {
//     selectedCat(value) {
//       if(value){
//         this.fetchTypeByCategory();
//       }
//     },
//   }
}
</script>
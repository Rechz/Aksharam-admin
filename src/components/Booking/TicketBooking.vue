<template>
    <v-main>
        <v-container class="py-8 px-6" fluid>
            <div>
                <!-- <p>Select a category :</p> -->
                <v-select clearable density="comfortable" variant="outlined" label="Select a category" width="300"
                :items="category" item-title="category" item-value="id" v-model="selectedCat"
                ></v-select>
                <v-sheet  :height="500" :width="400"  rounded>
                <v-container class="pb-0">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="name" label="Name" class="price" density="comfortable" :rules="nameRules" width="300"
                variant="outlined" :disabled="!selectedCat"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="number" label="Phone number" class="price" density="comfortable" :rules="mobRules" width="300"
                variant="outlined" :disabled="!selectedCat"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <div v-for="type in types" :key="type.id">
            <category-type :cat="type.type" :id="type.id" @updateCount="handleUpdate"></category-type>
          </div>
          <v-btn class="mt-3 w-50 text-white" color="green-darken-4" @click="submit" >Get Tickets</v-btn>
          </v-sheet>
            </div>
        </v-container>
    </v-main>
</template>

<script>
import CategoryType from './CategoryType.vue';
import { mapGetters } from 'vuex';
export default {
  components: { CategoryType },
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
      bookingDetails: [],
      counts: {}
   
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
    async submit() {
      const payload = {
        name: this.name,
        phNumber: this.number,
        ...this.counts
} ;
        
        
             
          
       
    
      console.log("payload",payload);
      // try {
      //   await this.$store.dispatch('booking/spotBooking',payload)
      // }
      // catch (error) {
      //   console.error(error)
      // }
    
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

    handleUpdate(payload) {
      const baseKey = payload.cat.charAt(0).toLowerCase() + payload.cat.slice(1).replace(' ', '');
      this.counts[baseKey] = parseInt(payload.count); 
      console.log(this.counts);
    }
    },
  computed: {
    ...mapGetters('booking', ['getCategory','getType']),
    category() {
      return this.getCategory;
    },
    types() {
      return this.getType;
    },
  },
  mounted() {
    this.fetchCategory();
  },
  watch: {
    selectedCat(value) {
      if(value){
        this.fetchTypeByCategory();
      }
    }
  }
}
</script>
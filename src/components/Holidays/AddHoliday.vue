<template>
      <div class="d-flex justify-content-center">
      <v-date-picker width="500"
      v-model="date">
      </v-date-picker>
      <div class="mt-5 pt-5">
        <v-text-field v-model="selectedDate" label="Selected Date" variant="outlined" density="comfortable" class="portal mt-5 mx-5 pt-5"></v-text-field>
        <v-text-field v-model="holiday" label="Holiday Purpose" variant="outlined" density="comfortable" class="portal mt-3 mx-5"></v-text-field>
        <v-btn @click="sendHoliday">Submit</v-btn>
      </div>
    </div>

</template>

<script>
import axios from 'axios';
export default {
  data() {
      return {
          date: null,
          selectedDate: '',
          holiday: '',
          items: ['Museum Calendar'],
      };
  },
  watch: {
    date(newValue) {
      if (newValue) {
        // Format the date as yyyy-mm-dd
        const formattedDate = this.formatDate(newValue);
        this.selectedDate = formattedDate;
      } else {
        this.selectedDate = ''; // Reset selectedDate if date is null
      }
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2); // Adding leading zero if needed
      const day = ('0' + d.getDate()).slice(-2); // Adding leading zero if needed
      return `${year}-${month}-${day}`;
    },
    async sendHoliday () {
      const holiday = {
        "date": this.selectedDate,
        "name": this.holiday,
      };
      try{
        const response = await axios.post(`http://192.168.1.22:5000/api/holidays/addDayData`,holiday,
        {
        headers: {
          Authorization: `Bearer ${this.$store.getters.getToken}`
        }
      });
        if (response.status === 200) {
        console.log(response.data);
        this.selectedDate= ''
        this.holiday = ''
      }
      } catch (error) {
        console.log(error)
      }
      }
  },
};
</script>

<style scoped>
.portal {
  width: 250px;
}
</style>
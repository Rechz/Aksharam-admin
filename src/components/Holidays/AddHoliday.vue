<template>
  <v-container class="py-8 px-0" fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <div class="text-center">{{ message }}</div>
    </v-snackbar>
    <div class="d-flex justify-content-start gap-5  mt-5">
      <v-date-picker width="450" v-model="date" color="#2C7721">
      </v-date-picker>
      <div class="px-1">
        <v-text-field v-model="selectedDate" label="Selected Date" density="comfortable" class="portal"></v-text-field>
        <v-text-field v-model="holiday" label="Holiday Purpose" density="comfortable" class="portal"></v-text-field>
        <v-btn @click="sendHoliday" block color="#2C7721" class="">Add Holiday</v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>

export default {
  data() {
      return {
        date: null,
        selectedDate: '',
        holiday: '',
        message: '',
        snackbar: false,
        color: '#E8F5E9',
        timeout: 2000,
      };
  },
  watch: {
    date(newValue) {
      if (newValue) {
        const formattedDate = this.formatDate(newValue);
        this.selectedDate = formattedDate;
      } else {
        this.selectedDate = '';
      }
    },
  },
  methods: {
    formatDate(date) {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2); 
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    },

    async sendHoliday () {
      const holiday = {
        "date": this.selectedDate,
        "name": this.holiday,
      };
      try {
        const response = await this.$store.dispatch('addHoliday', holiday);
        if (response) {
        this.message = 'Holiday added successfully !!';
        this.color = '#C8E6C9'
        this.snackbar = true;
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
  width: 300px;
}
:deep(.v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}
</style>
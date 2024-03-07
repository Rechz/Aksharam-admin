<template>
  <div class="row mx-5">
    <!-- Repeat the card structure as needed -->
    <div v-for="(card, index) in cards" :key="index" class="card my-4 rounded-4 p-3 pb-0" style="background-color:#f9faf1;">
      <div class="ms-5">
        <div class=" d-flex p-2 w-50 justify-content-between ">
        <h5>{{ card.title }}</h5>
        <v-btn class="mdi mdi-pencil rounded-5 px-4 border-1 border-black" @click="enableEdit(index)" v-if="!isEditing[index]" elevation="2">Edit</v-btn>
        <v-btn class="px-4 rounded-5 text-white" style="background-color: #546E7A;" @click="updateValues(index)" v-if="isEditing[index]" elevation="2">Update</v-btn>
      </div>
      <div class="card-body ms-5">
        <div class="row mb-3" v-for="(field, fieldIndex) in card.fields" :key="fieldIndex">
          <div class="col-md-2 pb-3">
            <h6 :for="field.key">{{ field.label }}</h6>
          </div>
          <div class="col-md-1">:</div>
          <div class="col-md-2">
            <div v-if="!isEditing[index]">
             <h6><v-icon size="small">mdi-currency-inr</v-icon>{{ editedItems[index][field.key] }}</h6>
            </div>
            <div v-else>
              <v-text-field
              v-model="editedItems[index][field.key]"
              density="compact"
              class="input"
              hide-details
              ></v-text-field>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isEditing: Array.from({ length: 4 }, () => false), // Assuming you have 4 cards, adjust as needed
      editedItems: [
        { child: 2, adult: 2, seniorcitizen: 1 }, // Card 1
        { teacher: 3, student: 90 }, // Card 2
        { adult: 2, child: 1 },
        { gst: 18, cess: 2 },
        // Add more objects for each card as needed
      ],
      cards: [
        {
          title: 'Public',
          fields: [
            { key: 'adult', label: 'Adult' },
            { key: 'child', label: 'Child' },
            { key: 'seniorcitizen', label: 'Senior Citizen' },
          ],
        },
        {
          title: 'Institution',
          fields: [
            { key: 'teacher', label: 'Teacher' },
            { key: 'student', label: 'Student' },
       
          ],
        },
        {
          title: 'Foreign',
          fields: [
            { key: 'adult', label: 'Adult' },
            { key: 'child', label: 'Child' },
  
          ],
        },
        {
          title: 'Tax',
          fields: [
            { key: 'gst', label: 'GST' },
            { key: 'cess', label: 'CESS' },
      
          ],
        },
        // Add more card configurations as needed
      ],
    };
  },

  methods: {
    enableEdit(index) {
      // Disable editing for all cards
      this.isEditing = Array.from({ length: this.isEditing.length }, () => false);

      // Enable editing for the selected card
      this.isEditing[index] = true;
    },

    updateValues(index) {
      this.isEditing[index] = false;
      // Optionally, you can perform any validation or additional logic here before updating values
    },
  },
};
</script>
  

  <style scoped>
  .v-table{
      width : 73vw;
  }
  /* .card{
    width: 700px;
  } */

</style>
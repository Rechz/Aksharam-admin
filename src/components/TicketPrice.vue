<template>
  <v-data-table>
    <!-- Repeat the card structure as needed -->
    <div v-for="(card, index) in cards" :key="index" class="card mx-4 my-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5>{{ card.title }}</h5>
        <v-btn class="mdi mdi-pencil" @click="enableEdit(index)" v-if="!isEditing[index]">Edit</v-btn>
        <v-btn class="mdi mdi-check" @click="updateValues(index)" v-if="isEditing[index]">Update</v-btn>
      </div>
      <div class="card-body">
        <div class="row mb-3" v-for="(field, fieldIndex) in card.fields" :key="fieldIndex">
          <div class="col-md-3">
            <label :for="field.key">{{ field.label }}     :       </label>
          </div>
          <div class="col-md-3">
            <input
              type="text"
              v-model="editedItems[index][field.key]"
              :disabled="!isEditing[index]"
              class="form-control "
              prepend-icon="mdi-currency-inr"
            />
            
          </div>
        </div>
      </div>
    </div>
  </v-data-table>
</template>

<script>
export default {
  data() {
    return {
      isEditing: Array.from({ length: 4 }, () => false), // Assuming you have 4 cards, adjust as needed
      editedItems: [
        { public: 'yet', adult: 'always', seniorcitizen: 'wjej' }, // Card 1
        { teacher: 'example', student: 'sample' }, // Card 2
        { adult: 'example', child: 'sample' },
        { gst: 'example', entertainmenttax: 'sample' },
        // Add more objects for each card as needed
      ],
      cards: [
        {
          title: 'Public',
          fields: [
            { key: 'public', label: 'Public' },
            { key: 'adult', label: 'Adult' },
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
            { key: 'entertainmenttax', label: 'Entertainment TAX' },
      
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
  .card{
    width: 700px;
  }
</style>
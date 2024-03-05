<template>    
    <v-data-table
      :headers="headers"
      :items="desserts"
      
      style="background-color: #1B5E20; color:white"
      max-width="100%"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          style="background-color: white;"
        >
        <v-text-field
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
            class="w-20 ms-3"
            elevation="24"
          ></v-text-field>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-select
  v-model="sortColumn"
  :items="headers.filter(header => header.key !== 'serial').map(header => header.title)"
  dense
  prepend-inner-icon="mdi-sort-variant"
  label="Sort by"
  @change="sortTable"
></v-select>
      
        </v-toolbar>
      </template>
      <template v-slot:item = '{item, index}'>
        <tr style="background-color: #f9faf1; color:black; font-weight: bold;">
    <td>{{ index + 1 }}</td>  
    <td>{{ item.ID }}</td>
    <td>{{ item.bdate }}</td>
    <td>{{ item.edate }}</td>
    <td>{{ item.category }}</td>
    <td>{{ item.price }}</td>
    <td>{{ item.details }}</td>
  </tr>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        sortColumn: null,
    search: '', // Added search property

  
        dialogDelete: false,
        headers: [
        { title: 'Sl No.', sortable: false, key: 'serial' }, 
        { title: 'Ticket ID', align: 'start', sortable: false,key: 'ID'},
        { title: 'Booking Date', sortable: false, key: 'bdate' },
        { title: 'Entry Date',sortable: false, key: 'edate' },
        { title: 'Category',sortable: false, key: 'category' },
        { title: 'Price',sortable: false, key: 'price'},
        { title: 'Details',sortable: false, key: 'details'},
        ],
        desserts: [],
        
      }),
      created() {
  this.initialize();
   // or 'category' based on your preference
},
      methods: {

        initialize () {
          this.desserts = [
            {
              ID: 12,
              bdate: 159,
              edate: 6.0,
              category: 24,
              price: 4.0,
              details : 1
            },
            {
              ID: 135,
              bdate: 237,
              edate: 9.0,
              category: 37,
              price: 4.3,
              details : 1
            },
            {
              ID: 14,
              bdate: 262,
              edate: 16.0,
              category: 23,
              price: 6.0,
              details : 1
            },
            {
              ID: 160,
              bdate: 305,
              edate: 3.7,
              category: 67,
              price: 4.3,
              details : 1
            },
            {
              ID: 10,
              bdate: 356,
              edate: 16.0,
              category: 49,
              price: 3.9,
              details : 1
            },
            {
              ID: 18,
              bdate: 37578,
              edate: 0.0,
              category: 94,
              price: 0.0,
              details : 1
            },
            {
              ID: 199,
              bdate: 39002,
              edate: 0.2,
              category: 98,
              price: 0,
              details : 1
            },
            {
              ID: 20,
              bdate: 4108,
              edate: 3.2,
              category: 87,
              price: 6.5,
              details : 1
            },
            {
              ID: 21,
              bdate: 452,
              edate: 25.0,
              category: 51,
              price: 4.9,
              details : 1
            },
            {
              ID: 22,
              bdate: 518,
              edate: 26.0,
              category: 65,
              protein: 7,
              details : 1
            },
            {
              ID: 23,
              bdate: 262,
              edate: 16.0,
              category: 23,
              price: 6.0,
              details : 1
            },
            {
              ID : 24,
              bdate: 305,
              edate: 3.7,
              category: 67,
              price: 4.3,
              details : 1
            },
            {
              ID: 25,
              bdate: 262,
              edate: 16.0,
              category: 23,
              price: 6.0,
              details : 1
            },
            {
              ID: 26,
              bdate: 305,
              edate: 3.7,
              category: 67,
              price: 4.3,
              details : 1
            },
            {
              ID: 27,
              bdate: 262,
              edate: 16.0,
              category: 23,
              price: 6.0,
              details : 1
            },
            {
              ID: 28,
              bdate: 305,
              edate: 3.7,
              category: 67,
              price: 4.3,
              details : 1
            },
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.desserts.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.desserts.splice(this.editedIndex, 1)
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        save () {
          if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
          } else {
            this.desserts.push(this.editedItem)
          }
          this.close()
        },


      },
      computed: {
    sortedDesserts() {
      if (this.sortColumn) {
        const key = this.headers.find(header => header.title === this.sortColumn).key;
        return this.desserts.slice().sort((a, b) => {
          return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
        });
      } else {
        return this.desserts;
      }
    },
  },
  watch: {
  sortColumn() {
    this.desserts = this.sortedDesserts;
  },
},
    }
  </script>

  <style scoped>
.v-table{
    width: 76vw !important;
}
</style>
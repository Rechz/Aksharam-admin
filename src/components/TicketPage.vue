<template>
    
        
        
    <v-data-table
      :headers="headers"
      :items="desserts"
      :sort-by="[{ key: 'ID', order: 'asc' }]"
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
      :items="items"
      density="compact"
      class="me-3"
      prepend-inner-icon="mdi-sort-variant"
      label="Sort by"
    ></v-select>
          <v-text-field
            label="Append inner"
            append-inner-icon="mdi-map-marker"
            class="me-3"
            density="comfortable"
          ></v-text-field>
            
         
        </v-toolbar>
      </template>
      <template v-slot:item = '{item, index}'>
        <tr style="background-color: #E8F5E9; color:black; font-weight: bold;">
    <td>{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>{{ item.calories }}</td>
    <td>{{ item.fat }}</td>
    <td>{{ item.carbs }}</td>
    <td>{{ item.protein }}</td>
    <td>{{ item.details }}</td>
  </tr>
      </template>
    </v-data-table>
  </template>
  <script>
    export default {
      data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
        { title: 'Sl No.', key: 'seriel' },  
        { title: 'Ticket ID', align: 'start', sortable: true,key: 'ID'},
        { title: 'Booking Date', sortable: true, key: 'bdate' },
        { title: 'Entry Date', key: 'edate' },
        { title: 'Category', key: 'category' },
        { title: 'Price', key: 'price'},
        { title: 'Details', key: 'details'},
        ],
        desserts: [],
        
      }),
  
      
  
      created () {
        this.initialize()
      },
  
      methods: {
        initialize () {
          this.desserts = [
            {
              name: 'Frozen Yogurt',
              calories: 159,
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              details : 1
            },
            {
              name: 'Ice cream sandwich',
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              details : 1
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              details : 1
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              details : 1
            },
            {
              name: 'Gingerbread',
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              details : 1
            },
            {
              name: 'Jelly bean',
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              details : 1
            },
            {
              name: 'Lollipop',
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              details : 1
            },
            {
              name: 'Honeycomb',
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              details : 1
            },
            {
              name: 'Donut',
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              details : 1
            },
            {
              name: 'KitKat',
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              details : 1
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              details : 1
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              details : 1
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              details : 1
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              details : 1
            },
            {
              name: 'Eclair',
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              details : 1
            },
            {
              name: 'Cupcake',
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
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
    }
  </script>

  <style scoped>
.v-table{
    width: 76vw !important;
}
</style>
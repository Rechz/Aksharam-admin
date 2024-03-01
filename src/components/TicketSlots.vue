<template>
    
  <div class="d-flex bg-white">

  
    
            <v-text-field
              label="Select Employee"
              prepend-inner-icon="mdi-briefcase-account"
              density="compact"
              class="me-2"
            ></v-text-field>

    
  
     
            <v-text-field
              label="Password"
              prepend-inner-icon="mdi-eye"
              density="compact"
              class="me-2"
            ></v-text-field>
  
  
    
  <v-text-field
    label="Tickets Per Slot"
    prepend-inner-icon="mdi-ticket-confirmation"
    density="compact"
              class="me-2"
  ></v-text-field>

      
      <v-btn color="success" dark class="me-2" v-bind="props" style="background-color:  #1B5E20; color: white !important;">
        <b>+ Add a Scanner</b>
      </v-btn>
  

    </div>
 
  
  
      <v-data-table
        :headers="headers"
        :items="desserts"
        :sort-by="[{ key: 'calories', order: 'asc' }]"
        style="background-color: #1B5E20; color:white"
      >
        <template v-slot:top>
          <v-toolbar
            flat
            style="background-color: white;"
          >
          
     <v-spacer></v-spacer>
     <v-spacer></v-spacer>
            
           
            <v-spacer></v-spacer>

            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
  
              <v-card>
          
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.name"
                          label="Emp ID"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.calories"
                          label="Image"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.fat"
                          label="Name"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.carbs"
                          label="Password"
                        ></v-text-field>
                      </v-col>
               
                      <v-col cols="12">
                <v-file-input v-model="editedItem.image" label="Upload Image"></v-file-input>
              </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue-darken-1"
                    variant="text"
                    @click="save"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" width="420px" height="300px">
    <v-card style="border-top: 25px solid #B71C1C">
      <!-- <v-card-title style="background-color: #FFCDD2;" class="mb-2">Delete Employee?</v-card-title> -->
      <v-icon color="red-darken-4" size="48"  class="align-self-center mt-2">mdi-alert</v-icon>
      <v-card-title class="text-h6 mt-2">Are you sure you want to delete this employee?</v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black" class="bg-dark-subtle" density="compact" @click="closeDelete" >Cancel</v-btn>
        <v-btn color="black"  density="compact"  class="hover-red bg-dark-subtle" @click="deleteItemConfirm" >OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
  
  
          </v-toolbar>
        </template>
        <template v-slot:item = '{item,index}'>
          <tr style="background-color: #E8F5E9; color:black; font-weight: bold;">
              <td>{{ index + 1 }}</td>
      <td>{{ item.name }}</td>
      <td>{{ item.calories }}</td>
      <td>{{ item.fat }}</td>
      <td>{{ item.carbs }}</td>
     
      <td>
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </td>
    </tr>
        </template>
      </v-data-table>
    </template>
    <script>
      export default {
        data: () => ({
          dialog: false,
          dialogDelete: false,
          isHovered: false,
          headers: [
          { title: 'Sl No.', key: 'serial no' },
            {
  
              title: 'Emp ID',
              align: 'start',
              sortable: false,
              key: 'name',
            },
            { title: 'Image', key: 'name' },
            { title: 'Name ', key: 'fat' },
            { title: 'Password', key: 'carbs' },
           
            { title: 'Edit / Delete', key: 'actions', sortable: false },
          ],
          desserts: [],
          editedIndex: -1,
          editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            image : null
           
          },
          defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            image : null
          },
        }),
    
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
          },
        },
    
        watch: {
          dialog (val) {
            val || this.close()
          },
          dialogDelete (val) {
            val || this.closeDelete()
          },
        },
    
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
                
              },
              {
                name: 'Ice cream sandwich',
                calories: 237,
                fat: 9.0,
                carbs: 37,
              
              },
              {
                name: 'Eclair',
                calories: 262,
                fat: 16.0,
                carbs: 23,
                
              },
              {
                name: 'Cupcake',
                calories: 305,
                fat: 3.7,
                carbs: 67,
                
              },
              {
                name: 'Gingerbread',
                calories: 356,
                fat: 16.0,
                carbs: 49,
             
              },
              {
                name: 'Jelly bean',
                calories: 375,
                fat: 0.0,
                carbs: 94,
             
              },
              {
                name: 'Lollipop',
                calories: 392,
                fat: 0.2,
                carbs: 98,
               
              },
              {
                name: 'Honeycomb',
                calories: 408,
                fat: 3.2,
                carbs: 87,
               
              },
              {
                name: 'Donut',
                calories: 452,
                fat: 25.0,
                carbs: 51,
            
              },
              {
                name: 'KitKat',
                calories: 518,
                fat: 26.0,
                carbs: 65,
             
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
  
    <style>
  .v-table{
      width : 73vw;
  }
  .hover-red:hover {
    background-color: #b71c1c !important; /* Change this to the desired hover color */
    color: white !important; /* Change this to the desired text color */
  }
  
  </style>
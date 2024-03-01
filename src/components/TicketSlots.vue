<template>
    

    <div class="d-flex bg-white">
      <v-text-field v-model="newSlot.in" label="Time IN" prepend-inner-icon="mdi-clock-time-four" density="compact" class="me-2"></v-text-field>
      <v-text-field v-model="newSlot.out" label="Time OUT" prepend-inner-icon="mdi-clock-time-four" density="compact" class="me-2"></v-text-field>
      <v-text-field v-model="newSlot.ticketno" label="Tickets Per Slot" prepend-inner-icon="mdi-ticket-confirmation" density="compact" class="me-2"></v-text-field>
      <v-btn color="rgb(25, 103, 25)" dark class="mb-2 me-2" @click="addSlot">
  <b>+ Add Slot</b>
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
                          v-model="editedItem.in"
                          label="Time IN"
                        ></v-text-field>
                      </v-col>
              
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.out"
                          label="Time OUT"
                        ></v-text-field>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.ticketno"
                          label="No. of Tickets"
                        ></v-text-field>
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
          <tr style="background-color:#F9FBE7; color:black; font-weight: bold;">
            <td>{{ index + 1 }}</td>
   
      <td>{{ item.in }}</td>
      <td>{{ item.out }}</td>
      <td>{{ item.ticketno }}</td>
     
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
          newSlot: {
      in: '',
      out: '',
      ticketno: '',
    },
          dialog: false,
          dialogDelete: false,
          isHovered: false,
          headers: [
          { title: 'Sl No.', key: 'serial no' },
            { title: 'Time IN', key: 'in' },
            { title: 'Time OUT', key: 'out' },
            { title: 'No.of Tickets', key: 'ticketno' },
           
            { title: 'Edit / Delete', key: 'actions', sortable: false },
          ],
          desserts: [],
          editedIndex: -1,
          editedItem: {
         
            in: 0,
            out: 0,
            ticketno: 0,
          
           
          },
          defaultItem: {
 
            in: 0,
            out: 0,
            ticketno: 0,

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
       
                in: 159,
                out: 6.0,
                ticketno: 24,
                
              },
              {

                in: 19,
                out: 6.05,
                ticketno: 2344,
              
              },
              {
          
                in: 179,
                out: 35,
                ticketno: 24,
                
              },
              {
             
                in: 190,
                out: 65,
                ticketno: 44,
                
              },
              {
               
                in: 79,
                out: 698,
                ticketno: 23,
             
              },
              {
           
                in: 89988,
                out: 85,
                ticketno: 4,
             
              },
              {
           
                in: 19,
                out: 905,
                ticketno: 2388944,
               
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
          }, addSlot() {
    if (!this.newSlot.in || !this.newSlot.out || !this.newSlot.ticketno) {
      // Show an error message or handle it as needed
      return;
    }

    const newSlot = {
      // You may consider adding a unique key here
      in: this.newSlot.in,
      out: this.newSlot.out,
      ticketno: this.newSlot.ticketno,
    };

    this.desserts.push(newSlot);

    // Optionally, provide feedback for successful slot addition
   // this.$toast.success('Slot added successfully'); // Adjust this line based on your notification mechanism

    // Clear the input fields after adding the slot
    this.newSlot.in = '';
    this.newSlot.out = '';
    this.newSlot.ticketno = '';
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
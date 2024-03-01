<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
   
    style="background-color: #1B5E20; color:white"
  >
    <template v-slot:top>
      <v-toolbar flat style="background-color: white;">   
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="underlined"
          class="mx-5 w-20"
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn
             color="success"
             dark
             class="mb-2"
             v-bind="props"
             style="background-color: #1B5E20; color: white !important;"
            ><b> + Add Employee </b>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-center" style="background-color: #1B5E20; color: white !important;"><span class="text-h6">{{formTitle}}</span></v-card-title> 
            <v-card-text class="mb-0">
              <v-container class="py-0 d-flex flex-column ">
                <v-text-field
                 v-model="editedItem.empId"
                 prepend-inner-icon="mdi-card-account-details-outline"
                 label="Emp ID"
                 density="comfortable"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                  prepend-inner-icon="mdi-account-outline"
                  density="comfortable"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.contact"
                  label="Phone No"
                  prepend-inner-icon="mdi-phone-outline"
                  density="comfortable"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  label="Email ID"
                  prepend-inner-icon="mdi-email-outline"
                  density="comfortable"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.addressTemp"
                  label="Temporary Address"
                  prepend-inner-icon="mdi-map-marker-outline"
                  density="comfortable"
                ></v-text-field>   
                <v-text-field
                  v-model="editedItem.addressPerm"
                  label="Permanent Address"
                  prepend-inner-icon="mdi-home-map-marker"
                  density="comfortable"
                ></v-text-field> 
             <v-file-input v-model="editedItem.image" label="Upload Image" density="comfortable" class="mb-0" prepend-inner-icon="mdi-paperclip"></v-file-input>
             <v-card-actions class="d-flex justify-content-end">
              <div >
              <v-btn color="black" class="bg-dark-subtle" @click="close">Cancel</v-btn>
              <v-btn color="black" class="bg-dark-subtle" @click="save">{{formButton}}</v-btn>
              </div>
            </v-card-actions>
              </v-container>
            </v-card-text>
            
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="420px" height="300px">
  <v-card style="border-top: 25px solid #B71C1C">
    <!-- <v-card-title style="background-color: #FFCDD2;" class="mb-2">Delete Employee?</v-card-title> -->
    <v-icon color="red-darken-4" size="48"  class="align-self-center mt-2">mdi-alert</v-icon>
    <v-card-text class="text-h6 mt-1 text-center">Are you sure you want to delete this employee?</v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div class="d-flex justify-content-center mb-3">
        <v-btn color="black" class="bg-dark-subtle" density="compact" @click="closeDelete" >Cancel</v-btn>
        <v-btn color="black"  density="compact"  class="hover-red bg-danger-subtle" @click="deleteItemConfirm" >Delete</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</v-dialog>


        </v-toolbar>
      </template>
      <template v-slot:item = '{item,index}'>
        <tr style="background-color: #E8F5E9; color:black; font-weight: bold;">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ item.empId }}</td>
          <td class="text-center">{{ item.name }}</td>
          <td class="text-center">{{ item.contact }}</td>
          <td class="text-center"><v-icon size="small">mdi-eye</v-icon></td>
          <td class="text-center">
            <v-icon size="small" class="me-3" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon size="small" @click="deleteItem(item)">mdi-delete</v-icon>
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
          { title: 'SL No.', align: 'center', key: 'serial no', sortable: false },
          { title: 'EMP ID', align: 'center', key: 'name', sortable: false},
          { title: 'NAME', align: 'center', key: 'name', sortable: false },
          { title: 'CONTACT', align: 'center', key: 'fat', sortable: false },
          { title: 'DETAILS', align: 'center', key: 'carbs', sortable: false },
          { title: 'EDIT / DELETE', align: 'center', key: 'actions', sortable: false},
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
          empId: '',
          name: '',
          contact: null,
          addressTemp: '',
          addressPerm: '',
          email:'',
          image:null 
        },
        defaultItem: {
          empId: '',
          name: '',
          contact: null,
          addressTemp: '',
          addressPerm: '',
          email:'',
          image:null 
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'Add Employee' : 'Edit Employee'
        },
        formButton () {
          return this.editedIndex === -1? 'Add' : 'Update'
        }
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
              empId: 'AKSH1001',
              name: 'Anju',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:'' 
            },
            {
              empId: 'AKSH1002',
              name: 'Akhila',
              contact: 945895743,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1003',
              name: 'Deva',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1004',
              name: 'Ebin',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1005',
              name: 'Neethu',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1006',
              name: 'Stephy',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1007',
              name: 'Sangeetha',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1008',
              name: 'Aswathy',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1009',
              name: 'Siya',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
            },
            {
              empId: 'AKSH1010',
              name: 'Reshma',
              contact: 963895623,
              addressTemp: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              addressPerm: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:''
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
    width : 70vw;
}
.hover-red:hover {
  background-color: #b71c1c !important; /* Change this to the desired hover color */
  color: white !important; /* Change this to the desired text color */
}
.v-input__prepend, .v-input__append {
    display: none;
}
</style>
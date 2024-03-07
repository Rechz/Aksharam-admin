<template>
  <div class="d-flex justify-content-between">


<v-dialog v-model="dialog" width="500px">
          <template v-slot:activator="{ props }">
            <v-btn
             color="#236726"
             v-bind="props"
             style="background-color: #1B5E20; color: white !important; text-transform: capitalize;"
             class="mb-4"
            ><b> + Add Employee </b>
            </v-btn>
          </template>
          <v-card class="pb-3 ">
            <v-card-title class="text-center" style="background-color: #1B5E20; color: white !important;">
              <span class="text-h6">{{formTitle}}</span>
            </v-card-title> 
            <v-card-text class="mb-0 mx-5">
              <v-container class="py-0 d-flex flex-column">
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
                <v-card-actions>
                 
                    <!-- <v-btn color="black" class="bg-dark-subtle" @click="close">Cancel</v-btn> -->
                    <v-btn color="white" block :style= "{ backgroundColor: editedIndex === -1 ? '#1B5E20' : '#546E7A' }" class="rounded-5" elevation="4" @click="save">{{formButton}}</v-btn>
                  
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>


        <v-text-field
          v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="underlined" 
            class="search mt-4"
            density="compact"
          ></v-text-field>

        </div>
  <v-data-table
    :headers="headers"
    :items="desserts"
    class="mt-3"
    style="background-color: #f9faf1;"
  >
    <template v-slot:top>
    
        
        <v-dialog v-model="dialogDelete" width="400px">
          <v-card class="rounded-4 pb-4">
            <v-card-title class="mb-2 text-white text-center" style="background-color: #BA1A1A;">Delete Employee?</v-card-title>
            <v-icon color="red-accent-4" size="54"  class="align-self-center mt-2">mdi-trash-can</v-icon>
            <v-card-text class="text-h6 mt-1 text-center">Are you sure you want to delete?</v-card-text>
            <v-card-actions style="display: block;">
              <v-btn block class=" rounded-4 text-white" style="background-color: #BA1A1A;"  @click="deleteItemConfirm" >Delete</v-btn>
              <v-btn block variant="text rounded-4" @click="closeDelete" >Cancel</v-btn>
              
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- Add new dialog for displaying details -->
<v-dialog v-model="detailsDialog" width="400px">
  <v-card style="width: 650px; height:310px; border-radius: 15px;">
    <v-card-title class="text-left" style="background-color: #1B5E20; color: white !important; position: relative;">
      <span class="text-h6 ms-4 " >Employee Details</span>
      <v-icon
        @click="closeDetails"
        class="close me-4" 
        style="position: absolute; top: 1; right: 0 ; left:10; cursor: pointer;"
      >mdi-window-close</v-icon>
    </v-card-title>
    <v-card-text class="mb-0  ms-1">
      <v-container class="py-0 d-flex flex-column">
        <v-row class="mb-2 mt-2">
          <div class="col-4">
            <strong>Emp ID    </strong>   
          </div>
          <div class="col-3">
            : {{ editedItem.empId }}
          </div>
         
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Name     </strong> 
          </div>
          <div class="col-3">
            : {{ editedItem.name }}
          </div>
         
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Contact      </strong> 
          </div>

          <div class="col-4">
            : {{ editedItem.contact }}
          </div>
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Email      </strong>
          </div>
          <div class="col-3">
            : {{ editedItem.email }}
          </div>
        </v-row>
       
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
    </template>
    
    <template v-slot:item="{ item, index }">
      <tr style="background-color:#f9faf1; color:black;">
        <td class="text-center">{{ index + 1 }}</td>
        <td class="text-center">{{ item.empId }}</td>
        <td class="text-center">{{ item.name }}</td>
        <td class="text-center">{{ item.contact }}</td>
        <td class="text-center"><v-icon size="large" color="blue-grey-darken-3" @click="showDetails(item)">mdi-eye</v-icon></td>
        <td class="text-center">
          <v-icon size="large"
          color="teal-darken-3" class="me-4" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon size="large"
          color="danger" class="ms-4" @click="deleteItem(item)">mdi-trash-can</v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

  <script>
    export default {
      data: () => ({
        dialog: false,
        detailsDialog: false,
        dialogDelete: false,
        isHovered: false,
        search: '',
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

    filteredDesserts() {
      return this.desserts.filter((item) =>
        item.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
        showDetails(item) {
      this.editedItem = Object.assign({}, item);
      this.detailsDialog = true;
    },
    closeDetails() {
      this.detailsDialog = false;
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
.v-toolbar__content{
  height: 150px !important;
  }
  .v-table__wrapper>table>thead{
    background-color: #236726;
    color: white;
  }
  .search.v-input{
    display: flex;
    justify-content: end;
  }
  .search .v-input__control{
    width: 250px;
    background-color: #DFE4D7 ;
  }
</style>
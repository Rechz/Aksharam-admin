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
              <v-container class="py-0 mb-0 d-flex flex-column">
                <!-- <v-text-field
                 v-model="editedItem.empId"
                 prepend-inner-icon="mdi-card-account-details-outline"
                 label="Emp ID"
                 density="comfortable"
                ></v-text-field> -->
                <div>
    <v-hover v-slot="{ isHovering, props }">
     
      <v-img :src="editedIndex !== -1 ? editedItem.image : image" alt="Upload Image" style="height: 200px;" class="mb-3" v-bind="props">
        <v-overlay
          :model-value="isHovering"
          class="align-center justify-center"
          scrim="#036358"
          contained
        >
          <v-btn variant="flat" style="text-transform: capitalize">{{ editedIndex !== -1 ? 'Change' : 'Add'}}</v-btn>
        </v-overlay>
      </v-img>
     
    </v-hover>
  </div>
                <div>
                  <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                  prepend-inner-icon="mdi-account-outline"
                  density="comfortable"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.phoneNo"
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
                  v-model="editedItem.tempAddress"
                  label="Temporary Address"
                  prepend-inner-icon="mdi-map-marker-outline"
                  density="comfortable"
                ></v-text-field>   
                <v-text-field
                  v-model="editedItem.permAddress"
                  label="Permanent Address"
                  prepend-inner-icon="mdi-home-map-marker"
                  density="comfortable"
                ></v-text-field> 
                </div>
        
                
                
                <v-card-actions>
                 
                    <!-- <v-btn color="black" class="bg-dark-subtle" @click="close">Cancel</v-btn> -->
                    <v-btn color="white" block :style= "{ backgroundColor: editedIndex === -1 ? '#1B5E20' : '#546E7A' }" style="text-transform: capitalize" class="rounded-5" elevation="4" @click="save">{{formButton}}</v-btn>
                  
                </v-card-actions>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>


      <v-text-field
    label="Search"
    v-model="search"
    prepend-inner-icon="mdi-magnify"
   
    class="search mt-5"
    density="compact"
  ></v-text-field>

        </div>
  <v-data-table
    :headers="headers"
    :items="filteredEmployees"
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
  <v-card style="width: 620px; height:400px; border-radius: 15px;">
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
        <div class="row">
          <div class="col-6">
            <v-row class="mb-2 mt-2">
          <div class="col-4">
            <strong>Emp ID    </strong>   
          </div>
          <div class="col-8">
            : {{ editedItem.employeeId }}
          </div>
         
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Name     </strong> 
          </div>
          <div class="col-8">
            : {{ editedItem.name }}
          </div>
         
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Contact      </strong> 
          </div>

          <div class="col-8">
            : {{ editedItem.phoneNo }}
          </div>
        </v-row>
        <v-row class="mb-2 mt-2">
          <div class="col-4">
            <strong>Temporary Address   </strong>   
          </div>
          <div class="col-8">
            : {{ editedItem.tempAddress }}
          </div>
         
        </v-row>
        <v-row class="mb-2 mt-2">
          <div class="col-4">
            <strong>Permanent Address    </strong>   
          </div>
          <div class="col-8">
            : {{ editedItem.permAddress }}
          </div>
         
        </v-row>
        <v-row class="mb-2">
          <div class="col-4">
            <strong>Email      </strong>
          </div>
          <div class="col-8">
            : {{ editedItem.email }}
          </div>
        </v-row>
          </div>
          <div class="col-6">
            <img :src='editedItem.image' alt="employee" style="height: 250px;"/>
          </div>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</v-dialog>
    </template>
    
    <!-- <template v-slot:item="{ item, index }"> -->
      <template v-slot:item="{ item}">
      <tr style="background-color:#f9faf1; color:black;">
        <!-- <td class="text-center">{{ index + 1 }}</td> -->
        <td class="text-center">{{ item.employeeId }}</td>
        <td class="text-center">{{ item.name }}</td>
        <td class="text-center"><img :src='item.image' alt="employee" style="border-radius: 50%; height: 50px;"/></td>
        <td class="text-center">{{ item.phoneNo }}</td>
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
  import axios from 'axios';
    export default {
      data: () => ({
        dialog: false,
        overlay: true,
        dates: [],
        detailsDialog: false,
        dialogDelete: false,
        isHovered: false,
        search: '',
        image: require('@/assets/acc.jpg'), 
        employees : [
            {
              employeeId: 'AKSH1001',
              name: 'Anju',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1002',
              name: 'Akhila',
              phoneNo: 945895743,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1003',
              name: 'Deva',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1004',
              name: 'Ebin',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1005',
              name: 'Neethu',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1006',
              name: 'Stephy',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1007',
              name: 'Sangeetha',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1008',
              name: 'Aswathy',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1009',
              name: 'Siya',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
            {
              employeeId: 'AKSH1010',
              name: 'Reshma',
              phoneNo: 963895623,
              tempAddress: 'Advdfgh, Street No.12, Kalavoor P.O, Alappuzha',
              permAddress: 'GDGHJrggh, Street No.33, Ambalapuzha P.O, Alappuzha',
              email:'anju@gmail.com',
              image:require('@/assets/pic1.jpg') 
            },
           ],
        headers: [
      // { title: 'SL No.', align: 'center', key: 'serial no', sortable: false },
   { title: 'EMP ID', align: 'center', key: 'empID', sortable: false},
     { title: 'IMAGE', align: 'center', key: 'image', sortable: false },
      { title: 'NAME', align: 'center', key: 'name', sortable: false },
        { title: 'CONTACT', align: 'center', key: 'fat', sortable: false },
    { title: 'DETAILS', align: 'center', key: 'carbs', sortable: false },
    { title: 'EDIT / DELETE', align: 'center', key: 'actions', sortable: false},
        ],
        
        editedIndex: -1,
        editedItem: {
          employeeId: '',
          name: '',
          phoneNo: null,
          tempAddress: '',
          permAddress: '',
          email:'',
          image:null 
        },
        defaultItem: {
          employeeId: '',
          name: '',
          phoneNo: null,
          tempAddress: '',
          permAddress: '',
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
        },
      filteredEmployees() {
      if (this.search !== '') {
        return this.employees.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) || item.employeeId.toLowerCase().includes(this.search.toLowerCase()) 
        );
      }
      else { return this.employees; }
      
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
  
      // created () {
      //   this.initialize()
      // },


//   mounted () {
// this.getDetails();
//   },
  
      methods: {
        // initialize () {
          
        // },
  async getDetails() {
   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcxMDEzMzU3OSwiZXhwIjoxNzEwMTU1MTc5fQ.CT6zbwVpFay7tX5OHazu5fDn-ljpbp5dsL5gFIOIJOg';
    try{
      const response = await axios.get('http://localhost:8080/api/admin/employees', {
          headers: {
            Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
          }
        });
      if(response.status === 200){
        const fetchedEmployees = response.data; 
      this.employees = fetchedEmployees;
      }
    }
    catch(error) {
      console.error(error);
      alert(error)
    }
},
        editItem (item) {
          this.editedIndex = this.employees.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.employees.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.employees.splice(this.editedIndex, 1)
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
            Object.assign(this.employees[this.editedIndex], this.editedItem)
          } else {
            this.employees.push(this.editedItem)
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
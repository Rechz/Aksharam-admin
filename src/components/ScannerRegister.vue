<template>  
<v-row class=" d-flex align-items-start bg-white">
  <v-col cols="11" sm="4">
    <v-text-field
      label="Select Employee"
      prepend-inner-icon="mdi-briefcase-account"
      density="compact"
      class="emp"
    ></v-text-field>
  </v-col>
  <v-col cols="11" sm="4">   
    <v-text-field
      label="Password"
      prepend-inner-icon="mdi-eye"
      density="compact"
      class="emp"
    ></v-text-field>
  </v-col>
  <v-col cols="5" sm="4">
    <v-btn style="background-color: #1B5E20 !important; color: white !important; text-transform: capitalize;"><b> + Add Scanner </b></v-btn>
  </v-col>
</v-row>
<v-spacer></v-spacer>
<v-spacer></v-spacer>
<div class="d-flex justify-content-end ">
  
  <v-text-field
    v-model="search"
    label="Search"
    prepend-inner-icon="mdi-magnify"
    
    class="search"
   density="compact"
  ></v-text-field>
</div>
<v-data-table
  :headers="headers"
  :items="filteredScanner"
  style="background-color: #f9faf1; color:black; "
  class="mt-3"
>  
  <template v-slot:top>
    <!-- <v-toolbar
      flat
      style="background-color: white;"
    > -->
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.nam"
                  label="Employee ID"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.calories"
                  label="Employee Name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.fat"
                  label="New Password"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.carbs"
                  label="Confirm Password"
                ></v-text-field>
              </v-col>
              <!-- <v-col cols="12">
                <v-file-input v-model="editedItem.image" label="Upload Image"></v-file-input>
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" width="400px">
      <v-card class="rounded-4 pb-4">
      <v-card-title class="mb-2 text-white text-center" style="background-color: #BA1A1A;">Delete Employee?</v-card-title>
    <v-icon color="red-accent-4" size="54"  class="align-self-center mt-2">mdi-trash-can</v-icon>
    <v-card-text class="text-center">Are you sure you want to delete?</v-card-text>
    <v-card-actions style="display: block;">
   
      <v-btn color="black" block class=" rounded-4 text-white" style="background-color: #BA1A1A; " @click="deleteItemConfirm" >Delete</v-btn>
      <v-btn color="black" block variant="text rounded-4" @click="closeDelete" >Cancel</v-btn>
      <v-spacer></v-spacer>
     
      
    </v-card-actions>
  </v-card>
</v-dialog>


        <!-- </v-toolbar> -->
      </template>
      <template v-slot:item = '{item,index}'>
        <tr style="background-color: #f9faf1; color:black; ">
            <td class="text-center">{{ index + 1 }}</td>
    <td class="text-center">{{ item.empId }}</td>
    <!-- <td class="text-center"><img :src='item.image' alt="employee" style="border-radius: 50%; height: 50px;"/> </td> -->
    <td class="text-center">{{ item.name }}</td>
    <!-- <td class="text-center">{{ item.password }}</td> -->
   
    <td class="text-center">
      <v-icon
      size="large"
          color="teal-darken-3" class="me-4"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
      size="large"
          color="danger" class="ms-4" 
        @click="deleteItem(item)"
      >
        mdi-trash-can
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
        search: '',
        headers: [
        { title: 'Sl No.', key: 'slno',sortable: false,align:'center' },
        { title: 'Emp ID', sortable: false,align:'center', key: 'empId' },
        // { title: 'Image', key: 'image',sortable: false,align:'center' },
        { title: 'Name ', key: 'name',sortable: false,align:'center' },
        // { title: 'Password', key: 'password',sortable: false,align:'center' },
        { title: 'Edit / Delete', key: 'actions',sortable: false,align:'center' },
        ],
        scanner: [],
        editedIndex: -1,
        editedItem: {
          empId: '',
          image: null,
          name: '',
          password: null,
        },
        defaultItem: {
          empId: '',
          image: null,
          name: '',
          password: null,
        },
      }),
  
      computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
        filteredScanner() {
          if (this.search !== '') {
        return this.scanner.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) || item.empId.toLowerCase().includes(this.search.toLowerCase()) 
        );
      }
      else { return this.scanner; }
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
          this.scanner = [
            {
              empId: 'AME1001',
              name: 'Anju',
              image: require('@/assets/pic1.jpg'),
              password: 'am@12', 
            },
            {
              empId: 'AME1002',
              name: 'Akhila',
              image: require('@/assets/pic1.jpg'),
              password: 'am@13', 
            },
            {
              empId: 'AME1003',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@14', 
            },
            {
              empId: 'AME1004',
              name: 'Neethu',
              image: require('@/assets/pic1.jpg'),
              password: 'am@15', 
            },
            {
              empId: 'AME1005',
              name: 'Siya',
              image: require('@/assets/pic1.jpg'),
              password: 'am@16', 
            },
            {
              empId: 'AME1006',
              name: 'Stephy',
              image: require('@/assets/pic1.jpg'),
              password: 'am@17', 
            },
            {
              empId: 'AME1007',
              name: 'Sangeetha',
              image: require('@/assets/pic1.jpg'),
              password: 'am@18', 
            },
            {
              empId: 'AME1008',
              name: 'Reshma',
              image: require('@/assets/pic1.jpg'),
              password: 'am@19', 
            },
            {
              empId: 'AME1009',
              name: 'Aswathy',
              image: require('@/assets/pic1.jpg'),
              password: 'am@20', 
            },
            {
              empId: 'AME1010',
              name: 'Sreeja',
              image: require('@/assets/pic1.jpg'),
              password: 'am@21', 
            },
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.scanner.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.scanner.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.scanner.splice(this.editedIndex, 1)
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
            Object.assign(this.scanner[this.editedIndex], this.editedItem)
          } else {
            this.scanner.push(this.editedItem)
          }
          this.close()
        },
      },
    }
  </script>

  <style>
/* .v-table{
    width : 73vw;
} */

.v-table__wrapper>table>thead{
    background-color: #236726;
    color: white;
  }
  .search.v-input{
    display: flex;
    justify-content: end;
  }
  .search .v-input__control{
    width: 300px;
    background-color: #DFE4D7 ;
  }
  .emp .v-input__control{
    background-color: #DFE4D7 ;
  }

</style>
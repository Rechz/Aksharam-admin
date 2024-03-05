<template>
    
<v-row class="mx-2 d-flex align-items-start bg-white">
  <v-col cols="11" sm="4">

  
          <v-text-field
            label="Select Employee"
            prepend-inner-icon="mdi-briefcase-account"
            density="compact"
          ></v-text-field>
  </v-col>
  
  <v-col cols="11" sm="4">
    <v-responsive class="mx-auto"  max-width="310">
   
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-eye"
            density="compact"
          ></v-text-field>
    </v-responsive>
    
  </v-col>
  <v-col cols="5" sm="4">
    <v-btn
    style="background-color: #1B5E20 !important; color: white !important;">
    <b> + Add Scanner </b>
</v-btn>
  </v-col>
</v-row>
<div class="d-flex justify-content-end">
  <v-text-field
          v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
            class="search w-25"
            style="width: 20px;"
            density="compact"
          ></v-text-field>
</div>


    <v-data-table
      :headers="headers"
      :items="scanner"
      style="background-color: #f9faf1; color:black; "
    >
   
      <template v-slot:top>
        <v-toolbar
          flat
          style="background-color: white;"
        >
          
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
        <tr style="background-color: #f9faf1; color:black; ">
            <td class="text-center">{{ index + 1 }}</td>
    <td class="text-center">{{ item.empId }}</td>
    <td class="text-center">{{ item.image }}</td>
    <td class="text-center">{{ item.name }}</td>
    <td class="text-center">{{ item.password }}</td>
   
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
        { title: 'Sl No.', key: 'slno',sortable: false,align:'center' },
        { title: 'Emp ID', sortable: false,align:'center', key: 'empId' },
        { title: 'Image', key: 'image',sortable: false,align:'center' },
        { title: 'Name ', key: 'name',sortable: false,align:'center' },
        { title: 'Password', key: 'password',sortable: false,align:'center' },
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
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
            },
            {
              empId: 'AME1001',
              name: 'Deva',
              image: require('@/assets/pic1.jpg'),
              password: 'am@123', 
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
.v-table{
    width : 73vw;
}
.hover-red:hover {
  background-color: #b71c1c !important; /* Change this to the desired hover color */
  color: white !important; /* Change this to the desired text color */
}
.v-table__wrapper>table>thead{
    background-color: #236726;
    color: white;
  }
</style>
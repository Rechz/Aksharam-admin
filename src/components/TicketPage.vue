<template>  
<div class="d-flex justify-content-between">
  
  <v-text-field
    label="Search"
    v-model="search"
    prepend-inner-icon="mdi-magnify"
    class="search"
    density="compact"
    @click="search"
  ></v-text-field>
  <v-spacer></v-spacer>
  <v-select
    v-model="sortColumn"
    :items="headers.filter(header => header.key !== 'serial'&& header.key !== 'detail').map(header => header.title)"
    density="compact"
    prepend-inner-icon="mdi-sort-variant"
    label="Sort by"
    @change="sortTable"
    class="sort"
  ></v-select>

</div>  
    <v-data-table
      :headers="headers"
      :items="filteredTickets"
      style="background-color: #f9faf1;"
      max-width="100%"
      items-per-page="5"
    >
      <template v-slot:filteredtickets = '{item}'>
        <tr style="background-color:#f9faf1; color:black;" class="text-center">
           <td>{{ index+1 }}</td> 
          <td>{{ item.ID }}</td>
          <td>{{ item.bdate }}</td>
          
          <td>{{ item.edate }}</td>
          <td>{{ item.category }}</td>
          <td>Rs.{{ item.price }}/-</td>
          <td><v-icon size="large" color="blue-grey-darken-3" @click="showDetails(item)">mdi-eye</v-icon></td>
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
        { title: 'Sl No.', sortable: false, key: 'serial', align: 'center' }, 
        { title: 'Ticket ID', align: 'center', sortable: false, key: 'ID'},
        { title: 'Booking Date', sortable: false, key: 'bdate', align: 'center' },
        { title: 'Entry Date',sortable: false, key: 'edate', align: 'center' },
        { title: 'Category',sortable: false, key: 'category', align: 'center' },
        { title: 'Price',sortable: false, key: 'price', align: 'center'},
        { title: 'Details',sortable: false, align: 'center',key:'detail'},
        ],
        tickets: [],
        
      }),
  created() {
  this.initialize();
},
      methods: {
        initialize () {
          this.tickets = [
            {
              ID: 'AKS1001',
              bdate: '2024-01-12',
              edate: '2024-01-31',
              category: 'PUBLIC',
              price: '120',
            },
            {
              ID: 'AKS1002',
              bdate: '2024-01-12',
              edate: '2024-01-10',
              category: 'INSTITUTION',
              price: '1120',
            },
            {
              ID: 'AKS1011',
              bdate: '2024-01-14',
              edate: '2024-01-29',
              category: 'PUBLIC',
              price: '360',
            },
            {
              ID: 'AKS1012',
              bdate: '2024-01-17',
              edate: '2024-02-02',
              category: 'FOREIGNER',
              price: '200',
            },
            {
              ID: 'AKS1003',
              bdate: '2024-01-20',
              edate: '2024-02-06',
              category: 'INSTITUTION',
              price: '1120',
            },
            {
              ID: 'AKS1004',
              bdate: '2024-01-17',
              edate: '2024-02-07',
              category: 'INSTITUTION',
              price: '1120',
            },
            {
              ID: 'AKS1015',
              bdate: '2024-01-21',
              edate: '2024-02-10',
              category: 'PUBLIC',
              price: '560',
            },
            {
              ID: 'AKS1016',
              bdate: '2024-01-21',
              edate: '2024-02-10',
              category: 'PUBLIC',
              price: '220',
            },
            {
              ID: 'AKS1017',
              bdate: '2024-01-30',
              edate: '2024-01-10',
              category: 'FOREIGNER',
              price: '400',
            },
          
            {
              ID: 'AKS1005',
              bdate: '2024-01-17',
              edate: '2024-01-28',
              category: 'PUBLIC',
              price: '120',
            },
            {
              ID : 'AKS1006',
              bdate: '2024-01-21',
              edate: '2024-01-30',
              category: 'FOREIGNER',
              price: '500',
            },
            {
              ID: 'AKS1007',
              bdate: '2024-02-03',
              edate: '2024-02-11',
              category: 'PUBLIC',
              price: '260',
            },
            {
              ID: 'AKS1008',
              bdate: '2024-01-22',
              edate: '2024-02-05',
              category: 'PUBLIC',
              price: '220',
            },
            {
              ID: 'AKS1009',
              bdate: '2024-01-12',
              edate: '2024-01-31',
              category: 'STUDENT',
              price: '1120',
            },
          ]
        },
  
        editItem (item) {
          this.editedIndex = this.tickets.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.tickets.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
  
        deleteItemConfirm () {
          this.tickets.splice(this.editedIndex, 1)
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
            Object.assign(this.tickets[this.editedIndex], this.editedItem)
          } else {
            this.tickets.push(this.editedItem)
          }
          this.close()
        },


      },
      computed: {
    sortedTickets() {
      if (this.sortColumn) {
        const key = this.headers.find(header => header.title === this.sortColumn).key;
        return this.tickets.slice().sort((a, b) => {
          return a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
        });
      } else {
        return this.tickets;
      }
        },
       filteredTickets() {
          if (this.search !== '') {
        return this.tickets.filter((item) =>
          item.ID.toLowerCase().includes(this.search.toLowerCase()) || item.bdate.toLowerCase().includes(this.search.toLowerCase()) || item.edate.toLowerCase().includes(this.search.toLowerCase()) 
          || item.category.toLowerCase().includes(this.search.toLowerCase())  
        );
      }
      else { return this.tickets; }
        } 
    },
  watch: {
  sortColumn() {
    this.tickets = this.sortedTickets;
  },
},
    }
  </script>


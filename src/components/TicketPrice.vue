<template>
  <v-app>
    <div class="d-flex justify-content-end ">
      <v-btn class=" text-capitalize" color="#2C7721" size="large" style="font-size: 16px; font-weight: 600;" @click="dialogAdd = true" variant="outlined" density="comfortable">
        + Add Price</v-btn>
    </div>
    <v-dialog width="400" max-width="800" v-model="dialogAdd">
      <v-card style="width: 400px; height:auto; border-radius: 15px;" class="pb-5">
        <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: #FFFFFF;">
          <h4>Price Details</h4>
          <v-icon @click="closeDialogAdd" class="mdi mdi-window-close"></v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="category" :items="categoryItems" label="Category" class="price" density="comfortable"
                  :single-line="category"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="type" :items="typeItems" label="Type" class="price" density="comfortable"
                  :single-line="type"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="price" label="Price" class="price" density="comfortable"
                  single-line></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn color="white" block style="background-color: #1B5E20; text-transform: capitalize" class="rounded-5"
            elevation="4" size="large" @click="addPrice">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <PriceTable :items="priceList.public" head="PUBLIC" class="mb-4" />
    <PriceTable :items="priceList.institution" head="INSTITUTION" class="mb-4" />
    <PriceTable :items="priceList.foreigner" head="FOREIGNER" class="mb-4" />
    <PriceTable :items="priceList.tax" head="TAX" />
  </v-app>
</template>

<script>
import PriceTable from './PriceTable.vue';
export default {
  components: {
    PriceTable
  },
  computed : {
    priceList() {
      return this.$store.getters.getPriceList;
    },
    
  },
  data() {
    return {
      dialogAdd: false,
      category: null,
      type: null,
      price: null,
      categoryItems: ['public', 'foreigner', 'institution', 'tax'],
      typeItems: []
    };
  },
  watch: {
    category(newValue) {
      this.type = null;
      if (newValue === 'public') {
        this.typeItems = ['adult', 'child', 'senior'];
      } else if (newValue === 'institution') {
        this.typeItems = ['teacher', 'student'];
      } else if (newValue === 'tax') {
        this.typeItems = ['IGST', 'GST', 'CESS', 'ENTERTAINMENT TAX'];
      } else if (newValue === 'foreigner') {
        this.typeItems = ['foreign_adult', 'foreign_child'];
      } else {
        this.typeItems = [];
      }
    }
  },
  mounted() {
    this.loadPrice();
},
  methods: {
    async addPrice() {
      this.dialogAdd = true;
      try {
        const body = {
          "price": parseInt(this.price),
          "type": this.type,
          "category": this.category
        }
        const res = await this.$store.dispatch("addPrice", body);
        if (res) {
          this.message = "Added Successfully!"
          window.location.reload();
        }
      }
      catch (error) {
        console.error(error);
      }
    },

    closeDialogAdd() {
      this.dialogAdd = false;
    },
      async loadPrice() {
        try {
          await this.$store.dispatch('loadPrice')
          }
        catch (error) {
          console.error(error)
        }
      },
  }
};
</script>


<style scoped>
:deep(.v-table) {
  width: 76vw;
}
:deep(.price .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}

:deep(.price .v-input__details) {
  display: none;
}
</style>
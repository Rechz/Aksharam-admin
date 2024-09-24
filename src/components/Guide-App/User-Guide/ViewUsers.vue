 <template>
  <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
  <v-container v-else class="pb-8 px-0" fluid>
    <v-data-table :headers="headers" :items="users"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:item='{ item, index }'>
        <tr style="background-color:#FCFDF6; color:black; ">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ item.fullName }}</td>
          <td class="text-center">{{ item.phNumber }}</td>
          <td class="text-center">{{ item.email }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      headers: [
        { title: 'Sl No', sortable: false, align: 'center' },
        { title: 'Name', key: 'name', sortable: false, align: 'center' },
        { title: 'Phone number', key: 'number', sortable: false, align: 'center' },
        { title: 'Email', key: 'email', sortable: false, align: 'center' },
      ],
      skeleton:true
    };
  },
  computed: {
    ...mapGetters('guide', ['getUserData']),
    users() {
      // Ensure users is always an array
      return Array.isArray(this.getUserData) ? this.getUserData : [];
      // return this.$store.getters.getUserData;
    },
  },
  methods: {
    async getUser() {
      try {
        const response = await this.$store.dispatch('guide/getUserDetails');
        if (response) {
          this.skeleton = false;
        }
      }
      catch (error) {
        console.log(error)
      }
    },
  },
  mounted() {
    this.getUser();
    console.log(this.users)
  }
};
</script>

<style>

/* .slot .v-input__control {
  background-color: #DFE4D7 !important;
} */

.v-table__wrapper>table>thead {
  /* background-color: #236726; */
  color: white;
}
:deep(.slot .v-input__control) {
  /* border-bottom: 2px solid #216D17; */
  /* background-color: #DFE4D7 !important; */
  width: 400px !important;
}
:deep(.slot .v-input--horizontal) {
  width: 400px !important;
}
</style>

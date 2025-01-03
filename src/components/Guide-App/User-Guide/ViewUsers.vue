 <template>
  <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
  <v-container v-else class="pb-8 px-0" fluid>
    <v-data-table :headers="headers" :items="users" v-model:items-per-page="itemsPerPage" v-model:page="currentPage"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }" style="background-color: #f9faf1;"
      max-width="100%">
      <template v-slot:item='{ item, index }'>
        <tr style="background-color:#FCFDF6; color:black; ">
          <td class="text-center">{{ ((currentPage - 1) * itemsPerPage) + index + 1 }}</td>
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
      currentPage: 1,
      itemsPerPage: 10,
      skeleton:true
    };
  },
  computed: {
    ...mapGetters('guide', ['getUserData']),
    users() {
      return Array.isArray(this.getUserData) ? this.getUserData : [];
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

<style scoped>
.v-table__wrapper>table>thead {
  color: white;
}
:deep(.slot .v-input__control) {
  width: 400px !important;
}
:deep(.slot .v-input--horizontal) {
  width: 400px !important;
}
:deep(.v-pagination__list .v-btn--variant-plain) {
  opacity: 1;
  background-color: #216D17;
  color: #FCFDF6;
}
:deep(.v-pagination__list .v-btn--disabled) {
  opacity: 0.4;
}
</style>

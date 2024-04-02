<template>
  <div class="green-background container-fluid">
    <h4 class="text-white mt-1" style=" font-size: 24px; margin-left: 250px;">{{ selectedNavItem }}</h4>
    <v-btn flat style="background-color: #EF3E3E; margin-right: 80px; text-transform: capitalize; color: white;"
      class="rounded-5" @click="logout"><v-icon icon="mdi-logout" start></v-icon>Logout</v-btn>
  </div>
  <div class="d-flex">
    <div>
      <v-layout>
        <v-navigation-drawer v-model="drawer" permanent style="width: 236px;">
          <v-list-item class="d-flex justify-content-center " nav>
            <v-img src="@/assets/logo.png" class="image"></v-img>
          </v-list-item>
          <v-list density="compact" nav class="mt-0">
            <router-link to='/dashboard-page' style="text-decoration: none; color:black;"><v-list-item value="home"
                class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"> Overview</v-list-item> </router-link>
            <router-link to='/tickets' style="text-decoration: none; color:black;"><v-list-item value="ticket"
                class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Tickets</v-list-item></router-link>
            <router-link to='/employee' style="text-decoration: none; color:black;"><v-list-item value="account"
                class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Employees</v-list-item></router-link>
            <router-link to='/items-page' style="text-decoration: none; color:black;"><v-list-item value="items"
                class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Items</v-list-item></router-link>
            <router-link to='/portal' style="text-decoration: none; color:black;"><v-list-item value="portal"
                class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Portal</v-list-item></router-link>
          </v-list>
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </div>
    <div class="mt-5 ms-5 w-80">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      navItems: [ // Define your navigation items here
        { text: 'Overview', route: '/dashboard' },
        { text: 'Overview', route: '/dashboard-page' },
        { text: 'Tickets', route: '/tickets' },
        { text: 'Employee', route: '/employee' },
        { text: 'Items', route: '/items-page' },
        { text: 'Portal', route: '/portal' }
      ],
    }
  },
  computed: {
    selectedRoute() {
      return this.$route.path;
    },
    selectedNavItem() {
      // Find the closest matching parent route
      let selectedItem = null;
      for (let i = 0; i < this.navItems.length; i++) {
        if (this.selectedRoute.startsWith(this.navItems[i].route)) {
          selectedItem = this.navItems[i];
          break;
        }
      }
      return selectedItem ? selectedItem.text : '';
    }
  },
  methods: {
    logout() {
      
    }
  },
  watch: {
    selectedRoute(newRoute) {
      // Find the closest matching parent route
      let selectedItem = null;
      for (let i = 0; i < this.navItems.length; i++) {
        if (newRoute.startsWith(this.navItems[i].route)) {
          selectedItem = this.navItems[i];
          break;
        }
      }
      if (selectedItem) {
        this.selectedNavItem = selectedItem.text;
      }
    }
  }
};
</script>
<style scoped>
.green-background {
  height: 80px;
  width: 100%;
  margin-left: 40px;
  background-color: #216D17;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ;
}

.image {
  height: 80px;
  width: 80px;
}

a.router-link-active .v-list-item,
.v-list-item--active {
  background-color: #216D17;
  text-decoration: none;
  color: white;
}

.navlist {
  padding: 12px 64px;
}
</style>

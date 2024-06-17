<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="4">
      <v-list-item class="d-flex justify-content-center " nav>
        <v-img src="@/assets/logo.png" class="image"></v-img>
      </v-list-item>
      <v-list density="compact" nav class="mt-0">
        <v-list-item value="home" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;" :disabled="!status"
          @click.prevent="navigate({ name: 'dashboard' })">
          Overview</v-list-item>
        <v-list-item value="ticket" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;" :disabled="!status"
          @click.prevent="navigate({ name: 'ticket-details' })">Tickets</v-list-item>
        <v-list-item value="account" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;" :disabled="!status"
          @click.prevent="navigate({ name: 'employee-add' })">Employees</v-list-item>
        <v-list-item value="guide" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"
          @click="$router.push({ name: 'guide-add-main' })">Guide-App</v-list-item>
        <v-list-item value="calendar" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;" :disabled="!status"
          @click.prevent="navigate({ name: 'holiday-add' })">Calendar</v-list-item>
      </v-list>
    </v-navigation-drawer>s
    <div class="mt-5">
      <router-view></router-view>
    </div>
    <v-app-bar class="green-background py-1">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
<v-container fluid class="d-flex justify-content-between align-items-center ps-0 ms-0">
      <h5 class="d-inline mb-0 text-white">{{ selectedNavItem }}</h5>
      
        <v-btn class=" text-capitalize " @click="logout" prepend-icon="mdi-logout" color="#EF3E3E"
          variant="elevated">Logout</v-btn>
    </v-container>
    </v-app-bar>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      navItems: [ 
        { text: 'Overview', route: '/admin/dashboard-page' },
        { text: 'Tickets', route: '/admin/tickets' },
        { text: 'Employee', route: '/admin/employee' },
        { text: 'Museum Calendar', route: '/admin/calendar' },
        { text: 'Guide-App', route: '/admin/guide-app' }
      ],
    }
  },
  computed: {
    selectedRoute() {
      return this.$route.path;
    },
    selectedNavItem() {
      let selectedItem = null;
      for (let i = 0; i < this.navItems.length; i++) {
        if (this.selectedRoute.startsWith(this.navItems[i].route)) {
          selectedItem = this.navItems[i];
          break;
        }
      }
      return selectedItem ? selectedItem.text : '';
    },
    status() {
      return this.$store.getters.getStatus;
    }
  },
  methods: {
    logout() {
      sessionStorage.clear();
      this.$router.push({ name: 'admin-login' });
    },
    navigate(route) {
      if (this.status) {
        this.$router.push(route);
      }
    },
  },
};
</script>
<style scoped>
.green-background {
  background-color: #216D17;
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

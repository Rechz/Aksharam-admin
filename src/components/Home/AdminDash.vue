<template>
  <div class="d-flex">
    <div style="width: 260px;">
      <v-layout>
        <v-navigation-drawer v-model="drawer" permanent style="width: 260px;">
          <v-list-item class="d-flex justify-content-center " nav>
            <v-img src="@/assets/logo.png" class="image"></v-img>
          </v-list-item>
          <v-list density="compact" nav class="mt-0">
            <v-list-item value="home" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;" :disabled="!status"
              @click.prevent="navigate('/dashboard-page')">
              Overview</v-list-item>
            <v-list-item value="ticket" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"
              :disabled="!status" @click.prevent="navigate('/tickets')">Tickets</v-list-item>
            <v-list-item value="account" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"
              :disabled="!status" @click.prevent="navigate('/employee')">Employees</v-list-item>
            <v-list-item value="guide" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"
              @click="$router.push('/guide-app')">Guide-App</v-list-item>
            <v-list-item value="calendar" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"
              :disabled="!status" @click.prevent="navigate('/calendar')">Calendar</v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </div>
    <div class="w-100">
      <nav class="green-background container-fluid w-100">
        <h4 class="text-white mt-1" style=" font-size: 24px; margin-left: 6.4%;">{{ selectedNavItem }}</h4>
        <v-btn flat style="background-color: #EF3E3E; margin-right: 30px; text-transform: capitalize; color: white;"
          class="rounded-5" @click="logout"><v-icon icon="mdi-logout" start></v-icon>Logout</v-btn>
      </nav>
      <div class="mt-5 mx-5 me-4">
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drawer: true,
      rail: true,
      navItems: [ 
        { text: 'Overview', route: '/dashboard' },
        { text: 'Overview', route: '/dashboard-page' },
        { text: 'Tickets', route: '/tickets' },
        { text: 'Employee', route: '/employee' },
        { text: 'Museum Calendar', route: '/calendar' },
        { text: 'Guide-App', route: '/guide-app' }
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
      this.$router.push('/');
    },
    navigate(route) {
      if (this.status) {
        this.$router.push(route);
      }
    },
  },
  watch: {
    selectedRoute(newRoute) {
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
  background-color: #216D17;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" elevation="4" class="position-fixed">
      <v-list-item class="d-flex justify-content-center " nav>
        <v-img src="@/assets/logo.png" class="image"></v-img>
      </v-list-item>
      <v-list density="compact" nav class="mt-0">
        <v-list-item v-for="item in navItems" :key="item.route" :value="item.route" class="navlist fs-6"
          :class="{ 'active-nav-item': isActive(item.route) }" style="border-bottom: 1px solid #E0E0E0;"
          :disabled="!status" @click.prevent="navigate({ name: item.routeName })">
          {{ item.text }}
        </v-list-item>
        <v-list-item class="navlist fs-6" :href="mapLink">Map</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <div>
      <router-view></router-view>
    </div>
    <v-app-bar class="green-background py-1 position-fixed">
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
        { text: 'Overview', route: '/admin/dashboard-page', routeName: 'dashboard' },
        { text: 'Booking', route: '/admin/booking', routeName: 'booking' },
        { text: 'Tickets', route: '/admin/tickets', routeName: 'ticket-details' },
        { text: 'Employee', route: '/admin/employee', routeName: 'employee-add' },
        { text: 'Museum Calendar', route: '/admin/calendar', routeName: 'holiday-add' },
        { text: 'Digital Board', route: '/admin/display-app', routeName: 'display-add-main' },
        { text: 'Guide-App', route: '/admin/guide-app', routeName: 'guide-add-main' },
        { text: 'Tribal', route: '/admin/tribal', routeName: 'tribal-add' },
      ],
      mapLink: "https://aksharammuseum.com/map/coords"
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
    isActive(route) {
      return this.$route.path.startsWith(route);
    },
    async logout() {
      const response = await this.$store.dispatch('logout');
      if (response) {
        this.$router.push({ name: 'admin-login' });
      }
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
.active-nav-item {
  background-color: #216D17 !important;
  color: white !important;
}
.navlist {
  padding: 12px 48px;
}
</style>

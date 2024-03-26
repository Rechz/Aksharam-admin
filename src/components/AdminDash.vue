
<template>
  <div  class="green-background d-flex justify-content-between" >
    <!-- <div class="d-flex mt-1 me-3">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-lg-center ">
          <h1 class="logo-h1 mb-0">അക്ഷരം</h1>
          <p class="logo-p">Museum of letters, literature<br> & culture</p>
        </div> 
        </div> -->
        
          <h4 class="text-white" style="margin-left:260px;">{{selectedNavItem}}</h4>
          <h6 class="text-white"><u>Logout</u></h6>
        
    </div>

<div class="d-flex">
<div >
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        permanent
      >
        <v-list-item 
          class="d-flex justify-content-center "
          nav
        >
        <v-img src="@/assets/logo.png" class="image"></v-img>
        </v-list-item>

     

        <v-list density="compact" nav class="mt-0">
          <router-link to='/dashboard-page' style="text-decoration: none; color:black;"><v-list-item value="home" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;"> Overview</v-list-item>   </router-link>       
        
          <router-link to='/tickets' style="text-decoration: none; color:black;"><v-list-item   value="ticket" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Tickets</v-list-item></router-link>
  
          <router-link to='/employee' style="text-decoration: none; color:black;"><v-list-item  value="account" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Employee</v-list-item></router-link>
   
          <router-link to='/items-page' style="text-decoration: none; color:black;"><v-list-item  value="items" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Items</v-list-item></router-link>
 
          <router-link to='/portal' style="text-decoration: none; color:black;"><v-list-item  value="portal" class="navlist fs-6" style="border-bottom: 1px solid #E0E0E0;">Portal</v-list-item></router-link>

        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
</div>
<div class="mx-5 mt-5">
  <router-view></router-view>
</div>
</div>
</template>
<script>
  export default {
    data () {
      return {
        drawer: true,
        rail: true,
        navItems: [ // Define your navigation items here
        { text: 'Overview', route: '/dashboard-page' },
        { text: 'Tickets', route: '/tickets' },
        { text: 'Employee', route: '/employee' },
        { text: 'Items', route: '/items-page' },
        { text: 'Portal', route: '/portal' }
      ],
      selectedNavItem: ''
      }
    },
    computed: {
    // Extracting the selected navigation item from the route
    selectedRoute() {
      return this.$route.path;
    }
  },
  watch: {
    // Watch for changes in the route to update the selectedNavItem
    selectedRoute(newRoute) {
      const selectedItem = this.navItems.find(item => item.route === newRoute);
      if (selectedItem) {
        this.selectedNavItem = selectedItem.text;
      }
    }
  }
  }
</script>
<style scoped>
  .green-background {
    padding: 20px;
    /* background: linear-gradient(to bottom left,#110b03,#3e7132); */
    background-color: #205f23;
  }
  .heading {
    text-align: right;
    margin-top: 10px;
    margin-right: 10px;
    position: absolute;
    top: 0;
    right: 0;
    color: white;
  }

  /* .v-list-item:hover {
    background-color: #1B5E20 ;
    color: white;
  } */

  .logo-h1 {
        font-family: 'Noto Sans Malayalam', sans-serif;
        color: white;
        font-size: 20px;
        font-weight: 900;
        line-height: 16px;
    }
    .logo-p{
      color: white;
      font-size: 12px;
      line-height: 15px;
    }
    .image{
      height: 80px;
      width: 80px;
    }
    a.router-link-active .v-list-item, .v-list-item--active{
      background-color: #205f23;
      text-decoration: none;
      color: white;
    }
    .navlist{
      padding: 12px 64px;

    }
</style>

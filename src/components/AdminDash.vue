
<template>
  <div  class="green-background" >
    <h1 class="heading">Admin dashboard</h1>
    <hr >
    </div>

<div class="d-flex">
<div >
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item 
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="Aksharam"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi mdi-chart-line" title="Dashboard" value="home"  @click="$router.push('/dashboard-page')"></v-list-item>          
          <v-list-item prepend-icon="mdi mdi-ticket-confirmation-outline" title="Tickets" value="home" @click="$router.push('/tickets')"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Employee" value="account"  @click="$router.push('/employee-page')" ></v-list-item>
          <v-list-item prepend-icon="mdi mdi-collapse-all" title="Items" value="users"  @click="$router.push('/items-page')"></v-list-item>
          <v-list-item prepend-icon="mdi mdi-image-multiple-outline" title="Portal" value="users"  @click="$router.push('/portal')"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="height: 250px"></v-main>
    </v-layout>
</div>
<div class="ms-3">
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
      }
    },
  }
</script>
<style scoped>
  .green-background {
    background-color: green;
    position: relative;
    padding-top: 57px;
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

  hr {
    position: absolute;
    top: 40px;
    right: 10px;
    width: calc(100% - 20px);
    border: 1px;
    border-top: 1px solid #120d0d;
  }
  .v-list-item:hover {
    background-color: green ;
    color: white;
  }
</style>

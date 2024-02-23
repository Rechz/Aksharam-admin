
<template>
  <div  class="green-background d-flex justify-content-end" >
    <div class="d-flex mt-1 me-3">
        <v-img src="@/assets/logo.png" class="image"></v-img>
        <div class="d-flex flex-column justify-content-lg-center ">
          <h1 class="logo-h1 mb-0">അക്ഷരം</h1>
          <p class="logo-p">Museum of letters, literature<br> & culture</p>
        </div> 
        </div>
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
      }
    },
  }
</script>
<style scoped>
  .green-background {
    background-color: #1B5E20;
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

  .v-list-item:hover {
    background-color: #1B5E20 ;
    color: white;
  }

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
      height: 90px;
      width: 90px;
    }
</style>

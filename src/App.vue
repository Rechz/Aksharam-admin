<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
.v-table{
    width: 76vw !important;
}
.search .v-input__control{
    width: 300px;
    background-color: #DFE4D7 !important;
  }
  .sort .v-input__control {
    background-color: #DFE4D7 !important;
  }
  .v-table__wrapper>table>thead{
    background-color: #236726;
    color: white;
  }
  .v-pagination__list button{
    background-color: #236726;
    color: white;
  }
  *{
    margin:0;
    padding:0;
    box-sizing: content-box;
    font-family:Arial, Helvetica, sans-serif;
  }
</style>

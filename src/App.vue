<template>
  <router-view></router-view>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
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
</style>

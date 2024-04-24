<template>
  <div class="d-flex justify-content-center">
    <v-date-picker width="500"
    v-model="date">

    </v-date-picker>
  </div>


</template>

<script>
export default {
  data() {
    return {
      date: null
    };
  }
}
</script>
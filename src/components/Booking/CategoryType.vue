<template>
  <div>
    <v-col cols="12" sm="12" md="12">
        <v-text-field v-model="type" :label='"No of " + cat' class="price" density="comfortable" :rules="quantityRules"  width="300"
        variant="outlined"></v-text-field>
    </v-col>
  </div>
</template>

<script>
export default {
    props:["cat","id"],
    emits:['updateCount'],
    data() {
      return {
        type:0,
        quantityRules: [
        value => {
          if (/^\d+$/.test(value)) return true;
          return 'Only digits allowed.';
        },
      ],
      }
    },
    watch: {
      type(newVal) {
        this.$emit('updateCount', { id: this.id, type: newVal, cat: this.cat });
    }
    }
}
</script>

<style>

</style>
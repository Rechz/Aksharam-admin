<template>
  <div class="d-flex align-items-center ">
    <svg width="1212" height="887" viewBox="0 0 707 747" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-180" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -180 287.711)" fill="#54634D" />
      <rect x="-288" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -288 287.711)" fill="#D7E8CD" />
      <rect x="-396" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -396 287.711)" fill="#A5F790" />
      <rect x="-505" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -505 287.711)" fill="#216D17" />
    </svg>
    <v-card class="d-flex justify-content-center  p-5 mx-5" style="width: 632px; height: 632px;">
      <v-form v-model="form" @submit.prevent="onSubmit">
        <v-img src="@/assets/logo.png" style="height: 200px; width: 200px;" class="mx-auto"></v-img>
        <v-card-title class="ps-0 mb-1 title">LOGIN</v-card-title>
        <v-text-field v-model="name" style="width: 362px; " density="comfortable" label="Username"
          placeholder="Enter your ID" prepend-inner-icon="mdi-account-box" :rules="nameRules">
        </v-text-field>
        <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'" style="width: 362px; " density="comfortable" label="Password"
          placeholder="Enter your password" prepend-inner-icon="mdi-lock" :rules="passwordRules"
          @click:append-inner="visible = !visible">
        </v-text-field>
        <br>
        <v-btn class="rounded-4" block style="background-color: #216D17; color: #FFFFFF" size="large" type="submit"
          variant="elevated">Login
        </v-btn>
      </v-form>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    form: false,
    name: null,
    visible: false,
    password: null,
    nameRules: [
      value => !!value || 'ID is required',
    ],
    passwordRules: [
      value => !!value || 'Password is required',
    ],
  }),
//   computed: {
//     url() {
//       return this.$store.getters.getUrl;
//     },
//     token() {
//       return this.$store.getters.getToken;
//     }
// },
  methods: {
    async onSubmit() {
      if (!this.form) return
      try {
        await this.$store.dispatch('login', {
          id: this.name,
          password: this.password
        });
        
      }
      catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
<style scoped>
:deep(.v-input__control) {
  background-color: #DFE4D7 !important;
  border-bottom: 2px solid #216D17;
}
</style>

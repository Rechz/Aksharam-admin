<template>
  <v-app>
    <v-snackbar v-model="snackbar" color="danger" :timeout="timeout" location="top">
      <h6 class="text-center">{{ message }}.</h6>
    </v-snackbar>
    <div class="d-flex align-items-center justify-content-center gap-2" style="height: 100dvh;">
      <svg class="home" width="1212" height="887" viewBox="0 0 707 747" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="-180" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -180 287.711)"
          fill="#54634D" />
        <rect x="-288" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -288 287.711)"
          fill="#D7E8CD" />
        <rect x="-396" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -396 287.711)"
          fill="#A5F790" />
        <rect x="-505" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -505 287.711)"
          fill="#216D17" />
      </svg>
      <v-card class="pt-5 me-lg-3 card" width="632" height="632">
        <v-container class="mt-4">
          <v-img src="@/assets/logo.png" style="height: 200px; width: 200px" class="mx-auto"></v-img>
          <v-form v-model="form" @submit.prevent="onSubmit" class="px-sm-5 mx-3 pt-3">
            <!-- <v-card-title class="ps-0 mb-1 title text-center">LOGIN</v-card-title> -->
              <v-text-field v-model="name" density="comfortable" label="Enter username" single-line
                placeholder="Enter username"  prepend-inner-icon="mdi-account-box" :rules="nameRules">
              </v-text-field>
              <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'" density="comfortable" label="Enter password" single-line
                placeholder="Enter password"  prepend-inner-icon="mdi-lock" :rules="passwordRules"
                @click:append-inner="visible = !visible">
              </v-text-field>
              <v-btn block style="background-color: #216D17; color: #FFFFFF" type="submit" size="large"
                variant="elevated" :disabled="loading" :loading="loading">Login
              </v-btn>
          </v-form>
        </v-container>
      </v-card>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    form: false,
    name: null,
    visible: false,
    password: null,
    message: '',
    loading: false,
    timeout: 2000,
    snackbar: false,
    nameRules: [
      value => !!value || 'ID is required',
    ],
    passwordRules: [
      value => !!value || 'Password is required',
    ],
  }),

  methods: {
    async onSubmit() {
      if (!this.form) return
      this.loading = !this.loading
      try {
        const success = await this.$store.dispatch('login', {
          id: this.name,
          password: this.password
        });
        if (success) {
          this.$router.push({name: 'dashboard'});
        }
      }
      catch (error) {
        this.loading = false;
        console.error(error);
        if (error.response) {
          this.message = error.response.data.message;
        } else
        this.message = error.message        
        this.snackbar = true;
      }
    },
  },
};
</script>
<style scoped>
:deep(.v-input__control) {
  background-color: #DFE4D7 !important;
  border-bottom: 2px solid #216D17;
}
@media (max-width: 1150px){
  .home{
    display: none;
  }
}
</style>

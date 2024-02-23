<template>
  <v-sheet class="pa-12 d-flex justify-content-center align-items-center flex-column bg-brown-darken-4" style="height: 100vh;">
    <div class="d-flex justify-content-center align-items-center ">
      <v-img
      class="mx-auto my-6"
      width="120"
      height="120"
      src="@/assets/logo.png"
      ></v-img>
      <div class="d-flex flex-column justify-content-lg-center ">
        <h2 class="lh-1">അക്ഷരം</h2>
        <p class="lh-1">Museum of letters, literature<br> & culture</p>
      </div> 
    </div>
    
    <v-card class="mx-auto px-6 py-8" width="344">
      <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
        <v-text-field
          v-model="name"
          :readonly="loading"
          class="mb-2"
          clearable
          label="ID"
          placeholder="Enter your ID"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :readonly="loading"
          clearable
          label="Password"
          placeholder="Enter your password"
          :rules="passwordRules"
        ></v-text-field>

        <br>

        <v-btn
          
          :loading="loading"
          block
          color="green-darken-4"
          size="large"
          type="submit"
          variant="elevated"
        >
          Sign In
        </v-btn>
      </v-form>
    </v-card>
  </v-sheet>
</template>

<script>
  export default {
    data: () => ({
      form: false,
      name: null,
      password: null,
      loading: false,
      nameRules: [
        value => !!value || 'ID is required',
      ],
      passwordRules: [
        value => !!value || 'Password is required',
      ],
    }),

    methods: {
      onSubmit () {
        if (!this.form) return
        this.loading = true
        setTimeout(() => {
          this.loading = false;
          this.$router.push('/dashboard');
          }, 2000);
      },
    
    },
  }
</script>



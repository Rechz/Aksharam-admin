<!-- <template>
  <v-sheet class="pa-12 d-flex justify-content-center align-items-center flex-column" style="height: 100vh;  background: linear-gradient(to bottom right,#110b03,#3e7132);">
    <div class="d-flex justify-content-center align-items-center ">
      <v-img
      class="mx-auto my-6"
      width="120"
      height="120"
      src="@/assets/logo.png"
      ></v-img>
      <div class="d-flex flex-column justify-content-lg-center ">
        <h2 class="lh-1 text-white">അക്ഷരം</h2>
        <p class="lh-1 text-white">Museum of letters, literature<br> & culture</p>
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
</script> -->

<template>
  <div class="d-flex align-items-center ">
   
    <svg width="707" height="747" viewBox="0 0 707 747" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="-180" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -180 287.711)" fill="#54634D"/>
<rect x="-288" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -288 287.711)" fill="#D7E8CD"/>
<rect x="-396" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -396 287.711)" fill="#A5F790"/>
<rect x="-505" y="287.711" width="604.874" height="649.533" transform="rotate(-45 -505 287.711)" fill="#216D17"/>
</svg>
<v-card class="d-flex justify-content-center  p-5 mx-5" style="width: 632px; height: 632px;">
  <v-form
        v-model="form"
        @submit.prevent="onSubmit"
      >
      <v-img src="@/assets/logo.png" style="height: 200px; width: 200px;" class="mx-auto"></v-img>
      <v-card-title class="ps-0 mb-1">LOGIN</v-card-title>
        <v-text-field
          v-model="name"
                  prepend-inner-icon="mdi-account-box"
          class="mb-2"
          style="width: 362px"
       density="comfortable"
          label="Username"
          placeholder="Enter your ID"
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
          style="width: 362px; "
        density="comfortable"
          label="Password"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock"
          :rules="passwordRules"
            @click:append-inner="visible = !visible"
        ></v-text-field>
        <br>
        <v-btn
          class="rounded-3"
          block
          color="green-darken-4"
          size="large"
          type="submit"
          variant="elevated"
        >
          Login
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
          this.$router.push('/dashboard');  
      },
    
    },
  }
</script> 
<style scoped>
::v-deep .v-input__control {
  background-color: #DFE4D7 !important;
}
</style>


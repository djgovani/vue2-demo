<template>
  <div class="d-flex justify-content-center m-5">
    <el-form :model="loginForm" :rules="rules" ref="loginForm">
      <h1>Login</h1>
      <el-form-item label="Username" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-alert v-if="error" :title="error" type="error" effect="dark">
      </el-alert>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      error: null,
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "Username is required", trigger: "blur" },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$store
            .dispatch("LOGIN", {
              username: this.loginForm.username,
              password: this.loginForm.password,
            })
            .then((success) => {
              this.$router.push("/home");
            })
            .catch((error) => {
              this.error = error;
            });
        } else {
          console.log("invalid");
          return false;
        }
      });
    },
  },
};
</script>

<template>
  <div class="d-flex justify-content-center m-5">
    <el-alert title="Animal Details has been received" type="success" show-icon>
    </el-alert>

    <pre>{{ addedData }}</pre>
    <router-link to="/home">Back to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "SuccessView",
  data() {
    return {
      addedData: this.$store.state.addAnimalDetails,
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
};
</script>

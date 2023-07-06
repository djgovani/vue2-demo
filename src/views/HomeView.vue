<template>
  <div class="d-flex justify-content-center m-5">
    <el-form
      :model="animalDetailsForm"
      ref="animalDetailsForm"
      v-loading="show.loading"
      label-width="160px"
    >
      <h1 class="text-center">Add Animal details</h1>

      <el-form-item label="Select Location">
        <GmapMap
          :center="{ lat: 10, lng: 10 }"
          :zoom="7"
          map-type-id="terrain"
          style="width: 500px; height: 300px"
          v-model="animalDetailsForm.location"
          @click="markLocation"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m"
            @click="center = m"
          ></gmap-marker>
        </GmapMap>
      </el-form-item>
      <el-form-item
        label="Latitude"
        :rules="[
          {
            required: true,
            message: 'Latitude is required, please select location on Map',
          },
        ]"
        prop="lat"
      >
        <el-input disabled v-model="animalDetailsForm.lat"></el-input>
      </el-form-item>
      <el-form-item
        label="Longitude"
        :rules="[
          {
            required: true,
            message: 'Longitude is required, please select location on Map',
          },
        ]"
        prop="lng"
      >
        <el-input disabled v-model="animalDetailsForm.lng"></el-input>
      </el-form-item>
      <el-form-item
        label="Date Time"
        :rules="[{ required: true, message: 'Date Time is required' }]"
        prop="dateTime"
      >
        <el-col :span="11"> </el-col>
        <el-date-picker
          v-model="animalDetailsForm.dateTime"
          type="datetime"
          format="DD MMM yyyy hh:mm a"
          placeholder="Select date and time"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item
        label="RFID"
        :rules="[{ required: true, message: 'RFID is required' }]"
        prop="rfid"
      >
        <el-input type="number" v-model="animalDetailsForm.rfid"></el-input>
      </el-form-item>
      <el-form-item
        label="Gender"
        :rules="[{ required: true, message: 'Gender is required' }]"
        prop="gender"
      >
        <el-radio-group
          v-model="animalDetailsForm.gender"
          @change="onGenderChange"
        >
          <el-radio
            v-for="gender of gender"
            :key="gender.value"
            :label="gender.label"
            :value="gender.value"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="Age Category"
        :rules="[{ required: true, message: 'Age Category is required' }]"
        prop="ageCategory"
      >
        <el-select
          v-model="animalDetailsForm.ageCategory"
          placeholder="Age Category"
        >
          <el-option
            v-for="ageCategory of ageCategories"
            :key="ageCategory.value"
            :label="ageCategory.label"
            :value="ageCategory.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Dog Condition"
        :rules="[{ required: true, message: 'Dog Condition is required' }]"
        prop="dogCondition"
      >
        <el-select
          v-model="animalDetailsForm.dogCondition"
          placeholder="Dog Condition"
          multiple
          collapse-tags
        >
          <el-option
            v-for="dogCondition of dogConditions"
            :key="dogCondition.value"
            :label="dogCondition.label"
            :value="dogCondition.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Country"
        :rules="[{ required: true, message: 'Country is required' }]"
        prop="country"
      >
        <el-select v-model="animalDetailsForm.country" placeholder="Country">
          <el-option
            v-for="country of countries"
            :key="country.numericCode"
            :label="country.name"
            :value="country.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="Vaccination Status"
        :rules="[{ required: true, message: 'Vaccination Status is required' }]"
        prop="vaccinationStatus"
      >
        <el-radio-group v-model="animalDetailsForm.vaccinationStatus">
          <el-radio
            v-for="vaccinationStatus of vaccinationStatus"
            :key="vaccinationStatus.value"
            :label="vaccinationStatus.label"
            :value="vaccinationStatus.value"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="Given Vaccinations"
        :rules="[{ required: true, message: 'Given Vaccinations is required' }]"
        prop="givenVaccinations"
      >
        <el-checkbox-group v-model="animalDetailsForm.givenVaccinations">
          <el-checkbox
            v-for="givenVaccination of givenVaccinations"
            :key="givenVaccination.value"
            :label="givenVaccination.label"
            :value="givenVaccination.value"
            name="givenVaccination"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="Owner Name"
        :rules="[
          { required: true, message: 'Owner Name is required' },
          { max: 50, message: 'Owner Name should not more than 50 chars' },
        ]"
        prop="ownerName"
      >
        <el-input v-model="animalDetailsForm.ownerName"></el-input>
      </el-form-item>
      <el-form-item
        label="Owner Number"
        :rules="[
          { required: true, message: 'Owner Number is required' },
          { min: 10, max: 10, message: 'Owner Number must be 10 digits' },
        ]"
        prop="ownerNumber"
      >
        <el-input
          type="number"
          v-model="animalDetailsForm.ownerNumber"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="Owner Address"
        :rules="[
          { required: true, message: 'Owner Address is required' },
          { max: 250, message: 'Owner Address should not more than 250 chars' },
        ]"
        prop="ownerAddress"
      >
        <el-input
          type="textarea"
          v-model="animalDetailsForm.ownerAddress"
        ></el-input>
      </el-form-item>

      <el-alert
        v-if="show.error"
        :title="show.error"
        type="error"
        effect="dark"
      ></el-alert>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Add Details</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import dateMixin from "../mixins/date.mixin";
export default {
  name: "HomwView",
  mixins: [dateMixin],
  data() {
    return {
      show: {
        loading: false,
        error: false,
      },
      markers: [],
      gender: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Unknown", value: "unknown" },
      ],
      ageCategories: [
        { label: "Puppy", value: "puppy" },
        { label: "Young", value: "young" },
        { label: "Adult", value: "adult" },
        { label: "Old", value: "old" },
      ],
      dogConditions: [
        { label: "Normal", value: "normal" },
        { label: "Bleeding", value: "bleeding" },
        { label: "Scared", value: "scared" },
        { label: "Handicap", value: "handicap" },
        { label: "Blind", value: "blind" },
        { label: "Deaf", value: "deaf" },
        { label: "Pregnant", value: "pregnant" },
      ],
      countries: [],
      vaccinationStatus: [
        { label: "Not Vaccinated", value: "not_vaccinated" },
        { label: "Vaccinated", value: "vaccinated" },
      ],
      givenVaccinations: [
        { label: "Rabies", value: "Rabies" },
        { label: "ADT", value: "ADT" },
        { label: "VC1", value: "VC1" },
        { label: "VC34", value: "VC34" },
      ],
      animalDetailsForm: {
        dateTime: "",
        rfid: "",
        gender: "",
        ageCategory: "",
        dogCondition: [],
        country: "",
        vaccinationStatus: "",
        givenVaccinations: [],
        ownerName: "",
        ownerNumber: "",
        ownerAddress: "",
        lat: null,
        lng: null,
      },
    };
  },
  async mounted() {
    const response = await axios.get("https://restcountries.com/v2/all");
    this.countries = response.data;
  },
  methods: {
    markLocation(event) {
      const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      this.markers = [latLng];
      this.animalDetailsForm.lat = latLng.lat;
      this.animalDetailsForm.lng = latLng.lng;
    },
    onGenderChange(event) {
      const pregnantIndex = this.dogConditions.findIndex(
        (condition) => condition.value === "pregnant"
      );

      if (event === "Female") {
        if (pregnantIndex === -1) {
          this.dogConditions.splice(this.dogConditions.length, 1, {
            label: "Pregnant",
            value: "pregnant",
          });
        }
      } else {
        if (pregnantIndex) {
          this.dogConditions.splice(pregnantIndex, 1);
        }
      }
    },
    submitForm() {
      this.$refs.animalDetailsForm.validate((valid) => {
        if (valid) {
          this.show.loading = true;
          this.animalDetailsForm.dateTime = this.changeDateFormat(
            this.animalDetailsForm.dateTime,
            "DD MMM YYYY hh:mm A"
          );
          this.$store
            .dispatch("ADD_ANIMAL_DETAILS", {
              formDetails: this.animalDetailsForm,
            })
            .then((success) => {
              this.show.loading = false;
              this.$router.push("/success");
            })
            .catch((error) => {
              console.log(error);
              this.show.loading = false;
              this.show.error = error;
            });
          console.log(this.animalDetailsForm);
        } else {
          console.log("invalid");
          return false;
        }
      });
    },
  },
};
</script>

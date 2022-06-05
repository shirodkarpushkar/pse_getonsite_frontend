<template>
  <div class="white-box pd30 min-height80">
    <h4>
      {{ user.fullName }}
    </h4>
    <p class="mr-b20">{{ user.email }}</p>

    <div class="row align-items-center body-top-head">
      <div class="col-sm-6">
        <h6>Personal Details</h6>
      </div>
      <div class="col-sm-6">
        <div v-if="!edit" class="head-right-btn text-right">
          <button type="button" class="orange-trans-btn" @click="editProfile"
            >Edit</button
          >
        </div>
        <div v-if="edit" class="head-right-btn text-right">
          <button
            type="button"
            class="orange-trans-btn mr-r10"
            :disabled="buttonLoader"
            @click="setUserProfile"
          >
            Update
            <span
              v-if="buttonLoader"
              class="fa fa-spinner fa-pulse mr-1"
            ></span>
          </button>
          <button
            type="button"
            class="cancel-btn"
            :disabled="buttonLoader"
            @click="cancelEdit"
            >Cancel</button
          >
        </div>
      </div>
    </div>

    <hr />
    <form class="row">
      <div class="col-sm-12">
        <div class="form-group cus-gray-input mr-b20">
          <label>Contact</label>
          <input
            v-model.trim="user.phone"
            type="text"
            spellcheck="false"
            placeholder="Contact Number"
            class="form-control"
            :disabled="!edit"
            @input="$v.user.phone.$touch"
          />
          <small v-if="$v.user.phone.$error" class=" error">
            This field is required</small
          >
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group cus-gray-input mr-b20">
          <label>Address</label>
          <textarea
            v-model.trim="user.address"
            type="text"
            placeholder="Address"
            spellcheck="false"
            class="form-control"
            :disabled="!edit"
            @input="$v.user.address.$touch"
          />
          <small v-if="$v.user.address.$error" class=" error">
            This field is required</small
          >
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group cus-gray-input mr-b20">
          <label>Work Details</label>
          <textarea
            v-model.trim="user.workDetails"
            type="text"
            spellcheck="false"
            placeholder="Work Details"
            class="form-control"
            :disabled="!edit"
            @input="$v.user.workDetails.$touch"
          />
          <small v-if="$v.user.workDetails.$error" class=" error">
            This field is required</small
          >
        </div>
      </div>
      <div class="col-sm-12">
        <div class="form-group cus-gray-input mr-b20">
          <label>Work Address</label>
          <textarea
            v-model.trim="user.workAddress"
            type="text"
            spellcheck="false"
            placeholder="Work Address"
            class="form-control"
            :disabled="!edit"
            @input="$v.user.workAddress.$touch"
          />
          <small v-if="$v.user.workAddress.$error" class=" error">
            This field is required</small
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { generalMethods } from '@state/helpers'
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      user: {
        email: '',
        fullName: '',
        phone: '',
        address: '',
        workDetails: '',
        workAddress: '',
      },
      userCpy: null,
      edit: false,
      buttonLoader: false,
    }
  },
  async created() {
    await this.getUserProfile()
  },
  methods: {
    ...generalMethods,
    async getUserProfile() {
      try {
        const res = await this.getProfileInfo()
        this.user = res.data
        this.userCpy = JSON.parse(JSON.stringify(this.user))
      } catch (error) {
        this.$toasted.show(error)
      }
    },
    async setUserProfile() {
      try {
        this.buttonLoader = true
        const res = await this.setProfileInfo({ data: this.user })
        this.buttonLoader = false
        await this.getUserProfile()
        this.edit = false
      } catch (error) {
        this.$toasted.show(error)
        this.buttonLoader = false
      }
    },
    editProfile() {
      this.edit = true
    },
    cancelEdit() {
      this.user = this.userCpy
      this.edit = false
    },
  },
  validations: {
    user: {
      phone: { required },
      address: { required },
      workDetails: { required },
      workAddress: { required },
    },
  },
}
</script>

<style></style>

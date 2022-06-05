<template>
  <section class="login-main-wrap">
    <div class="login-img-wrap"></div>
    <div class="login-form-wrap">
      <div class="text-center">
        <h5>OnSite</h5>
        <p>
          Lej værktøj og maskiner nær dig eller del dit eget, når du ikke bruger
          det
        </p>
      </div>
      <form @submit.prevent="signInUser">
        <div class="form-logo-block mr-b30">
          <img src="@assets/images/onsite-logo.png" alt="" title="" />
        </div>
        <div class="form-title mr-b30">
          <h4 class="mr-b10">Welcome</h4>
          <span>Please login to continue.</span>
        </div>
        <div class="form-inputs-block">
          <div class="form-group custom-inputs mr-b30">
            <div class="cus-input-box">
              <label for="" class="ani-lable">Email ID</label>
              <input
                v-model.trim="user.email"
                type="email"
                class="form-control"
                autofocus
                @input="$v.user.email.$touch"
              />
            </div>
            <small
              v-if="!$v.user.email.required && $v.user.email.$dirty"
              class="error"
            >
              Email is required.
            </small>
            <small v-if="!$v.user.email.email" class="error">
              Enter a valid email.
            </small>
          </div>

          <div class="form-group custom-inputs mr-b60">
            <div class="cus-input-box">
              <label for="" class="ani-lable">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                @input="$v.user.password.$touch"
              />
            </div>
            <small v-if="$v.user.password.$error" class="error">
              Password is required.
            </small>
          </div>

          <div class="f-btn">
            <button
              :disabled="buttonLoader"
              type="submit"
              class="black-btn w100 d-flex align-items-center justify-content-center"
            >
              <span
                v-if="buttonLoader"
                class="fa fa-spinner fa-pulse mr-1"
              ></span
              >Sign In</button
            >
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { authMethods } from '@state/helpers'
import { required, email } from 'vuelidate/lib/validators'

export default {
  page: {
    title: 'Home',
    meta: [{ name: 'description', content: 'Home' }],
  },
  components: {},
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      buttonLoader: false,
    }
  },
  mounted() {
    this.$jquery('.form-control').on('focusin', (e) => {
      this.$jquery(e.target)
        .parent()
        .find('label')
        .addClass('active-lable')
    })
    this.$jquery('.form-control').on('focusout', (e) => {
      if (!e.target.value) {
        this.$jquery(e.target)
          .parent()
          .find('label')
          .removeClass('active-lable')
      }
    })
  },
  methods: {
    ...authMethods,
    async signInUser() {
      try {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          this.buttonLoader = true
          const res = await this.logIn({ data: this.user })
          if (res.result.userInfo.role === 'owner') {
            this.$router.push({ name: 'owner_dashboard' })
          } else {
            this.$router.push({ name: 'consumer_bookings' })
          }
          // this.$toasted.show(res.status.message, {
          //   icon: 'check_circle',
          // })
          this.buttonLoader = false
        }
      } catch (error) {
        this.$toasted.show(error)
        this.buttonLoader = false
      }
    },
  },
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
}
</script>

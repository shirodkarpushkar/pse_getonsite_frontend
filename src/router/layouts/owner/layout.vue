<template>
  <main class="dashboard-wrap">
    <div class="sidebar-col">
      <div class="sidebar-nav">
        <div class="nav-logo-head text-center mr-b50">
          <button type="button" class="menu-back-btn">
            <img src="@assets/images/close.png" alt="" title="" />
          </button>
          <img src="@assets/images/onsite-small-logo.png" alt="" title="" />
        </div>
        <div class="side-nav-list">
          <ul>
            <li>
              <router-link
                :to="{ name: 'owner_dashboard' }"
                active-class="active-nav"
              >
                <div class="nav-icon">
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.90344 23.5416L6.90344 6.45789"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.90324 23.5414L23.9869 23.5414"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M10.7399 16.6342C12.9675 14.5995 14.5654 13.4361 16.3672 11.8207L17.4855 16.2011L22.3582 12.0936"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                Dashboard
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'owner_equipments' }"
                active-class="active-nav"
              >
                <div class="nav-icon">
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6364 9.28638H24.0156"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6364 14.9999H24.0156"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.6364 20.7134H24.0156"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.87537 9.2865H6.88393"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.87512 14.9999H6.88369"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.87512 20.7134H6.88369"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                Equipments
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'owner_invoices' }"
                active-class="active-nav"
              >
                <div class="nav-icon">
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.8089 8H8.08168C7.17794 8 6.44531 8.7835 6.44531 9.75V20.25C6.44531 21.2165 7.17794 22 8.08168 22H22.8089C23.7127 22 24.4453 21.2165 24.4453 20.25V9.75C24.4453 8.7835 23.7127 8 22.8089 8Z"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.44531 13H24.4453"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                Invoices
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'owner_bookings' }"
                active-class="active-nav"
              >
                <div class="nav-icon">
                  <svg
                    width="31"
                    height="30"
                    viewBox="0 0 31 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0467 6.9928H10.6411C10.2164 6.9928 9.80904 7.16152 9.50871 7.46184C9.20839 7.76216 9.03967 8.16949 9.03967 8.59421V21.4055C9.03967 21.8302 9.20839 22.2375 9.50871 22.5378C9.80904 22.8382 10.2164 23.0069 10.6411 23.0069H20.2495C20.6742 23.0069 21.0816 22.8382 21.3819 22.5378C21.6822 22.2375 21.8509 21.8302 21.8509 21.4055V11.797L17.0467 6.9928Z"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.0468 6.99255V11.7968H21.851"
                      stroke="#C7C7C7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                Bookings
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'owner_profile' }"
                active-class="active-nav"
              >
                <div class="nav-icon">
                  <i class="ml-2 mr-2 fa fa-user"></i>
                </div>
                Profile
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="dashboard-right-col h100">
      <div class="dashboard-header">
        <div class="inn-header">
          <div class="row align-items-center">
            <div class="col-6 col-sm-6 col-md-6 col-lg-6">
              <div class="head-title">
                <button id="toggle-menu">
                  <img src="@assets/images/hamburger.png" alt="" title="" />
                </button>
                <h2>
                  {{ currentRoute }}
                </h2>
              </div>
            </div>
            <div class="col-6 col-sm-6 col-md-6 col-lg-6">
              <div class="head-icons text-right">
                <button
                  type="button"
                  class="signout-btn"
                  data-target="#signout"
                  data-toggle="modal"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.189 6.48526C15.8822 6.12322 15.927 5.5809 16.289 5.27408C16.6516 4.96692 17.1939 5.01257 17.5002 5.37412L21.7974 10.4444C22.0715 10.7677 22.0635 11.2419 21.7974 11.5556L17.5002 16.6259C17.1934 16.9881 16.6511 17.0327 16.289 16.7259C15.927 16.4191 15.8822 15.8768 16.189 15.5147L19.287 11.8594L4.03118 11.8594C3.55651 11.8594 3.17163 11.4747 3.17163 11C3.17163 10.5253 3.55651 10.1406 4.03118 10.1406L19.287 10.1406L16.189 6.48526ZM0.859373 22L8.32823 22C8.8029 22 9.1876 21.6153 9.1876 21.1406C9.1876 20.666 8.8029 20.2812 8.32823 20.2812L1.71892 20.2812L1.71892 1.71875L8.32823 1.71875C8.8029 1.71875 9.1876 1.33405 9.1876 0.859376C9.1876 0.384705 8.8029 7.53621e-07 8.32823 7.12124e-07L0.859375 5.91763e-08C0.384872 1.7694e-08 -1.76797e-08 0.384705 -5.91767e-08 0.859375L-1.83222e-06 21.1406C-1.87372e-06 21.6153 0.384871 22 0.859373 22Z"
                      fill="#A3A3A3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="routing-body">
        <transition name="fade" mode="out-in">
          <RouterView :key="$route.fullPath" />
        </transition>
      </div>
    </div>
    <confirm-modal id="signout" @confirm="signOutUser">
      <template v-slot:header>
        Are you sure ?
      </template>
      Are you sure you want to logout ?
    </confirm-modal>
  </main>
</template>

<script>
import { authMethods } from '@state/helpers'

export default {
  computed: {
    currentRoute() {
      const name = this.$route.name.split('_')[1]
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
  },
  mounted() {
    this.$jquery('#toggle-menu, .menu-back-btn').click(() => {
      this.$jquery('.sidebar-col').toggleClass('slide-menu')
    })
  },
  methods: {
    ...authMethods,
    signOutUser() {
      this.logOut()
      // this.$toasted.show('Logout!', {
      //   icon: 'check_circle',
      // })
    },
  },
}
</script>

<style></style>

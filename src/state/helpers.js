import { mapState, mapGetters, mapActions } from 'vuex'

export const authComputed = {
  ...mapState('auth', {
    currentUser: (state) => state.currentUser,
  }),
  ...mapGetters('auth', ['loggedIn']),
}

export const authGetters = mapGetters('auth', ['getAuthenticationToken'])
export const authMethods = mapActions('auth', ['logIn', 'logOut'])

export const ownerMethods = mapActions('owner', [
  'getMachineTypes',
  'getMachineAvailableStatus',
  'addNewMachine',
  'editMachineById',
  'getDashboardOverview',
  'getMachineList',
  'deleteMachineById',
  'getOwnerBookings',
  'getOwnerInvoices',
  'uploadMachineImages',
])
export const consumerMethods = mapActions('consumer', [
  'getBookings',
  'getInvoices',
  'checkAvailability',
  'createBooking',
  'getDashboard',
])
export const generalMethods = mapActions('general', [
  'getCities',
  'getTransactionDetails',
  'getAddressFromLatLng',
  'checkImageFormat',
  'setProfileInfo',
  'getProfileInfo',
])

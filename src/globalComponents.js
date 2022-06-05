import Vue from 'vue'
import Vuelidate from 'vuelidate'
import VueLazyLoad from 'vue-lazyload'
import Toasted from 'vue-toasted'
import moment from 'moment'
import Paginate from 'vuejs-paginate'
import DatePicker from 'vue2-datepicker'
import * as VueGoogleMaps from 'vue2-google-maps'

import ConfirmModal from '@components/confirmModal'
import FormModal from '@components/formModal'
import InfoModal from '@components/infoModal'
import SmallModal from '@components/smallModal'
import CusModal from '@components/cusModal'
import Loader from '@components/loader'
import TableLoader from '@components/tableLoader'
import EditIcon from '@components/EditIcon'
import DelIcon from '@components/DelIcon'
import VueTable from '@components/VueTable'
import MapSearch from '@components/mapSearch'

const ToastedOptions = {
  theme: 'toasted-primary',
  position: 'bottom-right',
  duration: 5000,
  className: 'toastedClass',
  icon: 'info',
  action: {
    text: 'Close',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    },
  },
}

Vue.use(VueLazyLoad)
Vue.use(Vuelidate)
Vue.use(Toasted, ToastedOptions)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBDP6-aI57TeWTz3Y288tCfoPsFANokD2A',
  },
})

Vue.component('ConfirmModal', ConfirmModal)
Vue.component('FormModal', FormModal)
Vue.component('InfoModal', InfoModal)
Vue.component('SmallModal', SmallModal)
Vue.component('CusModal', CusModal)
Vue.component('Loader', Loader)
Vue.component('TableLoader', TableLoader)
Vue.component('paginate', Paginate)
Vue.component('EditIcon', EditIcon)
Vue.component('DelIcon', DelIcon)
Vue.component('VTable', VueTable)
Vue.component('DatePicker', DatePicker)
Vue.component('MapSearch', MapSearch)

Vue.filter('MMDDYYYY', (val) => {
  return moment(val).format('MM/DD/YYYY')
})
Vue.filter('monthYear', (val) => {
  return moment(val).format('MMMM YYYY')
})
Vue.filter('dateTime', (val) => {
  return moment(val).format('MMMM Do YYYY, h:mm:ss a')
})
Vue.filter('locale', (val) => {
  return Number(val).toLocaleString()
})
Vue.filter('capitalise', (val) => {
 let frags = val.split('_')
 for (let i = 0; i < frags.length; i++) {
   frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
 }
 return frags.join(' ')
})

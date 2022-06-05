import qs from 'qs'
import store from '@state/store'

const functions = {
  errorHandler: (err) => {
    if (err.hasOwnProperty('status') && err.status.code === '03') {
      store.dispatch('auth/logOut')
    }
    return err.message ? err.message : err.status.message
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    })
  },
}


export default functions

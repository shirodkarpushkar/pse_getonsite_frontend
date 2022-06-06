import qs from 'qs'
import store from '@state/store'

const functions = {
  errorHandler: (err) => {
    if (err.hasOwnProperty('status') && err.status === 401) {
      store.dispatch('auth/logOut')
    }
    if (err.response && err.response.data) {
      const message = err.response.data.message
      return message
    } else {
      return err.message
    }
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    })
  },
}


export default functions

import axios from 'axios'
import functions from '@state/modules/functions'

const backendURL = process.env.VUE_APP_BACKEND_SERVER
const allowedImageFormats = ['image/png', 'image/jpeg']
export const state = {}
export const getters = {}
export const mutations = {}
export const actions = {
  async getCities({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}cities`,
      })

      const result = response.data
      if (result.status === 200) {
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
  async getTransactionDetails({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}transaction_details`,
        params: data,
        paramsSerializer: functions.paramsSerializer,
      })

      const result = response.data
      if (result.status === 200) {
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
  async getAddressFromLatLng({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}lat_long_address`,
        data,
      })

      const result = response.data
      if (result.status === 200) {
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
  async getProfileInfo({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}profile`,
      })

      const result = response.data
      if (result.status === 200) {
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
  async setProfileInfo({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}profile`,
        data,
      })

      const result = response.data
      if (result.status === 200) {
        return result
      } else {
        throw result
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
  async checkImageFormat({ commit }, files) {
    try {
      const spreadedFiles = [...files]
      const invalidFile = spreadedFiles.filter((el) => {
        return !allowedImageFormats.includes(el.type)
      })
      if (invalidFile.length) {
        throw new Error('Bad Request: Please upload .jpg, .png files only.')
      }
      if (
        files[0].size >= 0 &&
        files[0].size <= 3145728 &&
        !invalidFile.length
      ) {
        return files
      } else {
        throw new Error('Bad Request: File size limit exceeded.')
      }
    } catch (error) {
      throw functions.errorHandler(error)
    }
  },
}

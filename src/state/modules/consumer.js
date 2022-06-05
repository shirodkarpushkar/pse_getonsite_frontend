import axios from 'axios'
import functions from '@state/modules/functions'

const backendURL = process.env.VUE_APP_BACKEND_SERVER

export const state = {}
export const getters = {}
export const mutations = {}
export const actions = {
  async getBookings({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}consumer/getBookings`,
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
  async getInvoices({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}consumer/getInvoice`,
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
  async createBooking({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}consumer/createBooking`,
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
  async getDashboard({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}consumer/dashboardAPI`,
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
  async checkAvailability({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}consumer/checkAvailability`,
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
}

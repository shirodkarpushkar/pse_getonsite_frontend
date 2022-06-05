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
        method: 'get',
        url: `${backendURL}consumer/bookings`,
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
  async getInvoices({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}consumer/invoices`,
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
        url: `${backendURL}consumer/dashboard`,
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
        url: `${backendURL}consumer/availability`,
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

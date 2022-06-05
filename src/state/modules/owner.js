import axios from 'axios'
import functions from '@state/modules/functions'

const backendURL = process.env.VUE_APP_BACKEND_SERVER

export const state = {}
export const getters = {}
export const mutations = {}
export const actions = {
  async getMachineTypes({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}owner/getMachineType`,
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
  async getMachineAvailableStatus({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}owner/getMachineStatus`,
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
  async addNewMachine({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/addNewMachine`,
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
  async editMachineById({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/editMachine`,
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
  async getDashboardOverview({ commit }) {
    try {
      const response = await axios({
        method: 'get',
        url: `${backendURL}owner/dashboardOverview`,
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
  async getMachineList({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/machineList`,
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
  async getOwnerBookings({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/getBookings`,
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
  async getOwnerInvoices({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/getInvoice`,
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
  async deleteMachineById({ commit }, { Id }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/deleteMachine`,
        data: { Id },
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
  async uploadMachineImages({ commit }, { data }) {
    try {
      const response = await axios({
        method: 'post',
        url: `${backendURL}owner/uploadMachineImages`,
        data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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

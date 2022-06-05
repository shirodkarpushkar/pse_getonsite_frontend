<template>
  <div>
    <div class="row align-items-center body-top-head">
      <div class="col-6 col-sm-6">
        <h3 class="page-title">
          Booking List
        </h3>
      </div>
      <div class="col-6 col-sm-6">
        <div class="head-right-btn text-right">
          <button type="button" class="orange-trans-btn" @click="addNew"
            >Add New</button
          >
        </div>
      </div>
    </div>
    <v-table :columns="columns" :items="bookingsList" :loading="tableloader">
      <template #header>
        <th style="width:10%">
          Booking ID
        </th>
        <th style="width:20%">
          Equipment Name
        </th>
        <th style="width:30%">
          Transaction Hash
        </th>
        <th style="width:20%">
          Start Date
        </th>
        <th style="width:20%">
          End Date
        </th>
      </template>

      <tr v-for="(el, i) in bookingsList" :key="i">
        <td>
          <span class="mobile-lable">Booking ID</span>
          # {{ el.Id }}
        </td>
        <td>
          <span class="mobile-lable">Equipment Name</span>
          <div class="link" @click="showEquipment(el)">
            {{ el.equipmentName }}
          </div>
        </td>

        <td>
          <span class="mobile-lable">Transaction Hash</span>
          <a href="" @click.prevent="getHashDetails(el)">{{
            el.transactionHash
          }}</a>
        </td>
        <td>
          <span class="mobile-lable">Start Date</span>
          {{ el.startDate | MMDDYYYY }}
        </td>
        <td>
          <span class="mobile-lable">End Date</span>
          {{ el.endDate | MMDDYYYY }}
        </td>
      </tr>
    </v-table>

    <div class="table-pagination">
      <paginate
        v-model="page"
        :page-count="totalPages"
        :margin-pages="0"
        :page-range="5"
        container-class="pagination"
        page-class="page-item"
        page-link-class="page-link-item"
        :disabled-class="'ignore disabled'"
        :click-handler="clickCallback"
      >
      </paginate>
    </div>

    <form-modal id="addNewBooking">
      <template #header
        >Add New Booking</template
      >
      <form class="row">
        <div class="col-sm-6">
          <div class="form-group cus-gray-input">
            <label>Start Date</label>
            <date-picker
              v-model="booking.startDate"
              format="MM-DD-YYYY"
              value-type="format"
              placeholder="Please Select"
              :disabled-date="notBeforeToday"
              @input="$v.booking.startDate.$touch"
            ></date-picker>
            <small v-if="$v.booking.startDate.$error" class="error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input">
            <label>Equipment Type</label>
            <select
              v-model="booking.machineType"
              type="text"
              class="form-control"
              @change="$v.booking.machineType.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, midx) in machineTypes"
                :key="midx"
                :value="el"
                >{{ el.machineType }}</option
              >
            </select>
            <small v-if="$v.booking.machineType.$error" class=" error">
              This field is required
            </small>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input">
            <label>Total Days</label>
            <input
              v-model.number="booking.totalDays"
              type="number"
              class="form-control"
              min="1"
              @input="$v.booking.totalDays.$touch"
            />

            <template
              v-if="
                $v.booking.totalDays.$dirty && $v.booking.totalDays.$invalid
              "
            >
              <small v-if="!$v.booking.totalDays.required" class=" error">
                This field is required</small
              >
              <small
                v-if="
                  !$v.booking.totalDays.positive &&
                    $v.booking.totalDays.required
                "
                class=" error"
              >
                Total Days should be greater than 0.</small
              >
            </template>
          </div>
        </div>

        <div class="col-sm-6">
          <div v-if="!locationAddress" class="form-group cus-gray-input mr-b40">
            <label>Location</label>
            <select
              v-model="booking.city"
              class="form-control"
              @change="$v.booking.city.$touch"
            >
              <option value="">Please Select</option>
              <option v-for="(el, cidx) in cityList" :key="cidx" :value="el">{{
                el.name
              }}</option>
            </select>
            <small v-if="$v.booking.city.$error" class=" error">
              This field is required</small
            >
          </div>
          <div v-if="locationAddress" class="form-group cus-gray-input">
            <label>Location</label>
            <input
              v-model="locationAddress"
              :title="locationAddress"
              type="text"
              class="form-control"
              disabled
            />
          </div>
        </div>

        <div class="col-sm-12 text-right ">
          <button type="button" class="btn btn-trans mr-b10 " @click="showMaps">
            <map-search></map-search>
          </button>
        </div>
      </form>
      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 "
          @click="checkAvailabity"
        >
          <span v-if="buttonLoader" class="fa fa-spinner fa-pulse mr-1"></span>
          Check Availability</button
        >
      </template>
    </form-modal>
    <form-modal id="equipmentDetails">
      <template #header
        >Equipment Details
      </template>
      <div v-if="machineDetails" class="img-container mr-b20">
        <img
          :src="imageBaseURL + machineDetails.imageName"
          alt=""
          class="img-fit"
        />
      </div>
      <div v-if="machineDetails" class="md-table mr-b20 pd-l50">
        <table class="table-box">
          <tbody>
            <tr>
              <td style="width:50%;color:#000;">
                Equipment Name
              </td>
              <td style="width:50%"> {{ machineDetails.equipmentName }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Equipment Type </td>
              <td style="width:50%"> {{ machineDetails.equipmentType }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Weight ( Tons ) </td>
              <td style="width:50%"> {{ machineDetails.equipmentWeight }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Edition </td>
              <td style="width:50%"> {{ machineDetails.edition }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Serial No. </td>
              <td style="width:50%"> {{ machineDetails.serialNumber }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> level Of Condition </td>
              <td style="width:50%"> {{ machineDetails.levelOfCondition }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Location </td>
              <td style="width:50%"> {{ machineDetails.location }} </td>
            </tr>
          </tbody>
        </table>
      </div>

      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 "
          data-dismiss="modal"
        >
          OK</button
        >
      </template>
    </form-modal>
    <cus-modal ref="googleMapModal" :size="3">
      <template #header
        >Pick a location</template
      >
      <gmap-map
        ref="gmap"
        :center="centerMarker"
        :zoom="7"
        style="width:100%;  height: 500px;"
        @click="confirmMarker"
      >
        <gmap-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker"
        ></gmap-marker>
      </gmap-map>
      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 mr-t20 "
          @click="$refs.googleMapModal.close"
        >
          CLOSE</button
        >
      </template>
    </cus-modal>
    <cus-modal ref="confirmMarker" :size="1">
      <template #header
        >Are you sure ?</template
      >
      Are you sure you want to place pin at {{ templocation }} ?
      <template #buttons>
        <button class="info-btn pd-l30 pd-r30 mr-2" @click="dropMarker"
          >YES</button
        >
        <button
          class="danger-btn  pd-l30 pd-r30 "
          @click="$refs.confirmMarker.close"
        >
          NO
        </button>
      </template>
    </cus-modal>
    <transaction-hash
      id="transactionDetails"
      :hash="hashDetails"
    ></transaction-hash>
    <loader v-if="hashloader"></loader>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { consumerMethods, ownerMethods, generalMethods } from '@state/helpers'
import TransactionHash from '@components/transactionHash'
function positive(val) {
  return val > 0
}
export default {
  page: {
    title: 'Bookings',
    meta: [{ name: 'description', content: 'Bookings' }],
  },
  components: { TransactionHash },
  data() {
    return {
      bookingsList: [],
      machineTypes: [],
      cityList: [],
      page: 1,
      totalPages: 1,
      params: {
        page: 1,
        itemsPerPage: 10,
      },
      columns: 6,
      tableloader: false,
      buttonLoader: false,
      booking: {
        startDate: '',
        totalDays: 1,
        machineType: '',
        city: '',
      },
      markers: [],
      centerMarker: {
        lat: 55.6761,
        lng: 12.5683,
      },
      tmpLatLng: {
        lat: 55.6761,
        lng: 12.5683,
      },
      locationAddress: null,
      templocation: '',
      hashDetails: {},
      hashloader: false,
      machineDetails: null,
      imageBaseURL: process.env.VUE_APP_IMG_BASE_URL,
    }
  },

  async created() {
    this.tableloader = true
    await this.getMasters()
    await this.getList()
  },
  methods: {
    ...ownerMethods,
    ...generalMethods,
    ...consumerMethods,
    async confirmMarker(event) {
      try {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        this.tmpLatLng = { lat: lat.toString(), lng: lng.toString() }
        const response = await this.getAddressFromLatLng({
          data: this.tmpLatLng,
        })
        this.templocation = response.data
        this.$refs.confirmMarker.show()
      } catch (error) {
        this.$toasted.show(error)
      }
    },
    dropMarker() {
      this.$refs.confirmMarker.close()
      this.markers[0] = {
        lat: parseFloat(this.tmpLatLng.lat),
        lng: parseFloat(this.tmpLatLng.lng),
      }
      this.locationAddress = this.templocation
      this.booking.city = this.cityList[0]
      // setTimeout(() => {
      //   this.$refs.googleMapModal.close()
      // }, 500)
    },
    showMaps() {
      if (this.booking.city && !this.locationAddress) {
        this.markers = []
        this.markers.push({
          lat: parseFloat(this.booking.city.lat),
          lng: parseFloat(this.booking.city.lng),
        })
      }
      this.$refs.googleMapModal.show()
    },

    async getList() {
      try {
        this.tableloader = true
        const res = await this.getBookings({ data: this.params })
        this.bookingsList = res.data.bookingsList
        this.totalPages = res.data.totalPages
        this.tableloader = false
      } catch (error) {
        this.$toasted.show(error)
        this.tableloader = false
      }
    },
    clickCallback(page) {
      this.page = page
      this.params.page = this.page
      this.getList()
    },
    addNew() {
      this.booking = {
        startDate: '',
        totalDays: 1,
        machineType: '',
        city: '',
      }
      this.locationAddress = null
      this.markers = []
      this.$v.booking.$reset()
      this.$jquery('#addNewBooking').modal({
        backdrop: 'static',
        keyboard: false,
      })
    },
    async checkAvailabity() {
      this.$v.booking.$touch()
      if (!this.$v.booking.$invalid) {
        try {
          this.buttonLoader = true
          const data = {
            startDate: this.booking.startDate,
            totalDays: this.booking.totalDays,
            machineType: this.booking.machineType.Id,
            location: {
              lat: this.locationAddress
                ? this.tmpLatLng.lat
                : this.booking.city.lat,
              lng: this.locationAddress
                ? this.tmpLatLng.lat
                : this.booking.city.lng,
            },
            page: 1,
            itemsPerPage: 10,
          }
          const status = await this.checkAvailability({ data })
          this.$jquery('#addNewBooking').modal('hide')
          this.$router.push({
            name: 'consumer_bookings_availability',
            query: { data: JSON.stringify(data) },
          })
        } catch (error) {
          this.$toasted.show(error)
          this.buttonLoader = false
        }
      }
    },

    async getMasters() {
      try {
        const response = await Promise.all([
          this.getMachineTypes(),
          this.getCities(),
        ])
        this.machineTypes = response[0].data
        this.cityList = response[1].data
      } catch (error) {
        this.$toasted.show(error)
      }
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0))
    },
    async getHashDetails(el) {
      try {
        this.hashloader = true
        const data = {
          readType: 'Booking',
          transactionHash: el.transactionHash,
        }
        const response = await this.getTransactionDetails({ data })
        this.hashDetails = response.data
        this.$jquery('#transactionDetails').modal('show')
        this.hashloader = false
      } catch (error) {
        this.hashloader = false

        this.$toasted.show(error)
      }
    },
    showEquipment(el) {
      this.machineDetails = JSON.parse(JSON.stringify(el))
      this.$jquery('#equipmentDetails').modal('show')
    },
  },
  validations: {
    booking: {
      startDate: {
        required,
      },
      totalDays: {
        required,
        positive,
      },
      machineType: {
        required,
      },
      city: {
        required,
      },
    },
  },
}
</script>

<style scoped></style>

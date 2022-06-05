<template>
  <div>
    <div class="row align-items-center body-top-head">
      <div class="col-6 col-sm-6">
        <h3 class="page-title">
          Equipment List
        </h3>
      </div>
      <div class="col-6 col-sm-6">
        <div class="head-right-btn text-right">
          <button type="button" class="orange-trans-btn" @click="addNewResource"
            >Add New</button
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <v-table
          :columns="columns"
          :items="machineList"
          :loading="tableloader"
          class="cus-color-table mr-t10"
        >
          <template #header>
            <th style="width:12.50%">
              Equipment ID
            </th>
            <th style="width:12.50%">
              Current Status
            </th>
            <th style="width:12.50%">
              Equipment Name
            </th>
            <th style="width:12.50%">
              Equipment Type
            </th>
            <th style="width:12.50%">
              Condition Level
            </th>
            <th style="width:12.50%">
              Location
            </th>

            <th style="width:12.50%" class="text-center">
              Actions
            </th>
          </template>

          <tr v-for="(el, i) in machineList" :key="i">
            <td>
              <span class="mobile-lable">Equipment ID</span>
              #{{ el.Id }}
            </td>

            <td>
              <span class="mobile-lable">Current Status</span>
              <button
                type="button"
                class="status-btn"
                :class="getStatusColor(el)"
                >{{ el.status }}</button
              >
            </td>
            <td>
              <span class="mobile-lable">Equipment Name</span>
              <div class="link" @click="showEquipment(el)">
                {{ el.equipmentName }}
              </div>
            </td>
            <td>
              <span class="mobile-lable">Equipment Type</span>
              {{ el.equipmentType }}
            </td>
            <td>
              <span class="mobile-lable">Condition Level</span>
              {{ el.levelOfCondition }}</td
            >
            <td>
              <span class="mobile-lable">Location</span>
              {{ el.locationAddress }}
            </td>

            <td class="text-center">
              <div class="action-btn">
                <button type="button" @click="editElement(el)">
                  <edit-icon></edit-icon>
                </button>
                <button type="button" @click="onDelete(el)">
                  <del-icon></del-icon>
                </button>
              </div>
            </td>
          </tr>
        </v-table>

        <div>
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
      </div>
    </div>
    <form-modal id="addNewMachine">
      <template #header
        >Add New Equipment</template
      >
      <form class="row">
        <div class="col-sm-6">
          <div class="form-group cus-gray-input">
            <label>Equipment Type</label>
            <select
              v-model="machine.equipmentType"
              type="text"
              class="form-control"
              @change="$v.machine.equipmentType.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, midx) in machineTypes"
                :key="midx"
                :value="el"
                >{{ el.machineType }}</option
              >
            </select>
            <small v-if="$v.machine.equipmentType.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Equipment Name</label>
            <input
              v-model.trim="machine.equipmentName"
              type="text"
              placeholder="Equipment Name"
              class="form-control"
              @input="$v.machine.equipmentName.$touch"
            />
            <small v-if="$v.machine.equipmentName.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Equipment Weight (Tons)</label>
            <input
              v-model.trim="machine.equipmentWeight"
              type="number"
              placeholder="Equipment Weight"
              min="1"
              class="form-control"
              @input="$v.machine.equipmentWeight.$touch"
            />
            <template
              v-if="
                $v.machine.equipmentWeight.$dirty &&
                  $v.machine.equipmentWeight.$invalid
              "
            >
              <small v-if="!$v.machine.equipmentWeight.required" class=" error">
                This field is required</small
              >
              <small
                v-if="
                  !$v.machine.equipmentWeight.positive &&
                    $v.machine.equipmentWeight.required
                "
                class=" error"
              >
                Equipment Weight should be greater than 0.</small
              >
            </template>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Edition</label>
            <input
              v-model.trim="machine.edition"
              type="text"
              placeholder="Edition"
              class="form-control"
              @input="$v.machine.edition.$touch"
            />
            <small v-if="$v.machine.edition.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Serial Number</label>
            <input
              v-model.trim="machine.serialNumber"
              type="text"
              placeholder="Serial Number"
              class="form-control"
              @input="$v.machine.serialNumber.$touch"
            />
            <small v-if="$v.machine.serialNumber.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Status</label>
            <select
              v-model="machine.status"
              class="form-control"
              disabled
              @change="$v.machine.status.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, sidx) in machineStatus"
                :key="sidx"
                :value="el"
                >{{ el.equipmentStatus }}</option
              >
            </select>
            <small v-if="$v.machine.status.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Condition Level</label>
            <select
              v-model="machine.levelOfCondition"
              class="form-control"
              @change="$v.machine.levelOfCondition.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, clidx) in conditionLevels"
                :key="clidx"
                :value="el"
                >{{ el.value }}</option
              >
            </select>
            <small v-if="$v.machine.levelOfCondition.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Location</label>
            <select
              v-model="machine.city"
              class="form-control"
              @change="$v.machine.city.$touch"
            >
              <option value="">Please Select</option>
              <option v-for="(el, cidx) in cityList" :key="cidx" :value="el">{{
                el.name
              }}</option>
            </select>
            <small v-if="$v.machine.city.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-12">
          <div class="form-group mr-b40">
            <div>
              <label class="upload-label"
                >Upload Image <small>(png, jpg ; Max 3 MB)</small>
              </label>
              <input
                id="upload"
                ref="upload"
                :disabled="imageLoader"
                type="file"
                accept=".jpg, .jpeg, .png"
                hidden
                @change="
                  uploadFile({ edit: false })
                  $v.machine.imageName.$touch
                "
              />
              <label for="upload" class="gray-btn">
                <i class="fa fa-cloud-upload  mr-r10" aria-hidden="true"></i
                >{{ machine.imageName ? machine.imageName : 'No File Chosen' }}
                <span
                  v-if="imageLoader"
                  class="fa fa-spinner fa-pulse mr-1"
                ></span>
              </label>
            </div>

            <small v-if="$v.machine.imageName.$error" class="error">
              Please select file to upload.
            </small>
          </div>
        </div>
      </form>
      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 "
          :disabled="buttonLoader"
          @click="createNewResource"
        >
          <span v-if="buttonLoader" class="fa fa-spinner fa-pulse mr-1"></span>
          Submit</button
        >
      </template>
    </form-modal>
    <form-modal id="editMachine">
      <template #header
        >Edit Equipment</template
      >
      <form class="row">
        <div class="col-sm-6">
          <div class="form-group cus-gray-input">
            <label>Equipment Type</label>
            <select
              v-model="machine.equipmentType"
              type="text"
              class="form-control"
              @change="$v.machine.equipmentType.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, midx) in machineTypes"
                :key="midx"
                :value="el"
                >{{ el.machineType }}</option
              >
            </select>
            <small v-if="$v.machine.equipmentType.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Equipment Name</label>
            <input
              v-model.trim="machine.equipmentName"
              type="text"
              placeholder="Equipment Name"
              class="form-control"
              @input="$v.machine.equipmentName.$touch"
            />
            <small v-if="$v.machine.equipmentName.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Equipment Weight (Tons)</label>
            <input
              v-model.trim="machine.equipmentWeight"
              type="number"
              min="1"
              placeholder="Equipment Weight"
              class="form-control"
              @input="$v.machine.equipmentWeight.$touch"
            />
            <template
              v-if="
                $v.machine.equipmentWeight.$dirty &&
                  $v.machine.equipmentWeight.$invalid
              "
            >
              <small v-if="!$v.machine.equipmentWeight.required" class=" error">
                This field is required</small
              >
              <small
                v-if="
                  !$v.machine.equipmentWeight.positive &&
                    $v.machine.equipmentWeight.required
                "
                class=" error"
              >
                Equipment Weight should be greater than 0.</small
              >
            </template>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Edition</label>
            <input
              v-model.trim="machine.edition"
              type="text"
              placeholder="Edition"
              class="form-control"
              @input="$v.machine.edition.$touch"
            />
            <small v-if="$v.machine.edition.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Serial Number</label>
            <input
              v-model.trim="machine.serialNumber"
              type="text"
              placeholder="Serial Number"
              class="form-control"
              @input="$v.machine.serialNumber.$touch"
            />
            <small v-if="$v.machine.serialNumber.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Status</label>
            <select
              v-model="machine.status"
              class="form-control"
              @change="$v.machine.status.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, sidx) in machineStatus"
                :key="sidx"
                :value="el"
                >{{ el.equipmentStatus }}</option
              >
            </select>
            <small v-if="$v.machine.status.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Condition Level</label>
            <select
              v-model="machine.levelOfCondition"
              class="form-control"
              @change="$v.machine.levelOfCondition.$touch"
            >
              <option value="">Please Select</option>
              <option
                v-for="(el, clidx) in conditionLevels"
                :key="clidx"
                :value="el"
                >{{ el.value }}</option
              >
            </select>
            <small v-if="$v.machine.levelOfCondition.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-6">
          <div class="form-group cus-gray-input mr-b20">
            <label>Location</label>
            <select
              v-model="machine.city"
              class="form-control"
              @change="$v.machine.city.$touch"
            >
              <option value="">Please Select</option>
              <option v-for="(el, cidx) in cityList" :key="cidx" :value="el">{{
                el.name
              }}</option>
            </select>
            <small v-if="$v.machine.city.$error" class=" error">
              This field is required</small
            >
          </div>
        </div>
        <div class="col-sm-12">
          <div class="form-group mr-b40">
            <label class="upload-label"
              >Upload Image <small>(png, jpg ; Max 3 MB)</small>
            </label>
            <input
              id="uploadEdit"
              ref="uploadEdit"
              :disabled="imageLoader"
              type="file"
              accept=".jpg, .jpeg, .png"
              hidden
              @change="
                uploadFile({ edit: true })
                $v.machine.imageName.$touch
              "
            />
            <label for="upload" class="gray-btn">
              <i class="fa fa-cloud-upload  mr-r10" aria-hidden="true"></i
              >{{ machine.imageName ? machine.imageName : 'No File Chosen' }}
              <span
                v-if="imageLoader"
                class="fa fa-spinner fa-pulse mr-1"
              ></span>
            </label>
            <small v-if="$v.machine.imageName.$error" class=" error">
              Please select file to upload.
            </small>
          </div>
        </div>
      </form>
      <template #buttons>
        <button
          type="button"
          class="black-btn pd-l60 pd-r60 "
          :disabled="buttonLoader"
          @click="editResource"
        >
          <span v-if="buttonLoader" class="fa fa-spinner fa-pulse mr-1"></span>
          Submit</button
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
              <td style="width:50%;color:#000;"> Owner ID </td>
              <td style="width:50%"> {{ machineDetails.ownerId }} </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Current Status </td>
              <td style="width:50%">
                <button
                  class="status-btn"
                  :class="getStatusColor(machineDetails)"
                >
                  {{ machineDetails.status }}
                </button>
              </td>
            </tr>
            <tr>
              <td style="width:50%;color:#000;"> Location </td>
              <td style="width:50%"> {{ machineDetails.locationAddress }} </td>
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
    <confirm-modal id="confirmDel" @confirm="removeResource">
      <template v-slot:header>
        Are you sure ?
      </template>
      Are you sure you want to delete this equipment ?
    </confirm-modal>
  </div>
</template>
<script>
import { ownerMethods, generalMethods } from '@state/helpers'
import { required } from 'vuelidate/lib/validators'
function positive(val) {
  return val > 0
}
export default {
  page: {
    title: 'Equipments',
    meta: [{ name: 'description', content: 'Equipments' }],
  },
  components: {},
  data() {
    return {
      machineTypes: [],
      machineStatus: [],
      machine: {
        equipmentName: '',
        equipmentWeight: '',
        edition: '',
        serialNumber: '',
        status: '',
        equipmentType: '',
        city: '',
        levelOfCondition: '',
        imageName: '',
      },
      machineList: [],
      cityList: [],
      conditionLevels: [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 },
      ],
      page: 1,
      totalPages: 1,
      params: {
        page: 1,
        itemsPerPage: 10,
      },
      columns: 7,
      tableloader: false,
      buttonLoader: false,
      deleteId: null,
      imageLoader: false,
      machineDetails: null,
      imageBaseURL: process.env.VUE_APP_IMG_BASE_URL,
    }
  },
  async created() {
    this.tableloader = true
    await this.getMasters()
    await this.getList()
  },
  destroyed() {
    setTimeout(() => {
      this.$jquery('#addNewMachine').modal('hide')
      this.$jquery('#editMachine').modal('hide')
      this.$jquery('#confirmDel').modal('hide')
    }, 500)
  },
  methods: {
    ...ownerMethods,
    ...generalMethods,
    async getList() {
      try {
        this.tableloader = true
        const res = await this.getMachineList({ data: this.params })
        this.machineList = res.result.machineList
        this.totalPages = res.result.totalPages
        this.tableloader = false
      } catch (error) {
        this.$toasted.show(error)
        this.tableloader = false
      }
    },
    async getMasters() {
      try {
        const response = await Promise.all([
          this.getMachineTypes(),
          this.getMachineAvailableStatus(),
          this.getCities(),
        ])
        this.machineTypes = response[0].result
        this.machineStatus = response[1].result
        this.cityList = response[2].result
      } catch (error) {
        this.$toasted.show(error)
      }
    },
    clickCallback(page) {
      this.page = page
      this.params.page = this.page
      this.getList()
    },
    getStatusColor(el) {
      if (el.status === 'free') {
        return {
          'status-green': true,
        }
      } else if (el.status === 'occupied') {
        return {
          'status-orange': true,
        }
      } else {
        return {
          'status-yellow': true,
        }
      }
    },
    createNewResource() {
      this.$v.machine.$touch()
      if (!this.$v.machine.$invalid) {
        this.buttonLoader = true
        const data = {
          equipmentName: this.machine.equipmentName,
          equipmentWeight: this.machine.equipmentWeight,
          edition: this.machine.edition,
          serialNumber: this.machine.serialNumber,
          status: this.machine.status.Id,
          equipmentType: this.machine.equipmentType.Id,
          cityId: this.machine.city.Id,
          levelOfCondition: this.machine.levelOfCondition.value,
          imageName: this.machine.imageName,
        }
        this.addNewMachine({ data })
          .then((result) => {
            this.buttonLoader = false
            this.getList()
            this.$jquery('#addNewMachine').modal('hide')
          })
          .catch((err) => {
            this.$toasted.show(err)
            this.buttonLoader = false
          })
      }
    },
    addNewResource() {
      this.machine = {
        equipmentName: '',
        equipmentWeight: '',
        edition: '',
        serialNumber: '',
        status: this.machineStatus[0],
        equipmentType: '',
        city: '',
        levelOfCondition: { id: 1, value: 1 },
        imageName: '',
      }
      this.$v.machine.$reset()
      this.$jquery('#addNewMachine').modal({
        backdrop: 'static',
        keyboard: false,
      })
    },
    editElement(el) {
      this.$v.machine.$reset()
      this.machine = {
        Id: el.Id,
        equipmentName: el.equipmentName,
        equipmentWeight: el.equipmentWeight,
        edition: el.edition,
        serialNumber: el.serialNumber,
        status: this.machineStatus.find(
          (item) => item.equipmentStatus === el.status
        ),
        equipmentType: this.machineTypes.find(
          (item) => item.machineType === el.equipmentType
        ),
        city: this.cityList.find((item) => item.Id == el.cityId),
        levelOfCondition: this.conditionLevels.find(
          (item) => item.value == el.levelOfCondition
        ),
        imageName: el.imageName,
      }
      this.$jquery('#editMachine').modal({
        backdrop: 'static',
        keyboard: false,
      })
    },
    editResource() {
      this.$v.machine.$touch()
      if (!this.$v.machine.$invalid) {
        this.buttonLoader = true
        const data = {
          Id: this.machine.Id,
          equipmentName: this.machine.equipmentName,
          equipmentWeight: this.machine.equipmentWeight,
          edition: this.machine.edition,
          serialNumber: this.machine.serialNumber,
          status: this.machine.status.Id,
          equipmentType: this.machine.equipmentType.Id,
          cityId: this.machine.city.Id,
          levelOfCondition: this.machine.levelOfCondition.value,
          imageName: this.machine.imageName,
        }
        this.editMachineById({ data })
          .then((result) => {
            this.buttonLoader = false
            this.getList()
            this.$jquery('#editMachine').modal('hide')
            this.$toasted.show(result.status.message, { icon: 'check_circle' })
          })
          .catch((err) => {
            this.$toasted.show(err)
            this.buttonLoader = false
          })
      }
    },
    onDelete(el) {
      this.deleteId = el.Id
      this.$jquery('#confirmDel').modal('show')
    },
    removeResource() {
      this.loader = true
      this.deleteMachineById({
        Id: this.deleteId,
      })
        .then((res) => {
          this.getList()
        })
        .catch((err) => {
          this.$toasted.show(err)
        })
      this.$jquery('#confirmDel').modal('hide')
    },
    async uploadFile({ edit }) {
      try {
        const uploadedFile = !edit
          ? this.$refs.upload.files
          : this.$refs.uploadEdit.files

        const checkFile = await this.checkImageFormat(uploadedFile)
        this.imageLoader = true
        const formData = new FormData()
        formData.append('image', uploadedFile[0])
        const response = await this.uploadMachineImages({ data: formData })
        this.imageLoader = false
        this.machine.imageName = response.result.imageName
        this.$refs.upload.value = ''
        this.$refs.uploadEdit.value = ''
      } catch (error) {
        this.$toasted.show(error)
        this.$refs.upload.value = ''
        this.$refs.uploadEdit.value = ''
        this.imageLoader = false
      }
    },
    showEquipment(el) {
      this.machineDetails = JSON.parse(JSON.stringify(el))
      this.$jquery('#equipmentDetails').modal('show')
    },
  },
  validations: {
    machine: {
      equipmentName: { required },
      equipmentWeight: { required, positive },
      edition: { required },
      serialNumber: { required },
      status: { required },
      equipmentType: { required },
      city: { required },
      levelOfCondition: { required },
      imageName: { required },
    },
  },
}
</script>

<style scoped></style>

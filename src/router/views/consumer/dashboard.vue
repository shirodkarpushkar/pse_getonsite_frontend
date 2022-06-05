<template>
  <div>
    <div class="row body-top-head">
      <div class="col-sm-12 col-sm-12 col-md-12 col-lg-12">
        <h3 class="page-title mr-b20">
          My Upcoming Bookings
        </h3>
      </div>
    </div>
    <div class="white-box pd30 mr-b20">
      <div class="cus-blank-table table-responsive">
        <table class="table-box">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Equipment Type</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="tableloader">
              <tr>
                <td colspan="4">
                  <table-loader></table-loader>
                </td>
              </tr>
            </template>
            <template v-if="!tableloader">
              <tr v-for="(el, i) in upcomingBookings" :key="i">
                <td>
                  <span class="mobile-lable">Booking ID </span>

                  #{{ el.bookingId }}
                </td>
                <td>
                  <span class="mobile-lable">Equipment Type</span>
                  {{ el.equipmentType }}
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
            </template>
            <template v-if="!upcomingBookings.length && !tableloader">
              <tr>
                <td colspan="4">
                  <div class="lead">No records found</div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    <div class="white-box pd30 ">
      <h5>Bookings</h5>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </div>
</template>
<script>
import { consumerMethods } from '@state/helpers'
import { Chart } from 'highcharts-vue'

export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: 'Dashboard' }],
  },
  components: { highcharts: Chart },
  data() {
    return {
      upcomingBookings: [],
      tableloader: false,
      chartOptions: {
        colors: ['#DF4D20'],
        title: {
          text: `Bookings for  ${this.$options.filters.monthYear(new Date())}`,
        },

        yAxis: {
          title: {
            text: 'Number of Bookings',
          },
        },

        xAxis: {
          accessibility: {
            rangeDescription: 'Range: 1 to 31',
          },
        },

        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },

        plotOptions: {
          series: {
            label: {
              connectorAllowed: false,
            },
            pointStart: 1,
          },
        },

        series: [
          {
            name: 'Bookings',
            data: [1, 2, 1, 3],
            marker: {
              enabled: false,
            },
          },
        ],
        tooltip: {
          headerFormat: `Date: {point.x} ${this.$options.filters.monthYear(
            new Date()
          )} <br>`,
          // pointFormat: '{point.y} m a. s. l.',
          shared: true,
        },

        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom',
                },
              },
            },
          ],
        },
      },
    }
  },
  created() {
    this.getDashboardData()
  },
  methods: {
    ...consumerMethods,
    getDashboardData() {
      this.tableloader = true
      this.getDashboard()
        .then((res) => {
          this.upcomingBookings = res.result.upcomingBookings
          this.chartOptions.series[0].data = res.result.bookingsGraph.map(
            (el) => el.frequency
          )
          this.tableloader = false
        })
        .catch((err) => {
          this.$toasted.show(err)
          this.tableloader = false
        })
    },
  },
}
</script>

<style scoped></style>

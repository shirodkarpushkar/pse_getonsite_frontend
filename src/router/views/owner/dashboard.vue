<template>
  <div>
    <div class="row">
      <div class="col-12 col-sm-12 col-md-12 col-lg-5">
        <h3 class="page-title mr-b20">
          Overview
        </h3>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-6 col-lg-12">
            <div class="white-box pd30  pd-t10">
              <div class="chart-block">
                <highcharts :options="chartOptions"></highcharts>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6 col-lg-12">
            <div class="white-box pd30 line-mr-t20 pd-t20">
              <h5
                >Revenue for
                {{ this.$options.filters.monthYear(new Date()) }}</h5
              >
              <div class="chart-block mr-t20">
                <highcharts :options="lineChartOptions"></highcharts>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-md-12 col-lg-7">
        <h3 class="page-title mr-b20">
          Upcoming Bookings
        </h3>
        <div class="white-box pd30">
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
      </div>
    </div>
  </div>
</template>
<script>
import { Chart } from 'highcharts-vue'
import { ownerMethods } from '@state/helpers'
export default {
  page: {
    title: 'Dashboard',
    meta: [{ name: 'description', content: 'Dashboard' }],
  },
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      tableloader: false,

      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          height: 300,
          type: 'pie',
        },
        credits: false,
        exporting: false,
        title: false,
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: 'Percentage',
            colorByPoint: true,
            data: [
              {
                name: 'Occupied',
                y: 25,
                color: '#EB5A2C',
              },
              {
                name: 'Service',
                y: 15,
                color: '#DC934A',
              },
              {
                name: 'Free',
                y: 60,
                color: '#F3C54B',
              },
            ],
          },
        ],
      },
      lineChartOptions: {
        colors: ['#DF4D20'],
        title: { text: '' },

        yAxis: {
          title: {
            text: 'Revenue in Kr',
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
            name: 'Revenue',
            data: [1000, 2300, 5400, 6400],
            marker: {
              enabled: false,
            },
          },
        ],
        tooltip: {
          headerFormat: `Date: {point.x} ${this.$options.filters.monthYear(
            new Date()
          )} <br>`,
          pointFormat: 'Revenue: {point.y} Kr',
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
      upcomingBookings: [],
    }
  },
  async created() {
    await this.getDashboardData()
  },
  methods: {
    ...ownerMethods,
    async getDashboardData() {
      try {
        this.tableloader = true

        const res = await this.getDashboardOverview()
        const total = res.data.overview.total
        this.chartOptions.series[0].data[0].y = Math.floor(
          (res.data.overview.occupied / total) * 100
        )
        this.chartOptions.series[0].data[1].y = Math.floor(
          (res.data.overview.underRepair / total) * 100
        )
        this.chartOptions.series[0].data[2].y = Math.floor(
          (res.data.overview.free / total) * 100
        )
        this.upcomingBookings = res.data.upcomingBookings
        this.lineChartOptions.series[0].data = res.data.revenueGraph.map(
          (el) => el.revenue
        )
        this.tableloader = false
      } catch (error) {
        this.$toasted.show(error)
        this.tableloader = false
      }
    },
  },
}
</script>

<style scoped></style>

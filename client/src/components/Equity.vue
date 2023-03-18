<template>
  <v-app>
    <v-container>
      <v-card class="media-body container-fluid" style="padding: 50px; margin: 20px;">
        <apexchart type="bar" :options="options" :series="series"></apexchart>
        <v-card-text style="border: 2px solid lightgray !important; border-radius: 5px; margin-top: 20px;">
          <v-row>
            <v-col>
              <p><strong>MSCI-1:</strong> MSCI EM Ex BRIC</p>
              <p><strong>MSCI-2:</strong> MSCI World No Tobacco, Alcohol, Weapons</p>
              <p><strong>MSCI-3:</strong> MSCI World</p>
            </v-col>
            <v-col>
              <p><strong>MSCI-4:</strong> MSCI World Sharia Compliant</p>
              <p><strong>MSCI-5:</strong> MSCI WORLD ex EMU NR EUR</p>
              <p><strong>BFGEI:</strong> Bloomberg Financial Services Gender-Equality Index</p>
              <a href="https://assets.bbhub.io/company/sites/46/2021/01/GEI2021_MemberList_FNL.pdf" target="_blank">Click here for BFGEI Index List</a>
              <a><iframe src="https://assets.bbhub.io/company/sites/46/2021/01/GEI2021_MemberList_FNL.pdf" >BFGEI Companies List</iframe> </a>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
// import axios from "axios";
export default {
  name: "Equity",
  data() {
    return {
      options: {
        chart: {
          id: "bar-chart",
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            vertical: true,
          }
        },
        title: {
          text: 'Equity Benchmark Indices for 1 Year Performance 2020 - 2021',
          align: 'center',
          margin: 33,
          style: {
            fontSize: '22px',
            color: 'black'
          }
        },
        xaxis: {
          categories: [
            "MSCI-1",
            "MSCI-2",
            "MSCI-3",
            "MSCI-4",
            "MSCI-5",
            "BFGEI",
          ],
        },
        colors: [
          function({ value }) {
            if (value > 50.0) {
              return '#F1B7B9'
            } else {
              return '#DF8270'
            }
          }
        ],
      },
      series: [
        {
          name: "Growth Percentage % ",
          data: [7.75, 20.48, 16.5, 9.0, 7.76, 58.28],
        },
      ],
      legend: {
        show: true,
        
      }
    };
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.cardAlert {
  padding: 20px;
  border-left: 10px solid #00bcd4 !important;
}
.primary {
  background-color: #bdbdbd !important;
}
</style>
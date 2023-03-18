<template>
    <v-card class="mt-4 mx-auto mb-5" max-width="500">
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
            <v-sparkline stroke-linecap="round" smooth :labels="Object.keys(countResult)" :value="Object.values(countResult)" color="white" line-width="2" padding="16"></v-sparkline>  
            <v-card-title small v-if="Object.keys(countResult).length < 2">
                <v-icon large left dark>
                    mdi-human-greeting
                </v-icon>
                <span class="title font-weight-light white--text">{{ Object.values(countResult)[0] || 0 }} applicant(s) <span v-if="Object.keys(countResult).length === 1">  on </span> {{ Object.keys(countResult)[0] || null }}</span>
            </v-card-title>
        </v-sheet>
        <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">
                Investors/Mentors Registrations
            </div>
            <div class="subheading font-weight-light grey--text">
                Current and Last Investment Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small>
                mdi-calendar
            </v-icon>
            <span class="caption grey--text font-weight-light">*last 7 days of investors application</span>
        </v-card-text>
    </v-card>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';

    export default {
        name: 'CampaignChart',
        mixins: [HelperMixin],        
        props: {
            volunteers: Array
        },
        method: {

        },
        computed: {
            countResult() {
                let fromDate = new Date();

                //Change it so that it is 7 days in the past.
                fromDate.setDate(fromDate.getDate() - 28);
                const filterVol =  this.volunteers.filter(e => this.getLocaleDate(fromDate) < e.dateapp);
                
                let shortDate = "";
                const groupByDate = filterVol.reduce((prevAcc, curr) => {
                    shortDate = (this.getLocaleDate(curr.dateapp)).slice(5,10).replace("-", "/");
                    prevAcc[shortDate] = prevAcc[shortDate] + 1 || 1;
                    return prevAcc;
                }, {});
                
                return groupByDate;
            }
        }

    }
</script>

<style>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>
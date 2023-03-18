<template>
    <v-container fluid>
        <v-row>

            <v-alert color="primary" dark icon="mdi-calendar-multiple" border="right" prominent>
                Total Investments:
                <v-spacer />
                {{events.length}}
            </v-alert>

            <v-alert color="pink" dark icon="mdi-charity" border="right" prominent>
                We're looking for:
                <v-spacer />
                {{requiredFunds}} worth of fund (MYR).
            </v-alert>

            <v-alert color="orange" dark icon="mdi-account-group" border="right" prominent>
                We received:
                <v-spacer />
                {{volunteer.length}} investor(s).
            </v-alert>

            <v-alert color="deep-purple darken-1" dark icon="mdi-account-check" border="right" prominent>
                We accepted:
                <v-spacer />
                {{ approvedVol }} fund(s)
            </v-alert>
            <!-- <v-card color="#FFF59D" class="justify-center" style="padding: 20px;">
                    <v-card-title>
                        <v-icon medium left>mdi-account-check</v-icon>
                        Accepted Application
                        <v-spacer />
                        {{ approvedVol }}
                    </v-card-title>
                </v-card> -->

        </v-row>
    </v-container>
</template>
<script>
    export default {
        name: 'DashBoard',
        props: {
            volunteer: Array,
            events: Array
        },
        computed: {
            approvedVol() {
                let count = 0;
                for (let i = 0; i < this.volunteer.length; i++) {
                    if (this.volunteer[i].status === "accepted") {
                        count += 1;
                    }
                }
                return count;
            },
            requiredVolunteers() {
                let sum = 0;
                for (let i = 0; i < this.events.length; i++) {
                    sum += this.events[i].totalvolunteer;
                }
                return sum;
            },
            requiredFunds() {
                let sum = 0;
                for (let i = 0; i < this.events.length; i++) {
                    sum += this.events[i].totalfunds;
                }
                return sum;
            }
        },
    }

</script>
<style scoped>
    .row {
        display: flex;
    }

    .v-alert {
        flex: 1;
        /* additionally, equal width */
        margin: 0.75em;
        padding: 1em;
        border: solid;
    }
</style>
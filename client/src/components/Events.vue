<template>
    <v-container>
        <v-dialog v-model="submitApplicationDialog" max-width="500px">
            <v-card class="cardAlert">
                <v-card-actions>
                    We have emailed you the prospectus and instructions to invest.
                    <v-spacer></v-spacer>
                    <v-btn fab x-small dark color="cyan" @click="submitApplicationDialog=false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="volunteerDialog" max-width="500px">
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
            <v-toolbar color="grey lighten-2">
                <v-btn icon @click="volunteerDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Application</v-toolbar-title>
            </v-toolbar>
            <volunteer-application-form :eventId="selectedEvent" @volunteerApplication="submitApplication"
                @closeForm="volunteerDialog=false" />
            <v-system-bar height="10px" z-index="1" color="cyan darken-1"></v-system-bar>
        </v-dialog>
        <p id="eventsSection"></p>
        <div class="col-md-12">
            <v-card>
                <v-card-title style="padding-left: 30px">
                    <h2>We can make a difference</h2>
                </v-card-title>
                <v-card-text style="padding-left: 30px; line-height: 1.6;">
                    <h3>
                    Female entrepreneurs are disadvantaged in the traditional funding market. We want to change this status quo by providing alternative access to funds while empowering investors to practice gender lens investing across asset classes.
                    </h3>
                </v-card-text>
                <v-data-iterator :items="items" :items-per-page.sync="itemsPerPage" :page="page" :search="search"
                    :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc" item-key="eid" :single-expand="singleExpand"
                    hide-default-footer class="eventTbl">
                    <template v-slot:header>
                        <v-toolbar dark color="grey darken-4" class="mt-1">
                            <v-text-field v-model="search" clearable flat solo-inverted hide-details
                                prepend-inner-icon="mdi-magnify" label="Search for an Upcoming Event">
                            </v-text-field>
                            <template v-if="$vuetify.breakpoint.mdAndUp">
                                <v-spacer></v-spacer>
                                <v-select v-model="sortBy" flat solo-inverted hide-details :items="keys"
                                    prepend-inner-icon="mdi-magnify" label="Sort by"></v-select>
                                <v-spacer></v-spacer>
                                <v-btn-toggle v-model="sortDesc" mandatory>
                                    <v-btn depressed large color="grey darken-3" :value="false">
                                        <v-icon>mdi-arrow-up</v-icon>
                                    </v-btn>
                                    <v-btn depressed large color="grey darken-3" :value="true">
                                        <v-icon>mdi-arrow-down</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </template>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="{ items, isExpanded, expand }">
                        <v-row>
                            <v-col v-for="item in items" :key="item.eid" cols="12" sm="6" md="4" lg="3">
                                <v-card class="my-5" max-width="380">
                                    <v-img height="200" :src="item.images">
                                    </v-img>
                                    <v-card-title class="pb-2 text-justify">{{ item.name | truncate(27, '...') }}
                                    </v-card-title>
                                    <v-card-text>
                                        <div class="my-3 subtitle-2">By: {{ item.organization }}</div>
                                        <div class="font-weight-medium">Funds required (MYR): {{
                                            item.totalfunds
                                            }}</div>
                                        <div>Closing date : {{ getLocaleDate(item.closing, true) }}</div>
                                        <div>Location: {{ item.location | truncate(18, '...') }}</div>
                                    </v-card-text>
                                    <v-divider class="mx-2"></v-divider>
                                    <v-card-text class="descrWrap">
                                        <div class="descr">{{ item.description }}</div>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-btn class="apply" text color="deep-purple accent-4"
                                            @click="openVolunteerForm(item.eid)">
                                            Invest Now
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-switch :input-value="isExpanded(item)"
                                            :label="isExpanded(item) ? 'Hide' : 'More..'" class="expand"
                                            @change="(v) => expand(item, v)"></v-switch>
                                    </v-card-actions>

                                    <v-expand-transition>
                                        <div v-if="isExpanded(item)">
                                            <v-card-text>
                                                <h3>{{item.name}}</h3>
                                                <h4> ({{ item.location }})</h4> 
                                                Contact Person/Num:<p>{{ item.contactname }} ({{ item.contactnum }}) </p>
                                                <p v-if="item.datefrom != null">Date(s): {{ getLocaleDate(item.datefrom, true) }} - {{ getLocaleDate(item.dateto, true) }}</p>
                                                <v-spacer></v-spacer>
                                                {{item.description}}
                                            </v-card-text>
                                        </div>
                                    </v-expand-transition>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>

                    <template v-slot:footer>
                        <v-row class="mt-2" align="center" justify="center">
                            <span class="grey--text">Items per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark text color="cyan" class="ml-2" v-bind="attrs" v-on="on">
                                        {{ itemsPerPage }}
                                        <v-icon>mdi-chevron-down</v-icon>
                                    </v-btn>
                                </template>
                                <v-list>
                                    <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index"
                                        @click="updateItemsPerPage(number)">
                                        <v-list-item-title>{{ number }}</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>

                            <v-spacer></v-spacer>

                            <span class="mr-4 grey--text">
                                Page {{ page }} of {{ numberOfPages }}
                            </span>
                            <v-btn fab small dark color="cyan" class="mr-1" @click="formerPage">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn fab small dark color="cyan" class="ml-1" @click="nextPage">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </template>

                </v-data-iterator>
            </v-card>

        </div>
    </v-container>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    import VolunteerApplicationForm from './VolunteerApplicationForm.vue';
    import { fetch } from 'whatwg-fetch'

    export default {
        components: { VolunteerApplicationForm },
        name: "Events",
        mixins: [HelperMixin],
        data() {
            return {
                submitApplicationDialog: false,
                singleExpand: true,
                volunteerDialog: false,
                selectedEvent: 0,
                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 4,
                sortBy: 'name',
                keys: [
                    'Name',
                    'Description',
                    'Closing',
                    'Organization',
                    'Total Funds Needed',
                    'Returns',
                    'Location',
                    
                ],
                items: [{}],
                newVolunteer: [],
                show: false,
            }
        },
        created() {
            this.getEvents();
        },
        computed: {
            numberOfPages() {
                return Math.ceil(this.items.length / this.itemsPerPage);
            },
            filteredKeys() {
                return this.keys.filter(key => key !== 'Name');
            },
        },
        methods: {
            //Get all events
            getEvents() {
                fetch("/api/events")
                    .then(response => response.json())
                    .then(data => {
                        this.items = data;
                    })
                    .catch(error => {
                        console.error("Error in get events: ", error);
                    });
            },
            nextPage() {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage() {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage(number) {
                this.itemsPerPage = number
            },
            openVolunteerForm(eid) {
                this.volunteerDialog = true;
                this.selectedEvent = eid;
            },
            submitApplication(data) {
                // console.log("in events - data is:", JSON.stringify(data))
                this.submitApplicationDialog = true;
                this.volunteerDialog = false;
                fetch("/api/volunteers", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        response.json();
                    })
                    .catch(error => {
                        console.error("Error in volunteer application submission: ", error);
                    });
            }
        }
    }
</script>

<style scoped>
    .v-card__title {
        font-size: 1em;
    }

    h2 {
        color: #00B8D4;
    }

    .top {
        display: inline-flex;
    }

    #eventsSection {
        padding-top: 20px;
    }

    .eventTbl {
        background-color: white;
        padding: 20px;
        /* border-radius: 1em; */
    }

    .descrWrap {
        padding-top: 5px;
        padding-bottom: 0px;
    }

    .descr {
        margin: 0 auto;
        /* autoprefixer: off */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
</style>
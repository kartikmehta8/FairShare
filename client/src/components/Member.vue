<template>
    <div id="app">
        <v-app>
            <v-card>
                <v-spacer></v-spacer>
                <v-app-bar absolute color="#6A76AB" dark shrink-on-scroll prominent
                    src="https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8Y2hhbmdlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    fade-img-on-scroll scroll-target="#scrolling-techniques-5">
                    <template v-slot:img="{ props }">
                        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
                    </template>

                    <v-toolbar-title>Member Dashboard</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <template v-slot:extension>
                        <v-tabs v-model="tab" centered dark icons-and-text>
                            <v-tabs-slider></v-tabs-slider>
                            <v-tab>
                                My Campaign(s)
                                <v-icon>mdi-calendar-heart</v-icon>
                            </v-tab>
                            <v-tab>
                                Add New Campaign(s)
                                <v-icon>mdi-calendar-plus</v-icon>
                            </v-tab>
                            <v-tab-item>
                                <v-container style="align-items: center;">
                                    <v-row style="margin-bottom: 50px;">
                                        <dash-board :events="orgevents" :volunteer="volunteers"/>
                                    </v-row>
                                    <v-row>
                                        <v-col style="margin-right: 70px;">
                                            <v-flex style="padding-bottom: 40px;">
                                                <member-event-list :events="orgevents" @updateEvent="handleUpdate"
                                                    @deleteEvent="handleDelete" />
                                            </v-flex>
                                            <v-flex style="padding-bottom: 30px;">
                                                <volunteer-list :userId="uid" :volunteers="volunteers"
                                                    @getVolunteers="getAllVolunteers" />
                                            </v-flex>
                                        </v-col>
                                        <v-col>
                                            <v-flex>
                                                <campaign-chart :volunteers="volunteers" />
                                            </v-flex>
                                            <v-flex>
                                                <!-- <v-card class="mx-auto" color="cyan" dark max-width="500">
                                                    <v-card-title>
                                                        <v-icon large left>
                                                            mdi-twitter
                                                        </v-icon>
                                                        <span class="title font-weight-light">Twitter</span>
                                                    </v-card-title>
                                                    <v-card-text class="headline font-weight-bold">
                                                       <a class="twitter-timeline" href="https://twitter.com/rafaellawai/lists/gender-equality-finance-27714?ref_src=twsrc%5Etfw">A Twitter List by Focal</a>                                                       
                                                    </v-card-text>
                                                </v-card> -->
                                            </v-flex>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-tab-item>
                            <v-tab-item>
                                <v-dialog v-model="createEventDialog" max-width="500px">
                                    <v-card class="cardAlert">
                                        <v-card-actions>
                                            Campaign successfully added!
                                            <v-spacer></v-spacer>
                                            <v-btn fab x-small dark color="cyan" @click="createEventDialog=false">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                                <create-event-form :userId="uid" @addEvent="addNewEvent" />
                            </v-tab-item>
                        </v-tabs>
                    </template>
                </v-app-bar>
                <v-sheet id="scrolling-techniques-5" max-height="1300px">
                    <v-container style="height: 1300px;"></v-container>
                </v-sheet>
            </v-card>
        </v-app>
    </div>
</template>

<script>
    import MemberEventList from "./MemberEventList";
    import VolunteerList from './VolunteerList';
    import CreateEventForm from './CreateEventForm';
    import CampaignChart from './CampaignChart';
    import store from './../store';
    import DashBoard from './DashBoard.vue';
    // import {fetch} from 'whatwg-fetch';

    export default {
        components: { CreateEventForm, VolunteerList, MemberEventList, CampaignChart, DashBoard },
        name: "member",
        // props: {
        //     userId: Number
        // },
        data() {
            return {
                tab: null,
                title: "Member",
                uid: store.state.user.uid,
                orgevents: [],
                volunteers: [],
                createEventDialog: false
            }
        },
        created() {
            this.getOrgEvents();
            this.getAllVolunteers();
        },
        methods: {
            //Get events by organization
            getOrgEvents() {
                window.twttr.widgets.load();
                // organizer_id = "2"
                fetch("/api/events/organizer/" + this.uid)
                    .then(response => response.json())
                    .then(data => this.orgevents = data)
                    .catch(error => {
                        console.error("Error in get organization events: ", error);
                    });
            },
            addNewEvent(data) {
                //console.log(JSON.stringify(data));
                this.createEventDialog = true;

                fetch("/api/events", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        response.json();
                        this.getOrgEvents(); //this should call method which will update the event list

                    })
                    .catch(error => {
                        console.error("Error in add event: ", error);
                    });
            },
            handleUpdate() {
                this.getOrgEvents();
            },
            handleDelete() {
                this.getOrgEvents();
            },
            getAllVolunteers() {
                // window.twttr.widgets.load();
                fetch("/api/volunteers/organizers/" + this.uid)
                    .then(response => response.json())
                    .then(data => this.volunteers = data);
            },
        }
    };
</script>

<style scoped>
    .v-window__container {
        box-sizing: content-box !important;
    }

    div .container {
        margin-top: 30px;
    }
</style>
//class="overflow-y-auto"
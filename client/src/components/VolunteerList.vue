<template>
    <v-container>
        <v-dialog v-model="deleteDialog" max-width="300px" title="Delete">
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
            <v-toolbar color="grey lighten-2">
                <v-btn icon  @click="deleteDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title small>Delete</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <v-row class="mx-0">
                        This investor/mentor record will be deleted.
                        Are you sure?
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="deleteDialog=false">
                        Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="handleDelete(selectedVolunteer)">
                        Yes
                    </v-btn>
                </v-card-actions>
            </v-card>
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
        </v-dialog>

        <v-card>
            <v-card color="grey darken-2" elevation="6" class="v-card-header-white d-flex grow flex-wrap pa-6">
                Investor/Mentors List
                <v-spacer></v-spacer>
                <v-text-field v-model="search" dark append-icon="mdi-magnify" label="Search" clearable hide-details>
                </v-text-field>
            </v-card>

            <v-data-table :headers="headers" :items="volunteers" :search="search" show-group-by group-by="Event" height="250px">
                <template v-slot:[`item.eventname`]="{ item }">
                    {{ item.eventname | truncate(10, '...') }}
                </template>
                <template v-slot:[`item.firstname`]="{ item }">
                    {{ item.firstname }} {{ item.lastname }}
                </template>
                <template v-slot:[`item.status`]="{ item }">
                    <v-chip :color="getColor(item.status)" dark class="text-capitalize" x-small>
                        {{ item.status }}
                    </v-chip>
                </template>
                <!-- <template v-slot:item.country="{ item }">
                    {{ item.state != null ? item.state + ', ' : '' }}{{ item.country }}
                </template> -->
                <template v-slot:[`item.dateapp`]="{ item }">
                    {{ getLocaleDate(item.dateapp, true) }}
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-icon v-if="item.status === 'new'" color="blue darken-3" small class="mr-2"
                        @click="updateStatus(item.vid, 'accepted')">
                        mdi-checkbox-marked-circle </v-icon>
                    <v-icon v-if="item.status === 'new'" color="blue darken-3" small class="mr-2"
                        @click="updateStatus(item.vid, 'declined')"> mdi-cancel
                    </v-icon>
                    <v-icon small color="blue darken-3" @click="openDeleteDialog(item.vid)"> mdi-delete </v-icon>
                </template>
            </v-data-table>

        </v-card>
    </v-container>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    import {fetch} from 'whatwg-fetch'

    export default {
        name: 'VolunteerList',
        mixins: [HelperMixin],
        props: {
            userId: Number,
            volunteers: Array,
        },
        data() {
            return {
                deleteDialog: false,
                selectedVolunteer: 0,
                search: '',
                headers: [
                    {
                        text: 'Full Name',
                        align: 'start',
                        value: 'firstname',
                        groupable: false
                    },
                    { text: 'Event', value: 'Event' },
                    { text: 'Contact Number', value: 'contactnum', sortable: false, groupable: false },
                    // { text: 'Location', value: 'country', groupable: false },
                    { text: 'Date Apply', value: 'dateapp', groupable: false },
                    { text: 'Status', value: 'status' },
                    { text: 'Action', value: 'action', sortable: false, groupable: false }
                ]
            }
        },
        methods: {
            updateStatus(id, appstatus) {
                const currDate = this.getLocaleDate();

                fetch("/api/volunteers/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ status: appstatus, dateproc: currDate })
                }).then(res => {
                    // Continue fetch request here
                    res.json();
                    this.$emit("getVolunteers");
                })
                    .catch(error => {
                        console.error("Error in approved application: ", error);
                    });
            },
            handleDelete(item) {
                fetch("/api/volunteers/" + item, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => {
                        response.json();
                        this.$emit("getVolunteers");
                        this.deleteDialog = false;
                    })
                    .catch(error => {
                        console.error("Error in delete volunteer: ", error);
                    });
            },
            openDeleteDialog(item) {
                this.deleteDialog = true;
                this.selectedVolunteer = item;
            },
            getColor(status) {
                //class="text-capitalize
                if (status === 'new') return 'orange'
                else if (status === 'declined') return 'blue'
                else return 'green'
            }
        }
    }   

</script>

<style>
.v-card-header-white {
    color: white !important;
}

.v-card-header, .v-card-header-white {
    position: relative;
    width: 98%;
    margin-left: auto;
    margin-right: auto;
    top: -15px; 
    font-size: large;   
}
.v-card-header {
    color: rgb(14, 13, 13) !important;
}
</style>
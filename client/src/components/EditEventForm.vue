<template>
    <v-card>
    <ValidationObserver ref="observer">
        <v-form ref="form" lazy-validation style="padding: 30px;">
            <ValidationProvider v-slot="{ errors }" name="Title" rules="required|max:100" autocomplete="off">
                <v-text-field v-model="currentevent.name" :counter="100" :error-messages="errors" label="Title" required>
                </v-text-field>
            </ValidationProvider>
                <template>
                    <v-row align="center">
                        <v-col cols="12" sm="6" md="6">
                            <v-dialog ref="dialog" v-model="smodal" :return-value.sync="currentevent.datefrom" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field :disabled="enabled" v-model="currentevent.datefrom" label="Event Start Date"
                                        prepend-icon="event" readonly v-bind="attrs" v-on="on">
                                    </v-text-field>
                                </template>
                                <v-date-picker v-model="currentevent.datefrom" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                    <v-btn text color="info" @click="smodal = false">Cancel</v-btn>
                                    <v-btn text color="info" @click="$refs.dialog.save(currentevent.datefrom)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-col cols="12" sm="6" md="6">
                            <v-dialog ref="dialog2" v-model="emodal" :return-value.sync="currentevent.dateto" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field :disabled="enabled" v-model="currentevent.dateto" label="Event End Date"
                                        prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="currentevent.dateto" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="info" @click="emodal = false">Cancel</v-btn>
                                    <v-btn text color="info" @click="$refs.dialog2.save(currentevent.dateto)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="6">
                            <v-dialog ref="dialog3" v-model="cmodal" :return-value.sync="currentevent.closingdate" persistent width="290px">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field :disabled="enabled" v-model="currentevent.closingdate" label="Application Closing Date"
                                        prepend-icon="event" readonly v-bind="attrs" v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="currentevent.closingdate" :min="new Date().toISOString().substr(0, 10)" scrollable>
                                    <v-spacer></v-spacer>
                                    <v-btn text color="info" @click="cmodal = false">Cancel</v-btn>
                                    <v-btn text color="info" @click="$refs.dialog3.save(currentevent.closingdate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" sm="6" md="6">
                            <v-checkbox v-model="enabled" label="Ongoing event"></v-checkbox>
                        </v-col> 
                    </v-row>
                </template>
            <ValidationProvider v-slot="{ errors }" name="Description" rules="required|max:500" autocomplete="off">
                <v-textarea v-model="currentevent.description" :counter="500" :error-messages="errors" label="Description"
                auto-grow required></v-textarea>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Location" rules="required" autocomplete="off">
                <v-text-field v-model="currentevent.location" :error-messages="errors" label="Location" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Contact Person" rules="required" autocomplete="off">
                <v-text-field v-model="currentevent.contactname" :error-messages="errors" label="Contact Person" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Phone" :rules="{ required: true, regex: /^[\d-\s]{9,}$/ }" autocomplete="off">
                <vue-tel-input-vuetify v-model="currentevent.contactnum" :error-messages="errors"
                    :disabledFetchingCountry="true" :defaultCountry="'my'" :preferred-countries="['my', 'in', 'es', 'gb', 'us']" :maxLen="12" required />
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Email" rules="email" autocomplete="off">
                <v-text-field v-model="currentevent.contactemail" :error-messages="errors" label="Email (optional)"></v-text-field>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" name="Total Funds Needed" rules="required" autocomplete="off">
                <v-text-field type="number" v-model="currentevent.totalfunds" :error-messages="errors"
                    label="Total Funds Needed" required></v-text-field>
            </ValidationProvider>
            <ValidationProvider>
                <template>
                    <v-text-field v-model="currentevent.images" prepend-icon="mdi-camera" label="Image URL (http//:)"></v-text-field>
                    <!-- <v-file-input v-model="eform.images" accept="image/png, image/jpeg" placeholder=" "
                        prepend-icon="mdi-camera" show-size label="Image Upload"></v-file-input> -->
                </template>
                <v-spacer></v-spacer>
            </ValidationProvider>    

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="blue darken-3" @click="handleClose"> Close </v-btn>
                <v-btn text color="blue darken-3" @click="handleUpdate"> Update </v-btn>
            </v-card-actions>
        </v-form>
    </ValidationObserver>
</v-card>
</template>

<script>

    import { required, email, max, regex } from 'vee-validate/dist/rules.umd.js';
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate';
    import { HelperMixin } from '../mixins/HelperMixin';

    setInteractionMode('eager');

    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    });

    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    });

    extend('email', {
        ...email,
        message: 'Email must be valid',
    });

    extend('regex', {
        ...regex,
        message: 'Phone number must be valid',
    });

    export default {
        name: "EditEventForm",
        components: { ValidationProvider, ValidationObserver },
        mixins: [HelperMixin], 
        props: {
            currentevent: Object
        },
        data() {
            return {
                eventform: {
                    eid: 0,
                    name: "",
                    datefrom: null,                    
                    dateto: null,
                    closingdate: null,
                    status: "active",
                    description: "",
                    location: "",
                    contactname: "",
                    contactnum: "",
                    contactemail: "",
                    totalfunds: null,
                    images: ""                    
                },
                smodal: false,
                emodal: false,
                cmodal: false,
                checkbox: null,
                rules: '',
                requiredRules: '',
                enabled: false,
            };
        },
        created() {

        },
        methods: {
            handleUpdate() {
                this.$refs.observer.validate();
                this.$refs.form.validate();

                this.eventform.eid = this.currentevent.eid;
                this.eventform.name = this.currentevent.name;
                if(this.currentevent.datefrom != null)
                    this.eventform.datefrom = this.getLocaleDate(this.currentevent.datefrom);
                if(this.currentevent.dateto != null)
                    this.eventform.dateto = this.getLocaleDate(this.currentevent.dateto);
                if(this.currentevent.closingdate != null)
                    this.eventform.closingdate = this.getLocaleDate(this.currentevent.closingdate);
                this.eventform.description = this.currentevent.description;
                this.eventform.location = this.currentevent.location;
                this.eventform.contactname = this.currentevent.contactname;
                this.eventform.contactnum = this.currentevent.contactnum;
                this.eventform.contactemail = this.currentevent.contactemail;
                this.eventform.totalfunds = this.currentevent.totalfunds;
                this.eventform.images = this.currentevent.images;


                this.$emit("updateevent", this.eventform);
            },
            handleClose() {
                this.$emit('closeEditForm');
            },
        }
    }
</script>
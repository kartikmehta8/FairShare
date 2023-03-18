<template>
    <v-card>
        <v-card-text>
            <v-container>
                <v-form ref="form" @submit.prevent="handleSubmit" lazy-validation>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field label="First name*" v-model="formValues.firstname" :counter="20"
                                :rules="nameRules" required></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Last name*" v-model="formValues.lastname" :rules="nameRules" :counter="20" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field type="email" label="Email*" :rules="emailRules" v-model="formValues.email" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field label="Contact Number*" :rules="[v => !!v || 'Contact Number is required']" v-model="formValues.contactnum"
                                required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Address 1*" :rules="[v => !!v || 'Address is required']" v-model="formValues.address1" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Address 2" v-model="formValues.address2"></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Postcode*" :rules="[v => !!v || 'Postcode is required']" v-model="formValues.postcode" required></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="State*" :rules="[v => !!v || 'State is required']" v-model="formValues.state" required>
                            </v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field label="Country*" :rules="[v => !!v || 'Country is required']" v-model="formValues.country" required>
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-container>
            <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="handleClose">
                Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="$refs.form.reset()">
                Reset
            </v-btn>
            <v-btn color="blue darken-1" text @click="handleSubmit">
                Submit
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { HelperMixin } from '../mixins/HelperMixin';
    export default {
        name: 'VolunteerApplicationForm',
        mixins: [HelperMixin],
        props: {
            eventId: Number
        },
        data() {
            return {
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                formValues: {
                    event_id: this.eventId,
                    firstname: "",
                    lastname: "",
                    email: null,
                    contactnum: null,
                    address1: null,
                    address2: "",
                    state: null,
                    country: "",
                    postcode: "",
                    dateapp: null
                }
            }
        },

        methods: {
            handleSubmit() {
                if (!this.$refs.form.validate()) {
                    this.$refs.form.preventDefault;
                } else {
                    this.formValues.dateapp = this.getLocaleDate();
                    this.$emit("volunteerApplication", this.formValues);
                    this.$refs.form.reset();
                }
            },
            handleClose() {
                this.$refs.form.reset();
                this.$emit('closeForm');
            }
        }


    }
</script>

<style scoped>
    input {
        margin-top: 0px;
    }

    .row>div {
        padding-top: 0px;
        padding-bottom: 0px;
    }
</style>
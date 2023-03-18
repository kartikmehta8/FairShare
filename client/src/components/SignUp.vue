<template>
    <v-card>
        <v-form ref="form" @submit.prevent="userSignUp" lazy-validation>
            <v-card-text>
                <v-row>
                    <v-col color="orange" cols="12" sm="6" md="6">
                        <v-text-field v-model="user.firstname" label="First Name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.lastname" label="Last Name*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.email" :rules="emailRules" label="Email*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.contactnum" label="Contact Number*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.password" label="Password*" type="password" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-select v-model="user.organization_id" label="Select an Organization/Company*" :items="items"
                            item-text="name" single-line item-value="oid" 
                            hint="Choose Others/Personal if you do not belong to any of the listed organization"
                            persistent-hint required></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="user.address1"  label="Address*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.state" label="State*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                        <v-text-field v-model="user.country" label="Country*" required></v-text-field>
                    </v-col>
                </v-row>
                <div>
                    <v-alert v-if="isRegistered" color="success" dark icon="mdi-check-bold" border="left" prominent>
                        Success. Your profile has been registered. Please login to proceed to the member
                        page.
                    </v-alert>
                    <v-alert v-if="errorMesg!=''" color="red lighten-2" dark icon="mdi-check-bold" border="left"
                        prominent>
                        Fail. {{ errorMesg }}.
                    </v-alert>
                </div>
            </v-card-text>
            <v-card-actions>
                <small>*indicates required field</small>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="resetFields">
                    Reset
                </v-btn>
                <v-btn color="blue darken-1" text @click="userSignUp">
                    Submit
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: 'SignUp',
        data() {
            return {
                user: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    contactnum: '',
                    password: null,
                    state: '',
                    country: '',
                    organization_id: 0,
                    address1: ''
                },
                isRegistered: false,
                errorMesg: '',
                items: [],
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 20) || 'Name must be less than 20 characters',
                ],
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
            }
        },
        methods: {
            userSignUp() {
                this.$refs.form.preventDefault;
                if (this.user.firstname === "" || this.user.lastname === "" || this.user.email === "" || this.user.password === null || this.user.organization_id === 0) {
                    this.errorMesg = "All fields are required. Please provide the information.";
                    return;
                }

                if (!this.$refs.form.validate()) {
                    this.$refs.form.preventDefault;
                } else {
                    this.checkAddUser();
                }
            },
            checkAddUser() {
                fetch("/api/auth/users/" + this.user.email)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) this.errorMesg = "Sorry. The email you have provided is already registered in this site.";
                        else this.addUser();
                    })
                    .catch(error => {
                        console.error("Error in check email: ", error);
                        this.errorMesg = "Error on email. Please ensure email is provided.";
                    });
            },
            addUser() {
                fetch("/api/auth/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.user)
                })
                    .then(response => {
                        response.json();
                        this.isRegistered = true;
                        this.$refs.form.reset();
                    })
                    .catch(error => {
                        console.error("Error in add user: ", error);
                    });
            },
            resetFields() {
                this.errorMesg = "";
                this.isRegistered = false;
                this.$refs.form.reset();
            },
            getOrganizations() {
                fetch("/api/organizations")
                    .then(response => response.json())
                    .then(data => {
                        this.items = data;
                    })
                    .catch(error => {
                        console.error("Error in get organzizations: ", error);
                    });
            }
        },
        created() {
            this.getOrganizations();
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

    .signup {
        background-color: #863f3f;
    }
</style>
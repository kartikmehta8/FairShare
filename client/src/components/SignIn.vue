<template>
    <v-card fill-height>
        <v-dialog v-model="nonMemberDialog" max-width="300px" title="Delete">
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="nonMemberDialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title small>Sorry...</v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-card-text>
                    <v-row class="mx-0">
                        You profiles are not registed in our system. Please click on the Sign-Up tab to register as our
                        member.
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="nonMemberDialog=false">
                        OK
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-form ref="form" @submit.prevent="userSignIn" lazy-validation>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="email" :rules="[v => !!v || 'Email is required']" label="Email*"
                            required>
                        </v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="password" :rules="[v => !!v || 'Password is required']" label="Password*"
                            type="password" required>
                        </v-text-field>
                    </v-col>
                </v-row>
                <div>
                    <v-alert v-if="errorMesg!=''" color="red lighten-2" dark icon="mdi-check-bold" border="left"
                        prominent>
                        Fail. {{ errorMesg }}.
                    </v-alert>
                </div>
            </v-card-text>

            <v-card-actions>
                <small>*indicates required field</small>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="resetFields">
                    Reset
                </v-btn>
                <v-btn color="primary" text type="submit" @click="userSignIn">
                    OK
                </v-btn>
            </v-card-actions>
        </v-form>
        <v-divider></v-divider>
        <div class="googleBtnDiv">
            <div v-google-signin-button="clientId" class="google-signin-button">
                <img alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                <span>Continue Login with Google</span>
            </div>
        </div>
    </v-card>
</template>

<script>
    import GoogleSignInButton from '../plugins/googleSignInDirective';//'vue-google-signin-button-directive';
    import { setUserSession } from '../session';

    export default {
        name: 'SignIn',
        directives: {
            GoogleSignInButton
        },
        data() {
            return {
                user: {},
                email: '',
                password: null,
                errorMesg: '',
                clientId: '730383127459-e7pavm9hljr6kcutedkkago0f0glk485',
                nonMemberDialog: false
            }
        },
        methods: {
            userSignIn() {
                if (this.email === "" || this.password === "") {
                    this.errorMesg = "All fields are required. Please provide the information.";
                    return;
                }

                if (!this.$refs.form.validate()) this.$refs.form.preventDefault;
                else this.login();

            },
            resetFields() {
                this.errorMesg = "";
                this.$refs.form.reset();
            },
            OnGoogleAuthSuccess(idToken, userProfile) {
                // Receive the idToken and make your magic with the backend
                if (!idToken && !userProfile) {
                    this.errorMesg = "Problem login to google."
                    return;
                }

                // if no user is returned - then this user does not exist in the system
                // notify user and advise user to sign-up

                // if user is in the system 
                // just log the user in (as of now) - ideally should notify that
                // the user email is not link to the user account in Sejiwa 
                // thus ask whether user want to link their acc (future feature). 
                //console.log(userProfile.getEmail());
                this.email = userProfile.getEmail()

                fetch("/api/auth/users/" + this.email)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length === 0) this.nonMemberDialog = true;
                        else this.user = data[0];

                    })
                    .then(() => {
                        if (Object.keys(this.user).length > 0) this.validateGoogleSSO();
                    })
            },
            OnGoogleAuthFail(error) {
                console.log(error)
            },
            // the login method will take the user email and pass to the auth api
            // with that information, user data of that particular email is extracted
            // if there is no user with such email, error is thrown
            // if user exists with that email, user validation will occur
            login() {
                fetch("/api/auth/users/" + this.email)
                    .then(response => response.json())
                    .then(data => {
                        //console.log(this.email, data);
                        if (data.length < 1) throw "User profile not found with the entered credentials."

                        this.user = data[0];
                    })
                    .then(() => this.validateUser()) //   .then(() => this.$router.push(redirectPath))
                    .catch(error => this.errorMesg = "Sign-In Error: " + error);
            },
            validateGoogleSSO() {
                fetch("/api/auth/users/signin/gss", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.$data)
                })
                    .then(response => response.json())
                    .then(data => {
                        //console.log("result from validation - ", data);
                        this.$store.commit('authenticateTrue', data.user);
                        setUserSession(data.token, data.user);
                    })
                    .catch(error => this.errorMesg = "Validation GSS Error: " + error);

            },
            // user validation api will check on the user password whether it matches with the one stored in the database 
            // validation api expects user email, password, and the whole user obj.
            // once password validity is confirmed, the API will generate a token.
            // this token need to be stored in a state or localstorage            
            validateUser() {
                fetch("/api/auth/users/signin", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(this.$data)
                })
                    .then(response => response.json())
                    .then(data => {
                        //console.log("result from validation - ", data);
                        this.$store.commit('authenticateTrue', data.user);
                        setUserSession(data.token, data.user);
                    })
                    .catch(error => this.errorMesg = "Validation Error: " + error);
            },
        },
    }
</script>

<style scoped>
    /* @import 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'; */

    .google-signin-button {
        width: 450px;
        padding: 3px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        display: inline-block;
        border: 1px solid #888;
        border-radius: 3px;
        background-color: transparent;
        outline: none;
        font-family: inherit;
        font-size: 13px;
        font-weight: normal;
        line-height: 1.15384615;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
    }

    .google-signin-button img {
        margin: 2px 15px 2px 20px;
        width: 20px;
        vertical-align: middle;
    }

    .googleBtnDiv {
        padding: 0;
        height: 50px;
        text-align: center;
    }

    hr {
        width: 95%;
        margin-bottom: 10px;
    }
</style>
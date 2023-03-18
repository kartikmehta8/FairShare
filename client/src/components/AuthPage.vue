<template>
    <v-container class="authpage">
        <v-card v-if="isAuthenticated" class="mx-auto overflow-hidden" width="344">
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
            <private-access />
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
        </v-card>
        <v-card v-if="!isAuthenticated" class="authbox" clear>
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
            <v-tabs background-color="grey lighten-2" center-active>
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tab>Login</v-tab>
                <v-tab>Sign-Up</v-tab>
                <v-tab-item>
                    <sign-in />
                </v-tab-item>
                <v-tab-item>
                    <sign-up />
                </v-tab-item>
            </v-tabs>
            <v-system-bar height="10px" color="cyan darken-1"></v-system-bar>
        </v-card>
    </v-container>
</template>

<script>
    import SignUp from './SignUp.vue';
    import SignIn from './SignIn.vue';
    import PrivateAccess from './PrivateAccess.vue'
    import store from '../store'

    export default {
        components: { SignUp, SignIn, PrivateAccess },
        name: 'AuthPage',
        data() {
            return {
                errorMesg: '',
                items: []
            }
        },
        methods: {
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
        },
        computed: {
            isAuthenticated() {
                return store.getters.getAuthState;
            },
        }
    }
</script>

<style>
    .v-main,
    .v-app,
    .v-container,
    .v-application,
    .v-application--is-ltr {
        background-color: white !important;
    }

    .col,
    .col-sm-6,
    .col-md-6,
    .col-12 {
        padding: 0;
    }

    .authbox .row {
        padding: 0;
    }

    .authpage {
        background-color: white;
        padding-top: 30px;
        margin-top: 40px;
        align-items: center;
        justify-items: center;
    }

    .authbox {
        margin: 10px auto;
        /* background: linear-gradient(to bottom, #311b92 8%, #12182e 67%); */
        box-shadow: 5px 10px 18px #888888;
        border-radius: 10px;
        width: 600px;
    }

    .signup {
        background-color: #FAFAFA;
    }

    .welcome {
        color: white;

    }


</style>
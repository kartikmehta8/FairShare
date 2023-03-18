<template>
    <v-card>
        <v-card-title>
            {{ $store.getters.getUserState.fullname }}, Welcome to FairShare!
        </v-card-title>

        <v-row justify="center" class="my-5">
            <v-avatar color="grey darken-3" size="62">
            <v-icon x-large dark>mdi-account-heart</v-icon>
        </v-avatar>
        </v-row>
        
        <v-card-text>
            Please <router-link class="ml-1 text-decoration-none" to="/member">click</router-link> to continue to the
            member page. Thank You.
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: 'PrivateAccess',
    }
</script>
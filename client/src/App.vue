<template>
  <v-app>
    <v-app-bar>
      <v-img
        alt="Focal Logo"
        class="shrink mr-2"
        contain
        :src="require('@/assets/favicon.png')"
        transition="scale-transition"
        width="63"
      />
      <h1>FairShare</h1>
      <v-spacer></v-spacer>
      <!-- <v-btn text to="/" exact>Home</v-btn> -->
      <v-btn text to="/">Crowdfunding</v-btn>
      <v-btn text to="/textAnalyzer">Mutual Funds</v-btn>
      <!-- <v-btn text to="/equity">Equity</v-btn> -->

      <div class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" class="bottom" elevation="0">
              Gender Lens Toolkit
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn text to="/genderLens">Gender Lens Scorecard</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text to="/quiz">Investor Profiler</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text to="/education">Media Analyzer</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-btn v-if="!isAuthenticated" text to="/login">Login</v-btn>
      <v-menu v-if="isAuthenticated" bottom min-width="200px" rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon x-large v-on="on">
            <v-avatar color="pink lighten-1" size="38px">
              <span>{{ userInitial }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <h3>{{ userName }}</h3>
              <p class="caption mt-1">{{ userEmail }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text to="/member">Dashboard</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed rounded text @click="signOut">Logout</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid> <router-view /> </v-container>
    </v-main>

    <!-- <v-footer class="default" app>
      <v-col class="text-center" cols="12">
        Finastra’s Hack to the Future 3 | by Victress Coders from Malaysia
      </v-col>
    </v-footer> -->
  </v-app>
</template>

<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import store from "./store.js";
export default {
  name: "App",
  data() {
    return {
      showLogin: false,
      type: "number",
      number: 1000,
      duration: 1000,
      offset: 500,
      easing: "easeInOutCubic",
      easings: Object.keys(easings),
      items: [
        { title: "Gender Equality Scorecard" },
        { title: "Investor Profiler" },
        { title: "Media Analyzer" },
      ],
    };
  },
  methods: {
    signOut() {
      store.dispatch("logout");
      this.$router.push({ name: "logout" });
    },
  },
  created() {
    store.dispatch("verifyToken");
    // this.getBenchmark();
  },
  beforeCreate() {
    store.dispatch("verifyToken");
  },
  computed: {
    isAuthenticated() {
      store.dispatch("verifyToken");
      return store.getters.getAuthState;
    },
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value;
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing,
      };
    },
    userInitial() {
      return store.getters.getUserInitial;
    },
    userName() {
      const user = store.getters.getUserState;
      return user.fullname;
    },
    userEmail() {
      const user = store.getters.getUserState;
      return user.email;
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.cardAlert {
  padding: 20px;
  border-left: 10px solid #00bcd4 !important;
}
.primary {
  background-color: #bdbdbd !important;
}
</style>
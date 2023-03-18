import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, getUser, removeUserSession } from './session';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isAuthenticated: false
  },
  getters: {
    getAuthState: state => {
      return state.isAuthenticated;
    },
    getUserState: state => {
      return state.user;
    },
    getUserInitial: state => {
      return state.user.fullname.split(" ").map((n)=>n[0]).join("");
    }
  },
  mutations: {
    // sync method
    authenticateTrue: (state, obj) => {
      state.isAuthenticated = true;
      state.user = obj;
    },
    resetUserAuth: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    }
  },
  actions: {
    // can contain async method
    logout({ commit }) {
      removeUserSession();
      commit('resetUserAuth');
    },
    verifyToken({ commit, dispatch}) {
      const token = getToken();
      if (!token) {
        return;
      }

      const user = getUser();
      if (!user) {
        return;
      }
      
      fetch("/api/auth/users/verify-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, user })
      })
        .then(response => response.json())
        .then(data => {
          commit('authenticateTrue', data.user);
          //console.log("valiated", this.state.isAuthenticated);

        })
        .catch(error => {
          console.error("Error in verify token: ", error);
          dispatch('logout');
          const redirectPath = this.$route.query.redirect || "/";
          //console.log(redirectPath);
          this.$router.push(redirectPath);
        });
    },
  }
})

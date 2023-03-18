// plugins from https://github.com/mejiamanuel57/vue-google-signin-button-directive
import Vue from 'vue'

export default Vue.directive('google-signin-button', {
  bind: function (el, binding, vnode) {
    CheckComponentMethods()
    let clientId = binding.value
    let googleSignInAPI = document.createElement('script')
    googleSignInAPI.setAttribute('src', 'https://apis.google.com/js/api:client.js')
    document.head.appendChild(googleSignInAPI)

    googleSignInAPI.onload = InitGoogleButton

    function InitGoogleButton() {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: clientId,
          cookiepolicy: 'single_host_origin'
        })
        auth2.attachClickHandler(el, {},
          OnSuccess,
          Onfail
        )
      })
    }
    // function attachSignin(element) {
    //   console.log(element.id);
    //   auth2.attachClickHandler(element, {},
    //       function(googleUser) {
    //         document.getElementById('name').innerText = "Signed in: " +
    //             googleUser.getBasicProfile().getName();
    //       }, function(error) {
    //         alert(JSON.stringify(error, undefined, 2));
    //       });
    // }
    function OnSuccess(googleUser) {
      vnode.context.OnGoogleAuthSuccess(googleUser.getAuthResponse().id_token, googleUser.getBasicProfile());
      //console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
      googleUser.disconnect()
    }
    function Onfail(error) {
      vnode.context.OnGoogleAuthFail(error)
    }
    function CheckComponentMethods() {
      if (!vnode.context.OnGoogleAuthSuccess) {
        throw new Error('The method OnGoogleAuthSuccess must be defined on the component')
      }

      if (!vnode.context.OnGoogleAuthFail) {
        throw new Error('The method OnGoogleAuthFail must be defined on the component')
      }
    }
  }
})
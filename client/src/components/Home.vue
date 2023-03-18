<template>
  <v-app>
    <b-embed
    type="iframe"
    aspect="16by9"
    src="https://genderequalityfunds.org/"
    
  ></b-embed>
      <v-carousel hide-delimiters height="700px" show-arrows-on-hover cycle interval="11000" >
        <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.src">
          <v-container fill-height>
            <v-row class="white--text mx-auto">
              <v-col class="white--text text-left">
                <span>
                  <p class="animated fadeInUp display-2">{{ quote[i] }}</p>
                </span><br/>
                <span>
                  <p class="animated fadeInUp delay-1s display-1">{{ writer[i] }}</p>
                </span><br/>
              </v-col>
            </v-row>
          </v-container>
        </v-carousel-item>
      </v-carousel>

    <events />
  </v-app>
  
</template>

<script>
  import Events from './Events.vue';

  export default {
    name: 'home',
    components: { Events },
    data: () => ({
      msg: 'Welcome to FairShare',
      items: [
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/quote%20banner1.png?alt=media&token=69717b77-a7ff-4d5f-bca5-8ecc2a00c58b"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/quote%20banner3.png?alt=media&token=59b638e3-c31f-492f-9fd8-d63fe3116ff2"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/quote%20banner5.png?alt=media&token=67e5c06a-a906-4c23-9d3d-114004a4c844"
        },
        {
          src: "https://firebasestorage.googleapis.com/v0/b/sejiwa-focal.appspot.com/o/quote%20banner4.png?alt=media&token=0b25408d-c0a1-412d-b87f-6a4a3e0660e0"
        },
      ],
      quote: ["In 2019, the proportion of women in leadership roles within financial services firms is 21.9 %, which is projected to grow to 31% by 2030—still below parity", "Firms that appoint a woman to the position generate increased profits and share price returns in her first two years than they did under her male predecessor.", "Since the onset of the pandemic, female founders, particularly those of color, report lower capital buffers and a higher likelihood of pausing prior plans to raise capital.","For every dollar of investment raised, female-run startups generated 78 cents in revenue, whereas male-run startups generated only 31 cents."],
      writer: ["–Deloitte", "– S&P Global Market Intelligence", "– All Raise", "-Boston Consulting Group"]
    }),
  }
</script>


<style>
  .v-main__wrap, .container, .container--fluid {
    padding: 0 !important;
  }

  .animated {
    -webkit-animation-duration: 3s;
    animation-duration: 3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    }

    .animated.delay-1s {
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            -webkit-transform: translate3d(0, 100%, 0);
            transform: translate3d(0, 100%, 0);
        }

        to {
            opacity: 1;
            -webkit-transform: none;
            transform: none;
        }
    }

    .fadeInUp {
        -webkit-animation-name: fadeInUp;
        animation-name: fadeInUp;
    }
</style>
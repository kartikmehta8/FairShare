<template>
  <v-app>
    <v-container class="bv-example-row" fill-height fluid style="padding: 0px;">
      <v-row id="editor" ref="editor" align="top">
        <v-col align="center" style="margin-top: 0px;  margin-left: 20px; margin-bottom: 20px;">
          <iframe
            allowtransparency="true"
            v-if="loaded"
            style="max-height:none!important; border-radius: 5px;"
            src="https://gendergaptracker.research.sfu.ca/apps/textanalyzer"
            :height="555"
            :width="1400"
            frameborder="0"

          ></iframe>
        </v-col>
        <!-- <v-col style="margin-top: 20px; margin-right: 20px; margin-bottom: 20px;">                                            
          <v-flex>
              <v-card class="mx-auto" color="cyan" dark max-width="400">
                  <v-card-title>
                      <v-icon large left>
                          mdi-twitter
                      </v-icon>
                      <span class="title font-weight-light">Twitter</span>
                  </v-card-title>
                  <v-card-text class="headline font-weight-bold">
                      <a class="twitter-timeline" href="https://twitter.com/rafaellawai/lists/gender-equality-finance-27714?ref_src=twsrc%5Etfw">A Twitter List by Focal</a> 
                  </v-card-text>
              </v-card>
          </v-flex>
        </v-col> -->
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loaded: false,
      iframe: {
        src: window.location.href,
        style: null,
        wrapperStyle: null,
      },
    };
  },
  mounted() {
    let editor = this.$refs.editor;
    this.iframe.style = {
      position: "absolute",
      width: window.innerWidth,
      height: window.innerHeight,
      top: -editor.offsetTop + "px",
      left: -editor.offsetLeft + "px",
    };
    this.iframe.wrapperStyle = {
      overflow: "hidden",
      height: editor.clientHeight + "px",
      width: editor.clientWidth + "px",
    };
    this.loaded = true;
  },
};
</script>

<style scoped>
  v-container {
    display: flex;
  }
</style>
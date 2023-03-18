<template>
  <div container="app">
    <div id="editor" ref="editor"></div>

    <iframe
      v-if="loaded"
      src="https://genderequalityfunds.org/funds"
      allowfullscreen
      :height="1500"
      :width="iframe.style.width"
      frameborder="0"
    ></iframe>
  </div>
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
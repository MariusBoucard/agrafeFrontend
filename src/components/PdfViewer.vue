<template>
  <VuePdfEmbed
    v-if="src"
    class="pdf-viewer"
    annotation-layer
    :source="src"
    :page="page"
  />
</template>

<script>
import VuePdfEmbed from 'vue-pdf-embed'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'

export default {
  name: 'PdfViewer',
  components: { VuePdfEmbed },
  props: {
    src: {
      type: [String, Object, Uint8Array],
      default: ''
    },
    page: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped>
.pdf-viewer {
  position: relative;
  display: block;
  width: 100%;
}

:deep(canvas) {
  display: inline-block;
  width: 100% !important;
  height: auto !important;
  vertical-align: top;
}
</style>

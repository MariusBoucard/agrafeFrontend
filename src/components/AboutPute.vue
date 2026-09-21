<template>
    <div>About MA GL
            <pdf :src="pdfUrl"></pdf>

        
    </div>
</template>
<script>
import pdf from '@/components/PdfViewer.vue';
export default {
    components : {
        pdf
    },
    data() {
    return {
      pdfUrl: 'test.pdf', // Replace with the path to your PDF file
    };
  },
}
</script>
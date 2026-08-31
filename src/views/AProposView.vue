<template>
  <div class="baseView">
    <div class="container">
      <div class="leftColumn">
        <div class="parentDiv">
          <div v-for="(section, i) in sections" :key="i">
            <div class="banner">
              <p class="titleBanner">{{ section.title }}</p>
            </div>
            <div class="text font-body">{{ section.body }}</div>
          </div>
        </div>
      </div>
      <div class="rightColumn">
        <ContactComponent />
        <BackcoverWidget />
      </div>
    </div>
  </div>
</template>

<script>
import BackcoverWidget from "@/widgets/backcoverWidget.vue";
import ContactComponent from "@/widgets/contactComponent.vue";
import axiosInstance from "@/axios";

export default {
  name: "AProposView",
  components: { BackcoverWidget, ContactComponent },
  data() {
    return {
      sections: [
        { title: "Notre idée", body: "Chargement..." },
        { title: "L'équipe", body: "" },
      ],
    };
  },
  mounted() {
    axiosInstance.get("/api/pages/apropos").then((res) => {
      if (res.data?.content?.sections?.length) {
        this.sections = res.data.content.sections;
      }
    }).catch(() => {});
  },
};
</script>

<style scoped>
.baseView { width: 90%; margin: auto; }
.titleBanner { width: 80%; margin-left: auto; text-align: left; }
.text { width: 80%; font-family: var(--font-body, 'Bahnschrift', sans-serif); margin-left: auto; text-align: left; line-height: 1.6; }
.banner { font-size: x-large; color: white; background-color: black; width: 100%; font-family: var(--font-title); }
.container { gap: 30px; display: flex; flex-wrap: wrap; }
.leftColumn { width: 65%; }
.rightColumn { width: 30%; }
@media (max-width: 768px) {
  .container { flex-direction: column; }
  .leftColumn, .rightColumn { width: 100%; }
  .text, .titleBanner { width: 100%; margin-left: 0; }
}
</style>

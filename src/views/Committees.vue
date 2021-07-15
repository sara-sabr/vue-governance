<template>
  <div class="container">
    <CommitteeList
      :rates="rates"
      :committees="committees"
      :lang="lang"
      :positions="positions"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CommitteeList from "@/components/CommitteeList.vue"; // @ is an alias to /src
import { mapState } from "vuex";

@Component({
  computed: mapState(["rates", "positions", "committees"]),
  components: {
    CommitteeList,
  },
})
export default class Home extends Vue {
  lang = this.$i18n.locale;
}
</script>

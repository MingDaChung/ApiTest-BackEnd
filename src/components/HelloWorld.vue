<template>
  <div class="hello">
    <div class="search_box">
      <span>Please Input Address：</span>
      <input
        type="text"
        v-model.lazy.trim="keyword"
        class="input"
        @change="inputaddress"
      />
    </div>
    <!-- <div class="closemap">
      <button class="closemapbtn" @click="CloseMap()">
        <i class="bx bx-map"></i>
        <i class="bx bx-x"></i>
      </button>
    </div> -->
    <table class="table table_border" id="idData" v-if="datas.length > 0">
      <thead>
        <tr>
          <td>sno</td>
          <td colspan="3">sna</td>
          <td>tot</td>
          <td>sarea</td>
          <td colspan="2">mday</td>
          <td colspan="2">lat</td>
          <td colspan="2">lng</td>
          <td colspan="4">ar</td>
          <!-- <td>bemp</td>
          <td colspan="2">srcUpdateTime</td>
          <td colspan="2">updateTime</td>
          <td>infoTime</td>
          <td>infoDate</td> -->
        </tr>
      </thead>
      <tr v-for="data in datas" :key="data.sno">
        <td>{{ data.sno }}</td>
        <td colspan="3">{{ data.sna }}</td>
        <td>{{ data.tot }}</td>
        <td>{{ data.sarea }}</td>
        <td colspan="2">{{ data.mday }}</td>
        <td colspan="2">{{ data.lat }}</td>
        <td colspan="2">{{ data.lng }}</td>
        <td colspan="4">{{ data.ar }}</td>
        <!-- <td>{{ data.bemp }}</td>
        <td colspan="2">{{ data.srcUpdateTime }}</td>
        <td colspan="2">{{ data.updateTime }}</td>
        <td>{{ data.infoTime }}</td>
        <td>{{ data.infoDate }}</td> -->
      </tr>
    </table>

    <!-- <div>{{ datas.data }}</div> -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HelloWorld",
  data() {
    return {
      keyword: "",
      datas: [],
      // totaldata1: [],
      // totaldata2: [],
      // mergeData: [],
      // page: 1,
      // perPage: 5,
      // pages: [],
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000")
      .then((response) => (this.datas = response.data));
    // console.log(this.data);
  },
  methods: {
    inputaddress() {
      let address = this.keyword;
      axios
        .get("http://localhost:3000", {
          params: { keyword: address },
        })
        .then((response) => (this.datas = response.data));
    },
  },
};
</script>

<style scoped></style>

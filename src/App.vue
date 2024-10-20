<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer
      style="padding: 0px !important; font-size: 8px"
      class="d-flex flex-column"
    >
      <div
        class="d-flex w-100 align-center px-4"
        style="background-color: #ffc000; height: 50px"
      ></div>

      <div
        class="px-4 py-2 w-100"
        style="background-color: #ffde59; float: left; padding-left: 30px"
      >
        <v-row>
          <v-col cols="4" md="4" sm="4">
            Copyright © 1991 lo-vietnam.com Street: 348 Bach MaiCity: Hai Ba
            Trung Dist. State/province/area: <br />Hanoi Phone number: (04)
            38639429 Country calling code: +94 Country: Vietnam
          </v-col>
          <v-col cols="4" md="2" sm="2">
            <div class="vl" style="float: left"></div>
            <ul style="padding-left: 20px">
              <li>Privacy Policy</li>
              <li>Term of service</li>
              <li>Copyright</li>
              <li>Disclaimer</li>
              <li>Contact us</li>
              <li>About us</li>
            </ul>
          </v-col>
          <v-col cols="4" md="2" sm="2" style="padding-left: 20px">
            <ul>
              <li>Chính sách bảo mật</li>
              <li>Thời hạn dịch vụ</li>
              <li>Bản quyền</li>
              <li>Tuyên bố từ chối trách nhiệm</li>
              <li>Liên hệ với chúng tôi</li>
              <li>Về chúng tôi</li>
            </ul>
          </v-col>
          <v-col col="12" md="4" sm="4" v-if="!$vuetify.display.mobile">
            <v-img
              class="bg-grey-lighten-2 d-flex align-center justify-center"
              aspect-ratio="9/16"
              :src="configDoc.footerUrl || ''"
            ></v-img>
          </v-col>
        </v-row>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import axios from "axios";
import { provider } from "./services/provider";
export default {
  name: "App",

  data: () => ({
    configDoc: {},
  }),
  created() {
    let vm = this;
    vm.fetchConfig();
  },
  methods: {
    fetchConfig() {
      let vm = this;
      let url = provider.baseURL + `/web_config/fetch`;
      return new Promise((resolve, reject) => {
        axios.get(url, { headers: { token: provider.token } }).then(
          (res) => {
            if (res.data.code === 201) {
              resolve(res.data.data);
              vm.configDoc = (res.data && res.data.data) || {};
            }
            vm.loading = false;
          },
          (error) => {
            reject(error);
            vm.loading = false;
          }
        );
      });
    },
  },
};
</script>
<style scoped>
.vl {
  border-left: 1px solid green;
  height: 70px;
}
</style>
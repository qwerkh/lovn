<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <v-footer style="padding: 0px !important" class="d-flex flex-column">
      <div
        class="d-flex w-100 align-center px-4"
        style="background-color: #ffc000; height: 50px"
      ></div>

      <div
        class="px-4 py-2 w-100"
        style="background-color: #ffde59; float: left; padding-left: 30px"
      >
        <v-row>
          <v-col col="12" md="4" sm="4" style="border-right: 2px solid teal">
            Copyright © 2012 lo-vietnam.com<br />
            Công ty cổ phầ n truyề n thông HDC Việt Nam<br />
            Tầ ng 3, S3, Vinhomes Skylake Phạm Hùng, Nam Từ Liêm, Hà Nội
          </v-col>
          <v-col col="12" md="4" sm="4" style="padding-left: 20px">
            <ul>
              <li>Privacy Policy</li>
              <li>Term of service</li>
              <li>Copyright</li>
              <li>Disclaimer</li>
              <li>Contact us</li>
              <li>About us</li>
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

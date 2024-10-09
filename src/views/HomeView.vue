<template>
  <v-row class="child-flex">
    <div style="flex-basis: 50%">
      <v-toolbar app color="red">
        <v-icon
          @click="fetchResult"
          style="
            color: white;
            font-size: 40px;
            margin-left: 20px;
            padding-top: 10px;
          "
          >mdi-home</v-icon
        >
        <v-toolbar-title style="padding-top: 10px">{{ title }}</v-toolbar-title>
      </v-toolbar>
    </div>

    <div style="flex-basis: 50%">
      <v-toolbar app color="white" prominent style="padding-top: 5px">
        <v-img src="@/assets/f1.png"></v-img>
        <v-img src="@/assets/f2.png"></v-img>
        <v-img src="@/assets/f3.png"></v-img>
        <v-img src="@/assets/f4.png"></v-img>
        <v-img src="@/assets/f5.png"></v-img>
        <v-img src="@/assets/f6.png"></v-img>
        <v-img src="@/assets/f7.png"></v-img>
      </v-toolbar>
    </div>
  </v-row>

  <v-main style="padding: 25px">
    <v-row>
      <v-col cols="4" md="3" sm="3">
        <v-card>
          <v-card-text
            class="pt-4"
            style="background-color: red; text-align: center"
          >
            Cá cược xổ sô Happy Lô
          </v-card-text>

          <v-card-text
            class="pt-4"
            style="font-weight: bold; text-align: center"
          >
            <h1>Xổ số siêu tốc</h1>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8" md="9" sm="9">
        <v-card>
          <v-img
            class="bg-grey-lighten-2"
            height="125"
            src="https://picsum.photos/350/165?random"
            cover
          ></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" sm="2" md="2">
        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ props }">
            <v-text-field
              v-model="dateFormatted"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="props"
            ></v-text-field>
          </template>
          <v-date-picker v-model="param.date" color="primary"></v-date-picker>
        </v-menu>

        <v-card>
          <v-card-text
            class="pt-4"
            style="background-color: #e9b11e; text-align: center"
          >
            ngày hôm trước
          </v-card-text>
        </v-card>
        <v-card style="margin-top: 10px">
          <v-list style="color: blue; background-color: #d9d9d9">
            <v-list-item
              v-for="(item, i) in dayList"
              :key="i"
              @click="getCurrentWeeksMonday(item.value)"
              :value="item"
              color="primary"
            >
              <v-list-item-title
                style="font-weight: bold; text-align: center"
                >{{ item.text }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>

        <v-card>
          <v-card-text
            class="pt-4"
            style="background-color: #e9b11e; text-align: center"
          >
            giờ trước
          </v-card-text>
        </v-card>
        <v-card style="margin-top: 10px">
          <v-list style="color: blue; background-color: #d9d9d9">
            <v-list-item
              v-for="(item, i) in timeList"
              :key="i"
              :value="item"
              @click="fetchResultWithTime(item.value)"
              color="primary"
            >
              <v-list-item-title
                style="font-weight: bold; text-align: center"
                >{{ item.text }}</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="8" sm="10" md="10">
        <v-row>
          <v-col
            cols="12"
            md="12"
            sm="12"
            v-for="(doc, k) in resultList"
            :key="k"
          >
            <v-card>
              <v-card-text
                class="pt-4"
                style="background-color: #e9b11e; text-align: center"
              >
                <v-img
                  src="@/assets/logo.png"
                  style="width: 150px; height: 80px; float: left"
                ></v-img>
                <v-icon style="color: white; font-size: 70px"
                  >mdi-progress-clock
                </v-icon>
                <span
                  style="
                    font-size: 25px;
                    font-weight: bold;
                    background-color: white;
                    padding: 10px;
                    border-radius: 10px;
                    margin-left: 10px;
                  "
                  >{{ formatDate(doc.resultDate) }} - {{ $t(doc.time) }}
                </span>
                <span style="float: right"
                  ><h2>thời gian còn lại</h2>
                  <h1>{{ currentTime }}</h1>
                </span>
              </v-card-text>
            </v-card>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <table
                  class="table table-bordered"
                  style="margin-top: 10px; margin-right: 10px"
                >
                  <tbody>
                    <tr>
                      <th class="bgColor titleFont" colspan="2" rowspan="2">
                        <h1>LO-A</h1>
                      </th>
                      <th class="bgColor" colspan="2"></th>
                    </tr>
                    <tr>
                      <td class="bgColor1" colspan="2"></td>
                    </tr>
                    <tr>
                      <th class="bigFont">A</th>
                      <th class="bigFont">
                        {{ (doc.postA && doc.postA.result2D) || "" }}-{{
                          (doc.postA && doc.postA.result3D) || ""
                        }}
                      </th>
                      <th class="bigFont2" style="vertical-align: middle">
                        {{ (doc.postLa && doc.postLa.result2D[0]) || "" }}
                      </th>
                      <th class="bigFont2" style="vertical-align: middle">
                        {{ (doc.postLa && doc.postLa.result3D[0]) || "" }}
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont">B</th>
                      <th class="bigLabelFontR">
                        {{ (doc.postB && doc.postB.result2D) || "" }}-{{
                          (doc.postB && doc.postB.result3D) || ""
                        }}
                      </th>
                      <th
                        rowspan="6"
                        class="bigLabelFontLo"
                        style="text-align: center"
                      >
                        <span
                          style="margin-bottom: 0px !important"
                          v-for="(myResult, ind) in filterRemove1(
                            (doc.postLa && doc.postLa.result2D) || []
                          )"
                          :key="ind"
                        >
                          <br v-if="ind % 2 == 0 && ind > 0" />
                          &nbsp;&nbsp;&nbsp;{{ myResult }}
                        </span>
                      </th>
                      <th rowspan="6" class="bigLabelFontLoRed">
                        <span
                          style="margin-bottom: 0px !important"
                          v-for="(myResult, ind) in filterRemove1(
                            (doc.postLa && doc.postLa.result3D) || []
                          )"
                          :key="ind"
                        >
                          <br v-if="ind % 2 == 0 && ind > 0" />
                          &nbsp;&nbsp;&nbsp;{{ myResult }}
                        </span>
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont">C</th>
                      <th class="bigLabelFontR">
                        {{ (doc.postC && doc.postC.result2D) || "" }}-{{
                          (doc.postC && doc.postC.result3D) || ""
                        }}
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont">D</th>
                      <th class="bigLabelFontR">
                        {{ (doc.postD && doc.postD.result2D) || "" }}-{{
                          (doc.postD && doc.postD.result3D) || ""
                        }}
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont2">F</th>
                      <th class="bigLabelFontBlack">
                        {{ (doc.postF && doc.postF.result2D) || "" }}-{{
                          (doc.postF && doc.postF.result3D) || ""
                        }}
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont2">I</th>
                      <th class="bigLabelFontBlack">
                        {{ (doc.postI && doc.postI.result2D) || "" }}-{{
                          (doc.postI && doc.postI.result3D) || ""
                        }}
                      </th>
                    </tr>

                    <tr>
                      <th class="bigLabelFont2">N</th>
                      <th class="bigLabelFontBlack">
                        {{ (doc.postN && doc.postN.result2D) || "" }}-{{
                          (doc.postN && doc.postN.result3D) || ""
                        }}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <table
                  class="table table-bordered"
                  style="margin-top: 10px; margin-right: 10px"
                >
                  <tbody>
                    <tr>
                      <th class="bgColor titleFont" colspan="2" rowspan="2">
                        <h1>LO-B</h1>
                      </th>
                      <th class="bgColor" colspan="2"></th>
                    </tr>
                    <tr>
                      <td class="bgColor1" colspan="2"></td>
                    </tr>
                    <tr>
                      <th class="bigFont2">24</th>
                      <th class="bigFont2">24</th>

                      <th class="bigFont2">242</th>
                      <th class="bigFont2">242</th>
                    </tr>

                    <tr>
                      <th colspan="2" rowspan="6" class="bigLabelFontLo">
                        <span
                          style="margin-bottom: 0px !important"
                          v-for="(myResult, ind) in filterRemove2(
                            (doc.postLb && doc.postLb.result2D) || []
                          )"
                          :key="ind"
                        >
                          <br v-if="ind % 4 == 0 && ind > 0" />
                          &nbsp;&nbsp;&nbsp;{{ myResult }}
                        </span>
                      </th>
                      <th colspan="2" rowspan="6" class="bigLabelFontLoRed">
                        <span
                          style="margin-bottom: 0px !important"
                          v-for="(myResult, ind) in filterRemove2(
                            (doc.postLb && doc.postLb.result3D) || []
                          )"
                          :key="ind"
                        >
                          <br v-if="ind % 4 == 0 && ind > 0" />
                          &nbsp;&nbsp;&nbsp;{{ myResult }}
                        </span>
                      </th>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
import moment from "moment";
import axios from "axios";
import { provider } from "../services/provider";
export default {
  name: "HomeView",

  data() {
    return {
      param: {
        date: new Date(),
        time: "",
      },
      items: [],
      currentTime: "",
      menuDate: false,
      dateFormatted: moment().format("DD/MM/YYYY"),
      resultList: [],
      dayList: [
        { text: "Thứ hai", value: 0 },
        { text: "Thứ ba", value: 1 },
        { text: "Thứ Tư", value: 2 },
        { text: "thứ năm", value: 3 },
        { text: "Thứ sáu", value: 4 },
        { text: "Thứ bảy", value: 5 },
        { text: "chủ nhật", value: 6 },
      ],
      timeList: [
        { text: "7:00 AM", value: "Lo0700" },
        { text: "8:00 AM", value: "Lo0800" },
        { text: "9:00 AM", value: "Lo0900" },
        { text: "10:00 AM", value: "Lo1000" },
        { text: "11:00 AM", value: "Lo1100" },
        { text: "12:00 AM", value: "Lo1200" },
        { text: "1:00 PM", value: "Lo1300" },
        { text: "2:00 PM", value: "Lo1400" },
        { text: "3:00 PM", value: "Lo1500" },
        { text: "4:00 PM", value: "Lo1600" },
        { text: "5:00 PM", value: "Lo1700" },
        { text: "6:00 PM", value: "Lo1800" },
        { text: "7:00 PM", value: "Lo1900" },
      ],
      title: "xổ sô được chơi trên toàn thê giới",
    };
  },
  mounted() {
    this.updateTime(); // Set initial time
    this.intervalId = setInterval(this.updateTime, 1000); // Update every second
  },
  beforeDestroy() {
    clearInterval(this.intervalId); // Clear the interval on destroy
  },
  watch: {
    "param.date"(val) {
      this.dateFormatted = moment(val).format("DD/MM/YYYY");
      this.fetchResultWithDate(moment(val).format("YYYY-MM-DD"));
    },
    "param.time"(val) {
      this.fetchResultWithTime(val);
    },
  },

  methods: {
    getCurrentWeeksMonday(d) {
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
      const currentMonday = new Date(today);
      currentMonday.setDate(
        today.getDate() - ((dayOfWeek > d ? dayOfWeek : dayOfWeek + 7) - 1) + d
      );
      this.param.date = currentMonday;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    filterRemove1(list) {
      return list.filter((d, ind) => ind > 0);
    },
    filterRemove2(list) {
      return list.filter((d, ind) => ind > 1);
    },
    fetchResult() {
      let vm = this;
      let url = provider.baseURL + `/result/fetch`;
      return new Promise((resolve, reject) => {
        axios.get(url, { headers: { token: provider.token } }).then(
          (res) => {
            if (res.data.code === 201) {
              resolve(res.data.data);
              vm.resultList = (res.data && res.data.data) || [];
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
    fetchResultWithDate(date) {
      let vm = this;
      let url = provider.baseURL + `/result/fetch?date=${date}`;
      return new Promise((resolve, reject) => {
        axios.get(url, { headers: { token: provider.token } }).then(
          (res) => {
            if (res.data.code === 201) {
              resolve(res.data.data);
              vm.resultList = (res.data && res.data.data) || [];
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
    fetchResultWithTime(time) {
      let vm = this;
      let url = provider.baseURL + `/result/fetch?time=${time}`;
      return new Promise((resolve, reject) => {
        axios.get(url, { headers: { token: provider.token } }).then(
          (res) => {
            if (res.data.code === 201) {
              resolve(res.data.data);
              vm.resultList = (res.data && res.data.data) || [];
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
    parseDate(date) {
      if (!date) return null;
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    updateTime() {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString(); // Format the time
    },
  },
  created() {
    this.fetchResult();
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

table {
  border-collapse: collapse;
}
.table-bordered td,
.table-bordered th {
  border: 1px solid #dee2e6;
}

.table td,
.table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

.bgColor {
  background-color: #71ad47;
}

.bgColor1 {
  background-color: #ffc000;
}
.bigFont {
  font-weight: bold;
  font-size: 40px;
  color: red;
}

.bigFont2 {
  font-weight: bold;
  font-size: 30px;
  color: red;
}

.bigLabelFont {
  font-weight: bold;
  font-size: 40px;
  color: #5ca3d6;
}

.bigLabelFontR {
  font-weight: bold;
  font-size: 35px;
  color: #5ca3d6;
}

.bigLabelFontLo {
  font-weight: bold;
  color: #5ca3d6;
  font-size: 25px;
}

.bigLabelFontLoRed {
  font-weight: bold;
  color: red;

  font-size: 25px;
}

.bigLabelFont2 {
  font-weight: bold;
  font-size: 40px;
}

.bigLabelFontBlack {
  font-weight: bold;
  font-size: 35px;
}
.titleFont {
  font-weight: bold;
  font-size: 30px;
  color: white;
}

.date-container {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  flex-direction: row;
  width: 100%;
}

.v-date-picker {
  max-width: 100%;
}

@media (max-width: 600px) {
  .date-container {
    flex-direction: row;
  }
}

.compact-date-picker {
  width: auto; /* Allow it to shrink */
  overflow-x: visible; /* Show all content */
  padding: 0; /* Remove padding */
  margin: 0; /* Remove margin */
}
</style>
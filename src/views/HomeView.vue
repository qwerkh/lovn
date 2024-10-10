<template>
  <v-row class="child-flex">
    <div style="flex-basis: 50%">
      <v-toolbar app color="red">
        <v-icon
          v-if="$vuetify.display.mobile"
          @click="fetchResult"
          style="
            color: white;
            font-size: 30px;
            margin-left: 20px;
            padding-top: 10px;
          "
          >mdi-home</v-icon
        >
        <v-icon
          v-if="!$vuetify.display.mobile"
          @click="fetchResult"
          style="
            color: white;
            font-size: 40px;
            margin-left: 20px;
            padding-top: 10px;
          "
          >mdi-home</v-icon
        >
        <v-toolbar-title
          :style="
            $vuetify.display.mobile
              ? 'padding-top: 10px;font-size: 10px'
              : 'padding-top: 10px'
          "
          >{{ title }}</v-toolbar-title
        >
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

  <v-main :style="$vuetify.display.mobile ? 'padding:2px' : 'padding: 25px'">
    <v-container v-if="!$vuetify.display.mobile">
      <v-row>
        <v-col cols="5" md="3" sm="3">
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
              <h3>Xổ số siêu tốc</h3>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="7" md="9" sm="9">
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
                    :style="
                      $vuetify.display.mobile
                        ? 'width: 50px; height: 30px; float: left'
                        : 'width: 150px; height: 80px; float: left'
                    "
                  ></v-img>
                  <v-icon
                    :style="
                      $vuetify.display.mobile
                        ? 'color: white; font-size: 20px'
                        : 'color: white; font-size: 70px'
                    "
                    >mdi-progress-clock
                  </v-icon>
                  <span
                    v-if="!$vuetify.display.mobile"
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

                  <span v-if="!$vuetify.display.mobile" style="float: right"
                    ><h2>thời gian còn lại</h2>
                    <h1>{{ currentTime }}</h1>
                  </span>
                </v-card-text>
              </v-card>
              <v-row v-if="!$vuetify.display.mobile">
                <v-col cols="12" sm="12" md="6">
                  <table
                    class="table table-bordered"
                    style="margin-top: 10px; margin-right: 10px"
                  >
                    <tbody>
                      <tr>
                        <th class="bgColor titleFont" colspan="2">
                          <h3>LO-A</h3>
                          <h5>Kênh xổ số hàng ngày</h5>
                        </th>
                        <th
                          class="bgColor1"
                          colspan="2"
                          style="vertical-align: middle"
                        >
                          việt nam lo 2D & 3D
                        </th>
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
                        <th class="bgColor titleFont" colspan="2">
                          <h3>LO-B</h3>
                          <h5>2D việt nam lo x50</h5>
                        </th>
                        <th
                          class="bgColor1"
                          colspan="2"
                          style="vertical-align: middle"
                        >
                          3D việt nam lo x50
                        </th>
                      </tr>

                      <tr>
                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result2D[0]) || "" }}
                        </th>
                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result2D[1]) || "" }}
                        </th>

                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result3D[0]) || "" }}
                        </th>
                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result3D[1]) || "" }}
                        </th>
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
    </v-container>
    <div v-if="$vuetify.display.mobile">
      <v-row style="margin-top: 5px">
        <v-col cols="5" md="3" sm="3">
          <v-card>
            <v-card-text
              class="pt-4"
              style="background-color: red; text-align: center"
            >
              <h5>Cá cược xổ sô Happy Lô</h5>
            </v-card-text>

            <v-card-text
              class="pt-4"
              style="font-weight: bold; text-align: center"
            >
              <h3>Xổ số siêu tốc</h3>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="7" md="9" sm="9">
          <v-card>
            <v-img
              class="bg-grey-lighten-2"
              height="100"
              src="https://picsum.photos/350/165?random"
              cover
            ></v-img>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2" md="2" style="padding: 0px; margin: 0px">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-text-field
                v-model="dateFormatted"
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
        <v-col cols="9" sm="10" md="10" style="padding-right: 0px">
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
                    :style="
                      $vuetify.display.mobile
                        ? 'width: 50px; height: 30px; float: left'
                        : 'width: 150px; height: 80px; float: left'
                    "
                  ></v-img>
                  <v-icon
                    :style="
                      $vuetify.display.mobile
                        ? 'color: white; font-size: 20px'
                        : 'color: white; font-size: 70px'
                    "
                    >mdi-progress-clock
                  </v-icon>

                  <span
                    v-if="$vuetify.display.mobile"
                    style="
                      font-size: 12px;
                      font-weight: bold;
                      background-color: white;
                      padding: 10px;
                      border-radius: 10px;
                    "
                  >
                    {{ $t(doc.time) }}
                  </span>
                  <span v-if="$vuetify.display.mobile" style="float: right"
                    ><h5>thời gian còn lại</h5>
                    <h4>{{ currentTime }}</h4>
                  </span>
                </v-card-text>
              </v-card>
              <v-row v-if="$vuetify.display.mobile">
                <v-col cols="12" sm="12" md="6">
                  <table
                    class="table table-bordered"
                    style="margin-top: 10px; margin-right: 0px"
                  >
                    <tbody>
                      <tr>
                        <th class="bgColor titleFontM" colspan="2">
                          <h1>LO-A</h1>
                          <h5>Kênh xổ số hàng ngày</h5>
                        </th>
                        <th
                          class="bgColor1"
                          colspan="2"
                          style="vertical-align: middle"
                        >
                          <h5>việt nam lo 2D & 3D</h5>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigFontM">A</th>
                        <th class="bigFontM">
                          {{ (doc.postA && doc.postA.result2D) || "" }}-{{
                            (doc.postA && doc.postA.result3D) || ""
                          }}
                        </th>
                        <th class="bigFontM2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result2D[0]) || "" }}
                        </th>
                        <th class="bigFontM2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result3D[0]) || "" }}
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">B</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postB && doc.postB.result2D) || "" }}-{{
                            (doc.postB && doc.postB.result3D) || ""
                          }}
                        </th>
                        <th
                          rowspan="6"
                          class="bigLabelFontMR"
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
                        <th rowspan="6" class="bigLabelFontLoRedM">
                          <span
                            style="margin-bottom: 0px !important"
                            v-for="(myResult, ind) in filterRemove1(
                              (doc.postLa && doc.postLa.result3D) || []
                            )"
                            :key="ind"
                          >
                            <br v-if="ind % 2 == 1 && ind > 0" />
                            &nbsp;&nbsp;&nbsp;{{ myResult }}
                          </span>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">C</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postC && doc.postC.result2D) || "" }}-{{
                            (doc.postC && doc.postC.result3D) || ""
                          }}
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">D</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postD && doc.postD.result2D) || "" }}-{{
                            (doc.postD && doc.postD.result3D) || ""
                          }}
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">F</th>
                        <th class="bigLabelFontBlackM">
                          {{ (doc.postF && doc.postF.result2D) || "" }}-{{
                            (doc.postF && doc.postF.result3D) || ""
                          }}
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">I</th>
                        <th class="bigLabelFontBlackM">
                          {{ (doc.postI && doc.postI.result2D) || "" }}-{{
                            (doc.postI && doc.postI.result3D) || ""
                          }}
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">N</th>
                        <th class="bigLabelFontBlackM">
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
                        <th class="bgColor titleFontM" colspan="2">
                          <h1>LO-B</h1>
                          <h5>2D việt nam lo x50</h5>
                        </th>
                        <th
                          class="bgColor1"
                          colspan="2"
                          style="vertical-align: middle"
                        >
                          <h5>3D việt nam lo x50</h5>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result2D[0] }}
                        </th>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result2D[1] }}
                        </th>

                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result3D[0] }}
                        </th>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result3D[1] }}
                        </th>
                      </tr>

                      <tr>
                        <th colspan="2" rowspan="6" class="bigLabelFontLoM">
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
                        <th colspan="2" rowspan="6" class="bigLabelFontLoRedM">
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
    </div>
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
    /*************  ✨ Codeium Command ⭐  *************/
    /**
     * @param {number} d - the day of week to get the corresponding Monday. 0 = Sunday, 1 = Monday, ..., 6 = Saturday
     * @description
     * Set the date to the Monday of the week containing the given day of week.
     * e.g. If the current date is Thursday, August 1st and the given day of week is Tuesday,
     *      the date will be set to Monday, July 29th.
     */
    /******  f2ce2f5d-0426-445e-9158-d198ab4e7ff1  *******/

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
      if (moment(now).format("mmss") == "0030") {
        this.fetchResult();
      }
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
  font-size: 20px;
  color: red;
}

.bigFont2 {
  font-weight: bold;
  font-size: 18px;
  color: red;
}

.bigLabelFont {
  font-weight: bold;
  font-size: 18px;
  color: #5ca3d6;
}

.bigLabelFontR {
  font-weight: bold;
  font-size: 18px;
  color: #5ca3d6;
}

.bigLabelFontLo {
  font-weight: bold;
  color: #5ca3d6;
  font-size: 15px;
}

.bigLabelFontLoRed {
  font-weight: bold;
  color: red;

  font-size: 15px;
}

.bigLabelFont2 {
  font-weight: bold;
  font-size: 18px;
}

.bigLabelFontBlack {
  font-weight: bold;
  font-size: 18px;
}
.titleFont {
  font-weight: bold;
  font-size: 20px;
  color: white;
}

.bigFontM {
  font-weight: bold;
  font-size: 15px;
  color: red;
}

.bigFontM2 {
  font-weight: bold;
  font-size: 14px;
  color: red;
}

.bigLabelFontM {
  font-weight: bold;
  font-size: 13;
  color: #5ca3d6;
}

.bigLabelFontMR {
  font-weight: bold;
  font-size: 13px;
  color: #5ca3d6;
}

.bigLabelFontLoM {
  font-weight: bold;
  color: #5ca3d6;
  font-size: 13px;
}

.bigLabelFontLoRedM {
  font-weight: bold;
  color: red;

  font-size: 13px;
}

.bigLabelFontM2 {
  font-weight: bold;
  font-size: 13px;
}

.bigLabelFontBlackM {
  font-weight: bold;
  font-size: 13px;
}
.titleFontM {
  font-weight: bold;
  font-size: 13px;
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
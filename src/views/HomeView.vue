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
              style="
                background-color: red;
                text-align: center;
                font-weight: bold;
              "
            >
              <h3>kể từ năm 1991</h3>
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
              class="bg-grey-lighten-2 d-flex align-center justify-center"
              :src="configDoc.bannerUrl"
              cover
              aspect-ratio="9/16"
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

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl1"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl2"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl3"
            cover
          ></v-img>
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
                  >
                    {{ $t(doc.time) }}
                  </span>

                  <span v-if="!$vuetify.display.mobile" style="float: right">
                    <h2 v-if="!(doc.postA && doc.postA.result2D)">
                      thời gian còn lại
                    </h2>
                    <h1 v-if="!(doc.postA && doc.postA.result2D)">
                      {{ timeLeft }}
                    </h1>
                    <h2 v-if="doc.postA && doc.postA.result2D">ngày kết quả</h2>
                    <h1 v-if="doc.postA && doc.postA.result2D">
                      {{ formatDate(doc.resultDate) }}
                    </h1>
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
                          {{ (doc.postA && doc.postA.result2D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          -
                          {{ (doc.postA && doc.postA.result3D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postA && doc.postA.result3D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postA && doc.postA.result3D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postA && doc.postA.result3D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFont2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result2D[0]) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLa && doc.postLa.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLa && doc.postLa.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFont2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result3D[0]) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont">B</th>
                        <th class="bigLabelFontR">
                          {{ (doc.postB && doc.postB.result2D) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postB && doc.postB.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postB && doc.postB.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postB && doc.postB.result3D) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
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
                          <span
                            v-if="
                              !(doc.postLa && doc.postLa.result2D.length > 0)
                            "
                          >
                            <span v-for="ind in 11" :key="ind">
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
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
                          <span
                            v-if="
                              !(doc.postLa && doc.postLa.result3D.length > 0)
                            "
                          >
                            <span v-for="ind in 9" :key="ind">
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
                          </span>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont">C</th>
                        <th class="bigLabelFontR">
                          {{ (doc.postC && doc.postC.result2D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postC && doc.postC.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postC && doc.postC.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postC && doc.postC.result3D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont">D</th>
                        <th class="bigLabelFontR">
                          {{ (doc.postD && doc.postD.result2D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postD && doc.postD.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postD && doc.postD.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postD && doc.postD.result3D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont2">F</th>
                        <th class="bigLabelFontBlack">
                          {{ (doc.postF && doc.postF.result2D) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postF && doc.postF.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postF && doc.postF.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postF && doc.postF.result3D) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont2">I</th>
                        <th class="bigLabelFontBlack">
                          {{ (doc.postI && doc.postI.result2D) || "" }}
                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postI && doc.postI.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postI && doc.postI.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postI && doc.postI.result3D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFont2">N</th>
                        <th class="bigLabelFontBlack">
                          {{ (doc.postN && doc.postN.result2D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postN && doc.postN.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postN && doc.postN.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postN && doc.postN.result3D) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
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

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result2D[1]) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result2D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result2D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>

                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result3D[0]) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFont2">
                          {{ (doc.postLb && doc.postLb.result3D[1]) || "" }}

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="20"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th
                          colspan="2"
                          rowspan="6"
                          :style="
                            doc.postLb.result2D.length > 0
                              ? ''
                              : 'height: 170px'
                          "
                          class="bigLabelFontLo"
                        >
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
                          <span
                            v-if="
                              !(doc.postLb && doc.postLb.result2D.length > 0)
                            "
                          >
                            <span v-for="ind in 12" :key="ind">
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
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
                          <span
                            v-if="
                              !(doc.postLb && doc.postLb.result3D.length > 0)
                            "
                          >
                            <span v-for="ind in 12" :key="ind">
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="15"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
                          </span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>

              <v-img
                class="bg-grey-lighten-2 d-flex align-center justify-center"
                :src="
                  k == 1
                    ? configDoc.advertiseUrl1
                    : k == 2
                    ? configDoc.advertiseUrl2
                    : configDoc.advertiseUrl3
                "
                aspect-ratio="9/16"
              ></v-img>
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
              style="
                background-color: red;
                text-align: center;
                font-weight: bold;
              "
            >
              <h3>kể từ năm 1991</h3>
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
            <v-card>
              <v-img
                class="bg-grey-lighten-2"
                height="110px"
                :src="configDoc.bannerPhoneUrl"
                cover
              ></v-img>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3" sm="2" md="2" style="padding: 0px; margin: 0px">
          <v-menu transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <span
                style="
                  padding-left: 13px;
                  border-radius: 6px;
                  background-color: whitesmoke;
                "
                v-bind="props"
                v-text="dateFormatted"
              ></span>
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
          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl1"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl2"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl3"
            cover
          ></v-img>
          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl1"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl2"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl3"
            cover
          ></v-img>
          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl1"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl2"
            cover
          ></v-img>

          <v-img
            class="bg-grey-lighten-2"
            :src="configDoc.advertiseLeftUrl3"
            cover
          ></v-img>
        </v-col>
        <v-col
          cols="9"
          sm="10"
          md="10"
          style="padding-right: 0px !important; padding-top: 0px !important"
        >
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
                  <span style="float: right"
                    ><h5>thời gian còn lại</h5>
                    <h4 v-if="!(doc.postA && doc.postA.result2D)">
                      {{ timeLeft }}
                    </h4>
                    <h4 v-if="doc.postA && doc.postA.result2D">00:00</h4>
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
                          {{ formatDate(doc.resultDate) }}
                          <h5>việt nam lo 2D & 3D</h5>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigFontM">A</th>
                        <th class="bigFontM">
                          {{ (doc.postA && doc.postA.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postA && doc.postA.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postA && doc.postA.result2D)"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFontM2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result2D[0]) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLa && doc.postLa.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLa && doc.postLa.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFontM2" style="vertical-align: middle">
                          {{ (doc.postLa && doc.postLa.result3D[0]) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLa && doc.postLa.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">B</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postB && doc.postB.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postB && doc.postB.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postB && doc.postB.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postB && doc.postB.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postB && doc.postB.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th
                          rowspan="6"
                          class="bigLabelFontMRLo"
                          style="text-align: center"
                        >
                          <span
                            style="margin-bottom: 0px !important"
                            v-for="(myResult, ind) in filterRemove1(
                              (doc.postLa && doc.postLa.result2D) || []
                            )"
                            :key="ind"
                          >
                            <!-- <br v-if="ind % 2 == 0 && ind > 0" /> -->
                            <div
                              class="custom-break"
                              v-if="ind % 2 == 0 && ind > 0"
                            ></div>
                            &nbsp;&nbsp;&nbsp;{{ myResult }}
                          </span>

                          <span
                            v-if="
                              !(doc.postLa && doc.postLa.result2D.length > 0)
                            "
                          >
                            <span v-for="ind in 11" :key="ind">
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              &nbsp;
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
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
                            <!-- <br v-if="ind % 2 == 1 && ind > 0" /> -->
                            <div
                              class="custom-break1"
                              v-if="ind % 2 == 1 && ind > 0"
                            ></div>
                            &nbsp;&nbsp;&nbsp;{{ myResult }}
                          </span>
                          <span
                            v-if="
                              !(doc.postLa && doc.postLa.result3D.length > 0)
                            "
                          >
                            <span v-for="ind in 9" :key="ind">
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLa && doc.postLa.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <br />
                            </span>
                          </span>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">C</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postC && doc.postC.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postC && doc.postC.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postC && doc.postC.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postC && doc.postC.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postC && doc.postC.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM">D</th>
                        <th class="bigLabelFontMR">
                          {{ (doc.postD && doc.postD.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postD && doc.postD.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postD && doc.postD.result2D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postD && doc.postD.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postD && doc.postD.result3D)"
                            color="primary"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">F</th>
                        <th class="bigLabelFontBlackM">
                          {{ (doc.postF && doc.postF.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postF && doc.postF.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postF && doc.postF.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postF && doc.postF.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postF && doc.postF.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">I</th>
                        <th class="bigLabelFontBlackM">
                          {{ (doc.postI && doc.postI.result2D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postI && doc.postI.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postI && doc.postI.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular
                          >-{{ (doc.postI && doc.postI.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postI && doc.postI.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigLabelFontM2">N</th>
                        <th class="bigLabelFontBlackM">
                          {{ (doc.postN && doc.postN.result2D) || "" }}
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postN && doc.postN.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postN && doc.postN.result2D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                          -{{ (doc.postN && doc.postN.result3D) || "" }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postN && doc.postN.result3D)"
                            color="amber"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
                <v-col
                  cols="12"
                  sm="12"
                  md="6"
                  style="margin-top: -25px; padding-top: 0px !important"
                >
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
                          {{ formatDate(doc.resultDate) }}
                          <h5>3D việt nam lo x50</h5>
                        </th>
                      </tr>

                      <tr>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result2D[0] }}
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result2D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result2D[1] }}
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result2D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result2D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>

                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result3D[0] }}

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[0])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                        <th class="bigFontM2">
                          {{ doc.postLb && doc.postLb.result3D[1] }}
                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>

                          <v-progress-circular
                            size="12"
                            :width="1"
                            v-if="!(doc.postLb && doc.postLb.result3D[1])"
                            color="red"
                            indeterminate
                          ></v-progress-circular>
                        </th>
                      </tr>

                      <tr>
                        <th
                          :style="
                            doc.postLb.result2D.length > 0
                              ? ''
                              : 'height: 170px'
                          "
                          colspan="2"
                          rowspan="6"
                          class="bigLabelFontLoM"
                        >
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

                          <span
                            v-if="
                              !(doc.postLb && doc.postLb.result2D.length > 0)
                            "
                          >
                            <span v-for="ind in 15" :key="ind">
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              &nbsp;

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result2D.length > 0
                                  )
                                "
                                color="primary"
                                indeterminate
                              ></v-progress-circular>

                              <br />
                            </span>
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

                          <span
                            v-if="
                              !(doc.postLb && doc.postLb.result3D.length > 0)
                            "
                          >
                            <span v-for="ind in 15" :key="ind">
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              &nbsp;

                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>
                              <v-progress-circular
                                size="10"
                                :width="1"
                                v-if="
                                  !(
                                    doc.postLb && doc.postLb.result3D.length > 0
                                  )
                                "
                                color="red"
                                indeterminate
                              ></v-progress-circular>

                              <br />
                            </span>
                          </span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </v-col>
              </v-row>
              <v-img
                class="bg-grey-lighten-2 d-flex align-center justify-center"
                :src="
                  k == 1
                    ? configDoc.advertiseUrl1
                    : k == 2
                    ? configDoc.advertiseUrl2
                    : configDoc.advertiseUrl3
                "
                aspect-ratio="9/16"
              ></v-img>
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
      timeLeft: "",
      menuDate: false,
      dateFormatted: moment().format("DD/MM/YYYY"),
      configDoc: {},
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
      let url =
        provider.baseURL +
        `/result/fetch?date=${moment(vm.param.date).format(
          "YYYY-MM-DD"
        )}&time=${time}`;
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
      let vm = this;
      const now = new Date();
      vm.currentTime = now.toLocaleTimeString(); // Format the time

      let ramainInMs =
        new Date(moment().format("YYYY-MM-DD HH:" + "59:59")) - new Date();
      let minute = Math.floor(ramainInMs / 1000 / 60);
      let second = Math.floor(ramainInMs / 1000 - minute * 60);
      vm.timeLeft =
        `${minute >= 0 && minute < 57 ? minute : 0}`.padStart(2, "0") +
        ":" +
        `${second >= 0 && minute < 57 ? second : 0}`.padStart(2, "0");

      let currentMinute = parseInt(moment(now).format("mm"));
      let currentSecond = parseInt(moment(now).format("ss"));
      if (currentMinute < 10 && currentSecond % 5 == 0) {
        vm.fetchResult();
      } else if (currentMinute < 20 && currentSecond % 15 == 0) {
        vm.fetchResult();
      } else if (currentSecond === 1) {
        vm.fetchResult();
      }
    },
  },
  created() {
    this.fetchResult();
    this.fetchConfig();
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
  font-size: 16px;
}

.bigLabelFontLoRed {
  font-weight: bold;
  color: red;

  font-size: 16px;
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
  font-size: 20px;
  color: red;
}

.bigFontM2 {
  font-weight: bold;
  font-size: 20px;
  color: red;
}

.bigLabelFontM {
  font-weight: bold;
  font-size: 13;
  color: #5ca3d6;
}

.bigLabelFontMR {
  font-weight: bold;
  font-size: 17px;
  color: #5ca3d6;
}

.bigLabelFontMRLo {
  font-weight: bold;
  font-size: 14px;
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
  font-size: 17px;
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
.custom-break {
  height: 4px; /* Set your desired height */
  display: block; /* Ensure it behaves like a block element */
}

.custom-break1 {
  height: 6px; /* Set your desired height */
  display: block; /* Ensure it behaves like a block element */
}
</style>
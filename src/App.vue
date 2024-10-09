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
        Copyright © 2012 lo-vietnam.com<br />
        Công ty cổ phầ n truyề n thông HDC Việt Nam<br />
        Tầ ng 3, S3, Vinhomes Skylake Phạm Hùng, Nam Từ Liêm, Hà Nội
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>

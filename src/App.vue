<template>
  <v-app>

    <!-- <v-app-bar app color="blue" v-if="isAuth">
      <v-app-bar-title>
        <h3 class="text-h5 white--text">Simple cloud</h3>
      </v-app-bar-title>
    </v-app-bar> -->
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'simple-cloud',
  data: function () {
    return {
      isAuth: true,
    }
  }
}
</script>
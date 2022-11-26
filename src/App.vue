<template>
  <v-app>

    <v-app-bar app color="blue" v-if="isAuth" align="space-between">
      <v-app-bar-title>
        <h3 class="text-h5 white--text">Simple cloud</h3>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-app-bar-title>
        <h3 class="text-h6 white--text" style="cursor: pointer;" @click="logout">выйти</h3>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view @userLogin="setIsAuth(true)" @userLogout="setIsAuth(false)" :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import User from './api/User';

export default {
  name: 'simple-cloud',
  data: function () {
    return {
      isAuth: false,
    }
  },
  methods: {
    setIsAuth: function (value) {
      this.isAuth = value
    },
    logout: async function () {
      await User.logout()
      this.setIsAuth(false);
      this.$router.push('/login')
    }
  },
  created: async function () {
    if (!localStorage.token) {
      this.isAuth = false
      this.$router.push('/login')
    }
    try {
      await User.me()
      this.isAuth = true
    } catch (e) {
      this.isAuth = false
      this.$router.push('/login');
    }
  }
}
</script>
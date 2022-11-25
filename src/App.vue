<template>
  <v-app>

    <v-app-bar app color="blue" v-if="isAuth">
      <v-app-bar-title>
        <h3 class="text-h5 white--text">Simple cloud</h3>
      </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <router-view @userLogin="setIsAuth(true)" @userLogout="setIsAuth(false)"></router-view>
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
    }
  },
  created: function () {
    if (!localStorage.token) {
      this.$router.push('/login')
    }
    try {
      User.me()
      this.isAuth = true
    } catch (e) {
      this.$router.push('login');     
    }
  }
}
</script>
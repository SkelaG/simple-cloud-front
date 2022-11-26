<template>
    <v-container class="mb-6" style="height: 100%;">
        <v-row no-gutters align-content="center" style="height: 100%; padding: 0px 20%;">
            <v-col v-if="needLogin">
                <h1 class="text-center">Авторизация</h1>
                <p class="warning text-center" v-if="hasFail">Неверный логин или пароль</p>
                <v-text-field required label="Email" v-model="email"></v-text-field>
                <v-text-field required label="Пароль" v-model="password" type="password" v-on:keyup.enter="login">
                </v-text-field>
                <v-btn elevation="2" block color="primary" rounded v-on:click="login">Войти</v-btn>
                <p class="text-center sign-text">Нет аккаунта? <a
                        v-on:click="setNeedLogin(false)">Зарегистрироваться</a></p>
            </v-col>
            <v-col v-else>
                <h1 class="text-center">Регистрация</h1>
                <p class="warning text-center" v-if="hasFail">Заполнены не все поля</p>
                <v-text-field required label="Email" v-model="email"></v-text-field>
                <v-text-field label="Пароль" v-model="password" type="password" v-on:keyup.enter="login"></v-text-field>
                <v-text-field label="Имя" v-model="name" v-on:keyup.enter="login"></v-text-field>
                <v-btn elevation="2" block color="primary" rounded v-on:click="registration">Зарегистрироваться</v-btn>
                <p class="text-center sign-text">Уже есть аккаунт? <a v-on:click="setNeedLogin(true)">Войти</a></p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import User from '../api/User.js';

export default {
    name: 'CloudLogin',
    data: function () {
        return {
            email: '',
            password: '',
            name: '',
            hasFail: false,
            needLogin: true,
        }
    },
    methods: {
        login: async function () {
            try {
                await User.login(this.email, this.password)
                this.hasFail = false
            } catch (e) {
                this.hasFail = true
            }
            this.redirectFromLogin()
        },
        setNeedLogin: function (value) {
            this.needLogin = value
        },
        registration: async function () {
            try {
                localStorage.token = await User.registration(this.email, this.password, this.name)
                this.hasFail = false
                this.needLogin = true
            } catch (e) {
                this.hasFail = true
            }
        },
        redirectFromLogin: function () {
            this.$emit('userLogin')
            this.$router.push('/' + localStorage.rootDirectory);
        }
    },
    created: async function () {
        try {
            await User.me();
            this.redirectFromLogin()
        } catch (e) {
            this.$emit('userLogout')
        }
    }
}
</script>

<style>
.text-center {
    align: center;
}

.sign-text {
    padding: 10px;
}
</style>
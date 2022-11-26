<template>
    <v-row>
        <v-col align-self="center" class="clickable" @click="clickAction">
            <img class="file-type" src="../assets/directory.png" v-if="file.type == 'directory'">
            <img class="file-type" src="../assets/file.png" v-else>
        </v-col>
        <v-col align-self="center" class="clickable" @click="clickAction">{{ file.name }}</v-col>
        <v-col align-self="center" class="clickable" @click="clickAction">{{ file.created_at }}</v-col>
        <v-col>
            <file-modal name="Переименовать" v-bind:current-directory="currentDirectory" @modalClosed="renameFile">
            </file-modal>
            <v-btn block color="red" v-on:click="removeFile" style="margin-top: 5px;">Удалить</v-btn>
        </v-col>
    </v-row>
</template>

<script>
import FilesApi from '../api/Files.js'
import FileModal from '../components/Modal.vue'

export default {
    name: 'FileElement',
    props: ['file'],
    methods: {
        removeFile: async function () {
            await FilesApi.deleteFile(this.file.id)
            this.$emit('updateList')
        },
        openDirectory: function () {
            this.$router.push('/' + this.file.id)
            this.$emit('updateList')
        },
        downloadFile: async function () {
            await FilesApi.downloadFile(this.file.id, this.file.name + '.' + this.file.file_type)
        },
        renameFile: async function (ModalData) {
            await FilesApi.renameFile(this.file.id, ModalData.fileName)
            this.$emit('updateList')
        },
        clickAction: function () {
            if (this.file.type == 'directory') {
                this.openDirectory()
            } else {
                this.downloadFile()
            }
        }
    },
    components: {
        'file-modal': FileModal,
    }
}
</script>

<style>
.file-type {
    width: 40px;
    height: 40px;
}

.clickable {
    cursor: pointer;
}
</style>
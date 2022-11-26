<template>
    <v-container style="padding-left: 0px">
        <v-row align="start" align-content="start">
            <v-col class="col-auto">
                <file-modal name="Создать файл"  v-bind:current-directory="currentDirectory" need-file="true" @modalClosed="createFile"></file-modal>
            </v-col>
            <v-col class="col-auto">
                <file-modal name="Создать папку" v-bind:current-directory="currentDirectory" @modalClosed="createDirectory"></file-modal>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FileModal from './Modal.vue'
import FilesApi from '../api/Files.js'

export default {
    name: 'FileToolbar',
    data: function () {
        return {
        }
    },
    props: ['currentDirectory'],
    methods: {
        createDirectory: async function (modalData) {
            await FilesApi.createDirectory(modalData.fileName, this.currentDirectory)
            this.$emit('updateList');
        },
        createFile: async function (modalData) {
            await FilesApi.createFile(modalData.fileName, this.currentDirectory, modalData.file)
            this.$emit('updateList');
        },
    },
    components: {
        'file-modal': FileModal
    }
}
</script>
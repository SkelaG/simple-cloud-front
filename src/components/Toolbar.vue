<template>
    <v-container>
        <v-row align="start" align-content="start" no-gutters>
            <v-col class="col-auto">
                <file-modal name="Создать файл"  v-bind:current-directory="currentDirectory" need-file="true" v-bind:callback="createFile"></file-modal>
            </v-col>
            <v-col class="col-auto">
                <file-modal name="Создать папку" v-bind:current-directory="currentDirectory" v-bind:callback="createDirectory"></file-modal>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import FileModal from './Modal.vue'
import FilesApi from '../api/Files.js';

export default {
    name: 'FileToolbar',
    data: function () {
        return {
        }
    },
    props: ['currentDirectory'],
    methods: {
        createDirectory: async function (name) {
            await FilesApi.createDirectory(name, this.currentDirectory)
        },
        createFile: async function (name, file) {
            await FilesApi.createFile(name, this.currentDirectory, file)
        },
    },
    components: {
        'file-modal': FileModal
    }
}
</script>
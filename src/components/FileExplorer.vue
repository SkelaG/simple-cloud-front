<template>
    <v-container class="grey lighten-4 mb-6" style="margin-top: 3%;">
        <file-toolbar v-bind:current-directory="currentDirectory.id"></file-toolbar>
    </v-container>
</template>

<script>
import Files from '../api/Files.js'
import FileToolbar from '../components/Toolbar.vue'

export default {
    name: 'FileExplorer',
    data: function () {
        return {
            files: [],
            currentDirectory: {
                id: ''
            },
        }
    },
    methods: {
        getFolder: async function (parentId) {
            this.currentDirectory = (await Files.getList(parentId))
        }
    },
    beforeMount: function() {
        this.getFolder(this.$route.params.id)
    },
    components: {
        'file-toolbar': FileToolbar
    }

}
</script>
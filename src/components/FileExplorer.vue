<template :key="this.$route.params.id">
    <v-container class="mb-6" style="margin-top: 3%;">
        <file-toolbar v-bind:current-directory="currentDirectory.id" @updateList="getFolder(currentDirectory.id)">
        </file-toolbar>
        <file-element v-for="file in currentDirectory.children" :key="file.id" v-bind:file="file"
            @updateList="getFolder(currentDirectory.id)"></file-element>
    </v-container>
</template>

<script>
import Files from '../api/Files.js'
import FileToolbar from '../components/Toolbar.vue'
import FileElement from '../components/FileElement.vue'

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
            if (this.currentDirectory.parent) {
                this.currentDirectory.children.unshift({
                    created_at: this.currentDirectory.parent.created_at,
                    id: this.currentDirectory.parent.id,
                    name: "..",
                    type: "directory",
                });
            }
        }
    },
    beforeMount: function () {
        this.getFolder(this.$route.params.id)
    },
    components: {
        'file-toolbar': FileToolbar,
        'file-element': FileElement,
    }

}
</script>
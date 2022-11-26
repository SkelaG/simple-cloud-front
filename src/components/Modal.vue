<template>
    <div>
        <v-btn color="primary" block dark @click.stop="dialog = true" style="margin-right: 10px;">
            {{ name }}
        </v-btn>

        <v-dialog v-model="dialog" max-width="600">
            <v-card>
                <v-card-title class="text-h5">
                    {{ name }}
                </v-card-title>

                <div style="padding: 25px;">
                    <v-text-field label="Имя" v-model="fileName"></v-text-field>
                    <v-file-input v-if="needFile"
                        label="Прикрепить файл"
                        @change="selectFile"
                    ></v-file-input>
                </div>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1" @click="closeModal">
                        Ок
                    </v-btn>

                    <v-btn @click="dialog = false">
                        Отмена
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            fileName: '',
            file: undefined,
        }
    },
    name: 'FileModal',
    methods: {
        selectFile: function (file) {
            this.file = file
        },
        closeModal: function () {
            this.$emit('modalClosed', {file: this.file, fileName: this.fileName});
            this.dialog = false
        },
    },
    props: ['name', 'needFile'],
}
</script>
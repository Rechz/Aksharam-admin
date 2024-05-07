<template>
    <div>
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
            <div class="text-center">{{ message }}</div>
        </v-snackbar>
        <v-dialog v-model="dialogDelete" width="400px">
            <v-card class="rounded-4 pb-4">
                <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                    Price Details</v-card-title>
                <v-container class="px-4 d-flex flex-column align-items-center">
                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                    <v-card-text class="mt-1 text-center">Are you sure you want to delete?</v-card-text>
                </v-container>
                <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                    <v-btn block class="rounded-4 text-white mb-3" style="background-color: #BA1A1A;"
                        @click="deleteItemConfirm">Delete</v-btn>
                    <v-btn block variant="text" class="rounded-4 mb-3" @click="closeDelete">Cancel</v-btn>

                </v-card-actions>

            </v-card>
        </v-dialog>
        <v-data-table :headers="headers" :items="items" items-per-page="10" color="grey-darken-3" density="compact"
            :pagination="false" :header-props="{ style: 'background-color: #546E7A; color: #ffffff;' }">
            <template v-slot:top>
                <v-toolbar flat class="bg-white">
                    <v-toolbar-title class="ms-0">
                        <h6>{{head}}</h6>
                    </v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:item='{ item, index }'>
                <tr style="background-color:#FCFDF6; color:black; height: 50px;">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td class="text-center">
                        <p class="my-0">{{ item.type }}</p>
                    </td>
                    <td class="text-center" style="width: 200px;"> <template v-if="isEditing(index) && !dialogDelete">
                            <v-form v-model="form">
                                <v-text-field v-model="item.price" outlined dense
                                    :rules="[value => !!value || 'Price is required']"
                                    class="d-flex justify-content-center"></v-text-field></v-form>
                        </template>
                        <template v-else>
                            <p class="my-0">{{ item.price }}</p>
                        </template>
                    </td>
                    <td class="text-center" style="width: 450px;">
                        <div v-if="!isEditing(index) || dialogDelete">
                            <v-icon size="20" color="teal-darken-3" class=" mdi mdi-pencil"
                                @click="startEditing(index)"></v-icon>
                            <v-icon @click="deleteItem(item)" :loading="loading" size="20" color="teal-darken-3"
                                class=" mdi mdi-trash-can ms-2" :disabled="loading">Submit</v-icon>
                        </div>

                        <div v-else-if="isEditing(index) && !dialogDelete" class="d-flex gap-1 justify-content-center">
                            <v-btn size="x-small" color="#2E7D32" @click="editItem(item)" :loading="loading"
                                :disabled="loading">Submit</v-btn>
                            <v-btn size="x-small" color="#2E7D32" @click="editingIndex = null">Cancel</v-btn>
                        </div>

                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    props: [ 'items', 'head'],
    data() {
        return {
            dialog: false,
            headers: [
                { title: 'Sl No.', sortable: false, align: 'center' },
                { title: 'Type', align: 'center', sortable: false, key: 'type' },
                { title: 'Price', sortable: false, key: 'price', align: 'center' },
                { title: 'Actions', sortable: false, align: 'center' },
            ],
            editButton: false,
            editingIndex: null, 
            editedItem:null,
            message: '',
            loading: false,
            snackbar: false,
            color: '#E8F5E9',
            timeout: 3000,
            dialogDelete: false,
            form: false
        };
    },
    methods: {
        isEditing(index) {
            return this.editingIndex === index;
        },
        startEditing(index) {
            this.editingIndex = index;
        },
        async editItem(item) {
            if (!this.form) return
            try {
                this.loading = true;
                const id = item.id;
                const body = {
                    "price": item.price,
                    "type": item.type,
                    "category": item.category
                }
                const res = await this.$store.dispatch("editPrice", {
                    id: id,
                    body: body
                });
                if (res) {
                    setTimeout(() => {
                        this.loading = false;
                        this.message = "Price updated Successfully!"
                        this.snackbar = true;
                        this.editingIndex = null;
                        this.$store.dispatch('loadPrice');
                    }, 2000);
                }
            }
            catch (err) {
                this.loading = false;
                this.message = err.message;
                this.color = 'red';
                this.snackbar = true;
            }
        },
        async deleteItemConfirm() {
            this.loading = !this.loading
            try {
                const id = this.editedItem.id;
                const success = await this.$store.dispatch('deletePrice', id)
                if (success) {
                    this.loading = false
                    this.message = 'Price deleted successfully !!';
                    this.color = '#C8E6C9'
                    this.closeDelete();
                    this.snackbar = true;
                    setInterval(() => { window.location.reload(); }, 2000)
                }
            }
            catch (error) {

                this.message = error.message + '!!';
                this.color = '#C62828';
                this.loading = false
                this.snackbar = true;
            }
        },
        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editingIndex = -1
            })
        },
        deleteItem(item) {
            this.dialogDelete = true
            this.editingIndex = this.items.indexOf(item)
            this.editedItem = Object.assign({}, item)
    
            console.log(this.editedItem)
           
        },
    }
};
</script>


<style scoped>
:deep(.v-table) {
    width: 60vw;
}
:deep(.v-input__control) {
    width: 100px;
    border-bottom: 2px solid #216D17;
}
:deep(.v-field) {
    height: 24px;
}
:deep(.v-field__input) {
    min-height: 0px;
    padding-top: 0px;
    padding-inline: 0px;
    text-align: end;
    margin-right: 10px;
}
:deep(hr){
    margin: 0;
}
:deep(.v-data-table-footer){
    display: none;
}
:deep(.v-toolbar__content){
    height:24px !important;
}
</style>
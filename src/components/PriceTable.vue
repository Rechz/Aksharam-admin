<template>
    <div>
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
                    <td class="text-center" style="width: 200px;"> <template v-if="isEditing(index)">
                            <v-text-field v-model="item.price" outlined dense
                                class="d-flex justify-content-center"></v-text-field>
                        </template>
                        <template v-else>
                            <p class="my-0">{{ item.price }}</p>
                        </template>
                    </td>
                    <td class="text-center" style="width: 450px;">
                        <v-icon v-if="!isEditing(index)" size="20" color="teal-darken-3" class=" mdi mdi-pencil"
                            @click="startEditing(index)"></v-icon>
                        <div v-else class="d-flex gap-1 justify-content-center">
                            <v-btn size="x-small" color="#2E7D32" @click="editItem(item)" :loading="loading">Submit</v-btn>
                            <v-btn size="x-small" color="#2E7D32" @click="editingIndex = null">Cancel</v-btn>
                        </div>
                        <!-- <v-icon size="20" color="danger" class="ms-4 mdi mdi-trash-can"
                            @click="deleteItem(item)"></v-icon> -->
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
            editingIndex: null, // Track the index of the item being edited
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
            this.editingIndex = null; // Reset editing index after submission
            const id = item.id;
            const body = {
                "price": item.price,
                "type": item.type,
                "category": item.category
            }
            console.log('edit clicked', id)
            console.log('body', body)
            const res = await this.$store.dispatch("editPrice", {
                id: id,
                body: body
            });
            if (res) {
                this.message = "Updated Successfully!"
                window.location.reload();
            }
        },
        async deleteItem(item) {
            const id = item.id;
            console.log('delete clicked', id)
            const res = await this.$store.dispatch("deletePrice", id);
            if (res) {
                this.message = "Deleted Successfully!"
                window.location.reload();
            }
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
    /* height: 24px; */
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
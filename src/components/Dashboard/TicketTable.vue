<template>
    <v-data-table-virtual :headers="headers" :items="tickets" max-width="100%" color="grey-darken-3" class="p-3"
        :header-props="{ style: 'background-color: #386568; color: white;' }" height="300" fixed-header>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>
                    <h6 style="color:#424242">Total Tickets : {{ tickets.length }}</h6>
                </v-toolbar-title>
            </v-toolbar>
        </template>
        <template v-slot:item='{ item, index }'>
            <tr>
                <td class="text-center">{{ index + 1 }}</td>
                <td>{{ item.ticketId }}</td>
                <td>{{ item.mobileNumber }}</td>
                <td>{{ totalCount(item) }}</td>
                <td>{{ item.visitDate }}</td>
                <td style="text-transform: capitalize;">{{ item.type }}</td>
                <td>{{ item.totalPrice }}</td>
                <td>{{ item.status ? 'Entered' : 'Pending' }}</td>
            </tr>
        </template>
    </v-data-table-virtual>
</template>

<script>
export default {
    data: () => ({
        headers: [
            { title: 'Sl No.', sortable: false, align: 'center' },
            { title: 'Ticket Id', align: 'start', sortable: false, key: 'ticketId' },
            { title: 'Mobile number', sortable: false, key: 'visitDate', align: 'start' },
            { title: 'No. of people', sortable: false, key: 'type', align: 'start' },
            { title: 'Booking Date', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Category', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Price', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Status', sortable: false, key: 'status', align: 'start' },
        ],
    }),
    methods: {
        async fetchTickets() {
            try {
                await this.$store.dispatch('fetchCurrentTickets');
            }
            catch (error) {
                console.error(error.message);
            }
        },
        totalCount(item) {
            const category = item.type
            if (category === 'public') {
                return (item.numberOfAdults + item.numberOfChildren + item.numberOfSeniors);
            }
            else if (category === 'institution') {
                return (item.numberOfTeachers + item.numberOfStudents);
            }
            else {
                return (item.numberOfAdults + item.numberOfChildren);
            }
        },
    },
    created() {
        this.fetchTickets();
    },
    computed: {
        tickets() {
            return this.$store.getters.getCurrentTickets;
        }
    },
};
</script>
<style scoped>
:deep(.search .v-input__control) {
    width: 300px;
}
:deep(.v-toolbar, .v-toolbar__content) {
    background-color: transparent;
    height: 48px;
}
:deep(.v-toolbar-title__placeholder>h6) {
    margin-bottom: 1.5rem;
}
.ticketid p {
    color: #303F9F;
    text-decoration: underline;
    cursor: pointer;
}
</style>
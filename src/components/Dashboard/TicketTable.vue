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
                <td>{{ item.bookingId }}</td>
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
import axios from 'axios';
export default {
    data: () => ({
        headers: [
            { title: 'Sl No.', sortable: false, align: 'center' },
            { title: 'Ticket Id', align: 'start', sortable: false, key: 'bookingId' },
            { title: 'Mobile number', sortable: false, key: 'visitDate', align: 'start' },
            { title: 'No. of people', sortable: false, key: 'type', align: 'start' },
            { title: 'Booking Date', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Category', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Price', sortable: false, key: 'visitors', align: 'start' },
            { title: 'Status', sortable: false, key: 'status', align: 'start' },
        ],
        tickets: [],

    }),
    created() {
        this.initialize();
    },
    methods: {
        async fetchTickets() {
            const url = this.$store.getters.getUrl;
            try {
                const response = await axios.get(`${url}/api/admin/allTickets`);
                if (response.status === 200) {
                    this.tickets = response.data;
                }
            }
            catch (error) {
                console.error(error);
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
        initialize() {
            this.tickets =
                [
                    {
                        id: 1,
                        mobileNumber: "9946561358",
                        type: "public",
                        email: "justinesangeetha@gmail.com",
                        sessionId: "e001c883-587e-45a3-8471-423ca0537a52",
                        name: "Maneesh",
                        numberOfAdults: 5,
                        numberOfChildren: 2,
                        numberOfSeniors: 0,
                        totalPrice: 150,
                        visitDate: "2024-02-05",
                        bookDate: null,
                        paymentid: null,
                        orderId: "order_NUsXo2lfF8zfGS",
                        bookingId: "AKM1001",
                        status: true
                    },
                    {
                        id: 2,
                        mobileNumber: "7306977849",
                        type: "institution",
                        email: "stjoseph@gmail.com",
                        sessionId: "cca36ef3-f6a7-41a8-972b-75c5e12a33dd",
                        institutionName: "St.joseph",
                        district: "Kottayam",
                        numberOfStudents: 1,
                        numberOfTeachers: 2,
                        visitDate: "1970-01-01",
                        bookDate: null,
                        totalPrice: 100,
                        orderId: "order_NV9f7KaJq8zpqK",
                        paymentid: null,
                        bookingId: "AKM1002",
                        status: false
                    },
                    {
                        id: 152,
                        mobileNumber: "8547086582",
                        type: "foreigner",
                        email: "ttttt@gmail.com",
                        sessionId: "dd6a0b09-69b8-4069-9728-f470834b5600",
                        name: "tttt",
                        numberOfAdults: 1,
                        numberOfChildren: 1,
                        totalPrice: 300,
                        visitDate: "2024-03-15",
                        bookDate: null,
                        paymentid: "pay_NmX99W38UYI9bp",
                        orderId: "order_NmX8yonSeM2ekn",
                        bookingId: "AKM12728",
                        status: true
                    },
                    {
                        id: 1,
                        mobileNumber: "9946561358",
                        type: "public",
                        email: "justinesangeetha@gmail.com",
                        sessionId: "e001c883-587e-45a3-8471-423ca0537a52",
                        name: "Maneesh",
                        numberOfAdults: 5,
                        numberOfChildren: 2,
                        numberOfSeniors: 0,
                        totalPrice: 150,
                        visitDate: "2024-02-05",
                        bookDate: null,
                        paymentid: null,
                        orderId: "order_NUsXo2lfF8zfGS",
                        bookingId: "AKM1001",
                        status: true
                    },
                    {
                        id: 2,
                        mobileNumber: "7306977849",
                        type: "institution",
                        email: "stjoseph@gmail.com",
                        sessionId: "cca36ef3-f6a7-41a8-972b-75c5e12a33dd",
                        institutionName: "St.joseph",
                        district: "Kottayam",
                        numberOfStudents: 1,
                        numberOfTeachers: 2,
                        visitDate: "1970-01-01",
                        bookDate: null,
                        totalPrice: 100,
                        orderId: "order_NV9f7KaJq8zpqK",
                        paymentid: null,
                        bookingId: "AKM1002",
                        status: false
                    },
                    {
                        id: 152,
                        mobileNumber: "8547086582",
                        type: "foreigner",
                        email: "ttttt@gmail.com",
                        sessionId: "dd6a0b09-69b8-4069-9728-f470834b5600",
                        name: "tttt",
                        numberOfAdults: 1,
                        numberOfChildren: 1,
                        totalPrice: 300,
                        visitDate: "2024-03-15",
                        bookDate: null,
                        paymentid: "pay_NmX99W38UYI9bp",
                        orderId: "order_NmX8yonSeM2ekn",
                        bookingId: "AKM12728",
                        status: true
                    },
                    {
                        id: 1,
                        mobileNumber: "9946561358",
                        type: "public",
                        email: "justinesangeetha@gmail.com",
                        sessionId: "e001c883-587e-45a3-8471-423ca0537a52",
                        name: "Maneesh",
                        numberOfAdults: 5,
                        numberOfChildren: 2,
                        numberOfSeniors: 0,
                        totalPrice: 150,
                        visitDate: "2024-02-05",
                        bookDate: null,
                        paymentid: null,
                        orderId: "order_NUsXo2lfF8zfGS",
                        bookingId: "AKM1001",
                        status: true
                    },
                    {
                        id: 2,
                        mobileNumber: "7306977849",
                        type: "institution",
                        email: "stjoseph@gmail.com",
                        sessionId: "cca36ef3-f6a7-41a8-972b-75c5e12a33dd",
                        institutionName: "St.joseph",
                        district: "Kottayam",
                        numberOfStudents: 1,
                        numberOfTeachers: 2,
                        visitDate: "1970-01-01",
                        bookDate: null,
                        totalPrice: 100,
                        orderId: "order_NV9f7KaJq8zpqK",
                        paymentid: null,
                        bookingId: "AKM1002",
                        status: false
                    },
                    {
                        id: 152,
                        mobileNumber: "8547086582",
                        type: "foreigner",
                        email: "ttttt@gmail.com",
                        sessionId: "dd6a0b09-69b8-4069-9728-f470834b5600",
                        name: "tttt",
                        numberOfAdults: 1,
                        numberOfChildren: 1,
                        totalPrice: 300,
                        visitDate: "2024-03-15",
                        bookDate: null,
                        paymentid: "pay_NmX99W38UYI9bp",
                        orderId: "order_NmX8yonSeM2ekn",
                        bookingId: "AKM12728",
                        status: true
                    }
                ]
        },


    },



}
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
<template>
    <div class="ticket" ref="ticket">
      <div class="ticket-header">
        <h1>Aksharam Museum</h1>
      </div>
      <div class="ticket-body">
        <p><strong>Name:</strong> {{ ticket.name }}</p>
        <v-img :src="'data:image/png;base64,' + ticket.qrCodeImage"></v-img>
        <p><strong>Phone Number:</strong> {{ ticket.phNumber }}</p>
        <p><strong>Adults:</strong> {{ ticket.adult }}</p>
        <p><strong>Children:</strong> {{ ticket.child }}</p>
        <p><strong>Senior Citizens:</strong> {{ ticket.seniorCitizen }}</p>
        <p><strong>Visit Date:</strong> {{ ticket.visitDate }}</p>
        <p><strong>Total Amount:</strong> ₹{{ ticket.totalAmount.toFixed(2) }}</p>
        <p><strong>GST Charge:</strong> ₹{{ ticket.totalGstCharge.toFixed(2) }}</p>
        <p><strong>Additional Charges:</strong> ₹{{ ticket.totalAdditionalCharges.toFixed(2) }}</p>
        <h2 class="grand-total"><strong>Grand Total: ₹{{ ticket.grandTotal.toFixed(2) }}</strong></h2>
        <p><strong>Order ID:</strong> {{ ticket.orderId }}</p>
        <p><strong>Payment ID:</strong> {{ ticket.paymentId }}</p>
        <p><strong>Payment Mode:</strong> {{ ticket.paymentMode }}</p>
        <p><strong>Payment Status:</strong> {{ ticket.paymentStatusId }}</p>
        <p><strong>Ticket ID:</strong> {{ ticket.ticketId }}</p>
      </div>
      <button @click="printTicket" class="print-button">Print Ticket</button>
    </div>
  </template>
  <script>
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
       
      };
    },
    computed: {
    ...mapGetters('booking', ['getCategory','getType','getSlot','getPaymentMode','getPaymentStatus','getSpotBooking','getDetails','getConfirmBooking']),

        ticket() {
            return this.getConfirmBooking;
        }
    },
    methods: {
        printTicket() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const ticketContent = this.$refs.ticket.innerHTML;
    
    // Include styles
    const styles = `
      <style>
        .ticket {
          width: 300px;
          border-radius: 10px;
          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
          font-family: Arial, sans-serif;
          background-color: #fff;
        }
        .ticket-header {
          background-color: #ffcc00;
          padding: 10px;
          text-align: center;
        }
        .ticket-body {
          padding: 15px;
        }
        .grand-total {
          color: #d9534f;
        }
        .print-button {
          background-color: #28a745;
          color: white;
        }
      </style>
    `;

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          ${styles}
        </head>
        <body>${ticketContent}</body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  },
    //   getPaymentMode(mode) {
    //     const modes = {
    //       1: 'Credit Card',
    //       2: 'Debit Card',
    //       // Add more payment modes as needed
    //     };
    //     return modes[mode] || 'Unknown';
    //   },
    //   getPaymentStatus(statusId) {
    //     const statuses = {
    //       1: 'Paid',
    //       2: 'Pending',
    //       // Add more statuses as needed
    //     };
    //     return statuses[statusId] || 'Unknown';
    //   }
    }
  };
  </script>
  
  <style scoped>
.ticket {
  width: 300px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  font-family: Arial, sans-serif;
  background-color: #ffffff;
  overflow: hidden;
  border: 1px solid #ddd;
}

.ticket-header {
  background-color: #ffcc00;
  padding: 15px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
}

.ticket-body {
  padding: 20px;
  color: #333;
}

.ticket-body p {
  margin: 5px 0;
  font-size: 0.9em;
}

.ticket-body strong {
  font-weight: 600;
}

.grand-total {
  color: #d9534f;
  font-weight: bold;
  font-size: 1em;
  margin-top: 10px;
}

.print-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9em;
  margin: 15px auto;
  display: block;
}

.print-button:hover {
  background-color: #218838;
}
</style>

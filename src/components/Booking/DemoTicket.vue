<template>
    <v-main>
        <v-container>
    <div class="ticket">
      <div class="header">
        <div class="logo"></div>
        <h1>Aksharam Museum</h1>
      </div>
      
      <div class="details">
        <p><strong>{{ totalGuests }} Ticket(s)</strong></p>
        <p>Date: {{ userDetails.visitDate }}</p>
        <p v-if="visitorType === 1 || visitorType ===3" >Adults: {{ userDetails.adultCount }}</p>
        <p v-if="visitorType === 1 || visitorType ===3">Children: {{ userDetails.childCount }}</p>
        <!-- <p v-if="visitorType === 1">Senior Citizens: {{ userDetails.seniorCitizenCount }}</p> -->
        <p v-if="visitorType === 2" >Teachers : {{ userDetails.teacherCount }}</p>
        <p v-if="visitorType === 2" >Students : {{ userDetails.studentCount }}</p>
      </div>
      <div class="qr-section">
        <p><strong>{{ totalGuests }} Ticket(s)</strong></p>
        <div class="qr-code">
            <v-img :src="'data:image/png;base64,' + userDetails.qrCodeImage"></v-img>
        </div>
        <p>{{ userDetails.ticketId }}</p>
      </div>
      <div class="footer">
        <p>Cancellation not available</p>
        <p><strong>Total Amount: Rs.{{ userDetails.grandTotal }}/-</strong></p>
      </div>
    </div>
</v-container>
</v-main>
  </template>
  
  <script>
  import { mapGetters } from 'vuex';
  export default {
    data() {
      return {
        // tickets: 3,
        // date: "2024-10-29",
        // slot: "10:00 am",
        // adults: 1,
        // children: 1,
        // seniorCitizens: 1,
        // code: "AKM69582",
        // totalAmount: 140,
      };
    },
    methods: {
        printTicket() {
    const printWindow = window.open("", "_blank", "width=300,height=500");
    if (!printWindow) {
  console.error("Failed to open a new window. Ensure popups are not blocked.");
  return;
}
let visitorDetails = "";
  if (this.visitorType === 1 || this.visitorType === 3) {
    visitorDetails += `<p>Adults: ${this.userDetails.adultCount}</p>`;
    visitorDetails += `<p>Children: ${this.userDetails.childCount}</p>`;
  }
  // if (this.visitorType === 1) {
  //   visitorDetails += `<p>Senior Citizens: ${this.userDetails.seniorCitizenCount}</p>`;
  // }
  if (this.visitorType === 2) {
    visitorDetails += `<p>Teachers: ${this.userDetails.teacherCount}</p>`;
    visitorDetails += `<p>Students: ${this.userDetails.studentCount}</p>`;
  }

    const ticketContent = `
      <div style="font-family: Arial, sans-serif; width: 280px; padding: 10px; text-align: center;">
        <div style="font-size: 20px; font-weight: bold;">Aksharam Museum</div>
        <div style="margin: 10px 0; border-top: 1px dashed black; border-bottom: 1px dashed black; padding: 5px 0;">
          <p><strong>${this.totalGuests} Ticket(s)</strong></p>
           <p>${visitorDetails}</p>
        </div>
        <div style="margin: 10px 0;">
          <div style="width: 100px; height: 100px; margin: 10px auto; background: url('data:image/png;base64,${this.userDetails.qrCodeImage}'); background-size: cover;"></div>
          <p>Order ID: ${this.userDetails.orderId}</p>
        </div>
        <p style="margin-top: 10px; font-size: 14px;">Cancellation not available</p>
        <p><strong>Total Amount: Rs.${this.userDetails.grandTotal}/-</strong></p>
      </div>
    `;
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket</title>
          <style>
            @media print {
              body {
                margin: 0;
                width: 80mm; /* Ensure the ticket fits thermal printer width */
                font-size: 12px;
              }
              div {
                text-align: center;
              }
            }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${ticketContent}
        </body>
      </html>
    `);
    printWindow.document.close();
  },
  close() {
    this.dialog = false
  },
    },
    computed: {
    ...mapGetters(['getRole']),
    ...mapGetters('booking', ['getConfirmBooking','getDetails']),
    userDetails() {
        return this.getConfirmBooking;
    },
    details() {
      return this.getDetails;
    },
    visitorType() {
      return this.details.id; 
    },
    totalGuests() {
      let total = 0;

      if (this.visitorType === 1) { // Public
        total += (this.details.data.adult || 0);
        total += (this.details.data.child || 0);
        // total += (this.details.data.seniorCitizen || 0);
      } else if (this.visitorType === 2) { // Institution
        total += (this.details.data.teacher || 0); // Assuming adults are teachers
        total += (this.details.data.student || 0); // Assuming children are students
      } else if (this.visitorType === 3) { // Foreigner
        total += (this.details.data.adult || 0);
        total += (this.details.data.child || 0);
      }

      return total;
    }
    },
    mounted() {
        this.printTicket();
    },

  };
  </script>
  
  <style scoped>
  .ticket {
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: auto;
  }
  
  .header {
    background: #000;
    color: #fff;
    padding: 10px;
    text-align: center;
    position: relative;
  }
  
  .header .logo {
    background-image: url("@/assets/logo.png");
    /* width: 24px;
    height: 24px; */
    background-size: cover;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  .details, .qr-section, .footer {
    /* padding: 15px; */
    padding: 5px;
    text-align: center;
  }
  
  .details p, .qr-section p, .footer p {
    margin: 5px 0;
  }
  
  .qr-code {
    width: 100px;
    height: 100px;
    background: url('data:image/png;base64,${this.userDetails.qrCodeImage}');
    background-size: cover;
    margin: 10px auto;
  }
  
  .footer {
    background: #f0f0f0;
    border-top: 1px solid #ccc;
  }
  
  .footer p {
    margin: 5px 0;
  }
  </style>
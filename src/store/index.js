import { createStore } from 'vuex';
import rootMutations from './mutations.js';
import rootActions from './actions.js';
import rootGetters from './getters.js';
const store = createStore({
  state() {
    return {
      // base_url: 'http://localhost:8080',
      base_url: 'http://94.176.233.47:5000',
      token: sessionStorage.getItem('token') || '',
      employeeId: JSON.parse(sessionStorage.getItem('employeeId')) || [],
      allTickets: JSON.parse(sessionStorage.getItem('allTickets')) || [
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
          bookDate: "2024-01-26",
          paymentid: null,
          orderId: "order_NUsXo2lfF8zfGS",
          ticketId: "AKM1001",
          visitStatus: true
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
          visitDate: "2024-02-26",
          bookDate: "2024-02-22",
          totalPrice: 100,
          orderId: "order_NV9f7KaJq8zpqK",
          paymentid: null,
          ticketId: "AKM1002",
          visitStatus: false
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
          bookDate: "2024-02-26",
          paymentid: "pay_NmX99W38UYI9bp",
          orderId: "order_NmX8yonSeM2ekn",
          ticketId: "AKM12728",
          visitStatus: true
        }
      ],
      currentTickets: JSON.parse(sessionStorage.getItem('currentTickets')) || [
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
          bookDate: "2024-01-26",
          paymentid: null,
          orderId: "order_NUsXo2lfF8zfGS",
          ticketId: "AKM1001",
          visitStatus: true
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
          visitDate: "2024-02-26",
          bookDate: "2024-02-22",
          totalPrice: 100,
          orderId: "order_NV9f7KaJq8zpqK",
          paymentid: null,
          ticketId: "AKM1002",
          visitStatus: false
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
          bookDate: "2024-02-26",
          paymentid: "pay_NmX99W38UYI9bp",
          orderId: "order_NmX8yonSeM2ekn",
          ticketId: "AKM12728",
          visitStatus: true
        }
      ], 
      allEmployees: JSON.parse(sessionStorage.getItem('allEmployees')) || [
      {
        "id": 2,
        "name": "employee1",
        "employeeId": "EMP10001",
        "password": "$2a$10$f8j05ehJJ9zcjJw6MPYD3.YEpcw/smXqcy6t.BovsuLyBn1DHbn.6",
        "image": "C:/Users/azhym/Desktop/Museum Employees/EMP10001_Screenshot (1).png",
        "email": "employee1@gmail.com",
        "phoneNo": "9888888888",
        "tempAddress": "Kottayam",
        "permAddress": "Alappuzha",
        "role": "EMPLOYEE",
        "enabled": true,
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "username": "EMP10001",
        "authorities": [
          {
            "authority": "EMPLOYEE"
          }
        ],
        "accountNonLocked": true
      },
      {
        "id": 152,
        "name": "employee4",
        "employeeId": "EMP10004",
        "password": "kft0s32r",
        "image": "C:/Users/azhym/Desktop/Museum Employees/EMP10004_Screenshot (3).png",
        "email": "employee4@gmail.com",
        "phoneNo": "9888888886",
        "tempAddress": "Mararikulam",
        "permAddress": "Alappuzha",
        "role": "EMPLOYEE",
        "enabled": true,
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "username": "EMP10004",
        "authorities": [
          {
            "authority": "EMPLOYEE"
          }
        ],
        "accountNonLocked": true
      },
      {
        "id": 202,
        "name": "employee5",
        "employeeId": "EMP10005",
        "password": "mGuPywuQ",
        "image": "C:/Users/azhym/Desktop/Museum Employees/EMP10005_Screenshot 2024-02-09 135549.png",
        "email": "employee5@gmail.com",
        "phoneNo": "9888888885",
        "tempAddress": "Kottayam",
        "permAddress": "Alappuzha",
        "role": "EMPLOYEE",
        "enabled": true,
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "username": "EMP10005",
        "authorities": [
          {
            "authority": "EMPLOYEE"
          }
        ],
        "accountNonLocked": true
      },
      {
        "id": 252,
        "name": "employee6",
        "employeeId": "EMP10006",
        "password": "O2pjHAed",
        "image": "Photo",
        "email": "employee6@gmail.com",
        "phoneNo": "9888888884",
        "tempAddress": "Kottayam",
        "permAddress": "Alappuzha",
        "role": "EMPLOYEE",
        "enabled": true,
        "credentialsNonExpired": true,
        "accountNonExpired": true,
        "username": "EMP10006",
        "authorities": [
          {
            "authority": "EMPLOYEE"
          }
        ],
        "accountNonLocked": true
      }
    ],
      scannerList: JSON.parse(sessionStorage.getItem('scannerList')) || [
        {
          "id": 52,
          "name": "employee2",
          "employeeId": "EMP10002",
          "password": "$2a$10$UazhIACz0qvD/.AS0P1F5O7aTzEOkHuoxFEAiCtPvhj6gnqA7YS3W",
          "image": "C:/Users/azhym/Desktop/Museum Employees/EMP10002_Screenshot 2024-02-01 111851.png",
          "email": "employee2@gmail.com",
          "phoneNo": "9888888887",
          "tempAddress": "Thrissur",
          "permAddress": "Alappuzha",
          "role": "SCANNER",
          "enabled": true,
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "username": "EMP10002",
          "authorities": [
            {
              "authority": "SCANNER"
            }
          ],
          "accountNonLocked": true
        },
        {
          "id": 102,
          "name": "employee3",
          "employeeId": "EMP10003",
          "password": "$2a$10$D0/LNp4aluUpbLfEVpZU8.QELRYsQlSJpGi2VrV1KO3ljUNS4ZFEq",
          "image": "C:/Users/azhym/Desktop/Museum Employees/EMP10003_Screenshot (2).png",
          "email": "employee3@gmail.com",
          "phoneNo": "9888888886",
          "tempAddress": "Cherthala",
          "permAddress": "Alappuzha",
          "role": "SCANNER",
          "enabled": true,
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "username": "EMP10003",
          "authorities": [
            {
              "authority": "SCANNER"
            }
          ],
          "accountNonLocked": true
        },
        {
          "id": 302,
          "name": "employee7",
          "employeeId": "EMP10007",
          "password": "$2a$10$4//lY5s72SDTEbSxBl9a3ORuUmNH5AhGoFCFfZKvYNcUKrM0pznAO",
          "image": "Photo",
          "email": "employee7@gmail.com",
          "phoneNo": "9888888886",
          "tempAddress": "Kottayam",
          "permAddress": "Trivandrum",
          "role": "SCANNER",
          "enabled": true,
          "credentialsNonExpired": true,
          "accountNonExpired": true,
          "username": "EMP10007",
          "authorities": [
            {
              "authority": "SCANNER"
            }
          ],
          "accountNonLocked": true
        }
      ],
      dataPie: JSON.parse(sessionStorage.getItem('dataPie')) || [],
      dataBar: JSON.parse(sessionStorage.getItem('dataBar')) || [],
      labelsPie: JSON.parse(sessionStorage.getItem('labelsPie')) || ['Foreigner', 'Institution', 'Public'],
      labelsBar: JSON.parse(sessionStorage.getItem('labelsBar')) || ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      totalPie: sessionStorage.getItem('totalPie') || 0,
      totalBar: sessionStorage.getItem('totalBar') || 0,
      totalTickets: sessionStorage.getItem('totalTickets') || 0,
      totalIncome: sessionStorage.getItem('totalIncome') || 0,
    };
  },
  mutations: rootMutations,
  actions: rootActions,
  getters: rootGetters,
});
export default store;
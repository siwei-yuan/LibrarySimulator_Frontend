<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header style="height: 80px">
      <div class="logo">
        <img src="~@/assets/logo.png" style="transform:scale(1.5)" />
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="[routerKey]"
        :style="{ lineHeight: '80px' }"
        @click="handleChangeSite"
      >
        <a-menu-item style="font-size: larger" key="1">
          Studyroom Reservation
        </a-menu-item>
        <a-menu-item style="font-size: larger" key="2">
          Seat Occupation
        </a-menu-item>
        <a-menu-item style="font-size: larger" key="3">
          User Profile
        </a-menu-item>
      </a-menu>
      <a-avatar
      :size="64"
      :style="{backgroundColor: '#2e87c5', verticalAlign: 'middle'}"
      style="margin-left:95%; margin-top:-150px"
      >
        {{username}}
      </a-avatar>
      <a-button type="link" style="position: absolute; margin-left: -150px; margin-top: -55px" @click="logout">
        Logout
      </a-button>
    </a-layout-header>
    <a-carousel autoplay style="margin-left: 50px; margin-right: 50px">
      <div>
        <a-alert message="Click read more to learn more about this system." type="info" show-icon />
          <a-button type="primary" @click="() => (readMoreVisible = true)" size="small" style="margin-left:350px; position:absolute; margin-top:-31px;">
          Read More
          </a-button>
          <a-modal v-model="readMoreVisible" title="About Library Reservation System" @ok="() => (readMoreVisible = false)">
          <p>This system is divided into two parts: studyrooms reservation system and seats availability checker</p>
          <p>You can only make one reservation for the following day. There are 7 two-hour time slots to choose from.</p>
          <p>You can check the availability of seats in the library, and occupy/leave a seat by choose the seat you found in the library.</p>
          </a-modal>
      </div>
      <div>
        <a-alert message="New notifications will be displayed here, including your upcoming reservations." type="warning" show-icon />
      </div>
      <div>
        <a-alert :message="reservation" type="info" show-icon />
      </div>
    </a-carousel>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0; font-size: larger">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>{{breadcrumbItem}}</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Library Reservation System Developed For CS35L
    </a-layout-footer>
  </a-layout>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      readMoreVisible: false,
      breadcrumbItem: '',
      routerKey: '',
      username: '',
      reservation: 'You do not have any reservations yet.'
    }
  },
  created () {
    this.currentPath()
  },
  mounted () {
    this.updateAvatar()
    this.checkReservation()
    this.checkLogin()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        if (localStorage.getItem('CHANGED') === 'TRUE') {
          this.checkReservation()
        }
      }, 10000)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    handleChangeSite (event) {
      this.checkReservation()
      // console.log(event.key)
      if (event === undefined || event.key === '1') {
        this.$router.push({ name: 'studyroom' })
        this.breadcrumbItem = 'Studyroom'
      } else if (event.key === '2') {
        this.$router.push({ name: 'seat' })
        this.breadcrumbItem = 'Seat Status'
      } else {
        this.$router.push({ name: 'user' })
        this.breadcrumbItem = 'Profile'
      }
    },
    currentPath () {
      // console.log(this.$route.path)
      if (this.$route.path === '/user') {
        this.routerKey = '3'
        this.breadcrumbItem = 'Profile'
      } else if (this.$route.path === '/seat') {
        this.routerKey = '2'
        this.breadcrumbItem = 'Seat Status'
      } else {
        this.routerKey = '1'
        this.breadcrumbItem = 'Studyroom'
      }
    },
    checkLogin () {
      const uid = localStorage.getItem('UID')
      const uuid = localStorage.getItem('UUID')
      if (!uid || !uuid) {
        this.$router.push({ name: 'login' })
      }
    },
    updateAvatar () {
      const url = '/user/' + localStorage.getItem('UID')
      axios({
        method: 'get',
        url: url
      }).then(res => {
        // console.log(res.data)
        const index = res.data.indexOf('Username')
        this.username = res.data[index + 11].toUpperCase()
      })
    },
    logout () {
      this.$router.push({ name: 'login' })
      localStorage.setItem('UID', '')
      localStorage.setItem('UUID', '')
    },
    checkReservation () {
      // console.log('CHECKED')
      axios.get('/room').then(res => {
        let slot, time, name
        for (let i = 0; i < res.data.length; i++) {
          for (let j = 0; j < 7; j++) {
            if (res.data[i].Time_available[j] === localStorage.getItem('UID')) {
              slot = j + 1
              name = res.data[i].Name
              // console.log(slot + ' ' + name)
              break
            }
          }
        }
        if (name && slot) {
          switch (slot) {
            case 1:
              time = '8:00-10:00'
              break
            case 2:
              time = '10:00-12:00'
              break
            case 3:
              time = '12:00-14:00'
              break
            case 4:
              time = '14:00-16:00'
              break
            case 5:
              time = '16:00-18:00'
              break
            case 6:
              time = '18:00-20:00'
              break
            case 7:
              time = '20:00-22:00'
              break
            default:
              time = ''
          }
          this.reservation = 'You have reserved: ' + name + ' at ' + time
        } else {
          this.reservation = 'You do not have any reservations yet.'
        }
        localStorage.setItem('CHANGED', '')
      })
    }
  }
}
</script>

<style>
#components-layout-demo-top .logo {
  width: 80px;
  height: 31px;
  margin: 3px 0px 0px 18px;
  float: left;
}
</style>

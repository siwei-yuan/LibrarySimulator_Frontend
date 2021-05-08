<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header style="height: 80px">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '80px' }"
        :defaultSelectedKeys="['1']"
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
        Jerry
      </a-avatar>
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
export default {
  data () {
    return {
      readMoreVisible: false,
      breadcrumbItem: 'Studyroom'
    }
  },
  methods: {
    handleChangeSite (event) {
      console.log(event.key)
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
    }
  }
}
</script>

<style>
#components-layout-demo-top .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>

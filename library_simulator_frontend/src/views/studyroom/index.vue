<template>
  <div>
    <a-breadcrumb style="padding-top:10px; padding-left:20px">
      <a-breadcrumb-item style="font-size: 26px; color:#2e87c5">Library Reservation System</a-breadcrumb-item>
      <a-breadcrumb-item>Studyroom</a-breadcrumb-item>
    </a-breadcrumb>
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="studyroom"> <a-icon type="calendar" /> Studyroom </a-menu-item>
      <a-menu-item key="seat"> <a-icon type="table" /> Library Seats </a-menu-item>
      <a-menu-item key="profile"> <a-icon type="user" /> Profile </a-menu-item>
    </a-menu>
    <a-avatar
      :size="64"
      :style="{backgroundColor: '#2e87c5', verticalAlign: 'middle'}"
      style="margin-left:92%; margin-top:-120px"
    >
      Jerry
    </a-avatar>
    <div style="margin-top:-20px" >
      <a-carousel autoplay>
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
    </div>
    <!-- Navbar part over, studyroom part below, needs: filter of 7 time slots, list of study room, operations -->
    <div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      readMoreVisible: false
    }
  },
  methods: {
  }
}
</script>

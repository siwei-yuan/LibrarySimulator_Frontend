<template>
  <div>
    <p><a-avatar
      :size="128"
      :style="{backgroundColor: '#2e87c5', verticalAlign: 'middle'}"
      style="margin-left:46%; margin-top:-0px;font-size:40px"
    >
      Jerry
    </a-avatar></p>
   <ul style="list-style-type:circle;margin-left:40%">
    <li>User Name: Jerry Yuan </li>
    <li>User ID: 114514191</li>
    <li>
      <div>
        <a-button type="primary" @click = "showp()">Click to View Password</a-button>
        <p v-if="visible">{{mypassword}}</p>
      </div>
      <div>
        <div v-if = "resetvis">
          <input v-model="mynewpassword" placeholder="Type Your New Password">
          <a-button  type="primary" @click = "pushnew()">Done</a-button>
        </div>
        <a-button v-if = "resetvisbar"  type="primary" @click = "confirm()">click to confirm you new password</a-button>
      </div>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mypassword: '1919810',
      mynewpassword: '',
      confirmed: '',
      visible: false,
      resetvis: false,
      resetvisbar: true,
      parity: true
    }
  },
  methods: {
    showp () {
      if (this.parity) {
        this.visible = true
      } else {
        this.visible = false
      }
      this.parity = !this.parity },
    confirm () {
      this.resetvis = true
      this.resetvisbar = false },
    pushnew () {
      this.mypassword = this.mynewpassword
      this.mynewpassword = ''
      this.resetvis = false
      this.resetvisbar = true
    }
  }
}
</script>

<template>
  <div>
    <p><a-avatar
      :size="128"
      :style="{backgroundColor: '#2e87c5', verticalAlign: 'middle'}"
      style="margin-left:46%; margin-top:-0px;font-size:40px"
    >
      {{myuser.username}}
    </a-avatar></p>
   <ul style="list-style-type:square;margin-left:40%;">
     <li>User Name: {{myuser.username}}</li>
     <li>User ID: {{myuser.UID}}</li>
     <li>User Password: {{myuser.password}}</li>
     <li>User Email: {{myuser.email}}</li>
   </ul>
    <a-button type="link" shape="round" style="margin-left:40.5%" @click="showSignUpModal">Change Profile</a-button>
    <a-modal
      title="New User Profile"
      :visible="modalVisible"
      @ok="handleChange"
      @cancel="()=>{ modalVisible = false; myerrs[0]=5;myerrs[1]=5;myerrs[2]=5;}"
    >
      <a-form :form="updateInfo" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="Username">
          <a-input  placeholder = 'New User Name'
            v-decorator="['Username', { rules: [{ required: true, message: 'Please input your username!' },
            {validator: validuser}]}]"
          />
        </a-form-item>
        <a-form-item label="Email">
          <a-input  placeholder = 'New Email'
            v-decorator="['Email', { rules: [{ required: true, message: 'Please input your E-mail!' },{validator: validemail}]}]"
          />
        </a-form-item>
        <a-form-item label="Password">
          <a-input type = "password"  placeholder="New Password"
            v-decorator="['Password', { rules: [{ required: true, message: 'Please input your password!' },{validator: validpassword}] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      myuser: {username: '', password: '', email: '', UID: 740309},
      myerrs: [5, 5, 5], // first item to record err for user, email password
      modalVisible: false,
      updateInfo: this.$form.createForm(this, {name: 'updateInfo'}),
      triggered: false
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      const url = '/user/' + localStorage.getItem('UID')
      this.myuser.UID = localStorage.getItem('UID')
      axios({
        method: 'get',
        url: url
      }).then(res => {
        const index = res.data.indexOf('\n')
        res.data = JSON.parse(res.data.slice(index + 1, -1))
        this.myuser.username = res.data.Username
        this.myuser.password = res.data.Password
        this.myuser.email = res.data.Email
      })
    },
    showSignUpModal () {
      this.modalVisible = true
      this.triggered = true
    },
    handleChange (e) {
      if (this.OKChange()) {
        this.myuser.username = this.updateInfo.getFieldValue('Username')
        this.myuser.password = this.updateInfo.getFieldValue('Password')
        this.myuser.email = this.updateInfo.getFieldValue('Email')
        this.modalVisible = false
      } else {
        e.preventDefault()
      }
    },
    OKChange () {
      let uOK = (this.myerrs[0] === 0)
      let pOK = (this.myerrs[1] === 0)
      let eOK = (this.myerrs[2] === 0)
      if (uOK && pOK && eOK) {
        return true
      } else {
        return false
      }
    },
    validuser (rule, value, callback) {
      if (!value) {
        callback()
        this.myerrs[0] = 1
        return 1
      } else if (value === this.myuser.username) {
        callback('The new username must be different')
        this.myerrs[0] = 2
        return 2
      } else {
        this.myerrs[0] = 0
        return 0
      }
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validpassword (rule, value, callback) {
      if (!value) {
        callback()
        this.myerrs[2] = 1
        return 1
      } else if (value === this.myuser.password) {
        this.myerrs[2] = 2
        return 2
      } else if (value.length < 6) {
        this.myerrs[2] = 3
        return 3
      } else {
        this.myerrs[2] = 0
        return 0
      }
    },
    validemail (rule, value, callback) {
      if (!value) {
        callback()
        this.myerrs[1] = 1
        return 1
      } else if (!this.validEmail(value)) {
        this.myerrs[1] = 2
        return 2
      } else if (value === this.myuser.email) {
        this.myerrs[1] = 3
        return 3
      } else {
        this.myerrs[1] = 0
        return 0
      }
    }
  }
}
</script>

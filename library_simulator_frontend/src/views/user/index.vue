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
     <li>Username: {{myuser.username}}</li>
     <li>UID: {{myuser.UID}}</li>
     <li>Email: {{myuser.email}}</li>
   </ul>
    <a-button type="link" shape="round" style="margin-left:40.5%" @click="showSignUpModal">Change Profile</a-button>
    <a-modal
      title="New User Profile"
      :visible="modalVisible"
      @ok="handleChange"
      @cancel="()=>{ modalVisible = false; myerrs[0]=5;myerrs[1]=5;myerrs[2]=5;}"
    >
      <a-form :form="updateInfo" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="Username" >
          <a-input   placeholder = 'New User Name' initialValue="test"
                     v-decorator="['Username', { initialValue: myuser.username, rules: [{ required: true, message: 'Please input your E-mail!' }]}]"
          />
        </a-form-item>
        <a-form-item label="Email">
          <a-input  placeholder = 'New Email'
            v-decorator="['Email', { initialValue: myuser.email,rules: [{ required: true, message: 'Please input your E-mail!' }]}]"
          />
        </a-form-item>
        <a-form-item label="Password">
          <a-input-password type = 'password' placeholder="New Password"
            v-decorator="['Password', { initialValue: myuser.password,rules: [{ required: true, message: 'Please input your password!' }] }]"
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
      myerrs: [0, 0, 0], // first item to record err for user, email password
      modalVisible: false,
      updateInfo: this.$form.createForm(this, {name: 'updateInfo'})
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
      this.validuser(this.updateInfo.getFieldValue('Username'))
      this.validemail(this.updateInfo.getFieldValue('Email'))
      this.validpassword(this.updateInfo.getFieldValue('Password'))
      let uOK = (this.myerrs[0] === 0)
      let pOK = (this.myerrs[2] === 0)
      let eOK = (this.myerrs[1] === 0)
      // console.log(this.myerrs)
      const username = this.updateInfo.getFieldValue('Username')
      const email = this.updateInfo.getFieldValue('Email')
      const password = this.updateInfo.getFieldValue('Password')
      if (uOK && pOK && eOK) {
        const url = '/user/' + localStorage.getItem('UID')
        axios({
          method: 'patch',
          url: url,
          params: {uuid: localStorage.getItem('UUID'), username: username, email: email, password: password}
        }).then(res => {
          if (res.data === 'Successfully updated user\'s information\n') {
            this.getUserInfo()
            this.$message.success('Profile information changed!')
          } else {
            this.$message.error('Something went wrong :(')
          }
        })
        return true
      } else {
        return false
      }
    },
    validuser (user) {
      if (!user) {
        this.myerrs[0] = 1
      } else {
        this.myerrs[0] = 0
      }
    },
    validEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(email)
    },
    validpassword (pwd) {
      if (!pwd) {
        this.myerrs[2] = 1
      } else if (pwd.length < 6) {
        this.myerrs[2] = 2
      } else {
        this.myerrs[2] = 0
      }
    },
    validemail (email) {
      if (!email) {
        this.myerrs[1] = 1
      } else if (!this.validEmail(email)) {
        this.myerrs[1] = 2
      } else {
        this.myerrs[1] = 0
      }
    }
  }
}
</script>

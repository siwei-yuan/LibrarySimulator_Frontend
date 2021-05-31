<template>
  <div class="app">
    <div style="height: 200px">
    </div>
    <div class="header">
      <h2 style="color:antiquewhite">Welcome To Library Reservation System</h2>
    </div>
    <div class="login-wrapper">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
        <a-form-item label="UID">
          <a-input
            v-decorator="['uid', { rules: [{ required: true, message: 'Please input your username!' }] }]"
          />
        </a-form-item>
        <a-form-item label="Password">
          <a-input
            v-decorator="['password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit" icon="login" shape="round" style="margin-bottom: 8%; box-shadow: 1px 1px 5px 2px #0e132969;">
            LOGIN
          </a-button>
          <a-popover>
            <template slot="content">
              <p>Click sign-up if you have never registered before.</p>
              <p>Otherwise, correct UID and password must be provided to login.</p>
            </template>
            <a-button type="link" icon="question-circle" style="margin-left: 140px; margin-top: 15px; position: absolute" />
          </a-popover>
        </a-form-item>
      </a-form>
      <a-button type="link" shape="round" style="position: absolute; margin-top: -75px; margin-left: 30px" @click="showSignUpModal">
        Sign-up
      </a-button>
      <a-modal
      title="User Sign-up"
      :visible="modalVisible"
      @ok="handleSubmitSignUp"
      @cancel="()=>{modalVisible = false}"
    >
      <a-form :form="signUpForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="UID">
          <a-input
            v-decorator="['UID', { rules: [{ required: true, message: 'Please input your UID!' }] }]"
          />
        </a-form-item>
        <a-form-item label="Username">
          <a-input
            v-decorator="['Username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
          />
        </a-form-item>
        <a-form-item label="Email">
          <a-input
            v-decorator="['Email', { rules: [{ required: true, message: 'Please input your E-mail!' }] }]"
          />
        </a-form-item>
        <a-form-item label="Password">
          <a-input
            v-decorator="['Password', { rules: [{ required: true, message: 'Please input your password!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      modalVisible: false,
      signUpForm: this.$form.createForm(this, { name: 'signup' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          const url = '/login/' + values.uid
          axios({
            method: 'post',
            url: url,
            params: {password: values.password}
          }).then(res => {
            if (res.data !== 'Wrong password, login failed\n') {
              this.$message.success('Login Success! Redirecting...')
              localStorage.setItem('UID', values.uid)
              localStorage.setItem('UUID', res.data)
              this.$router.push({ name: 'studyroom' })
            } else {
              this.$message.error('Wrong Password!')
            }
          })
        }
      })
    },
    showSignUpModal () {
      this.modalVisible = true
    },
    handleSubmitSignUp () {
      this.signUpForm.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of signup form: ', values)
          axios({
            method: 'post',
            url: '/user',
            data: values
          }).then(res => {
            if (res.data === 'User created successfully') {
              this.modalVisible = false
              this.$message.success('Sign-up Success! Please Login to your account.')
            } else {
              this.$message.error('Something went wrong :( Please try again.')
            }
          })
        }
      })
    }
  }
}

</script>

<style scoped>
.login-wrapper {
  text-align: center;
  margin-left: 35%;
  margin-right: 35%;
  background: white;
  border-radius: 30px;
  padding-left: 2%;
  padding-top: 2%;
  box-shadow: 2px 2px 120px 5px #0e132969;
  position: relative;
}

.header {
  text-align: center;
  line-height: 60px;
  height: 120px;
  margin-left: 35%;
  margin-right: 35%;
  margin-bottom: -60px;
  background: rgb(71, 120, 167);
  border-radius: 30px;
}
</style>

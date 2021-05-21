<template>
  <div class="app">
    <div style="height: 200px">
    </div>
    <div class="header">
      <h2 style="color:antiquewhite">Welcome To Library Reservation System</h2>
    </div>
    <div class="login-wrapper">
      <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @submit="handleSubmit">
        <a-form-item label="Username">
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: 'Please input your username!' }] }]"
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
              <p>If first time logging in, you will be auto-registered.</p>
              <p>Otherwise, correct username and password must be provided.</p>
            </template>
            <a-button type="link" icon="question-circle" style="margin-left: 140px; margin-top: 15px; position: absolute" />
          </a-popover>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
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

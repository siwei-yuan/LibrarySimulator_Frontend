<template>
  <div class="app">
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
          <a-button type="primary" html-type="submit" icon="login" style="margin-bottom: 8%">
            LOGIN
          </a-button>
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
  box-shadow: 5px 5px 10px 10px #e6646450;
}

.app {
  background-image: linear-gradient(#e66465, #9198e5);
  padding-top: 200px;
  padding-bottom: 350px;
  width: 100%;
}
</style>

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
      <a-button type="primary" @mouseover = "showp()" @mouseout="clearp()">Hover to View Password</a-button>
      <p id="password"></p>
    </li>
  </ul>
  </div>
</template>

<script>
export default {
  data () {
  },
  methods: {
    showp () { document.getElementById('password').innerHTML = '1919810' },
    clearp () { document.getElementById('password').innerHTML = '' }
  }
}
</script>

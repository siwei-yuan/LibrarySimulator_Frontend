<template>
  <div>
    <a-row v-for="i in 20" :key="i">
      <a-col v-for="j in 24" :key="j" span="1">
        <a-popconfirm
          title="Are you sure to occupy this seat?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleChooseSeat(i,j)"
        >
          <img src="~@/assets/seat-available.png" style="margin: 2px; cursor:pointer">
        </a-popconfirm>
      </a-col>
    </a-row>
  </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
    handleChooseSeat (row, col) {
      console.log(row + ',' + col)
    }
  }
}
</script>

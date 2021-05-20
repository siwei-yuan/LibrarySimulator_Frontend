<template>
  <div>
    <a-skeleton :loading="listLoading" />
    <a-row v-for="i in 20" :key="i">
      <a-col v-for="j in 24" :key="j" span="1">
        <a-popconfirm
          title="Are you sure to occupy this seat?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleChooseSeat(i,j)"
        >
          <img v-if="seatList[(i-1)*24+j-1]['Available']" src="~@/assets/seat-available.png" style="margin: 2px; cursor:pointer">
          <img v-else src="~@/assets/seat-occupied.png" style="margin: 2px; cursor:pointer">
        </a-popconfirm>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      seatList: [],
      listLoading: true
    }
  },
  created () {
    this.getList()
  },
  methods: {
    handleChooseSeat (row, col) {
      console.log(row + ',' + col)
    },
    getList () {
      this.listLoading = true
      this.seatList = []
      axios.get('/seat').then(res => {
        this.seatList = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

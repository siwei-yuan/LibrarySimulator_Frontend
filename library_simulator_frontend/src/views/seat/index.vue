<template>
  <div style="position: relative">
    <a-skeleton :loading="listLoading" />
    <div class="col-identifier">
      <a-row>
        <a-col v-for="j in 24" :key="j" span="1">
          <p style="margin-left:8px">{{j}}</p>
        </a-col>
      </a-row>
    </div>
    <div class="row-identifier">
      <a-row v-for="j in 20" :key="j">
        <a-col style="height: 36px">
          <p>{{j}}</p>
        </a-col>
      </a-row>
    </div>
    <div style="margin-left: 12px">
      <a-row v-for="i in 20" :key="i">
        <a-col v-for="j in 24" :key="j" span="1">
          <a-popconfirm
            title="Are you sure to occupy this seat?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleChooseSeat(i,j)"
          >
            <img v-if="seatStatusList[(i-1)*24+j-1]"
              src="~@/assets/seat-available.png" style="margin: 2px; cursor:pointer">
            <img v-else src="~@/assets/seat-occupied.png" style="margin: 2px; cursor:pointer">
          </a-popconfirm>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      seatList: [],
      listLoading: true,
      seatStatusList: []
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
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Available === 'True' && res.data[i].Is_seat === 'True') {
            this.seatStatusList[i] = true
          } else {
            this.seatStatusList[i] = false
          }
        }
      })
    }
  }
}
</script>

<style>
.col-identifier {
  height: 20px;
  margin-left: 15px;
}

.row-identifier {
  position: absolute;
  width: 20px;
  margin-left: -10px;
  margin-top: 20px;
}
</style>

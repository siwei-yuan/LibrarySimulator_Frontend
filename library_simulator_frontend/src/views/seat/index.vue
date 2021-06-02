<template>
  <a-spin :spinning="listLoading">
    <div style="position: relative">
      <div class="col-identifier">
        <a-row>
          <a-col v-for="j in 24" :key="j" span="1">
            <p style="margin-left:8px">{{j}}</p>
          </a-col>
        </a-row>
      </div>
      <div class="user-guide">
        <img src="~@/assets/seat-available.png" style="margin: 2px">
        : Available
        <img src="~@/assets/seat-occupied.png" style="margin: 2px; margin-left: 25px">
        : Occupied
        <img src="~@/assets/seat-my.png" style="margin: 2px; margin-left: 25px">
        : Your Seat
      </div>
      <div class="row-identifier">
        <a-row v-for="j in 20" :key="j">
          <a-col style="height: 36px">
            <p>{{j}}</p>
          </a-col>
        </a-row>
      </div>
      <div style="margin-left: 12px; position: relative">
        <a-row v-for="i in 20" :key="i">
          <a-col v-for="j in 24" :key="j" span="1">
            <a-popconfirm
              title="Are you sure to occupy this seat?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleChooseSeat(i,j)"
              v-if="seatStatusList[(i-1)*24+j-1] == 'True'"
            >
              <img src="~@/assets/seat-available.png" style="margin: 2px; cursor:pointer">
            </a-popconfirm>
            <img v-else-if="seatStatusList[(i-1)*24+j-1] == 'False'" src="~@/assets/seat-occupied.png" style="margin: 2px">
            <a-popconfirm
              title="Are you sure to leave your seat?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="handleChooseSeat(i,j)"
              v-else-if="seatStatusList[(i-1)*24+j-1] == 'My'"
            >
              <img src="~@/assets/seat-my.png" style="margin: 2px; cursor:pointer">
            </a-popconfirm>
            <img v-else src="~@/assets/empty.png" style="margin: 2px">
          </a-col>
        </a-row>
        <div class="staircase first">
          Staircase
        </div>
        <div class="staircase second">
          Staircase
        </div>
        <div class="rack first">
          Bookrack
        </div>
        <div class="rack second">
          Bookrack
        </div>
        <div class="rack third">
          Bookrack
        </div>
        <div class="rack forth">
          Bookrack
        </div>
        <div class="rack fifth">
          Rack
        </div>
        <div class="rack sixth">
          Rack
        </div>
      </div>
    </div>
  </a-spin>
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
      const id = (row - 1) * 24 + col
      const uid = localStorage.getItem('UID')
      const uuid = localStorage.getItem('UUID')
      const url = '/occupy/' + id
      axios({
        method: 'patch',
        url: url,
        params: {uid: uid, uuid: uuid}
      }).then(res => {
        if (res.data === 'Seat reservation successful\n') {
          this.$message.success('Occupy seat success!')
          this.getList()
        } else if (res.data === 'Successfully left seat\n') {
          this.$message.success('Time to get some rest :)')
          this.getList()
        } else {
          this.$message.error(res.data.slice(0, -1))
          this.getList()
        }
      })
    },
    getList () {
      this.listLoading = true
      this.seatList = []
      axios.get('/seat').then(res => {
        this.seatList = res.data
        this.listLoading = false
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].Available === 'True' && res.data[i].Is_seat === 'True') {
            this.seatStatusList[i] = 'True'
          } else if (res.data[i].Is_seat === 'False') {
            this.seatStatusList[i] = 'Corridor'
          } else if (res.data[i].Available === localStorage.getItem('UID')) {
            this.seatStatusList[i] = 'My'
          } else {
            this.seatStatusList[i] = 'False'
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
  margin-top: 40px;
}

.row-identifier {
  position: absolute;
  width: 20px;
  margin-left: -10px;
  margin-top: 20px;
}

.staircase {
  height: 150px;
  width: 6%;
  background-color:rgb(131, 173, 235);
  line-height: 150px;
  text-align: center;
  border-radius: 15px;
  box-shadow: 2px 2px 20px 5px #2b376b69;
  color: white;
  font-size: larger;
  position: absolute;
}

.staircase.first {
  margin-top: -380px;
  margin-left: 25.5%;
}

.staircase.second {
  margin-top: -380px;
  margin-left: 67.2%;
}

.rack {
  height: 50px;
  width: 14.8%;
  background-color:rgb(231, 129, 129);
  line-height: 50px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 2px 2px 20px 5px #883a3a69;
  color: white;
  font-size: larger;
  position: absolute;
}

.rack.first {
  margin-top: -388px;
  margin-left: 4.2%;
}

.rack.second {
  margin-top: -278px;
  margin-left: 4.2%;
}

.rack.third {
  margin-top: -388px;
  margin-left: 79.3%;
}

.rack.forth {
  margin-top: -278px;
  margin-left: 79.3%;
}

.rack.fifth {
  height: 27.5%;
  width: 3.8%;
  line-height: 200px;
  margin-top: -400px;
  margin-left: 41.1%;
}

.rack.sixth {
  height: 27.5%;
  width: 3.8%;
  line-height: 200px;
  margin-top: -400px;
  margin-left: 53.5%;
}

.user-guide {
  position: absolute;
  margin-top: -70px;
  margin-left: 12px;
}
</style>

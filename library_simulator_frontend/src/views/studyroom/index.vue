<template>
  <div>
    <div style="margin-top: 10px">
      <a-icon type="filter" theme="twoTone" style="display:inline; fontSize:20px; margin-right:5px"/>
      <p style="display:inline; font-size:16px; margin-right: 10px">Filter By Room: </p>
      <a-select mode="tags" style="width: 300px" placeholder="Select Rooms (no filter by default)" @change="handlefilter">
        <a-select-option v-for="name in nameList" :key="name" :value="name">
          {{name}}
        </a-select-option>
      </a-select>
    </div>
    <a-table
      align='center'
      :columns="columns"
      :data-source="roomList"
      row-key="Name"
      :title="()=>{return 'ALL ROOMS\' STATUS'}"
      :loading="listLoading"
    >
      <template v-for="i in tableScopes" :slot="i" slot-scope="record,table">
        <a-popconfirm
          v-if="record"
          title="Are you sure to reserve this study room?"
          ok-text="Yes"
          cancel-text="No"
          :key="i"
          @confirm="makeReservation(record,table.Name,i)"
        >
          <a-button type="primary" size="small">
            Reserve
          </a-button>
        </a-popconfirm>
        <a-tag v-else color="volcano" :key="i">
          <a-icon type="close-circle" />
          FULL
        </a-tag>
      </template>
    </a-table>
    <div class="room-view">
      <a-skeleton :loading="listLoading" />
      <a-row :gutter="16">
        <a-col :span="3" v-for="room in roomList" :key="room.Name">
          <div class="room-box">
            {{room.Name}}
          </div>
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
      tableScopes: ['status0', 'status1', 'status2', 'status3', 'status4', 'status5', 'status6'],
      roomNameFiltered: '',
      listLoading: false,
      roomList: [],
      nameList: [],
      columns: [
        {
          title: 'Room Name',
          dataIndex: 'Name'
        },
        {
          title: '8:00-10:00',
          dataIndex: 'Availability[0]',
          scopedSlots: { customRender: 'status0' }
        },
        {
          title: '10:00-12:00',
          dataIndex: 'Availability[1]',
          scopedSlots: { customRender: 'status1' }
        },
        {
          title: '12:00-14:00',
          dataIndex: 'Availability[2]',
          scopedSlots: { customRender: 'status2' }
        },
        {
          title: '14:00-16:00',
          dataIndex: 'Availability[3]',
          scopedSlots: { customRender: 'status3' }
        },
        {
          title: '16:00-18:00',
          dataIndex: 'Availability[4]',
          scopedSlots: { customRender: 'status4' }
        },
        {
          title: '18:00-20:00',
          dataIndex: 'Availability[5]',
          scopedSlots: { customRender: 'status5' }
        },
        {
          title: '20:00-22:00',
          dataIndex: 'Availability[6]',
          scopedSlots: { customRender: 'status6' }
        }
      ]
    }
  },
  created () {
    this.getList(null)
  },
  methods: {
    handlefilter (value) {
      this.getList(value)
    },
    makeReservation (time, room, i) {
      console.log(time)
      console.log(room)
      console.log(i)
    },
    getList (value) {
      this.roomList = []
      this.listLoading = true
      axios.get('/room').then(res => {
        console.log(res.data)
        if (value === null || value.length === 0) {
          this.roomList = res.data
          for (let k = 0; k < res.data.length; k++) {
            this.nameList[k] = res.data[k].Name
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < value.length; j++) {
              console.log(value[j] + ':' + res.data[i].Name)
              if (value[j] === res.data[i].Name) {
                this.roomList.push(res.data[i])
              }
            }
          }
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
.room-view {
  background: #e9f8ff;
  padding: 10px;
  border-radius: 6px;
  border:1px solid #00a2ff;
}
.room-box {
  font-size: larger;
  font-weight: 600;
  color: white;
  background: #4fcabada;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border-radius: 6px;
}
.room-box.full {
  background: #ff6e6e9f;
}
</style>

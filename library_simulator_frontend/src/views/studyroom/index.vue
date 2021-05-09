<template>
  <div>
    <div style="margin-top: 10px">
      <a-icon type="filter" theme="twoTone" style="display:inline; fontSize:20px; margin-right:5px"/>
      <p style="display:inline; font-size:16px; margin-right: 10px">Filter By Room: </p>
      <a-select mode="tags" style="width: 300px" placeholder="Select Rooms (no filter by default)" @change="handlefilter">
        <a-select-option v-for="room in roomList" :key="room.Name" :value="room.Name">
          {{room.Name}}
        </a-select-option>
      </a-select>
    </div>
    <a-table
      align='center'
      :columns="columns"
      :data-source="roomList"
      row-key="Name"
      :title="()=>{return 'ALL ROOMS\' STATUS'}"
    >
      <template v-for="i in tableScopes" :slot="i" slot-scope="record,table">
        <a-popconfirm
          v-if="record.slice(1) === 'true'"
          title="Are you sure to reserve this study room?"
          ok-text="Yes"
          cancel-text="No"
          :key="i"
          @confirm="makeReservation(record,table.Name)"
        >
          <a-button type="primary">
            Reserve
          </a-button>
        </a-popconfirm>
        <a-tag v-else color="volcano" :key="i">
          FULL
        </a-tag>
      </template>
    </a-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      tableScopes: ['status0', 'status1', 'status2', 'status3', 'status4', 'status5', 'status6'],
      roomNameFiltered: '',
      roomList: [
        {
          'Name': 'Hedrick',
          'ID': 42,
          'Availability': [
            '1false',
            '2false',
            '3false',
            '4true',
            '5alse',
            '6false',
            '7false'
          ]
        },
        {
          'Name': 'Sunset',
          'ID': 43,
          'Availability': [
            '1false',
            '2false',
            '3true',
            '4false',
            '5false',
            '6true',
            '7false'
          ]
        }
      ],
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

  methods: {
    handlefilter (value) {
      console.log(value)
    },
    makeReservation (time, room) {
      console.log(time)
      console.log(room)
    }
  }
}
</script>

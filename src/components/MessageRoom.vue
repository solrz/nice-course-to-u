<template>
  <span class="message-room">
    <el-button icon="el-icon-chat-round" @click="showDrawer" circle/>
    <el-drawer
        :modal="false"
        :visible.sync="isDrawerOpen"
        :with-header="false"
        :show-close="false"
    >
      <el-icon v-show="isLoading" class="el-icon-loading"/>
      <el-table
          :data="messages"
          style="width: 100%"
          empty-text="沒有訊息"
          row-class-name="message-box"
          max-height="850"
      >
        <el-table-column prop="content" label="課程心得聊天室">
          <template slot-scope="scope">
            {{ scope.row.sender }}<br>
                <el-card :body-style="{ padding: '10px' }"
                         style="border-radius: 20px"
                         :type="scope.row.sender === userName ? 'info' : 'success'">{{ scope.row.content }}</el-card>

              <div style="opacity: .5; font-size: 6px">{{ scope.row['時間戳記'] }}</div>

          </template>
        </el-table-column>
      </el-table>
      <!--        <form id="message-box-sender"-->
      <!--            method="post"-->
      <!--            :action="inboxUrl">-->
      <!--            <input type="text" name="entry.426088393">-->
      <!--            <input type="submit" value="送出"/>-->
      <!--        </form>-->
      <div>
        <el-input type="textarea" :autosize="true" v-model="message"/>
        <el-button style="width:100%" @click="sendMessage" round slot="suffix" class="el-icon-s-promotion"/>
      </div>
    </el-drawer>
  </span>
</template>
<script>
let proxy = "https://cors-anywhere.herokuapp.com/"
let sheetId = '1Hc747yTIiMghbF4ZjHYLuQT-98NwKTvsAH6qWFt_Aew'
let sheetTableId = "o63g0x1"
let desturl = proxy +
    "https://spreadsheets.google.com/feeds/list/" + sheetId + "/" + sheetTableId + "/public/values?alt=json"
let inboxUrl = proxy + "http://docs.google.com/forms/d/e/1FAIpQLSf7scJrM7U88pLlKcWHRhCzo1zReKr8TuP0F_hzSv9216RoFw/formResponse"
import axios from 'axios'

export default {
  name: 'message-room',
  data() {
    return {
      isDrawerOpen: false,
      messages: [{'sender': "讀取中", 'content': "修但幾勒.../ 小等一下..."}],
      message: 'das',
      inboxUrl: inboxUrl,
      isLoading: false
    }
  },
  methods: {
    showDrawer() {
      this.isDrawerOpen = true
      this.loadRemote()
    },
    async loadRemote() {
      this.isLoading = true
      let resp = await axios.get(desturl)
          .catch(function (e) {
            this.$notify({
              title: '無法讀取聊天室內容',
              message: e,
              type: 'danger'
            })
          })
      console.log(resp)
      let rawMessage = resp.data.feed.entry
      let messages = []
      for (let rm of rawMessage) {
        let m = {}
        for (let rmkey in rm) {
          if (rmkey.includes('gsx$')) {
            m[rmkey.split('gsx$')[1]] = rm[rmkey]['$t']
          }
          if (rmkey.includes('gsx$')) {
            m[rmkey.split('gsx$')[1]] = rm[rmkey]['$t']
          }
        }
        messages.push(m)
      }
      this.messages = messages.reverse()
      console.log(messages)

      this.isLoading = false
      // function testFunc(event){
      //   // event.preventDefault()
      //   console.log("Test success",event)
      // }
      // var form = document.getElementById("message-box-sender")
      // console.log(form)
      // form.addEventListener('submit', testFunc, true);
    },
    sendMessage() {
      let message = this.message
      this.messages.unshift({'sender': this.userName, 'content': message})
      let d = {'entry.1060195956': this.userName, 'entry.426088393': message}
      console.log(d)
      axios({method: 'get', url: inboxUrl, params: d}
      ).then(() => this.loadRemote())
          .catch((e) => this.$notify({
            title: '無法送出訊息',
            message: e,
            type: 'danger'
          }))
      this.message = ''
    }
  },
  created() {
    // function testFunc(event){
    //   event.preventDefault()
    //   console.log("Test success",event)
    // }
    let _this = this
    _this.loadRemote()
    var form = document.getElementById("message-box-sender")
    console.log(form)
  }
}
</script>
<style>
.message-room {
  padding-top: 20px;
}

.message-box {
  display: flex;
  justify-content: flex-start;
  alignment: right;
}

.sender {
  text-align: right;
}
</style>

<template>
  <el-drawer
      :visible.sync="showLoginDrawer"
      direction="rtl">
    <el-form class="NCTUDDB-login" label-position="right" label-width="40px">
      <h1>登入NCTUDDB</h1>
      <el-form-item label="名字">
        <el-input v-model="account" placeholder="將會是你的顯示名稱"></el-input>
      </el-form-item>
      <el-form-item label="密碼">
        <el-input v-model="password" placeholder="也不限任何字元，但請注意複雜度" show-password></el-input>
      </el-form-item>
      <div>
        或
        <el-link icon="el-icon-bell" round href="">以 NCTUOauth 登入</el-link>
      </div>
      <el-form-item>
        <el-button type="primary" @click="sendLoginInfo">註冊並登入 NCTUDDB</el-button>
        <el-button @click="showLoginDrawer = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<script>
// const NodeRSA = require('node-rsa')
import axios from 'axios'

export default {
  name: 'UserLoginDrawer',
  data() {
    return {
      account: '',
      password: ''
    }
  },
  computed: {
    showLoginDrawer: {
      get() {
        return this.$store.state.user.loginInfo.showLoginDrawer
      },
      set(newValue) {
        this.$store.state.user.loginInfo.showLoginDrawer = newValue
      }
    }
  },
  methods: {
    sendLoginInfo() {
      // let keyRoot = this.account + this.password
      // let key = new NodeRSA(keyRoot)
      let dest = 'https://script.google.com/macros/s/AKfycbw_r_SNU94dLIoN_KUJuPiMm0j2Lh_Zvyd7rJyvTuhjaQSdR8hs/exec?password=asdasd'
      // let form = {
      //   params:
      //       {
      //         'entry.1771157390': this.account,
      //         'entry.846184992': this.password,
      //         'entry.769479012': 'message-key'
      //       }
      // }
      axios.get(dest)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      console.log(this.account, this.password)
      // console.log(key)
    }
  }
}
</script>
<style>
.NCTUDDB-login {
  margin: 20px;
}
</style>

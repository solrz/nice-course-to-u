<template>
  <div class="NCTUDDB-login">
    <el-button icon="el-icon-user" @click="isDrawerShow = true" round>請登入</el-button>
    <el-drawer
        :visible.sync="isDrawerShow"
        direction="rtl">
      <el-card style="border-radius: 30px"><el-icon class="el-icon-user-solid"/>   {{userName}}</el-card>
      <el-button style="width: 100%" >
        <el-link href="https://id.nctu.edu.tw/o/authorize/?client_id=4JrFF39B22st9E8U6ZnFjbUEMDNO1MfnTs005FOH&response_type=code&scope=profile%20name%20status"><h1>以 NCTU OAuth 登入</h1></el-link>
      </el-button>
<!--      <form method="post"-->
<!--            action="https://script.google.com/macros/s/AKfycbw_r_SNU94dLIoN_KUJuPiMm0j2Lh_Zvyd7rJyvTuhjaQSdR8hs/exec">-->
<!--        <input type="text" name="account" value="ciro">-->
<!--        <input type="password" name="password" value="100000000">-->
<!--        <input type="submit" value="CLICK TO CLAIM YOUR PRIZE!!!">-->
<!--      </form>-->
    </el-drawer>
  </div>
</template>
<script>
// const NodeRSA = require('node-rsa')

export default {
  name: 'UserLoginDrawer',
  data() {
    return {
      isDrawerShow: false,
      account: '',
      password: ''
    }
  },
  methods: {
    // sendLoginInfo() {
      // let keyRoot = this.account + this.password
      // let key = new NodeRSA(keyRoot)
      // let dest = 'https://script.google.com/macros/s/AKfycbw_r_SNU94dLIoN_KUJuPiMm0j2Lh_Zvyd7rJyvTuhjaQSdR8hs/exec?password=asdasd'
      // let form = {
      //   params:
      //       {
      //         'entry.1771157390': this.account,
      //         'entry.846184992': this.password,
      //         'entry.769479012': 'message-key'
      //       }
      // }
      //   axios.get(dest)
      //       .then(res => {
      //         console.log(res);
      //       })
      //       .catch(err => {
      //         console.log(err);
      //       });
      //   console.log(this.account, this.password)
      //   // console.log(key)
      // }
    // }
  }
}
</script>
<style>
.NCTUDDB-login {
  padding: 20px;
}
</style>

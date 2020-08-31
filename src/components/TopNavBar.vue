<template>
  <div>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-button icon="el-icon-user-solid" circle> {{this.$store.state.usingCourse}}</el-button>
      <div>
        <el-button icon="el-icon-bell" circle/>
        <el-button icon="el-icon-user-solid" @click="showLogin" circle/>
        請登入
      </div>
    </el-row>
    <el-divider/>
    <UserLoginDrawer/>
  </div>
</template>

<script>
import UserLoginDrawer from "@/components/UserLoginDrawer";

export default {
  name: "TopNavBar",
  components: {UserLoginDrawer},
  data() {
    return {
      showLoginDrawer: false,
    };
  },
  methods: {
    showLogin() {
      this.$store.state.user.loginInfo.showLoginDrawer = true
    }
  }
}
</script>


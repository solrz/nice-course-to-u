<template>
  <div class="nav-bar">
    <el-row type="flex" class="row-bg" justify="space-between">
      <div>
        <course-group-manager></course-group-manager>
      </div>
      <div style="display:flex; justify-content: center;">
        <message-room/>
        <user-login-drawer/>
      </div>
    </el-row>
    <el-divider/>
  </div>
</template>

<script>
import UserLoginDrawer from "@/components/UserLoginDrawer";
import CourseGroupManager from "@/components/CourseGroupManager";
import MessageRoom from "@/components/MessageRoom";

export default {
  name: "TopNavBar",
  components: {MessageRoom, CourseGroupManager, UserLoginDrawer},
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

<style>
.nav-bar{
  spacing-left: 0px;
  padding-right: 0px;
}
</style>

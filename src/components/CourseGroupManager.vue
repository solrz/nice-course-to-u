<template>
  <div class="course-group-manager">
    <span style="display:flex; justify-content: center;">
      <a style="font-size: 30px; font-weight: bolder; padding-right: 20px">NiceCourseTU  </a>
      <el-button icon="el-icon-s-grid" round @click="showCourseGroupManager"> {{
          this.$store.state.usingCourse
        }}
      </el-button>
          <el-button round icon="el-icon-s-promotion" @click="openShareAlert">
          </el-button>
    </span>
    <el-drawer
        :visible.sync="openCourseGroup"
        direction="ltr">
      <el-table
          :highlight-current-row="true"
          :data="presentCourseGroup"
          empty-text="無課程"
          height="600"
          @row-click="clickCourseGroup"
          size="mini">
        <el-table-column
            labe="選擇課程表"
            prop="groupKey">

        </el-table-column>
      </el-table>
      <el-button class="add-course-group-button" type="primary" plain @click="addCourseGroup">
        + 新增課程表
      </el-button>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'course-group-manager',
  methods: {
    showCourseGroupManager() {
      this.openCourseGroup = true
    },
    clickCourseGroup(courseGroup) {
      console.log("Clicked course:", courseGroup)
      this.$store.commit('switchCourseGroup', courseGroup.groupKey)
      this.openCourseGroup = false
    },
    addCourseGroup() {
      this.$prompt('請輸入新的課程表名稱', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '新增',
      }).then(({value}) => {
        this.$message({
          type: 'success',
          message: '已新增課程表: ' + value
        });
        this.$store.commit('switchCourseGroup', value)
        this.openCourseGroup = false
      })
    },
    openShareAlert(){
      var link = this.$store.state.domain
      link += '?importCourseGroupName=' + this.$store.state.usingCourse + '&'
      let courseID = this.$store.state.courseGroups[this.$store.state.usingCourse].list.map((v) => v.id)
      link += '?importCoursesID=' + courseID
      this.$prompt('複製以下連結來分享給朋友吧', '分享課程表', {
        confirmButtonText: '確定',
        inputValue: link
      })
    }
  },
  computed: {
    openCourseGroup: {
      get() {
        return this.$store.state.user.showCoursesGroupManager;
      },
      set(newValue) {
        this.$store.state.user.showCoursesGroupManager = newValue
      }
    },
    presentCourseGroup() {
      let courseGroup = []
      courseGroup = this.$store.state.courseGroupsAvailable.map((v) => ({'groupKey': v}))
      // console.log(courseGroup)
      return courseGroup
    }
  }
}
</script>
<style>
.course-group-manager {
  padding: 20px;
}

.add-course-group-button {
  width: 100%
}
</style>

<template>
  <el-drawer
      class="drawer"
      direction="btt"
      :title="detailedCourse.cname"
      :visible.sync="courseFilterOption.courseDetail.showDetail">
    <el-card>
      <el-tag
          :type="selectTypeKey[detailedCourse.type]"
          size="mini"
          effect="dark"
          disable-transitions
          v-show="detailedCourse.credit === 0">
        {{ detailedCourse.type + " 0學分" }}
      </el-tag>
      <el-tag
          :type="selectTypeKey[detailedCourse.type]"
          size="mini"
          effect="dark"
          disable-transitions
          v-for="v of Array(detailedCourse.credit).keys()"
          :key="v">
        {{ detailedCourse.type }}
      </el-tag>
      <el-tag
          type="info"
          size="large"
          effect="dark"
          disable-transitions
          v-for="v of filterField(detailedCourse)"
          :key="v">
        {{ v }}
      </el-tag>
    </el-card>
  </el-drawer>
</template>
<script>
export default {
  name: 'course-detail-drawer',
  computed: {
    detailedCourse() {
      return this.courseFilterOption.courseDetail.showCourse ?? {}
    },
    selectTypeKey() {
      return {
        '必修': 'warning',
        '選修': '',
        '通識': 'danger',
      }
    }
  },
  methods: {

    filterField(course) {
      let showAttr = {
        'teacher': '教授: ',
        'dep_cname': '系所: ',
        'memo': '',
        'reg_num': '登記人數: ',
        'rawTimeslot': '時段: ',
        'hours': '時數: ',
        'depType': '',
        'id': '永久課號: ',
        'location': '地點: ',
      }
      let displayCourse = []
      for (let attr in showAttr) {
        let value = course[attr]
        if (value) {
          displayCourse.push(`${showAttr[attr]} ${course[attr]}`)
        }
      }
      // console.log(Object.keys(course), Object.values(course));
      return displayCourse
    },
    selectType(tag) {
      return this.selectTypeKey[tag]
    },
  }
}
</script>
<style>
.drawer {
  background-color: rgba(255, 255, 255, 0);
}
</style>

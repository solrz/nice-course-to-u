<template>
  <el-table
      :highlight-current-row="true"
      :data="presentCourses"
      empty-text="無課程"
      height="600"
      style="width: 100%"
      @cell-mouse-enter="hoverOnCourse"
      @mouseleave="leaveCourse"
      size="mini">
    <el-table-column
        prop="cname"
        label="課名"
    >
      <template slot-scope="scope">
        <div>
          {{ scope.row.cname }}
          <el-tag
              :type="selectTypeKey[scope.row.type]"
              size="mini"
              effect="dark"
              disable-transitions
              v-show="scope.row.credit === 0">
            {{ scope.row.type + " 0學分" }}
          </el-tag>
          <el-tag
              :type="selectTypeKey[scope.row.type]"
              size="mini"
              effect="dark"
              disable-transitions
              v-for="v of Array(scope.row.credit).keys()"
              :key="v">
            {{ scope.row.type[0] }}
          </el-tag>
        </div>
        <el-tag
            type="info"
            size="mini"
            effect="dark"
            disable-transitions
            v-for="v of filterField(scope.row)"
            :key="v">
          {{ v }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  name: 'course-table-list-main',
  props: {
    selectTypeKey: {}
  },
  computed:{
    presentCourses() {
      let courses = this.courseFilterOption.showOnlySelected ? this.coursesGroup.list : this.allCoursesList
      let search = this.searchString
      if (search) {
        courses = courses.filter(function (c) {
          c.desc.includes(search)
        })
      }
      return courses
    }
  },
  methods:{
    hoverOnCourse(row){
      this.courseFilterOption.previewCourse = row
    },
    leaveCourse(){
      this.courseFilterOption.previewCourse = null
    },
    filterField(course) {
      let showAttr = {
        'teacher': '教授: ',
        'dep_cname': '系所: ',
        'memo': '',
        'reg_num': '登記人數: ',
        'time': '時段: '
      }
      let displayCourse = []
      for(let attr in showAttr){
        let value = course[attr]
        if (value){
          displayCourse.push(`${showAttr[attr]} ${course[attr]}`)
        }
      }
      // console.log(Object.keys(course), Object.values(course));
      return displayCourse
    }
  }
}
</script>

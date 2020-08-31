<template>
  <div>
    <el-input
        v-model="searchString"
        prefix-icon="el-icon-search"
        placeholder="搜尋課程"
        size="mini"
    />
    <el-radio-group
        size="mini" v-model="courseFilterOption.showOnlySelected">
      <el-radio-button :label="true">已選課程</el-radio-button>
      <el-radio-button :label="false">全部課程</el-radio-button>
    </el-radio-group>
<!--    <el-checkbox-group-->
<!--        size="mini" v-model="checkboxGroup1">-->
<!--      <el-checkbox-button v-for="attr in Object.keys(courseFilterOption.showAttr)" :label="attr" :key="attr">{{attr}}</el-checkbox-button>-->
<!--    </el-checkbox-group>-->
    <el-table
        :highlight-current-row="true"
        :data="presentCourses"
        empty-text="無課程"
        max-height="600"
        style="width: 100%"
        @row-click="selectedRow"
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
  </div>
</template>
<script>
export default {
  name: 'course-table-list',
  data() {
    return {
      searchString: ''
    }
  },
  computed: {
    selectTypeKey() {
      return {
        '必修': 'warning',
        '選修': '',
        '通識': 'danger',
      }
    },
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
  methods: {
    filterGenerator(enums) {
      return enums.map(function (v) {
        return {text: v, value: v}
      })
    },
    selectedRow(row, column, event) {
      console.log(`Selected ${Object.values(row)} ${column} ${event}`)
    },
    selectType(tag) {
      return this.selectTypeKey[tag]
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
      console.log(Object.keys(course), Object.values(course));
      return displayCourse
    }
  }
}
</script>

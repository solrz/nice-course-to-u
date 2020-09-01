<template>
  <el-card class="course-grid" :body-style="{ padding: '5px' }" style="min-height: 50px">
    <el-tag
        class="course-tag"
        v-for="course in coursesInGrid"
        closable
        effect="dark"
        :style="{opacity: course.isPreview ? 0.4: 1.0}"
        :type="selectTypeKey(course)"
        :size="courseSize"
        :key="course.desc + d + course.isPreview"
        :disable-transitions="true"
        @close="updateCourse(course)">
      <el-icon class="el-icon-info" @click.native="clickCourse(course)"/>{{ course.cname }}

    </el-tag>
    <el-autocomplete
        class="input-new-tag"
        v-if="showCourseInput"
        v-show="courseFilterOption.allowCrash || coursesInGrid.length === 0"
        ref="saveTagInput"
        v-model="inputValue"
        value-key="cname"
        size="mini"
        :fetch-suggestions="queryCourses"
        @select="onCourseSelected">
      <template
          class="popover-course" slot-scope="{ item }">
        <el-popover
            placement="left-start"
            trigger="hover"
            @mouseover.native="$store.state.timetableOptions.previewCourse = item"
        >
          <el-tag
              effect="dark"
              :type="selectTypeKey(item)"
              :size="courseSize"
              :disable-transitions="true"
              slot="reference">{{ item.cname }}{{item.rawTimeslot}}
          </el-tag>
          <div class="addr">{{ item.dep_cname }}</div>
          <div class="addr">{{ item.teacher }}</div>
          <div class="addr">{{ item.type }}</div>
          <div class="addr">{{ item.credit }} 學分</div>
          <div class="addr">{{ item.rawTimeslot }}</div>
          <div class="addr">{{ item.reg_num }} /{{ item.num_limit }}</div>
        </el-popover>
      </template>
    </el-autocomplete>
    <el-button
        v-else
        v-show="courseFilterOption.allowCrash || coursesInGrid.length === 0"
        class="button-new-tag"
        size="mini"
        :body-style="{ padding: '5px' }"
        @click="showInput">+
    </el-button>

  </el-card>
</template>
<script>

export default {
  name: 'course-grid',
  props: {
    d: {},
    scope: {}
  },
  data() {
    return {
      showCourseInput: false,
      inputValue: ''
    }
  },
  computed: {
    coursesInGrid() {
      return this.scope.row[this.d].filter((e) => (e !== null))
    },
    courseSize() {
      return this.courseFilterOption.allowCrash ? "mini" : "large"
    },
  },
  methods: {
    updateCourse(course) {
      console.log("add course:",course)
      this.$store.commit('updateCourse', course)
    },
    showInput() {
      this.showCourseInput = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    onCourseSelected(course) {
      this.updateCourse(course);
      this.$store.state.timetableOptions.previewCourse = null
      this.$nextTick(() => {
        this.showCourseInput = false;
        this.inputValue = '';
      });
    },
    onBlur() {
      this.$nextTick(() => {
        this.showCourseInput = false;
        this.inputValue = '';
      });
    },
    queryCourses(input, handler) {
      let options = this.$store.state.timetableOptions
      let pos = this.d + options.timeslot[this.scope.$index]
      let courses = this.allCourses
      let slotsFilled = this.coursesGroup.slotsFilled
      var results = Object.values(courses)
      results = results.filter(c => c !== undefined);
      results = results.filter(c => c.timeSchedules);
      results = results.filter(c => c.timeSchedules.includes(pos));
      results = results.filter(c => c.cname.includes(input));
      results = results.filter(c => !this.coursesGroup.list.includes(c))
      if (!options.allowCrash) {
        results = results.filter(function (c) {
          let slots = c.timeSchedules
          for (let s of slots) {
            if (slotsFilled[s]) {
              return false
            }
          }
          return true
        });
      }
      handler(results)
    },
    selectTypeKey(course) {
      if(!course) return '';
      return {
        '必修': 'warning',
        '選修': '',
        '通識': 'danger',
      }[course.type]
    },
    clickCourse(course){
      console.log("Clicked course:", course.cname)
      this.courseFilterOption.courseDetail.showDetail = true
      this.courseFilterOption.courseDetail.showCourse = course
    }
  }
}
</script>
<style>
.course-grid{
  height: 80px;
}
.popover-course{
  width: 300px
}

.course-tag {
  margin-left: 0px;
  margin-right: 0px;
}

.button-new-tag{
  margin-left: 10px;
  margin-right: 10px;
  padding-left: 10px;
  padding-right: 10px;
  height: 24px;
  vertical-align: bottom;
}

.input-new-tag{
  font-size: 8px;
  margin-left: 10px;
  margin-right: 10px;
  vertical-align: bottom;
  width: 100%;
}
</style>

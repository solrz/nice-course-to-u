<template>
  <el-card>
    <el-tag
        v-for="course in coursesInGrid"
        closable
        effect="dark"
        :style="{opacity: course.isPreview ? 0.4: 1.0}"
        :type="selectTypeKey(course)"
        :size="courseSize"
        :key="course.desc + d"
        :disable-transitions="true"
        @close="deleteCourse(course)">{{ course.cname }}
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
        @select="onCourseSelected"
        @blur="inputVisible=false;inputValue=''">
      <i
          class="el-icon-edit el-input__icon"
          slot="suffix">
      </i>
      <template
          class="popover-course" slot-scope="{ item }">
        <el-popover
            placement="left-start"
            trigger="hover"
            @mouseover.native="courseFilterOption.previewCourse = item">
          <el-tag
              effect="dark"
              :type="selectTypeKey(item)"
              :size="courseSize"
              :disable-transitions="true"
              slot="reference"
              @click.native="clickCourse(item)">{{ item.cname }}
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
      inputVisible: false,
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
    addCourse(course) {
      this.$store.commit('addCourses', course)
    },
    deleteCourse(course) {
      this.$store.commit('addCourses', course)
    },
    showInput() {
      this.showCourseInput = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    onCourseSelected(course) {
      this.$store.getters.courseGroup.addCourse(course)
      this.showCourseInput = false;
      this.inputValue = '';
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
.popover-course{
  width: 300px
}

.el-tag + .el-tag {
  margin-left: 0px;
}

.button-new-tag{
  margin-left: 10px;
  height: 20px;
  line-height: 0px;
}

.input-new-tag{
  font-size: 8px;
  margin-left: 10px;
  vertical-align: bottom;
  width: 100%;
}
</style>

<template>
  <el-card>
    <el-tag
        :key="course.id + d"
        v-for="course in coursesInGrid"
        closable
        :disable-transitions="false"
        @close="deleteCourse(course)">{{ course.cname }}</el-tag>
    <el-autocomplete
        class="input-new-tag"
        size="small"
        v-if="showCourseInput"
        ref="saveTagInput"
        v-model="inputValue"
        value-key="cname"
        :fetch-suggestions="queryCourses"
        @select="onCourseSelected"
        @blur="inputVisible=false;inputValue=''"></el-autocomplete>
    <el-button
        v-else
        class="button-new-tag"
        size="small"
        @click="showInput">+ New Tag</el-button>

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
      return this.scope.row[this.d]
    }
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
  }
}
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>

<template>
  <el-table
      :data="coursesForTable"
      style="width: 100%">
    <el-table-column
        type="index"
        :index="(index) => courseFilterOption.timeslot[index]">
    </el-table-column>
    <el-table-column
        v-for="d of courseFilterOption.weekday"
        :key="d"
        :label="d"
        :prop="d">
      <template slot-scope="scope">
        <course-grid :d="d" :scope="scope"/>
      </template>

    </el-table-column>
  </el-table>
</template>
<script>

import CourseGrid from "@/components/CourseGrid";

export default {
  name: 'course-timetable',
  components: {CourseGrid},
  computed: {
    coursesForTable() {
      let coursesSlot = this.$store.getters.courseGroup.scheduleSlots
      let days = this.courseFilterOption.weekday
      let slots = this.courseFilterOption.timeslot
      let convertedCourses = []
      for (let s of slots) {
        let slotCourses = {}
        for (let d of days) {
          // console.log(d+s)
          slotCourses[d] = coursesSlot[d + s].slice()
        }
        convertedCourses.push(slotCourses)
      }

      let preview = this.courseFilterOption.previewCourse
      if(preview){
        if(!this.coursesGroup.list.includes(preview)){
          preview = Object.assign({}, preview)
          preview.isPreview = true
          for(let s of preview.timeSchedules){
            let d = s[0]
            let slot = this.courseFilterOption.timeslot.indexOf(s[1])
            let row = convertedCourses[slot]
            if(row){
              row[d].push(preview)
            }
          }
        }
      }
      return convertedCourses
    }
  },
  methods:{
  }
}
</script>

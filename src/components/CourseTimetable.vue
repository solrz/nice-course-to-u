<template>
  <el-table
      :data="coursesForTable"
      style="width: 100%">
    <el-table-column
        type="index"
        :index="(index) => $store.state.timetableOptions.timeslot[index]">
    </el-table-column>
    <el-table-column
        v-for="d of $store.state.timetableOptions.weekday"
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
  props: ['courses'],
  computed: {
    coursesForTable() {
      let coursesSlot = this.$store.getters.courseGroup.scheduleSlots
      let days = '12345'.split('')
      let slots = 'ABCDEFGHIJK'.split('')
      let convertedCourses = []
      for (let s of slots) {
        let slotCourses = {}
        for (let d of days) {
          slotCourses[d] = coursesSlot[d + s]
        }
        convertedCourses.push(slotCourses)
      }
      return convertedCourses
    }
  },
  methods:{
  }
}
</script>

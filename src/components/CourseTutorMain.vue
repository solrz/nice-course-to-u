<template>
  <el-container>
    <el-header>
      <top-nav-bar/>
    </el-header>
    <el-container>
      <el-aside width="30%">
        <el-container>
          <el-main>
            <course-table-list/>
          </el-main>
          <el-footer>
            <dashboard/>
          </el-footer>
        </el-container>
      </el-aside>
      <el-container>
        <course-timetable/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import CourseTimetable from "@/components/CourseTimetable";
import CourseTableList from "@/components/CourseTableList";
import Dashboard from "@/components/Dashboard";
import TopNavBar from "@/components/TopNavBar";

export default {
  name: "CourseTutorMain",
  components: {TopNavBar, Dashboard, CourseTableList, CourseTimetable}
}
</script>

<style scoped>

</style>

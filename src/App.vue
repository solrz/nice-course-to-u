<template>
  <course-tutor-main/>
</template>

<script>
import CourseTutorMain from "@/components/CourseTutorMain";
import {getUrlVars} from "@/ezRouter";

export default {
  name: 'App',
  components: {
    CourseTutorMain
  },
  created() {
    this.$store.commit('loadCourses')
    let params = getUrlVars()
    console.log(params)
    if(params['importedCoursesID']){
      this.$store.commit('loadSharedCourses', params['importedCoursesID'])
    }
    this.$notify({
      title: '成功',
      message: JSON.stringify(params),
      type: 'success'
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

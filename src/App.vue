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
    // if(Object.keys(params).length !==0){
    //   this.$notify({
    //     title: '成功',
    //     message: JSON.stringify(params),
    //     type: 'success'
    //   });
    // }
    console.log("Read params:", params)
    if(params['importCoursesID']){
      this.$notify({
        title: '正在載入某人的課程',
        message: '小等一下...',
        type: 'info'
      });
      this.$store.commit('loadSharedCourses', params)
    }
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
  margin-top: 10px;
  height: 100%
}
</style>

<template>
    <el-row type="flex" justify="space-between">
      <el-col class="progress-container">
        <el-progress class="progress" type="dashboard" :color="progressColor" :percentage="credits / 40 * 100"
                     :show-text="false"></el-progress>
        <h2 class="progress"><h1>{{ credits }}</h1>{{ smaller(credits, 30) ? "學分" : "學分費" }}</h2>
      </el-col>
      <el-col class="progress-container">
        <el-progress class="progress" type="dashboard" :color="progressColor"
                     :percentage="coursesCount / 15 * 100" :show-text="false"></el-progress>
        <h2 class="progress"><h1>{{ coursesCount }}</h1>{{ smaller(coursesCount, 14) ? "門" : "畢業門" }}</h2>
      </el-col>
      <el-col class="progress-container">
        <el-progress class="progress" type="dashboard" :color="progressColor" :percentage="hours / 50 * 100"
                     :show-text="false"></el-progress>
        <h2 class="progress"><h1>{{ hours }}</h1>{{ smaller(hours, 40) ? "時數" : "肝指數" }}</h2>
      </el-col>
    </el-row>
</template>
<script>
export default {
  name: 'dashboard',
  data: function () {
    return {
      progressColor: [
        {color: '#1989fa', percentage: 30},
        {color: '#5cb87a', percentage: 50},
        {color: '#e6a23c', percentage: 70},
        {color: '#f56c6c', percentage: 90},
        {color: '#333333', percentage: 110}
      ]
    }
  },
  methods: {
    smaller(l, r) {
      return l < r
    }
  },
  computed: {
    credits() {
      return this.coursesGroup.list.reduce((ori, next) => ori += parseInt(next.credit), 0)
    },
    coursesCount() {
      return this.coursesGroup.list.length
    },
    hours() {
      return this.coursesGroup.list.reduce((ori, next) => ori += parseInt(next.hours), 0)
    },
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

course-timetable {
  width: 67%;
}

.progress-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress {
  position: absolute;
  top: 0;
  text-align-all: center;
}
</style>

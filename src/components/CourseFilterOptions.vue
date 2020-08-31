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
    <el-radio-group
        size="mini" v-model="courseFilterOption.allowCrash">
      <el-radio-button :label="true">我就衝堂</el-radio-button>
      <el-radio-button :label="false">不要衝堂</el-radio-button>
    </el-radio-group>

  </div>
</template>
<script>
export default {
  name: 'course-filter-options',
  props: {
    searchString: {}
  }
}
</script>

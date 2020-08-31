<template>
  <div>
    <course-filter-options :search-string="searchString"/>
    <course-table-list-main :select-type-key="selectTypeKey"/>
  </div>
</template>
<script>
import CourseFilterOptions from "@/components/CourseFilterOptions";
import CourseTableListMain from "@/components/CourseTableListMain";

export default {
  name: 'course-table-list',
  components: {CourseTableListMain, CourseFilterOptions},
  data() {
    return {
      searchString: ''
    }
  },
  computed: {
    selectTypeKey() {
      return {
        '必修': 'warning',
        '選修': '',
        '通識': 'danger',
      }
    }
  },
  methods: {
    filterGenerator(enums) {
      return enums.map(function (v) {
        return {text: v, value: v}
      })
    },
    selectedRow(row, column, event) {
      console.log(`Selected ${Object.values(row)} ${column} ${event}`)
    },
    selectType(tag) {
      return this.selectTypeKey[tag]
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  }
}
</script>

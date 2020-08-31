import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueLocalStorage from 'vue-localstorage'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import {remoteGetCourses, defaultCourses} from "@/courseProcessor";

Vue.prototype.$bus = new Vue();

Vue.use(VueLocalStorage)
Vue.use(ElementUI);
Vue.use(Vuex)
const course = new Vuex.Store({
    state: {
        allCourses: null,
        courseGroups: {'default': defaultCourses()},
        usingCourse: "default",
        timetableOptions: {
            weekday: '12345'.split(''),
            timeslot: 'ABCDEFGHIJK'.split(''),
            allowCrash: true,
            showOnlySelected: true,
            showAttr: {"teacher": false,},
            previewCourse: null,
            courseDetail: {
                showDetail: false,
                showCourse: null
            }
        },
        user: {
            loginInfo: {showLoginDrawer: false}
        }
    },
    getters: {
        courseGroup(state) {
            let group = state.courseGroups[state.usingCourse]
            return group
        }
    },
    mutations: {
        async loadCourses(state) {
            let forceReload = false
            try {
                var allCourses =
                    JSON.parse(localStorage.getItem('allCourses'))
            } catch (e) {
                console.log(e)
                // return
            }
            if (forceReload || !allCourses) {
                this._vm.$notify({
                    title: '從遠端載入所有課程',
                    message: '這可能需要10秒',
                    type: 'info'
                });
                allCourses = await remoteGetCourses()
                console.log(allCourses)
                localStorage.setItem('allCourses', JSON.stringify(allCourses))
                this._vm.$notify({
                    title: '成功載入遠端課程',
                    message: '下次可以直接使用了',
                    type: 'success'
                });
            } else {
                console.log(allCourses)
                console.log("Loaded courses from local")
            }
            state.allCourses = allCourses
            console.log(Object.keys(state.allCourses))
        },
        addCourses(state, course) {
            let group = state.courseGroups[state.usingCourse]
            group.addCourse(course)
            state.courseGroups[state.usingCourse] = group
            console.log(group)
        },
        async loadSharedCourses(state, rawCoursesID){
            let forceReload = false
            let coursesID = rawCoursesID.replace(' ','').split(',')
            try {
                var allCourses =
                    JSON.parse(localStorage.getItem('allCourses'))
            } catch (e) {
                console.log(e)
                // return
            }
            if (forceReload || !allCourses) {
                allCourses = await remoteGetCourses()
            }
            let importCourseGroup = 'imported'
            state.allCourses = allCourses
            state.usingCourse = importCourseGroup
            if(!state.courseGroups[importCourseGroup]){
                state.courseGroups[importCourseGroup] = defaultCourses()
            }
            for(let id of coursesID){
                state.courseGroups[importCourseGroup].addCourse(allCourses[id])
            }
        }
    }
})
Vue.config.productionTip = false
Vue.mixin({
    computed: {
        coursesGroup() {
            return this.$store.getters.courseGroup
        },
        allCourses() {
            return this.$store.state.allCourses
        },
        allCoursesList() {
            return Object.values(this.$store.state.allCourses)
        },
        courseFilterOption() {
            return this.$store.state.timetableOptions
        }
    },
})
new Vue({
    render: h => h(App),
    store: course
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import VueLocalStorage from 'vue-localstorage'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import {remoteGetCourses, defaultCourses, addCourse} from "@/courseProcessor";
import {saveSession, ezLoad} from "@/sessionSave";

Vue.prototype.$bus = new Vue();

Vue.use(VueLocalStorage)
Vue.use(ElementUI);
Vue.use(Vuex)
const course = new Vuex.Store({
    state: {
        allCourses: null,
        courseGroups: ezLoad('courseGroups') ?? {'default': defaultCourses()},
        courseGroupsAvailable: ezLoad('courseGroupsAvailable') ?? ['default'],
        usingCourse: ezLoad('usingCourse') ?? 'default',
        timetableOptions: ezLoad('timetableOptions') ?? {
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
        user: ezLoad('user') ?? {
            loginInfo: {showLoginDrawer: false, name: 'anonymous', login: false},
            showCoursesGroupManager: false,
        },
        domain: "https://localhost:8080/"
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
                // console.log(allCourses)
                console.log("Loaded courses from local")
            }
            state.allCourses = allCourses
            // console.log(Object.keys(state.allCourses))
        },
        updateCourse(state, course) {
            console.log("Adding course")
            state.timetableOptions.previewCourse = null
            let group = Object.assign({}, state.courseGroups[state.usingCourse])
            group = addCourse(group, course)
            state.courseGroups[state.usingCourse] = group
            saveSession(state)
            console.log(group)
        },
        async loadSharedCourses(state, params) {
            let rawCoursesID = params.importCoursesID ?? ""
            let coursesID = rawCoursesID.replace(' ', '').split(',')
            try {
                var allCourses =
                    JSON.parse(localStorage.getItem('allCourses'))
            } catch (e) {
                console.log(e)
                // return
            }
            if (!allCourses) {
                allCourses = await remoteGetCourses()
            }
            let importCourseGroup = params.importCourseGroupName ?? "imported"
            state.allCourses = allCourses
            state.usingCourse = importCourseGroup
            if (!state.courseGroups[importCourseGroup]) {
                state.courseGroupsAvailable.push(importCourseGroup)
                state.courseGroups[importCourseGroup] = defaultCourses()
            }
            for (let id of coursesID) {
                if(id){
                    if(id.length !== 0){
                        let courses = state.courseGroups[importCourseGroup].list
                        if(!Object.values(courses).map((v)=>v.id).includes(id)) {
                            state.courseGroups[importCourseGroup] = addCourse(state.courseGroups[importCourseGroup], allCourses[id])
                        }
                    }
                }
            }
            saveSession(state)

        },
        switchCourseGroup(state, groupName) {
            state.usingCourse = groupName
            if (!state.courseGroupsAvailable.includes(groupName)) {
                state.courseGroupsAvailable.push(groupName)
            }
            if (!state.courseGroups[groupName]) {
                state.courseGroups[groupName] = defaultCourses()
            }
            console.log("New Course Group Generated:", groupName)
            saveSession(state)
        },
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
        },
        userName() {
            return this.$store.state.user.loginInfo.name
        }

    },
})
new Vue({
    render: h => h(App),
    store: course
}).$mount('#app')

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
    state:{
        allCourses: {},
        courseGroups: {'default':defaultCourses()},
        usingCourse: "default",
        timetableOptions : {
            weekday: '12345'.split(''),
            timeslot: 'ABCDEFGHIJK'.split(''),
            allowCrash: true,
            showOnlySelected: true,
            showAttr: {"teacher":false,}
        }
    },
    getters:{
        courseGroup(state){
            let group = state.courseGroups[state.usingCourse]
            return group
        }
    },
    mutations:{
        loadCourses(state){
            var allCourses = JSON.parse(localStorage.allCourses)
            if(!allCourses){
                allCourses = remoteGetCourses()
                localStorage.allCourses = allCourses
            }
            state.allCourses = allCourses
        },
        addCourses(state, course){
            let group = state.courseGroups[state.usingCourse]
            group.addCourse(course)
            state.courseGroups[state.usingCourse] = group
            console.log(group)
        }
    }
})
Vue.config.productionTip = false
Vue.mixin({
    computed:{
        coursesGroup(){
            return this.$store.getters.courseGroup
        },
        allCourses(){
            return this.$store.state.allCourses
        },
        allCoursesList(){
            return Object.values(this.$store.state.allCourses)
        },
        courseFilterOption(){
            return this.$store.state.timetableOptions
        }
    },
})
new Vue({
    render: h => h(App),
    store:course
}).$mount('#app')

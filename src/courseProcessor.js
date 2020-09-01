const axios = require('axios').default;

export function defaultCourses() {
    return {
        list: [],
        scheduleSlots: newCourseSlots(() => []),
        slotsFilled: newCourseSlots(() => false),
        listID : []
    }
}

export function courseAttrMapping(cf) {
    var cs = []
    for (const vo of cf) {
        var v = Object.assign(vo, {})
        let key = Object.keys(v)
        let shortenedKey = key.filter((k) => k.includes("cos_"))
        shortenedKey.forEach(function (k) {
            v[k.replace("cos_", "")] = v[k]
            delete v[k]
        })
        if (v.time) {
            let splitInfo = v.time.split('-')
            v.rawTimeslot = splitInfo[0]
            if(splitInfo.length > 1){
                v.location = splitInfo[1]
            }
            let ts = splitInfo[0]
            for (const num of "0123456789") {
                ts = ts.replace(num, '*' + num)
            }
            let splitTimeslot = ts.split('*')
            v.timeSchedules = []
            for (const ts of splitTimeslot) {
                let weekday = ts[0]
                for (const schedule of ts.substring(1)) {
                    let t = weekday + schedule
                    v.timeSchedules.push(t)
                }
            }
        } else {
            v.rawTimeslot = ''
            v.timeSchedules = []
        }
        v.depType = {U:'大學部課程', D:'研究所課程'}[v.depType]
        v.credit = parseInt(v.credit) ? parseInt(v.credit) : 0
        v.desc = `[${v.type}]${v.cname} - ${v.teacher}:${v.dep_cname}`
        cs.push(v)
    }

    return cs
}

export function newEmptyCourse() {
    return {
        "TURL": "",
        "URL": null,
        "acy": "",
        "brief": "",
        "cos_cname": "",
        "cos_code": "",
        "cos_credit": "",
        "cos_ename": "",
        "cos_hours": "",
        "cos_id": "",
        "cos_time": "",
        "cos_type": "",
        "cos_type_e": "",
        "crsoutline_type": "",
        "degree": "",
        "depType": "",
        "dep_cname": "",
        "dep_ename": "",
        "dep_id": "",
        "dep_limit": "",
        "dep_primary": "",
        "memo": "",
        "num_limit": "",
        "reg_num": "",
        "sem": "",
        "teacher": ""
    }
}

export function newCourseSlots(generator) {
    const weekdays = '1234567'.split('')
    const time = 'MNABCDEXEFGHYIJKL'.split('')
    var courseSlots = {}
    for (const d of weekdays) {
        for (const t of time) {
            courseSlots[d + t] = generator()
        }
    }
    return courseSlots
}


//usage: getAllCourse.call(this);

export async function getAllCourse(me) {
    let _this = me


    if (_this.$localStorage.get('allCourses') && 0 !== 0) {
        let newAllCourses =
            _this.$localStorage.get('allCourses', {})
        console.log("Loaded courses", Object.keys(newAllCourses).length)
        console.log(newAllCourses)
        console.log("From local database")
        return newAllCourses
    } else {
        return await remoteGetCourses();
    }
}

export async function remoteGetCourses() {
    console.log("Fetch online timetable...")
    let timetableAPIURL = 'https://script.google.com/macros/s/AKfycbycThyD0_VpEpHACky9MCppOVIP33Pn1rV5NuFbqPZJRckmw0IG/exec'
    const resp = await axios.get(timetableAPIURL)
    var newAllCourses = {};
    var fetchList = []
    let json = resp.data
    for (var key of Object.keys(json)) {
        let departureDetail = json[key]
        for (var fetch of [1, 2]) {
            if (departureDetail[fetch]) {
                fetchList = Object.values(departureDetail[fetch])
                let courses = courseAttrMapping(fetchList)
                for (let c of courses) {
                    newAllCourses[c.id] = c
                }
            }
        }
        // console.log(newAllCourses)
        // console.log(Object.values(newAllCourses).length)
    }
    console.log("Loaded courses", Object.keys(newAllCourses).length, newAllCourses)
    return newAllCourses
}

export function addCourse(courseGroup, course) {
    if (!course) return courseGroup;
    let courseAddedBefore = courseGroup.listID.includes(course.id)
    if (!courseAddedBefore) {
        courseGroup.list.push(course)
        courseGroup.listID.push(course.id)
        course.timeSchedules.forEach((t) => courseGroup.scheduleSlots[t].push(course))
        course.timeSchedules.forEach((t) => courseGroup.slotsFilled[t] = true)
    } else {
        console.log(courseGroup, course)
        let courseIndex = courseGroup.list.indexOf(course)
        courseGroup.list.splice(courseIndex, 1)
        let courseIDIndex = courseGroup.listID.indexOf(course.id)
        courseGroup.listID.splice(courseIDIndex, 1)
        for(let slot of course.timeSchedules){
            courseGroup.scheduleSlots[slot].splice(course)
            if(courseGroup.scheduleSlots[slot].length === 0){
                courseGroup.slotsFilled[slot] = false
            }
        }
    }
    return courseGroup
}

function isPrereqInPlan(prereq, courses) {
    var inPlan = false

    for (prereq of prereq.values) {
        for (course of courses) {
            if (course.classId == prereq.classId) {
                inPlan = true
            }
        }
    }

    return inPlan
}

function isPrereqFulfilled(plan, prereqs) {
    if (prereqs.type == "and") {
        for (prereq of prereqs.values) {
            if (typeof prereq.type != "undefined") {
                var isNestedPrereqTaken = isPrereqFulfilled(plan, prereq)
                if (!isNestedPrereqTaken) {
                    return false
                }
            }
            else {
                var prereqTaken = false
                for (course of plan) {
                    if (course.classId == prereq.classId) {
                        prereqTaken = true
                    }
                }
                if (prereqTaken == false) {
                    return false
                }
            }
        }
        return true;
    }

    else if (prereqs.type == "or") {
        for (prereq of prereqs.values) {
            if (typeof prereq.type != "undefined") {
                var isNestedPrereqTaken = isPrereqFulfilled(plan, prereq)
                if (isNestedPrereqTaken) {
                    return true
                }
            }
            else {
                for (course of plan) {
                    if (course.classId == prereq.classId) {
                        return true
                    }
                }
            }
        }
        return false;
    }
}

function planCourses(courses) {
    var orderedPlan = []

    if (courses.length == 0) {
        return "no solution"
    }

    while (courses.length != 0) {
        // access first element in queue
        var course = courses.shift()

        // check to see if course can be added
        if (course.prereqs.values.length == 0) {
            orderedPlan.push(course)
        }

        else {
            if (isPrereqFulfilled(orderedPlan, course.prereqs)) {
                orderedPlan.push(course)
            }
            else {
                if (isPrereqInPlan(course.prereqs, courses)) {
                    courses.push(course)
                }
                else {
                    return "no solution"
                }
            }
        }
    }
    return orderedPlan;
}

module.exports = { planCourses, isPrereqInPlan, isPrereqFulfilled }
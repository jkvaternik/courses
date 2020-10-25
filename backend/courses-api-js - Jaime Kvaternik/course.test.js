const course = require('./course')

var prereq = {
    type: "and",
    values: [{ classId: 1800, subject: "CS" }]
}
var badPrereq = {
    type: "and",
    values: [{ classId: 1200, subject: "CS" }]
}
var nestedPrereq = {
    type: "or",
    values: [{
        type: "and",
        values: [{ classId: 1800, subject: "CS" }, { classId: 2500, subject: "CS" }]
    },
    {
        classId: 4300,
        subject: "MATH"
    }]
}
var badNestedPrereq = {
    type: "or",
    values: [{
        type: "and",
        values: [{ classId: 1800, subject: "CS" }, { classId: 2510, subject: "CS" }]
    },
    {
        classId: 4300,
        subject: "MATH"
    }]
}

var emptyCourses = []
var courses = [
    {
        subject: "CS",
        classId: 2500,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 1800,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 3500,
        prereqs: {
            type: "or",
            values: [
                {
                    subject: "CS",
                    classId: 2510
                },
                {
                    subject: "CS",
                    classId: 2560
                }
            ]
        }
    },
    {
        subject: "CS",
        classId: 2510,
        prereqs: {
            type: "and",
            values: [
                {
                    subject: "CS",
                    classId: 2500
                }
            ]
        }
    },
]
var badCourses = [
    {
        subject: "CS",
        classId: 2500,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 1800,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 3500,
        prereqs: {
            type: "or",
            values: [
                {
                    subject: "CS",
                    classId: 2510
                },
                {
                    subject: "CS",
                    classId: 2560
                }
            ]
        }
    },
    {
        subject: "EECE",
        classId: 2160,
        prereqs: {
            type: "and",
            values: [
                {
                    subject: "MATH",
                    classId: 1341
                }
            ]
        }
    },
]

var emptyPlan = []
var plan = [
    {
        subject: "CS",
        classId: 1800,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 2500,
        prereqs: {
            type: "and",
            values: []
        }
    }
]
var orderedPlan = [
    {
        subject: "CS",
        classId: 2500,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 1800,
        prereqs: {
            type: "and",
            values: []
        }
    },
    {
        subject: "CS",
        classId: 2510,
        prereqs: {
            type: "and",
            values: [
                {
                    subject: "CS",
                    classId: 2500
                }
            ]
        }
    },
    {
        subject: "CS",
        classId: 3500,
        prereqs: {
            type: "or",
            values: [
                {
                    subject: "CS",
                    classId: 2510
                },
                {
                    subject: "CS",
                    classId: 2560
                }
            ]
        }
    }
]

describe('isPrereqInPlan tests', function () {
    test("Returns true if prereq is in list of courses", () => {
        expect(course.isPrereqInPlan(prereq, courses)).toBe(true)
    })

    test("Returns false if prereq is not in list of courses", () => {
        expect(course.isPrereqInPlan(badPrereq, courses)).toBe(false)
    })

    test("Returns false if prereq is in empty list of courses", () => {
        expect(course.isPrereqInPlan(prereq, emptyCourses)).toBe(false)
    })

});

describe('isPrereqFulfilled tests', function () {
    test("Returns true if prereq is fulfilled from plan", () => {
        expect(course.isPrereqFulfilled(plan, prereq)).toBe(true)
    })

    test("Returns true if nested prereq is fulfilled from plan", () => {
        expect(course.isPrereqFulfilled(plan, nestedPrereq)).toBe(true)
    })

    test("Returns false if prereq is not fulfilled from plan", () => {
        expect(course.isPrereqFulfilled(plan, badPrereq)).toBe(false)
    })

    test("Returns false if nested prereq is not fulfilled from plan", () => {
        expect(course.isPrereqFulfilled(plan, badNestedPrereq)).toBe(false)
    })

    test("Returns false if plan is empty", () => {
        expect(course.isPrereqFulfilled(emptyPlan, prereq)).toBe(false)
    })
});

describe('planCourses tests', function () {
    test("Returns \"no solution\" if course list is empty", () => {
        expect(course.planCourses(emptyCourses)).toBe("no solution")
    })

    test("Returns \"no solution\" if course list has course that can't be taken", () => {
        expect(course.planCourses(badCourses)).toBe("no solution")
    })
    
    test("Returns ordered plan of course list", () => {
        expect(course.planCourses(courses)).toMatchObject(orderedPlan)
    })
});

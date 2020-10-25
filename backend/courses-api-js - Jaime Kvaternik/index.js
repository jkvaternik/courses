const course = require('./course')
const request = require('request');

var courses = [];
var postData = '';

let url = "https://challenge.sandboxneu.com/s/PMRGIYLUMERDU6ZCMVWWC2LMEI5CE23WMF2GK4TONFVS42SANB2XG23ZFZXGK5JOMVSHKIRMEJSHKZJCHIYTKOJVGEZTCMJZHEWCE43UMFTWKIR2EJJDCRLBON4SE7JMEJUGC43IEI5CE6KGNMXUUODCF4YVG5TCOR3SWSLUG5KT2IT5"

request.get(url, { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }

  courses = body.courses;
  postData = course.planCourses(courses)

  request.post(url, {
    json: {
      plan: postData
    }
  }, (error, res, body) => {
    if (error) {
      console.error(error)
      return
    }
    console.log(`statusCode: ${res.statusCode}`)
    console.log(body)
  })
});
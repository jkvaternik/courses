import { Component, OnInit } from '@angular/core';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses()
  }

  /**
   * Get list of courses through CourseService.
   */
  getCourses(): void {
    this.courseService.getCourses()
      .subscribe(courses => this.courses = courses);
  }

  /**
   * Add/Sort course to list of courses.
   * @param subject - subject of course from textfield
   * @param classId - classId of course from textfield
   * @param prereqs - a string representing the prereqs of a course from textfield
   */
  addCourse(subject: string, classId: number, prereqs: string): void {
    subject = subject.trim();
    classId = Number(classId);
    prereqs = prereqs.trim();

    // error alert if empty
    if (!subject || !classId) { 
      alert("Subject and Class ID fields.")
      return ; 
    }

    // error alert if prereq textfield includes a nested prereq
    if (prereqs.includes('(') || prereqs.includes(')')) {
      alert("Nested prereqs are not supported.")
      return ;
    }

    // delegate to CourseService
    this.courseService.addCourse({ subject, classId, prereqs } as Course )
      .subscribe(course => this.courses = course)
  }
}

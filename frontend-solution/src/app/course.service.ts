import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from './course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private getURL = "http://localhost:3000/course"

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error.status); // log to console instead

      if (error.status == 400) {
        alert("Error: Course already exists in list.");
        return ;
      }

      else {
        // Let the app keep running by returning an empty result.
        document.getElementsByTagName("ul")[0].innerHTML = "Error retrieving results.";
        return ;
      }
    };
  }

  /**
   * Get list of courses through HttpClient.
   */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("http://localhost:3000/course")
  }

  /**
   * Add and sort list through HttpClient POST method.
   * @param course - course to be added
   */
  addCourse(course: Course): Observable<Course[]> {
    return this.http.post("http://localhost:3000/course", course, this.httpOptions)
      .pipe(
        catchError(this.handleError<any>('addCourse')),
      );

  }
}

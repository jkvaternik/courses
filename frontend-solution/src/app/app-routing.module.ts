import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';


const routes: Routes = [
  { path: 'home', component: LandingComponent},
  { path: 'courses', component: CoursesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

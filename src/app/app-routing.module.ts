import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { SubjectComponent } from './components/subject/subject.component';
import { ScoreComponent } from './components/score/score.component';

const routes: Routes = [
  { path: '', redirectTo: 'score', pathMatch: 'full' },
  { path: 'student', component: StudentComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'score', component: ScoreComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

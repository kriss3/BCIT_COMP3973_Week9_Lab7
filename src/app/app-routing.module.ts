import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BogusComponent } from './bogus/bogus.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: 'bogus', component: BogusComponent},
  {path: 'student', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

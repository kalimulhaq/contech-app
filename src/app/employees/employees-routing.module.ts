import { ViewEmployeeComponent } from './view/view-employee.component';
import { AddEmployeeComponent } from './add/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeesComponent
      },
      {
        path: 'create',
        component: AddEmployeeComponent
      },
      {
        path: ':id/edit',
        component: AddEmployeeComponent
      },
      {
        path: ':id',
        component: ViewEmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

import { SharedModule } from './../shared/shared.module';
import { PipesModule } from './../pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees/employees.component';
import { AddEmployeeComponent } from './add/add-employee.component';
import { ViewEmployeeComponent } from './view/view-employee.component';
import { NzPageHeaderModule, NzFormModule, NzSpinModule, NzInputModule, NzSelectModule, NzRadioModule, NzButtonModule, NzTableModule, NzPaginationModule, NzAlertModule, NzEmptyModule, NzAvatarModule, NzSwitchModule, NzIconModule, NzPopconfirmModule, NzDatePickerModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [EmployeesComponent, AddEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    NzPageHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzRadioModule,
    NzButtonModule,
    NzSpinModule,
    NzTableModule,
    NzPaginationModule,
    NzAlertModule,
    NzEmptyModule,
    NzAvatarModule,
    NzSwitchModule,
    PipesModule,
    SharedModule,
    NzIconModule,
    NzPopconfirmModule,
    NzDatePickerModule
  ]
})
export class EmployeesModule { }

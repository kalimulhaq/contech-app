import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackRouteComponent } from './components/back-route/back-route.component';
import { NzButtonModule, NzIconModule, NzSpinModule, NzGridModule, NzFormModule, NzInputModule, NzUploadModule, NzPageHeaderModule, NzListModule, NzMessageModule, NzAlertModule, NzTableModule, NzEmptyModule, NzPopconfirmModule, NzModalModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NzUploadModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzSpinModule,
    NzMessageModule,
    NzAlertModule,
    NzTableModule,
    NzEmptyModule,
    NzPopconfirmModule,
    NzModalModule
  ],
  declarations: [BackRouteComponent],
  exports: [BackRouteComponent]
})
export class SharedModule { }

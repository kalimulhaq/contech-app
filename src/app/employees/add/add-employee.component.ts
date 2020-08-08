import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { EmployeesService } from '../employees.service';
import { Helpers } from 'src/app/helpers/helpers';
import * as moment from 'moment';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.less']
})
export class AddEmployeeComponent implements OnInit {

  employeeId: any;
  employee: any;
  pageHeader = 'Add Employee';
  ref: string = null;
  backUrl: string = null;
  pageLoader = false;
  formSpinner = false;
  error: string = null;
  formError: any = null;
  employeeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private Message: NzMessageService,
    private Employees: EmployeesService,
  ) {
    this.title.setTitle(this.pageHeader);
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      last_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      dob: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      salary: new FormControl('', [Validators.required, Validators.min(100)]),
    });

    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.pageHeader = 'Update Employee';
      this.title.setTitle(this.pageHeader);
      this.getData();
    }
  }

  private getData() {
    this.pageLoader = true;
    this.Employees.get(this.employeeId).subscribe((resp: any) => {
      this.employee = resp.record;
      this.pageLoader = false;
      this.employeeForm.get('first_name').setValue(this.employee.first_name);
      this.employeeForm.get('last_name').setValue(this.employee.last_name);
      this.employeeForm.get('dob').setValue(this.employee.dob);
      this.employeeForm.get('email').setValue(this.employee.email);
      this.employeeForm.get('mobile').setValue(this.employee.mobile);
      this.employeeForm.get('salary').setValue(this.employee.salary);
    }, (error: any) => {
      this.error = error.message;
      this.pageLoader = false;
    });
  }

  public formSubmit() {
    this.formError = null;
    Helpers.displayFormErrors(this.employeeForm, true);
    if (this.employeeForm.invalid) {
      return false;
    }
    // tslint:disable-next-line:prefer-const
    let formdata = this.employeeForm.value;
    formdata.dob = moment(formdata.dob).format('YYYY-MM-DD');

    if (this.employeeId) {
      this.update(formdata);
    } else {
      this.create(formdata);
    }
  }
  private create(formdata: any) {
    this.formSpinner = true;
    this.Employees.create(formdata).subscribe((resp: any) => {
      this.Message.success('Employee has been added successfully');
      this.router.navigate(['employees']);
      this.formSpinner = false;
    }, (error: any) => {
      this.formError = Helpers.getResponseError(error);
      this.formSpinner = false;
    });
  }

  private update(formdata: any) {
    this.formSpinner = true;
    this.Employees.update(this.employeeId, formdata).subscribe((resp: any) => {
      this.Message.success('Employee has been updated successfully');
      this.router.navigate(['employees']);
      this.formSpinner = false;
    }, (error: any) => {
      this.formError = Helpers.getResponseError(error);
      this.formSpinner = false;
    });
  }

}

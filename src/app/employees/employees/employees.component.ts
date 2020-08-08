import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CrudFilter } from 'src/app/crud.service';
import { Paginator } from 'src/app/helpers/paginator';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd';
import { CleanFilter, Helpers } from 'src/app/helpers/helpers';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.less']
})
export class EmployeesComponent implements OnInit {

  pageHeader = 'Employees';
  ref: string = null;
  backUrl: string = null;
  pageLoader = false;
  error: string = null;
  dataList: any = [];
  SearchForm: FormGroup;
  filter: CrudFilter;
  paginator: Paginator = {
    page: 1,
    last_page: 1,
    from: 0,
    to: 0,
    limit: 20,
    total: 0,
    has_more_pages: false,
    is_first_page: true
  };

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private Message: NzMessageService,
    private Employees: EmployeesService,
  ) {
    this.ref = this.route.snapshot.queryParamMap.get('ref');
    this.backUrl = this.ref || '';
    this.title.setTitle(this.pageHeader);
  }

  async ngOnInit() {
    this.initSearchForm();
    this.search();
  }

  public initSearchForm() {
    this.SearchForm = new FormGroup({
      where: new FormGroup({
        and: new FormArray([]),
        wildcard: new FormGroup({
          fields: new FormControl(['first_name', 'last_name', 'dob', 'age', 'mobile', 'email', 'salary']),
          value: new FormControl(''),
        })
      }),
      order: new FormArray([
        new FormGroup({
          field: new FormControl('first_name'),
          order: new FormControl('asc'),
        })
      ])
    });
  }

  public clearSearch() {
    this.initSearchForm();
    this.search();
  }

  public search(resetPage: boolean = false) {
    this.filter = new CleanFilter(this.SearchForm).getFilter();
    if (resetPage) {
      this.paginator.page = 1;
    }
    this.getData();
  }

  public sort() {
    this.search();
  }

  public changePage(page: number) {
    this.paginator.page = page;
    this.search();
  }

  private getData() {
    this.error = null;
    this.pageLoader = true;
    this.Employees.list(this.filter, this.paginator.limit, this.paginator.page).subscribe((resp: any) => {
      this.dataList = resp.record;
      this.paginator = resp.meta;
      this.pageLoader = false;
    }, (error: any) => {
      this.dataList = [];
      this.error = error.message;
      this.pageLoader = false;
    });
  }

  public delete(id: any) {
    this.pageLoader = true;
    this.Employees.delete(id).subscribe((resp: any) => {
      this.dataList = Helpers.removeFromArray(id, this.dataList, 'id');
      this.Message.success('Employee has been deleted successfully');
      this.pageLoader = false;
    }, (error: any) => {
      this.Message.error(error.message);
      // this.error = error.message;
      this.pageLoader = false;
    });
  }

}

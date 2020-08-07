import { CrudService } from './../crud.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends CrudService {

  protected path = 'employees';

}

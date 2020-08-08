import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../statistics.service';
import { GoogleChartInterface } from 'ng2-google-charts';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  topEmployeesChartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    options: {
      width: '100%',
      height: 500,
      legend: { position: 'none', alignment: 'center', maxLines: 3 },
      chartArea: { left: 80, right: 5, top: 50, bottom: 80, width: '100%', height: '100%' },
      hAxis: { viewWindowMode: 'maximized', title: 'Employees' },
      vAxis: { baseline: 0, minValue: 1, title: 'Salary' },
      animation: { duration: 500, easing: 'out', startup: true },
      fontSize: 12
    },
    dataTable: []
  };

  averageSalaryChartData: GoogleChartInterface = {
    chartType: 'ColumnChart',
    options: {
      width: '100%',
      height: 500,
      legend: { position: 'none', alignment: 'center', maxLines: 3 },
      chartArea: { left: 80, right: 5, top: 50, bottom: 80, width: '100%', height: '100%' },
      hAxis: { viewWindowMode: 'maximized', title: 'Age' },
      vAxis: { baseline: 0, minValue: 1, title: 'Average Salary' },
      animation: { duration: 500, easing: 'out', startup: true },
      fontSize: 12
    },
    dataTable: []
  };

  constructor(private Statistics: StatisticsService, private titleService: Title) {
    this.titleService.setTitle('Dashboard');
  }

  ngOnInit(): void {
    this.topPaidEmployees();
    this.averageSalaryByAge();
  }

  public topPaidEmployees() {
    this.Statistics.topPaidEmployees(10).subscribe((resp: any) => {
      let chartData = [['Employee', 'Salary']];
      resp.record.forEach((emp: any) => {
        chartData.push([emp.full_name, emp.salary]);
      });
      this.topEmployeesChartData.dataTable = chartData;
      this.topEmployeesChartData = Object.create(this.topEmployeesChartData);
    }, (error: any) => {

    });
  }

  public averageSalaryByAge() {
    this.Statistics.averageSalaryByAge().subscribe((resp: any) => {
      let chartData = [['Age', 'Average Salary']];
      resp.record.forEach((emp: any) => {
        chartData.push([emp.age + '', emp.avg_salary]);
      });
      this.averageSalaryChartData.dataTable = chartData;
      this.averageSalaryChartData = Object.create(this.averageSalaryChartData);
    }, (error: any) => {

    });
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule, NzMessageModule, NzAutocompleteModule, NzSelectModule, NzFormModule, NzLayoutModule, NzMenuModule, NzGridModule } from 'ng-zorro-antd';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { HTTPInterceptor } from './helpers/http-interceptor';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DashboardComponent } from './dashboard/dashboard.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzMenuModule,
    NzGridModule,
    NzFormModule,
    NzSpinModule,
    NzButtonModule,
    NzMessageModule,
    NzAutocompleteModule,
    NzSelectModule,
    NzSpaceModule,
    Ng2GoogleChartsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HTTPInterceptor, multi: true }, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { SharedModule } from './shared/shared.module'
import { AppRoutingModule, COMPONENTS } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorInterceptor } from './interceptor/http-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModule } from './bootstrap/bootstrap.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HomeModule } from './layout/home/home.module'
import { MaterialModule } from './material/material.module';




@NgModule({
  declarations: [
    ...COMPONENTS,
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    BootstrapModule,
    NgxDropzoneModule,
    MaterialModule,
    HomeModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgxDropzoneModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

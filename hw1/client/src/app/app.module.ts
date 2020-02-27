import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetricsComponent } from './metrics/metrics.component';
import { ConvertorComponent } from './convertor/convertor.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { sanitizeHtmlPipe } from './sanitize-html.pipe'

@NgModule({
  declarations: [
    AppComponent,
    MetricsComponent,
    ConvertorComponent,
    sanitizeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

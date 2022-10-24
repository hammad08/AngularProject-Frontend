import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { AddressComponent } from './address/address.component';
import { PhoneComponent } from './phone/phone.component';
import { HttpClientModule } from '@angular/common/http';
import { AppServiceService } from './app-service.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AddressComponent,
    PhoneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AppServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { FoodModule } from './food/food.module';

import { DutiesModule } from './duties/duties.module'

import { BillsModule } from './bills/bills.module'

import { HomeComponent } from './home/home.component';

import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeGuestComponent } from './home-guest/home-guest.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeGuestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FoodModule,
    DutiesModule,
    BillsModule,
    UserModule,
    
  ],
  providers: [

  ],
  bootstrap: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AppModule { }

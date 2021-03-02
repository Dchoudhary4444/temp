import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TopnavComponent } from './topnav/topnav.component';
import { StandaloneComponent } from './standalone/standalone.component';
import { StarComponent } from './star/star.component';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataDictionaryModule } from './data-dictionary/data-dictionary.module';
import { DdServicesService } from './data-dictionary/services/dd-services.service';
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    TopnavComponent,
    StandaloneComponent,
    StarComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DataDictionaryModule,
    ReactiveFormsModule
  ],
  providers: [DdServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

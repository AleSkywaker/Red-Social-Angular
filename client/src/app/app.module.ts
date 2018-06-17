import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing, appRoutingProviders } from "./app.routing";
import { FormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { LoginComponent } from "../app/components/login/login.component";
import { RegisterComponent } from "../app/components/register/register.component";
import { HomeComponent } from "../app/components/home/home.component";
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UserComponent,
    SidebarComponent,
    TimelineComponent
  ],
  imports: [BrowserModule, FormsModule, routing, HttpClientModule, MomentModule],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

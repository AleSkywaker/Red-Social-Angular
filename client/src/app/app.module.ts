import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { routing, appRoutingProviders } from "./app.routing";

import { AppComponent } from "./app.component";
import { LoginComponent } from "../app/components/login/login.component";
import { RegisterComponent } from "../app/components/register/register.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, routing],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}

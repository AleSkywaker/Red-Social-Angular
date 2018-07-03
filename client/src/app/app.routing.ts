import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Compnentes
import { LoginComponent } from "../app/components/login/login.component";
import { RegisterComponent } from "../app/components/register/register.component";
import { HomeComponent } from "../app/components/home/home.component";
import { UserEditComponent } from "../app/components/user-edit/user-edit.component";
import { UserComponent } from './components/users/users.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FollowingComponent } from './components/following/following.component';
import { FollowedComponent } from './components/followed/followed.component';


const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "inicio", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "registro", component: RegisterComponent },
  { path: "mis-datos", component: UserEditComponent },
  { path: "usuarios", component: UserComponent },
  { path: "usuarios/:page", component: UserComponent },
  { path: "timeline", component: TimelineComponent },
  { path: "perfil/:id", component: ProfileComponent },
  { path: "siguiendo/:id/:page", component: FollowingComponent },
  { path: "seguidores/:id/:page", component: FollowedComponent },
  { path: "**", component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

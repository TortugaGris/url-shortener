import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ClickComponent } from './views/click/click.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: ':linkId', component: ClickComponent},
];

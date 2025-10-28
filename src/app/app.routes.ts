import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SavedCitiesComponent } from './saved-cities';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'saved-cities', component: SavedCitiesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

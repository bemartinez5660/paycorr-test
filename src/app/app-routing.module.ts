import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './features/home/components/home-page/home-page.component';
import {AboutPageComponent} from './features/home/components/about-page/about-page.component';

const routes: Routes = [
  {path: "", component: HomePageComponent},
  {path: "about", component: AboutPageComponent},

  {
    path: 'not-found',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

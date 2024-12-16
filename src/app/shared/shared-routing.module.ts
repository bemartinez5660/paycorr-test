import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: "", component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {
}

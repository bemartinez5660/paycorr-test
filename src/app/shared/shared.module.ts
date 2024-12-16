import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {SharedRoutingModule} from './shared-routing.module';
import { NotificationModalComponent } from './components/notification-modal/notification-modal.component';
import {MatIcon} from '@angular/material/icon';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    NotificationModalComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIcon,
  ],
  exports: [
    NotFoundPageComponent,
  ]
})
export class SharedModule { }

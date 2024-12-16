import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomePageComponent} from './features/home/components/home-page/home-page.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MaterialModule} from './core/modules/material.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {KeyInterceptor} from './core/interceptors/key-interceptor.interceptor';
import {SharedModule} from './shared/shared.module';
import { NavigationBarComponent } from './core/components/navigation-bar/navigation-bar.component';
import { AboutPageComponent } from './features/home/components/about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavigationBarComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [
    MaterialModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeyInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

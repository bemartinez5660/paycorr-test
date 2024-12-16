import {Component} from '@angular/core';
import {NytimesapiService} from '../../../features/home/services/nytimesapi.service';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,

  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  constructor(
    private _nytimesapiService: NytimesapiService
  ) {
  }

  onButtonClick() {
    this._nytimesapiService.triggerRefresh();
  }
}

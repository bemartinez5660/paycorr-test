import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {NytimesapiService} from '../../services/nytimesapi.service';
import {Article} from '../../models/article';
import {environment} from '../../../../../environment/environment';
import {NotificationService} from '../../../../shared/services/notifications.service';
import {Subscription} from 'rxjs';
import {StorageService} from '../../../../shared/services/storage.service';
import {ArticleListEnum} from '../../../../shared/enums/article-list.enum';

@Component({
  selector: 'app-home-page',
  standalone: false,

  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, AfterViewInit {
  protected readonly environment = environment;
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<Article>();
  isLoaded: boolean = false;
  page: number = 0;
  pageSize: number = 10;
  previousPageIndex: number | undefined = 0;
  total: number = 0;
  @ViewChild('paginator') paginator!: MatPaginator;
  private refreshSub!: Subscription;

  constructor(
    private _nytimesapiService: NytimesapiService,
    private _notificationService: NotificationService,
    private _storageService: StorageService,
  ) {
    this.displayedColumns = ['image', 'title', 'word_count'];
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe((resp) => {
      this.loadArticles(this.paginator.pageIndex, this.paginator.pageSize);
    });
    this.refreshSub = this._nytimesapiService.refreshTable$.subscribe((val) => {
      this.loadArticles(this.page, this.pageSize);
    });
  }

  ngOnInit() {
    window.scroll({top: 0});
  }

  private loadArticles(page: number, pageSize: number) {

    this.isLoaded = false;

    this._nytimesapiService.fetchArticles(page, pageSize)
      .subscribe((resp: any) => {
        if (resp?.error) {
          const localStorageData = this._storageService.get(ArticleListEnum.ARTICLE_LIST, true);
          if (localStorageData) {
            let startIndex = 0;
            let endIndex = 10;
            const localStorageData = this._storageService.get(ArticleListEnum.ARTICLE_LIST, true);

            if (this.page * this.pageSize >= localStorageData.length) {
              this.page--;
            }
            startIndex = this.page !== 0 ? this.page * this.pageSize : 0;
            endIndex = startIndex + this.pageSize;
            this.dataSource.data = localStorageData.slice(startIndex, endIndex);
            this.total = localStorageData.length;
            this.isLoaded = true;
          } else if (resp?.statusText === 'Unknown Error') {
            this._notificationService.showAndSubscribe('No internet connection', 'OK');
          } else {
            this.dataSource.data = [];
            this._notificationService.showAndSubscribe(resp?.statusText, 'OK');
            this.isLoaded = true;
          }
        } else {
          this._notificationService.success('Successfully loaded articles');
          this.total = resp?.response?.meta?.hits || 0;
          this.dataSource.data = resp?.response?.docs || [];

          this.setStorage(resp?.response?.docs);
          this.isLoaded = true;
        }
      });
  }

  handlePageEvent(e: PageEvent) {
    this.total = e.length;
    this.pageSize = e.pageSize;
    this.page = e.pageIndex;
    this.previousPageIndex = e.previousPageIndex;
  }


  async setStorage(data: any) {
    const localStorageData = this._storageService.get(ArticleListEnum.ARTICLE_LIST, true);
     const dataToSave = localStorageData ? this.avoidDuplicates(Object.values(localStorageData), data) : data;
    this._storageService.set(ArticleListEnum.ARTICLE_LIST, dataToSave, true);
  }

  avoidDuplicates(localStorageData: Array<Article>, newData: Array<Article>) {
    let result = new Array<Article>();
    result = result.concat(localStorageData);
    newData.forEach((item) => {
      if (!localStorageData.filter(it => item?._id == it?._id)[0]) {
        result.push(item);
      }
    })
    return result;
  }

  onImgErrorSmall(event: any) {
    event.target.src = '/2innovateit_logo.jpeg';
  }


}

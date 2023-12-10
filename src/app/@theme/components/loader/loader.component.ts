import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './loader.service';

@Component({
  selector: 'ngx-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  loading = false;
  private subscription: Subscription;

  constructor(loaderService: LoaderService) {
    this.subscription = loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.loading = state.show;
      });
  }

  ngOnInit(): void {
  }

}

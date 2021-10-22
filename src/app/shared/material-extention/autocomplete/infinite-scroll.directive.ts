import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export interface IAutoCompleteScrollEvent {
  matAutocomplete: MatAutocomplete;
  scrollEvent: Event;
}

/** Adds infinite scroll functionality to MatAutocomplete*/
@Directive({
  selector: 'mat-autocomplete[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnDestroy {
  @Input() threshold = 0.85;
  @Input() isScrollEnd = false;
  @Output('infiniteScroll') scroll =
    new EventEmitter<IAutoCompleteScrollEvent>();
  private _onDestroy = new Subject<void>();
  lastScroll = 0;

  constructor(public matAutocomplete: MatAutocomplete) {}
  ngAfterViewInit() {
    this.matAutocomplete.opened
      .pipe(debounceTime(10), takeUntil(this._onDestroy))
      .subscribe(() => {
        const { nativeElement } = this.matAutocomplete?.panel || {};
        if (nativeElement) {
          // Note: remove listner just for safety, in case the close event is skipped.
          this.removeScrollEventListener();
          fromEvent(nativeElement, 'scroll')
            .pipe(takeUntil(this._onDestroy), debounceTime(100))
            .subscribe(this.onScroll.bind(this));
        }
      });

    this.matAutocomplete.closed
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.removeScrollEventListener();
      });
  }

  private removeScrollEventListener() {
    // const { nativeElement } = this.matAutocomplete.panel;
    // nativeElement?.removeEventListener("scroll", this.onScroll);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.removeScrollEventListener();
  }

  onScroll(event: Event | any) {
    const { clientHeight, scrollHeight, scrollTop } = event.target;
    const threshold = (this.threshold * 100 * scrollHeight) / 100;
    const current = scrollTop + clientHeight;
    // console.log(`scroll ${current}, threshold: ${threshold}`);

    const scrollUp = current < this.lastScroll;
    if (current > threshold && !this.isScrollEnd && !scrollUp) {
      console.log('load next..');
      this.scroll.next({
        matAutocomplete: this.matAutocomplete,
        scrollEvent: event
      });
    }
    this.lastScroll = current;
  }
}

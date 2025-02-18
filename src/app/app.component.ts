import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, {initialValue: 0});
  //interval = signal(0);
  //doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);

  constructor() {
    /*
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times.`);
    });
    */
  }

  ngOnInit() {
    /*
    const interval_id = setInterval(() => {
      this.interval.update(n => n + 1);
      console.log(this.doubleInterval())
    }, 1000)

    this.destroyRef.onDestroy(() => clearInterval(interval_id))
    */

    const subscription = interval(1000)
    .pipe(map((val) => val * 2))
    .subscribe((val) => {
      console.log(val);
    });

    const clickSubscription = this.clickCount$.subscribe((val) => {
      console.log(`Clicked button ${val} times.`)
    });

    this.destroyRef.onDestroy(() => { 
      subscription.unsubscribe(); 
      clickSubscription.unsubscribe();
    })
  }

  onClick() {
    this.clickCount.update(c => c + 1);
  }
}

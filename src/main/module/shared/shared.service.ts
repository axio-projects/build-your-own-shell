import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService implements OnDestroy {
    // TODO(treyvon): it should not be necessary to maintain a global state since consumers will most likely maintain
    // a state of there own through the observable
    currentColorScheme: 'LIGHT' | 'DARK' = 'LIGHT';
    readonly $colorScheme = new BehaviorSubject<'LIGHT' | 'DARK'>('LIGHT');

    constructor(
        public zone: NgZone,
        public matcher: MediaMatcher
    ) {
        const mql = this.matcher.matchMedia('(prefers-color-scheme: dark)');
        if (mql.matches) {
            this.$colorScheme.next('DARK');
        }

        mql.addEventListener('change', (e: MediaQueryListEvent): void => this.zone.run(() => {
            if (e.matches) {
                this.$colorScheme.next('DARK');
            } else {
                this.$colorScheme.next('LIGHT');
            }
        }));

        this.$colorScheme.subscribe(next => {
            console.log(next);
            this.currentColorScheme = next;
        });
    }

    ngOnDestroy(): void {
        this.$colorScheme.complete();
    }
}

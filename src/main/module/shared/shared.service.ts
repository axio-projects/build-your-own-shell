import { MediaMatcher } from '@angular/cdk/layout';
import { DOCUMENT, inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedService implements OnDestroy {
    // TODO: create an enum to encapsulate these constants
    currentColorScheme: 'light-mode' | 'dark-mode' = 'light-mode';
    readonly $colorScheme = new BehaviorSubject<'light-mode' | 'dark-mode'>('light-mode');

    private document = inject(DOCUMENT);

    constructor(
        public zone: NgZone,
        public matcher: MediaMatcher
    ) {
        const mql = this.matcher.matchMedia('(prefers-color-scheme: dark)');
        if (mql.matches) {
            this.$colorScheme.next('dark-mode');
        }

        mql.addEventListener('change', (e: MediaQueryListEvent): void => this.zone.run(() => {
            if (e.matches) {
                this.$colorScheme.next('dark-mode');
            } else {
                this.$colorScheme.next('dark-mode');
            }
        }));

        this.$colorScheme.subscribe(next => {
            console.log(next);
            if (this.currentColorScheme !== next) {
                this.document.documentElement.classList.remove(this.currentColorScheme);
                this.currentColorScheme = next;
                this.document.documentElement.classList.add(this.currentColorScheme);
            }
        });
    }

    ngOnDestroy(): void {
        this.$colorScheme.complete();
    }
}

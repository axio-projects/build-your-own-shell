import { DOCUMENT, inject, Injectable, NgZone } from '@angular/core';
import { ColorSchemes } from './model/color-schemes';
import { BehaviorSubject } from 'rxjs';
import { MediaMatcher } from '@angular/cdk/layout';
import { ColorSchemeInterface } from './color-scheme.interface';

const PREFERS_COLOR_SCHEME_DARK = '(prefers-color-scheme: dark)';

@Injectable()
export class ColorSchemeService implements ColorSchemeInterface {
    currentColorScheme: ColorSchemes = ColorSchemes.AUTO;
    readonly $colorScheme = new BehaviorSubject<ColorSchemes>(ColorSchemes.AUTO);

    private document = inject(DOCUMENT);

    constructor(
        public zone: NgZone,
        public matcher: MediaMatcher
    ) {
        const mql = this.matcher.matchMedia(PREFERS_COLOR_SCHEME_DARK);
        if (mql.matches) {
            this.$colorScheme.next(ColorSchemes.DARK);
        }

        mql.addEventListener('change', (e: MediaQueryListEvent): void => this.zone.run(() => {
            if (e.matches) {
                this.$colorScheme.next(ColorSchemes.DARK);
            } else {
                this.$colorScheme.next(ColorSchemes.LIGHT);
            }
        }));

        this.$colorScheme.subscribe(next => {
            if (this.currentColorScheme !== next) {
                this.document.documentElement.classList.remove(this.currentColorScheme);
                this.currentColorScheme = next;
                this.document.documentElement.classList.add(this.currentColorScheme);
            }
        });
    }

    current(): ColorSchemes {
        return this.currentColorScheme;
    }

    observable(): BehaviorSubject<ColorSchemes> {
        return this.$colorScheme;
    }

    ngOnDestroy(): void {
        this.$colorScheme.complete();
    }
}

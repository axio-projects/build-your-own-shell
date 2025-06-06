import { Inject, inject, Injectable, Optional } from '@angular/core';
import { MAT_ICON, MatIconInterface } from './service/mat-icon/mat-icon.interface';
import { COLOR_SCHEME, ColorSchemeInterface } from './service/color-scheme/color-scheme.interface';
import { FONT_SET } from './definitions';

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    private matIconService = inject(MAT_ICON, { optional: true });
    private colorSchemeService = inject(COLOR_SCHEME, { optional: true });

    constructor(
        @Optional() @Inject(FONT_SET) public fontSet: string
    ) {
        if (this.fontSet === null) {
            this.fontSet = 'material-icons';
        }
    }

    public hasMatIcons(): boolean {
        return this.matIconService !== null;
    }

    public matIcons(): MatIconInterface {
        if (!this.hasMatIcons()) {
            throw new Error(`No provider for InjectionToken ${MAT_ICON.toString()}!`);
        }
        return this.matIconService!;
    }

    public hasColorSchemes(): boolean {
        return this.colorSchemeService !== null;
    }

    public colorSchemes(): ColorSchemeInterface {
        if (!this.hasColorSchemes()) {
            throw new Error(`No provider for InjectionToken ${COLOR_SCHEME.toString()}!`);
        }
        return this.colorSchemeService!;
    }
}

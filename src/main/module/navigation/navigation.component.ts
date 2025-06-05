import { Component, inject, Input } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColorScheme } from '../shared/service/color-scheme/model/color-scheme';
import { MAT_ICON } from '../shared/service/mat-icon/mat-icon.interface';
import { COLOR_SCHEME } from '../shared/service/color-scheme/color-scheme.interface';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatMenuModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) iconName!: string;
    @Input() fontSet = 'material-icons';

    protected currentColorScheme?: ColorScheme;

    protected icons = inject(MAT_ICON, { optional: true });
    protected colorSchemes = inject(COLOR_SCHEME, { optional: true });

    constructor() {
        if (this.icons) {
            this.icons.initialize();
        }

        if (this.colorSchemes) {
            this.currentColorScheme = this.colorSchemes.current();
            this.colorSchemes.observable().subscribe(next => {
                switch (next) {
                    case ColorScheme.LIGHT: {
                        this.currentColorScheme = ColorScheme.LIGHT;
                        break;
                    }
                    case ColorScheme.DARK: {
                        this.currentColorScheme = ColorScheme.DARK;
                        break;
                    }
                    default: {
                        this.currentColorScheme = ColorScheme.AUTO;
                        break;
                    }
                }
            });
        }
    }

    onColorSchemeToggle(value: ColorScheme): void {
        this.colorSchemes!.observable().next(value);
    }

    protected LIGHT = ColorScheme.LIGHT;
    protected DARK = ColorScheme.DARK;
    protected AUTO = ColorScheme.AUTO;
}

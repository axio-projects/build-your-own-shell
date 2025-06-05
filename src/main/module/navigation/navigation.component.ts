import { Component, inject, Input, Optional } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ColorScheme } from '../shared/service/color-scheme/model/color-scheme';
import { MAT_ICON } from '../shared/service/mat-icon/mat-icon.interface';
import { COLOR_SCHEME } from '../shared/service/color-scheme/color-scheme.interface';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatSlideToggleModule, FormsModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) iconName!: string;
    @Input() fontSet = 'material-icons';

    protected colorSchemeToggle = false;

    protected icons = inject(MAT_ICON, { optional: true });
    protected colorSchemes = inject(COLOR_SCHEME, { optional: true });

    constructor() {
        if (this.icons) {
            this.icons.initialize();
        }

        if (this.colorSchemes) {
            this.colorSchemes.observable().subscribe(next => {
                if (next === ColorScheme.DARK) {
                    this.colorSchemeToggle = true;
                } else {
                    this.colorSchemeToggle = false;
                }
            });
        }
    }

    onColorSchemeToggle(): void {
        if (this.colorSchemeToggle) {
            this.colorSchemes!.observable().next(ColorScheme.LIGHT);
        } else {
            this.colorSchemes!.observable().next(ColorScheme.DARK);
        }
    }
}

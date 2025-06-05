import { Component, Input, Optional } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatIconService } from '../shared/service/mat-icon/mat-icon.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ColorSchemeService } from '../shared/service/color-scheme/color-scheme.service';
import { ColorScheme } from '../shared/service/color-scheme/model/color-scheme';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatSlideToggleModule, FormsModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Input({ required: true }) icon!: string;
    @Input({ required: true }) title!: string;

    protected colorSchemeToggle = false;

    constructor(
        @Optional() public icons: MatIconService | null,
        @Optional() public colorSchemes: ColorSchemeService | null
    ) {
        if (this.icons) {
            this.icons.initialize();
        }

        if (this.colorSchemes) {
            this.colorSchemes.$colorScheme.subscribe(next => {
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
            this.colorSchemes!.$colorScheme.next(ColorScheme.LIGHT);
        } else {
            this.colorSchemes!.$colorScheme.next(ColorScheme.DARK);
        }
    }
}

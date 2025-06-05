import { Component, Input } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatIconService } from '../shared/service/mat-icon.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatSlideToggleModule, FormsModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Input({ required: true }) icon!: string;
    @Input({ required: true }) title!: string;

    protected colorScheme = false;

    constructor(
        public shared: SharedService,
        public icons: MatIconService
    ) {
        this.icons.initialize();

        this.shared.$colorScheme.subscribe(next => {
            if (next === 'DARK') {
                this.colorScheme = true;
            } else {
                this.colorScheme = false;
            }
        });
    }

    onColorSchemeToggle(): void {
        if (this.colorScheme) {
            this.shared.$colorScheme.next('DARK');
        } else {
            this.shared.$colorScheme.next('LIGHT');
        }
    }
}

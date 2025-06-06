import { Component, Input } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColorScheme } from '../shared/service/color-scheme/model/color-scheme';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '../shared/shared.service';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) iconName!: string;

    protected fontSet: string;

    protected hasMatIconService = false;
    protected hasColorSchemeService = false;

    protected currentColorScheme?: ColorScheme;

    constructor(
        public shared: SharedService
    ) {
        this.fontSet = this.shared.fontSet;

        if (this.shared.hasMatIcons()) {
            this.hasMatIconService = true;
            this.shared.matIcons().initialize();
        }

        if (this.shared.hasColorSchemes()) {
            this.hasColorSchemeService = true;
            const colorSchemeService = this.shared.colorSchemes();
            this.currentColorScheme = colorSchemeService.current();
            colorSchemeService.observable().subscribe(next => {
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
        this.shared.colorSchemes().observable().next(value);
    }

    protected COLOR_SCHEME_LIGHT = ColorScheme.LIGHT;
    protected COLOR_SCHEME_DARK = ColorScheme.DARK;
    protected COLOR_SCHEME_AUTO = ColorScheme.AUTO;
}

import { Component, Input } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColorSchemes } from '../shared/service/color-scheme/model/color-schemes';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '../shared/shared.service';
import { VersionService } from '../shared/service/version/version.service';
import { provideVersionService } from '../shared/service/version/version.interface';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    providers: [
        provideVersionService()
    ]
})
export class NavigationComponent {
    @Input({ required: true }) title!: string;
    @Input({ required: true }) iconName!: string;

    protected fontSet: string;

    protected hasMatIconService = false;
    protected hasColorSchemeService = false;

    protected currentColorScheme?: ColorSchemes;

    constructor(
        public shared: SharedService,
        public version: VersionService
    ) {
        if (!this.version.matches('^20.0.0')) {
            throw new Error(`unexpected angular version ${this.version.current()}`);
        }

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
                    case ColorSchemes.LIGHT: {
                        this.currentColorScheme = ColorSchemes.LIGHT;
                        break;
                    }
                    case ColorSchemes.DARK: {
                        this.currentColorScheme = ColorSchemes.DARK;
                        break;
                    }
                    default: {
                        this.currentColorScheme = ColorSchemes.AUTO;
                        break;
                    }
                }
            });
        }
    }

    onColorSchemeToggle(value: ColorSchemes): void {
        this.shared.colorSchemes().observable().next(value);
    }

    protected COLOR_SCHEME_LIGHT = ColorSchemes.LIGHT;
    protected COLOR_SCHEME_DARK = ColorSchemes.DARK;
    protected COLOR_SCHEME_AUTO = ColorSchemes.AUTO;
}

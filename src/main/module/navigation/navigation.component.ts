import { booleanAttribute, Component, inject, Input, OnInit } from '@angular/core';
import { MatSidenavAdapterComponent } from './component/mat-sidenav-adapter/mat-sidenav-adapter.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColorSchemes } from '../shared/service/color-scheme/model/color-schemes';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedService } from '../shared/shared.service';
import { VersionService } from '../shared/service/version/version.service';
import { provideVersionService } from '../shared/service/version/version.interface';
import { DEFAULT_NAVIGATION_INPUTS } from './navigation.interface';

@Component({
    selector: 'main-navigation',
    imports: [MatSidenavAdapterComponent, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    inputs: [
        'hideColorScheme'
    ],
    providers: [
        provideVersionService()
    ]
})
export class NavigationComponent implements OnInit {
    @Input({ required: true }) title!: string;
    protected _icon: string = '';
    @Input() get icon() {
        return this._icon;
    }
    set icon(value: string) {
        this._icon = value ? value.trim() : '';
    }

    @Input({ transform: booleanAttribute }) hideIcon;
    @Input({ transform: booleanAttribute }) hideColorScheme;

    protected fontSet: string;
    protected colorScheme?: ColorSchemes;

    private defaults = inject(DEFAULT_NAVIGATION_INPUTS);

    constructor(
        public shared: SharedService,
        public version: VersionService
    ) {
        if (!this.version.matches('^20.0.0')) {
            throw new Error(`unexpected angular version ${this.version.current()}`);
        }

        this.fontSet = this.shared.fontSet;
        this.hideIcon = this.defaults.hideIcon || false;
        this.hideColorScheme = this.defaults.hideColorScheme || false;
    }

    ngOnInit(): void {
        if (this.shared.hasMatIcons() && !this.hideIcon) {
            this.shared.matIcons().initialize();
        }

        if (this.shared.hasColorSchemes() && !this.hideColorScheme) {
            const colorSchemeService = this.shared.colorSchemes();
            this.colorScheme = colorSchemeService.current();
            colorSchemeService.observable().subscribe(next => {
                switch (next) {
                    case ColorSchemes.LIGHT: {
                        this.colorScheme = ColorSchemes.LIGHT;
                        break;
                    }
                    case ColorSchemes.DARK: {
                        this.colorScheme = ColorSchemes.DARK;
                        break;
                    }
                    default: {
                        this.colorScheme = ColorSchemes.AUTO;
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

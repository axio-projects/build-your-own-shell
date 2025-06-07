import { ApplicationConfig, makeEnvironmentProviders, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './main.routes';
import { provideHttpClient } from '@angular/common/http';
import { COLOR_SCHEME } from './module/shared/service/color-scheme/color-scheme.interface';
import { ColorSchemeService } from './module/shared/service/color-scheme/color-scheme.service';
import { MAT_ICON } from './module/shared/service/mat-icon/mat-icon.interface';
import { MatIconService } from './module/shared/service/mat-icon/mat-icon.service';
import { FONT_SET } from './module/shared/definitions';

export const mainConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(),
        makeEnvironmentProviders([
            { provide: MAT_ICON, useClass: MatIconService },
            { provide: COLOR_SCHEME, useClass: ColorSchemeService },
            { provide: FONT_SET, useValue: 'material-symbols-outlined' },
        ])
    ]
};

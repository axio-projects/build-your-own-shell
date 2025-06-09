import { InjectionToken } from "@angular/core";

export type NavigationInputs = {
    hideIcon?: boolean,
    hideColorScheme?: boolean
}

export const DEFAULT_NAVIGATION_INPUTS = new InjectionToken<NavigationInputs>(
    'Default NavigationInputs Token', { factory: () => ({ hideIcon: false, hideColorScheme: false }) }
);

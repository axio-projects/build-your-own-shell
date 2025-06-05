import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColorScheme } from "./model/color-scheme";

export interface ColorSchemeInterface {
    current(): ColorScheme;
    observable(): BehaviorSubject<ColorScheme>;
}

export const COLOR_SCHEME = new InjectionToken<ColorSchemeInterface>('ColorSchemeService Token');

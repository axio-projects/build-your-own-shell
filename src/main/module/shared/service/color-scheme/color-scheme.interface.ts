import { InjectionToken } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ColorSchemes } from "./model/color-schemes";

export interface ColorSchemeInterface {
    current(): ColorSchemes;
    observable(): BehaviorSubject<ColorSchemes>;
}

export const COLOR_SCHEME = new InjectionToken<ColorSchemeInterface>('ColorSchemeService Token');

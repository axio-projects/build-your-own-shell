import { InjectionToken } from "@angular/core";

export interface MatIconInterface {
    initialize(): void;
}

export const MAT_ICON = new InjectionToken<MatIconInterface>('MatIconService Token');

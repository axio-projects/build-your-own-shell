import { InjectionToken, Provider, VERSION, Version } from "@angular/core";
import { VersionService } from "./version.service";

export const ANGULAR_VERSION = new InjectionToken<Version>('AngularVersion Token');

export function provideVersionService(version?: string): Provider {
    return [
        VersionService,
        { provide: ANGULAR_VERSION, useValue: version ? new Version(version) : VERSION }
    ];
}

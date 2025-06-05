import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MatIconService {
    protected initialized = false;

    constructor(
        public registry: MatIconRegistry,
        public sanitizer: DomSanitizer
    ) { }

    initialize(): void {
        if (this.initialized) {
            return;
        }

        this.registry.addSvgIcon(
            'shell', this.sanitizer.bypassSecurityTrustResourceUrl('shell-icon.svg')
        );
        this.initialized = true;
    }
}

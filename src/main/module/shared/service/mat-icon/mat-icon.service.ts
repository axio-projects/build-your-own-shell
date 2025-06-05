import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconInterface } from './mat-icon.interface';

@Injectable()
export class MatIconService implements MatIconInterface {
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

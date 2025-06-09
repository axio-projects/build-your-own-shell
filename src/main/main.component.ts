import { Component, Injector, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationComponent } from './module/navigation/navigation.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedService } from './module/shared/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { createGlobalPositionStrategy, createOverlayRef, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'main-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive, NavigationComponent, MatButtonModule, MatIconModule],
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit, OnDestroy {
    @ViewChild('reference', { read: TemplateRef, static: true }) referenceTemplate!: TemplateRef<unknown>;

    protected title = 'Build Your Own Shell';
    protected icon = 'shell';

    protected fontSet: string;

    protected isReferenceOpen = false;
    protected referenceOverlay?: OverlayRef;
    protected referencePortal!: TemplatePortal<unknown>;

    constructor(
        public shared: SharedService,
        public injector: Injector,
        public viewContainer: ViewContainerRef
    ) {
        this.fontSet = this.shared.fontSet;
    }

    ngOnInit(): void {
        this.referencePortal = new TemplatePortal(this.referenceTemplate, this.viewContainer);
    }

    ngOnDestroy(): void {
        this.referenceOverlay?.dispose();
    }

    toggleReference(): void {
        if (this.isReferenceOpen) {
            this.closeReference();
        } else {
            this.openReference();
        }
    }

    openReference(): void {
        if (!this.referenceOverlay) {
            this.referenceOverlay = createOverlayRef(this.injector, new OverlayConfig({
                positionStrategy: createGlobalPositionStrategy(this.injector)
                    .centerVertically('0')
                    .centerHorizontally('0'),
                backdropClass: 'cdk-overlay-transparent-backdrop',
                hasBackdrop: true,
                direction: 'ltr'
            }));
        }

        if (!this.referenceOverlay.hasAttached()) {
            this.referenceOverlay.attach(this.referencePortal);
        }
        this.referenceOverlay.backdropClick().subscribe(() => this.closeReference());
        this.isReferenceOpen = true;
    }

    closeReference(): void {
        if (this.referenceOverlay) {
            this.referenceOverlay.detach();
        }
        this.isReferenceOpen = false;
    }
}

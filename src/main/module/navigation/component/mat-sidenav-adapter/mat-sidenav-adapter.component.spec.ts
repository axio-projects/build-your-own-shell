import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSidenavAdapterComponent } from './mat-sidenav-adapter.component';

describe('MatSidenavAdapterComponent', () => {
    let component: MatSidenavAdapterComponent;
    let fixture: ComponentFixture<MatSidenavAdapterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatSidenavAdapterComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MatSidenavAdapterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

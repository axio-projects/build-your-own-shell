import { TestBed } from '@angular/core/testing';
import { Main } from './main.component';

describe('Main', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Main],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(Main);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(Main);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('h1')?.textContent).toContain('Hello, build-your-own-shell');
    });
});

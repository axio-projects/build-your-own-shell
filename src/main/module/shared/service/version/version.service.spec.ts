import { TestBed } from '@angular/core/testing';

import { VersionService } from './version.service';
import { provideVersionService } from './version.interface';

describe('VersionService', () => {
    let service: VersionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideVersionService('1.0.4')
            ]
        });
        service = TestBed.inject(VersionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should match 1.0.4', () => {
        expect(service.matches('1.0.4')).toBeTruthy();
    });

    it('should match 1.0', () => {
        expect(service.matches('1.0')).toBeTruthy();
    });

    it('should match 1.0.x', () => {
        expect(service.matches('1.0.x')).toBeTruthy();
    });

    it('should match 1', () => {
        expect(service.matches('1')).toBeTruthy();
    });

    it('should match 1.x', () => {
        expect(service.matches('1.x')).toBeTruthy();
    });

    it('should match *', () => {
        expect(service.matches('*')).toBeTruthy();
    });

    it('should match x', () => {
        expect(service.matches('x')).toBeTruthy();
    });
});

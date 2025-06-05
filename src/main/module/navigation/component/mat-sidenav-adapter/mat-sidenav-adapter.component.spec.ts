import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSidenavComponent } from './material-sidenav.component';

describe('MaterialSidenavComponent', () => {
  let component: MaterialSidenavComponent;
  let fixture: ComponentFixture<MaterialSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

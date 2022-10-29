import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeTableComponent } from './see-table.component';

describe('SeeTableComponent', () => {
  let component: SeeTableComponent;
  let fixture: ComponentFixture<SeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

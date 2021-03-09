import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfiliarceComponent } from './afiliarce.component';

describe('AfiliarceComponent', () => {
  let component: AfiliarceComponent;
  let fixture: ComponentFixture<AfiliarceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfiliarceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AfiliarceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

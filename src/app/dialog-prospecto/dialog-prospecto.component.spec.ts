import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProspectoComponent } from './dialog-prospecto.component';

describe('DialogProspectoComponent', () => {
  let component: DialogProspectoComponent;
  let fixture: ComponentFixture<DialogProspectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogProspectoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProspectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

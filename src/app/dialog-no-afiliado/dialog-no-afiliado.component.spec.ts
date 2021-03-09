import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoAfiliadoComponent } from './dialog-no-afiliado.component';

describe('DialogNoAfiliadoComponent', () => {
  let component: DialogNoAfiliadoComponent;
  let fixture: ComponentFixture<DialogNoAfiliadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogNoAfiliadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogNoAfiliadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

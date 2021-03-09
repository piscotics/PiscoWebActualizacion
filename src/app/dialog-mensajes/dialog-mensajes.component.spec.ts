import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMensajesComponent } from './dialog-mensajes.component';

describe('DialogMensajesComponent', () => {
  let component: DialogMensajesComponent;
  let fixture: ComponentFixture<DialogMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogMensajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActualizarDatosComponent } from './dialog-actualizar-datos.component';

describe('DialogActualizarDatosComponent', () => {
  let component: DialogActualizarDatosComponent;
  let fixture: ComponentFixture<DialogActualizarDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActualizarDatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActualizarDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

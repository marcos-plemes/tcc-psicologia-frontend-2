import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerguntasAbrirComponent } from './perguntas-abrir.component';

describe('PerguntasAbrirComponent', () => {
  let component: PerguntasAbrirComponent;
  let fixture: ComponentFixture<PerguntasAbrirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerguntasAbrirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerguntasAbrirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

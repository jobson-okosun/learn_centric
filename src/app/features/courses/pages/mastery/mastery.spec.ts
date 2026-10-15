import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Mastery } from './mastery';

describe('Mastery', () => {
  let component: Mastery;
  let fixture: ComponentFixture<Mastery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mastery],
    }).compileComponents();

    fixture = TestBed.createComponent(Mastery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

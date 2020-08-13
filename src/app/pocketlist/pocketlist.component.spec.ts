import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PocketlistComponent } from './pocketlist.component';

describe('PocketlistComponent', () => {
  let component: PocketlistComponent;
  let fixture: ComponentFixture<PocketlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PocketlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PocketlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

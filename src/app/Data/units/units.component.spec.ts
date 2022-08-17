import { NO_ERRORS_SCHEMA } from "@angular/core";
import { UnitsComponent } from "./units.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("UnitsComponent", () => {

  let fixture: ComponentFixture<UnitsComponent>;
  let component: UnitsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [UnitsComponent]
    });

    fixture = TestBed.createComponent(UnitsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

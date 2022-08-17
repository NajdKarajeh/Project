import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormSelectComponent } from "./form-select.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("FormSelectComponent", () => {

  let fixture: ComponentFixture<FormSelectComponent>;
  let component: FormSelectComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [FormSelectComponent]
    });

    fixture = TestBed.createComponent(FormSelectComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AddItemComponent } from "./add-item.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("AddItemComponent", () => {

  let fixture: ComponentFixture<AddItemComponent>;
  let component: AddItemComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [AddItemComponent]
    });

    fixture = TestBed.createComponent(AddItemComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

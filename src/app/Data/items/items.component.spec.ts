import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ItemsComponent } from "./items.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ItemsComponent", () => {

  let fixture: ComponentFixture<ItemsComponent>;
  let component: ItemsComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [ItemsComponent]
    });

    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});

import { Component } from "./Component";

export abstract class Presenter {
  public component!: Component;

  abstract init(): void;
}

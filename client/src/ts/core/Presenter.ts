// import { Component } from "./Component";

// interface Models {
//   [key: string]: unknown;
// }

// interface Views {
//   [key: string]: unknown;
// }

export abstract class Presenter {
  // // public component!: Component;

  // constructor(
  //   private models: Models = {},
  //   private views: Views = {}
  // ) {}

  abstract init(): void;
}

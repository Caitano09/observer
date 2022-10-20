import { Observer } from "../Observer/observer";

export interface Observable {
    subscribe(...observers: Observer[]): void;
    unsubscribe(observer: Observer): void;
    notify(): void;
  } 
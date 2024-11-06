import { Response, Router } from 'express';
import { Route } from '../types/index.js';

export interface Controller {
  readonly router: Router;
  addRoutes(route: Route | Route[]): void;
  send<T>(response: Response, statusCode: number, data: T): void;
  ok<T>(response: Response, data: T): void;
  created<T>(response: Response, data: T): void;
  noContent<T>(response: Response, data: T): void;
}

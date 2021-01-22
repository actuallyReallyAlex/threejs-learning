import { Router } from "express";

export type Controller = {
  router: Router;
};

export type Domain = string | undefined;

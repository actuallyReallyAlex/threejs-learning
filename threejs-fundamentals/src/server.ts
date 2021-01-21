import chalk from "chalk";
import cors, { CorsOptions } from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";

import { Controller, Domain } from "./types";

class Server {
  public app: express.Application;

  public port: string;

  constructor(controllers: Controller[], port: string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan("dev"));

    const whitelistDomains: Domain[] = ["http://localhost:5555", undefined];

    const corsOptions: CorsOptions = {
      origin: (
        requestOrigin: string | undefined,
        callback: (error: null | Error, passedCors?: boolean) => void
      ): void => {
        if (whitelistDomains.indexOf(requestOrigin) !== -1) {
          callback(null, true);
        } else {
          console.error(`Server refused to allow: ${requestOrigin}`);
          callback(new Error("Not allowed by CORS"));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });

    this.app.use(express.static(path.join(__dirname, "../dist")));

    this.app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "../dist/index.html"));
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Mode: ${chalk.blueBright(process.env.NODE_ENV)}`);
      console.log(
        `Server is listening on port: ${chalk.blueBright(this.port)}`
      );
    });
  }
}

export default Server;

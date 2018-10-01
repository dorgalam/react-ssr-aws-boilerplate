import React from "react";
import awsServerlessExpress from "aws-serverless-express";
import bodyParser from "body-parser";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import awsServerlessExpressMiddleware from "aws-serverless-express/middleware";
import ejs from "ejs";
import path from "path";
import { renderToString } from "react-dom/server";
import App from "~/client/App";
// @ts-ignore
const staticsUrl = STATICS_URL;

class Server {
  public static bootstrap(): Server {
    return new Server();
  }

  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config() {
    this.app.engine("ejs", ejs.renderFile);
    this.app.set("view engine", "ejs");
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(awsServerlessExpressMiddleware.eventContext());
  }

  private routes() {
    this.app.get("/api/say-hello", (req: Request, res: Response) => {
      res.json({
        message: "Hello!"
      });
    });
    this.app.get("/", (req: Request, res: Response) => {
      const { debug } = req.query;
      const appHtml = renderToString(<App />);
      res.render(path.resolve(__dirname, "views/index"), {
        staticsUrl,
        appHtml,
        debug
      });
    });
  }
}

const app = Server.bootstrap().app;

const server = awsServerlessExpress.createServer(app);

if (process.env.NODE_ENV === "development") {
  app.listen(3000);
}

module.exports.handler = (event, context) =>
  awsServerlessExpress.proxy(server, event, context);

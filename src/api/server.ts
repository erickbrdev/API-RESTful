import { app } from "./app";
import config from "config";
import db from "../../config/db";
import Logger from "../../config/logger";

const PORT = config.get("port");

app.listen(PORT, async () => {
  await db();
  Logger.info(`Serve is running at PORT: ${PORT}`);
});
 
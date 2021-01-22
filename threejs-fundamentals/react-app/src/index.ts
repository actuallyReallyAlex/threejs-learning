import Server from "./server";
import AssetsController from "./controllers/assets";

const main = async (): Promise<void> => {
  try {
    if (!process.env.PORT)
      throw new Error("Undefined necessary variable - PORT");

    const server = new Server([new AssetsController()], process.env.PORT);

    server.listen();
  } catch (error) {
    console.error(error);
  }
};

main();

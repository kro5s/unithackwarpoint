import {config} from "dotenv";
import App from "./src/App";

config()

new App().start(3000)

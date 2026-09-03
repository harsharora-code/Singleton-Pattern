import { startLogger } from "./logger.js";
import {GameManager} from "./store.js";
startLogger();
setInterval(() => {
    GameManager.getInstance().addGame(Math.random().toString());
}, 3000)
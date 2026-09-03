import {GameManager} from "./store.js";

export function startLogger() {
    setInterval(() => {
        console.log(GameManager.getInstance().log());
    }, 3000);
}
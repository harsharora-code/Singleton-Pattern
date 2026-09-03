import { PubSubManager } from "./PubSubManager.js";
async function main() {

    const manager  = PubSubManager.getInstance();

    manager.addUserToStock("user1", "APPL");
    manager.addUserToStock("user2", "APPL");

    console.log("User subcribed,  waiting for Redis msg... ");

    setTimeout(() => {
        manager.addUserToStock("user3", "Google");
        
    }, 6000);

    setTimeout(() => {
        manager.removeUserStock("user3", "Google");
    }, 12000);


}
main();

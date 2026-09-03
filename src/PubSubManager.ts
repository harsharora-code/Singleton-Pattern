import { createClient, type RedisClientType } from "redis";
export class PubSubManager {
    private static instance: PubSubManager;
    private redisClient: RedisClientType;
    private subscriptions: Map<String, String[]>;

    private constructor()
 {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();


 }

 public static getInstance() {
    if(!PubSubManager.instance) {
        PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
 }

 addUserToStock(userId: string, stockTicker: string) {
    if(!this.subscriptions.has(stockTicker)) {
        this.subscriptions.set(stockTicker, []);
    }
    this.subscriptions.get(stockTicker)?.push(userId); //who are subscribing
    if(this.subscriptions.get(stockTicker)?.length == 1) {
        this.redisClient.subscribe(stockTicker, (msg) => {
            this.forwardMsgToUser(stockTicker, msg);
        });
        console.log(`Subscribed to redis chanel: ${stockTicker}`);
    }
 }

 removeUserStock(userId: string, stockTicker: string) {
    this.subscriptions.set(stockTicker, this.subscriptions.get(stockTicker)?.filter((sub) => sub !== userId) || []);
    console.log(`After Removing ${userId}`);
    if(this.subscriptions.get(stockTicker)?.length == 0) {
    this.redisClient.unsubscribe(stockTicker);
    console.log(`unsubcribe to redis channel: ${stockTicker}`);
    }

 }

 private forwardMsgToUser(stockTicker: string, msg: string) {
    console.log(`Msg Recived on channel ${stockTicker}: ${msg}`);
    this.subscriptions.get(stockTicker)?.forEach((sub) => {
        console.log(`Sending msg to users: ${sub}`);
    })

 }

 public async disconnect() {
    await this.redisClient.quit();
 }
}
import { mqtt } from 'aws-iot-device-sdk-v2';
import { TextDecoder } from 'util';


class Session {
    private conn: mqtt.MqttClientConnection;
    private requestTopic: string;
    private replyTopic: string;
    private clientId: string;

    constructor(connection: mqtt.MqttClientConnection, requestTopic: string, replyTopic: string, clientId: string) {
        this.conn = connection;
        this.requestTopic = requestTopic;
        this.replyTopic = replyTopic;
        this.clientId = clientId;
    }
   
    public async init() {
        return new Promise(async (resolve, reject) => {
            try {
                this.listenToStreamIdRequests(resolve);
            }
            catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }

    private async listenToStreamIdRequests(resolve: any) {
        const decoder = new TextDecoder('utf8');

        const onPublish = async (receivedTopic: string, payload: ArrayBuffer, dup: boolean, qos: mqtt.QoS, retain: boolean) => {
            var text = "";
            try {
                text = decoder.decode(payload);
                const json = JSON.parse(text);
                const deviceId = json.deviceId;
                console.log(`Message received on topic ${receivedTopic} ${JSON.stringify(json)} (dup:${dup} qos:${qos} retain:${retain})`);

                const tokens = this.requestTopic.split("+");
                const devIdFromTopic = receivedTopic.replace(tokens[0], "").replace(tokens[1], "");

                if (deviceId != devIdFromTopic) {
                    console.warn(`deviceIds do not match with json.deviceId=${deviceId} devIdFromTopic=${devIdFromTopic}, skipping reply`);
                    return;
                }

                // Reply to the request
                var topicReply  = this.replyTopic.replace("+", deviceId);
                const streamId = 0; // TODO: Get streamId from Redis
                const seqId = 0; // TODO: Get seq from Redis
                const msg = { deviceId: deviceId, streamId: streamId, seq: seqId, serverId: this.clientId };
                const jsonReply = JSON.stringify(msg);
                console.log(`Publishing to ${topicReply} message ${jsonReply}`);
                var res = await this.conn.publish(topicReply, jsonReply, mqtt.QoS.AtLeastOnce);
                console.log(`Published to ${topicReply} returned ${JSON.stringify(res)}`);
            } catch (ex) {
                console.error(`Failed to process received message "${text}" -> ${ex}`);
            }
        };

        var res = await this.conn.subscribe(this.requestTopic, mqtt.QoS.AtLeastOnce, onPublish);
        console.log(`Subscribing returned ${JSON.stringify(res)}`);
        resolve("Subscribed");
    }
}

export { Session }
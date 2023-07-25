TypeScript device from AWS code

# Steps to test

Create a .env.production file based on .env.example or .env.production.example (only ENDPOINT has to be edited inside the file)

Update the local certificates with
```
sh ./refresh-local-certs.sh
```

Build the docker image
```
docker build --tag iotserver:v0.01 .
```

Spawn the docker copntainer
```
docker run -it -p 8886:8885 -m 20M iotserver:v0.01 --endpoint example-ats.iot.us-east-1.amazonaws.com --streamIdRequestTopic lafleet/devices/streamId/+/request --streamIdReplyTopic lafleet/devices/streamId/+/reply --interval 1000 --count 5 --cert_file /home/user/certs/certificate.pem.crt --key_file /home/user/certs/private.pem.key
```

## Playing around

Useful commands
```
npm start --idle true
docker run --env IDLE=true -t iotserver:v0.01
docker run --detach --rm --env IDLE=true
```

# Useful Documentation

* [AWS IoT Core - MQTT](https://docs.aws.amazon.com/iot/latest/developerguide/mqtt.html)
* [AWS IoT Core - Device communication protocols](https://docs.aws.amazon.com/iot/latest/developerguide/protocols.html)

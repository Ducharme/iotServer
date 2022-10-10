#!/bin/sh

ENV_FILE=$1
ENDPOINT=$(grep ENDPOINT $ENV_FILE | cut -d '=' -f2)
STREAMID_REQUEST_TOPIC=$(grep STREAMID_REQUEST_TOPIC $ENV_FILE | cut -d '=' -f2)
STREAMID_REPLY_TOPIC=$(grep STREAMID_REPLY_TOPIC $ENV_FILE | cut -d '=' -f2)
#MESSAGE=$(grep MESSAGE $ENV_FILE | cut -d '=' -f2)
#IDLE=$(grep IDLE $ENV_FILE | cut -d '=' -f2)

#CLIENT_ID=$(grep CLIENT_ID $ENV_FILE | cut -d '=' -f2)
#USE_WEBSOCKET=$(grep USE_WEBSOCKET $ENV_FILE | cut -d '=' -f2)
#SIGNING_REGION=$(grep SIGNING_REGION $ENV_FILE | cut -d '=' -f2)
CA_FILE=$(grep CA_FILE $ENV_FILE | cut -d '=' -f2)
CERT_FILE=$(grep CERT_FILE $ENV_FILE | cut -d '=' -f2)
KEY_FILE=$(grep KEY_FILE $ENV_FILE | cut -d '=' -f2)
#PROXY_HOST=$(grep PROXY_HOST $ENV_FILE | cut -d '=' -f2)
#PROXY_PORT=$(grep PROXY_PORT $ENV_FILE | cut -d '=' -f2)
#VERBOSITY=$(grep VERBOSITY $ENV_FILE | cut -d '=' -f2)


# --idle $IDLE --use_websocket $USE_WEBSOCKET --signing_region $SIGNING_REGION
# --proxy_host $PROXY_HOST --proxy_port $PROXY_PORT --verbosity $VERBOSITY
echo dist/main.js --endpoint $ENDPOINT --streamIdRequestTopic $STREAMID_REQUEST_TOPIC --streamIdReplyTopic $STREAMID_REPLY_TOPIC --ca_file $CA_FILE --cert_file $CERT_FILE --key_file $KEY_FILE
node dist/main.js --endpoint $ENDPOINT --streamIdRequestTopic $STREAMID_REQUEST_TOPIC --streamIdReplyTopic $STREAMID_REPLY_TOPIC --ca_file $CA_FILE --cert_file $CERT_FILE --key_file $KEY_FILE

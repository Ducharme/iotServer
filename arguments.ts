function handleArgs(yargs: any) {
    yargs
        .option('endpoint', {
            alias: 'e',
            description: "Your AWS IoT custom endpoint, not including a port.",
            type: 'string',
            //default: 'example-ats.iot.us-east-1.amazonaws.com'
        })
        .option('ca_file', {
            alias: 'r',
            description: 'FILE: Path to a Root CA certficate file in PEM format.',
            type: 'string',
            //default: '/home/user/certs/root-ca.pem'
        })
        .option('cert_file', {
            alias: 'c',
            description: 'FILE: Path to a PEM encoded certificate to use with mTLS',
            type: 'string',
            //default: '/home/user/certs/certificate.pem.crt'
        })
        .option('key_file', {
            alias: 'k',
            description: 'FILE: Path to a PEM encoded private key that matches cert.',
            type: 'string',
            //default: '/home/user/certs/private.pem.key'
        })
        .option('client_id', {
            alias: 'C',
            description: 'Client ID for MQTT connection.',
            type: 'string'
        })
        .option('streamIdRequestTopic', {
            alias: 'q',
            description: 'STRING: StreamId Request topic',
            type: 'string',
            //default: 'lafleet/devices/streamId/+/request'
        })
        .option('streamIdReplyTopic', {
            alias: 'p',
            description: 'STRING: StreamId Reply topic',
            type: 'string',
            //default: 'lafleet/devices/streamId/+/reply'
        })
        .option('use_websocket', {
            alias: 'W',
            description: 'To use a websocket instead of raw mqtt. If you ' +
            'specify this option you must specify a region for signing, you can also enable proxy mode.',
            type: 'boolean',
            //default: false
        })
        .option('signing_region', {
            alias: 's',
            description: 'If you specify --use_websocket, this ' +
            'is the region that will be used for computing the Sigv4 signature',
            type: 'string',
            //default: 'us-east-1'
        })
        .option('proxy_host', {
            alias: 'H',
            description: 'Hostname for proxy to connect to. Note: if you use this feature, ' +
            'you will likely need to set --ca_file to the ca for your proxy.',
            type: 'string'
        })
        .option('proxy_port', {
            alias: 'P',
            description: 'Port for proxy to connect to.',
            type: 'number',
            //default: 8080
        })
        .option('message', {
            alias: 'M',
            description: 'Message to publish.',
            type: 'string',
            //default: 'Hello world!'
        })
        .option('verbosity', {
            alias: 'v',
            description: 'BOOLEAN: Verbose output',
            type: 'string',
            choices: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'none']
            //default: 'none'
        })
        .option('idle', {
            alias: 'i',
            description: 'BOOLEAN: Idle (stale)',
            type: 'boolean',
            //default: false
        })
        .help()
        .alias('help', 'h')
        .showHelpOnFail(false)
}

module.exports = { handleArgs };

import { io } from 'aws-iot-device-sdk-v2';
import { exit } from 'process';
import { Args, InputValues, getEnvVars, getCmdArgs } from './inputValues';
import * as fs from 'fs';

const yargs = require('yargs');
var argv = require('yargs/yargs')(process.argv.slice(2))
    .count('endpoint').alias('e', 'endpoint').argv;
const args = require("./arguments");
const client = require("./client");


yargs.command('*', false, args.handleArgs, main).parse();

async function main(cmdArgs: Args) {

    if (cmdArgs.idle || process.env.IDLE) {
        console.log("Idle mode detected");
        const seconds = 1;
        let sleep = function (ms: number): Promise<unknown> { return new Promise(resolve => setTimeout(resolve, ms)) };
        while (true) {
            console.log(`Sleeping for ${seconds} seconds`);
            await sleep(seconds * 1000);
        }
    }

    // Sums the total number of endpoint specified in command line arguments
    var useEnvVar = (argv.endpoint + argv.e) === 0;
    // If endpoint is not present in args then env vars are used instead
    var args : InputValues = useEnvVar ? getEnvVars() : getCmdArgs(cmdArgs);
    const fav : string = args.verbosity as string;
    var hasVerbosity = fav !== undefined && fav !== null && fav.length > 0;
    if (hasVerbosity) {
        const newVal = fav.toUpperCase();
        var level : io.LogLevel;
        switch (newVal) {
            case io.LogLevel.FATAL.toString(): level = io.LogLevel.FATAL; break;
            case io.LogLevel.ERROR.toString(): level = io.LogLevel.ERROR; break;
            case io.LogLevel.WARN.toString(): level = io.LogLevel.WARN; break;
            case io.LogLevel.INFO.toString(): level = io.LogLevel.INFO; break;
            case io.LogLevel.DEBUG.toString(): level = io.LogLevel.DEBUG; break;
            case io.LogLevel.TRACE.toString(): level = io.LogLevel.TRACE; break;
            default: level = io.LogLevel.NONE; break;

        }
        io.enable_logging(level);
    }

    console.log("Starting based on values from " + (useEnvVar ? "Env Vars" : "Cmd Args"));
    console.log(`Values endpoint:${args.endpoint}, `
        + `streamIdRequestTopic:${args.streamIdRequestTopic}, streamIdReplyTopic:${args.streamIdReplyTopic}, `
        + `message:${args.message}, idle:${args.idle}, `
        + `client_id:${args.client_id}, use_websocket:${args.use_websocket}, signing_region:${args.signing_region}, `
        + `ca_file:${args.ca_file}, cert_file:${args.cert_file}, key_file:${args.key_file}, `
        + `proxy_host:${args.proxy_host}, proxy_port:${args.proxy_port}, verbosity:${args.verbosity}`);

    const aci = args.client_id;
    var hasClientId = aci !== undefined && aci !== null && aci.length > 0;
    var clientId = hasClientId ? args.client_id : "server-" + Math.floor(Math.random() * 100000000);

    var certId = fs.readFileSync('./certs/certificate-id.txt', 'utf8');
    console.log(`Values clientId:${clientId}, certificateId:${certId}`);

    const c = new client.Client(args, clientId);
    await c.connect();
    await c.run();

    //await c.disconnect();
    //exitProcess(0);
}

export function exitProcess(exitCode: number) {
    exit(exitCode);
}


import build from "pino-abstract-transport";
import { FluentClient } from "@fluent-org/logger";

export default (options) => {
    const client = new FluentClient(options.tag || "pino", {
        socket: {
            host: options.host,
            port: options.port
        }
    })
    const label = options.key || "log"
    return build(async function (source) {
        for await (const obj of source) {
            await client.emit(label, obj)
        }
    }, {
        close () {
            return client.shutdown()
        }
    })
}
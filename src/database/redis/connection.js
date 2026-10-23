import { createClient, RESP_TYPES } from "redis"

export const redisConnection = async()=>{
    const client = createClient({
  url: "rediss://default:gQAAAAAAAZnDAAIgcDJmMTUzNThjNmMyY2M0YWY1OTZhODM3NTRlMGZkMjY2Zg@perfect-arachnid-104899.upstash.io:6379"
});

client.on("error", function(err) {
  throw err;
});
await client.connect()

return client
}

import "dotenv/config";
import { Midjourney } from "../src";
/**
 *
 * a simple example of how to use the UpscaleAnimated command
 * ```
 * npx tsx example/upscale-animated.ts
 * ```
 */
async function main() {
  const client = new Midjourney({
    ServerId: <string>process.env.SERVER_ID,
    ChannelId: <string>process.env.CHANNEL_ID,
    SalaiToken: <string>process.env.SALAI_TOKEN,
    Debug: true,
  });
  await client.init();
  const msg = await client.Imagine("a cool cat, blue ears, yellow hat");
  console.log({ msg });
  if (!msg) {
    console.log("no message");
    return;
  }
  // First upscale an image
  const msg2 = await client.Upscale({
    index: 2,
    msgId: <string>msg.id,
    hash: <string>msg.hash,
    flags: msg.flags,
    content: msg.content,
    loading: (uri: string, progress: string) => {
      console.log("upscaling", uri, "progress", progress);
    },
  });
  console.log({ msg2 });
  if (!msg2) {
    console.log("no upscaled message");
    return;
  }
  // Animate the upscaled image
  const animated = await client.Animate({
    level: "high",
    msgId: <string>msg2.id,
    hash: <string>msg2.hash,
    flags: msg2.flags,
    content: msg2.content,
    loading: (uri: string, progress: string) => {
      console.log("animating", uri, "progress", progress);
    },
  });
  console.log({ animated });
  if (!animated) {
    console.log("no animated message");
    return;
  }
  // Upscale the animated video
  const upscaledAnimated = await client.UpscaleAnimated({
    index: 3,
    msgId: <string>animated.id,
    hash: <string>animated.hash,
    flags: animated.flags,
    content: animated.content,
    loading: (uri: string, progress: string) => {
      console.log("upscaling animated", uri, "progress", progress);
    },
  });
  console.log({ upscaledAnimated });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});


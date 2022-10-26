import * as sbv2 from "../lib/cjs";

export const sleep = (ms: number): Promise<any> =>
  new Promise((s) => setTimeout(s, ms));

(async function main() {
  const eventListener = new sbv2.WebsocketEventListener(
    "",
    {
      AggregatorOpenRoundEvent: (event) => {
        console.log(
          "##################\n",
          sbv2.toBase58(new Uint8Array(event.feed_key)),
          "\n##################"
        );
        console.log(event);
      },
    },
    (err) => console.error(err)
  );

  eventListener.start();

  let counter = 0;
  setInterval(() => {
    counter += 1;
    if (counter > 60) {
      throw new Error(`Expired`);
    }
    console.log(`Timer: ${counter * 5} sec / 300 sec`);
  }, 5000);

  //   await sleep(300_000);
})();

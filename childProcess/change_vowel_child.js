const fs = require("fs");

process.on("message", (message) => {
  console.log(`ipc created for CP ${message.vowels}`);
  console.time(`fin reading ${message.vowels}`);
  let largeTxt = fs.readFileSync("../data/large.txt", {
    encoding: "utf8",
  });
  //reading file into mem sync
  console.timeEnd(`fin reading ${message.vowels}`);
  console.log(typeof largeTxt);
  largeTxt = largeTxt.replaceAll(message.vowels[0], message.vowels[1]);

  console.log(
    `finished swapping ${message.vowels[0]} for ${message.vowels[1]}`
  );
  const vowels = message.vowels;
  process.send(largeTxt, vowels);
  process.exit();
});

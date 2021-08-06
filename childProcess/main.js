import * as fs from "fs";
import { fork } from "child_process";
const vowelArr = [
  ["a", "e"],
  ["e", "i"],
  ["i", "o"],
  ["o", "u"],
  ["u", "a"],
];

console.log("starting");
vowelArr.forEach((vowels) => {
  const childProcess = fork(`./change_vowel_child.js`);
  console.log("file to fork exists?", fs.existsSync("./change_vowel_child.js"));
  console.log("childProcess connected", childProcess.connected);
  console.log("vowels sending", vowels);

  console.log(
    `can we send files to childProcess ${vowels}`,
    childProcess.send({ vowels })
  );
  childProcess.send({ vowels });

  childProcess.on("message", (message) => {
    console.log(`parentProcess IPC ${message.vowels}`);
    console.time(`fin write message.`);
    fs.writeFile(
      `./transform_${message.vowels[0]}`,
      message.largeTxt,
      (err) => {
        err
          ? console.log("error writing to file", err)
          : console.timeEnd(`fin write message.`);
      }
    );
  });
});

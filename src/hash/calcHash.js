import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { createHash } from "crypto";
import { createReadStream } from "fs";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const calculateHash = async () => {
  const pathToFile = join(
    directoryOfThisFile,
    "files",
    "fileToCalculateHashFor.txt"
  );

  const readStream = createReadStream(pathToFile);

  const hash = createHash("sha256");

  readStream.pipe(hash);

  hash.on("finish", () => {
    console.log(hash.read().toString("hex"));
  });
};

await calculateHash();

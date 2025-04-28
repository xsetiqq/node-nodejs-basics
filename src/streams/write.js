import { createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const write = async () => {
  const filePath = join(directoryOfThisFile, "files", "fileToWrite.txt");

  const writeStream = createWriteStream(filePath);
  process.stdin.pipe(writeStream);
};

await write();

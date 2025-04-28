import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const read = async () => {
  const filePath = join(directoryOfThisFile, "files", "fileToRead.txt");
  const readStream = createReadStream(filePath);

  readStream.pipe(process.stdout);
};

await read();

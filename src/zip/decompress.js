import { createReadStream, createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createUnzip } from "zlib";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const decompress = async () => {
  const pathToArchive = join(directoryOfThisFile, "files", "archive.gz");
  const pathToFile = join(directoryOfThisFile, "files", "fileToCompress.txt");

  const streamRead = createReadStream(pathToArchive);
  const streamWrite = createWriteStream(pathToFile);
  const gzipStream = createUnzip();

  streamRead.pipe(gzipStream).pipe(streamWrite);
};

await decompress();

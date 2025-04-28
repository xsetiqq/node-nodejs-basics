import { createReadStream, createWriteStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createGzip } from "zlib";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const compress = async () => {
  const pathToFile = join(directoryOfThisFile, "files", "fileToCompress.txt");
  const pathToArchive = join(directoryOfThisFile, "files", "archive.gz");
  const streamRead = createReadStream(pathToFile);
  const streamWrite = createWriteStream(pathToArchive);
  const gzipStream = createGzip();

  streamRead.pipe(gzipStream).pipe(streamWrite);
};

await compress();

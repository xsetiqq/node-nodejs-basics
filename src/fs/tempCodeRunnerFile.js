import fs from "fs/promises";
import { constants } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);
const filePath = join(directoryOfThisFile, "files", "fileToRead.txt");

const read = async () => {
  try {
    await fs.access(filePath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      const a = await fs.readFile(filePath, "utf-8");
      console.log(a);
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await read();

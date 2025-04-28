import fs from "fs/promises";
import { constants } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);
const filePath = join(directoryOfThisFile, "files");

const arr = [];

console.log(filePath);

const list = async () => {
  try {
    await fs.access(filePath, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      const files = await fs.readdir(filePath, { withFileTypes: true });

      for (const file of files) {
        if (file.isFile()) {
          arr.push(file.name);
        }
      }
    } else {
      throw new Error("FS operation failed");
    }
  }
  console.log(arr);
};

await list();

import fs from "fs/promises";
import { constants } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const remove = async () => {
  const filePath = join(directoryOfThisFile, "files", "fileToRemove.txt");

  console.log(filePath);

  try {
    await fs.access(filePath, constants.F_OK);
  } catch (err) {
    throw new Error("FS operation failed");
  }

  await fs.unlink(filePath);
};

await remove();

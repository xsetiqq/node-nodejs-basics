import fs from "fs/promises";
import { constants } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);

const rename = async () => {
  const filePath = join(directoryOfThisFile, "files", "wrongFilename.txt");
  const filePathMd = join(directoryOfThisFile, "files", "wrongFilename.md");

  try {
    await fs.access(filePath, constants.F_OK);
  } catch (err) {
    throw new Error("FS operation failed");
  }

  try {
    await fs.access(filePathMd, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw new Error("FS operation failed");
    }
  }

  await fs.rename(filePath, filePathMd);
};

await rename();

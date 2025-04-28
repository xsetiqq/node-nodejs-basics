import fs from "fs/promises";
import { constants } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const pathToThisFile = fileURLToPath(import.meta.url);
const directoryOfThisFile = dirname(pathToThisFile);
const filePathOriginal = join(directoryOfThisFile, "files");
const filePathCopy = join(directoryOfThisFile, "files_copy");

const copy = async () => {
  try {
    await fs.access(filePathOriginal, constants.F_OK);
  } catch (err) {
    throw new Error("FS operation failed");
  }

  try {
    await fs.access(filePathCopy, constants.F_OK);
    throw new Error("FS operation failed");
  } catch (err) {
    if (err.code === "ENOENT") {
      await fs.mkdir(filePathCopy);

      const files = await fs.readdir(filePathOriginal, { withFileTypes: true });

      for (const file of files) {
        if (file.isFile()) {
          const originalFilePath = join(filePathOriginal, file.name);
          const copyFilePath = join(filePathCopy, file.name);
          await fs.copyFile(originalFilePath, copyFilePath);
        }
      }
    } else {
      throw new Error("FS operation failed");
    }
  }
};

await copy();

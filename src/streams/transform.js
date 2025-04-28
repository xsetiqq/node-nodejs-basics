import { Transform } from "stream";

const transform = async () => {
  class ReverseTransform extends Transform {
    _transform(chunk, encoding, callback) {
      if (encoding !== "buffer") {
        throw new Error("Unsupported encoding. Only 'utf8' is supported.");
      }

      const inputReversed = chunk.toString().split("").reverse().join("");
      callback(null, inputReversed);
    }
  }

  const reverseStream = new ReverseTransform();

  const getReversedText = process.stdin.pipe(reverseStream);
  getReversedText.pipe(process.stdout);
};

await transform();

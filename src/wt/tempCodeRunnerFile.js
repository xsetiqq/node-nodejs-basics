import os from "os";
import { Worker } from "worker_threads";

const performCalculations = async () => {
  const cpucores = os.cpus().length;
  const result = [];
  const workers = [];
  for (let i = 0; i < cpucores; i += 1) {
    const workerPath = new URL("./worker.js", import.meta.url);
    const worker = new Worker(workerPath, { workerData: 10 + i });

    worker.on("message", (data) => {
      result.push({ status: "resolved", data });
    });

    worker.on("error", (err) => {
      console.error(err);
      result.push({ status: "error", data: null });
    });
    workers.push(worker);
  }
  await Promise.allSettled(
    workers.map((worker) => new Promise((res) => worker.on("exit", res)))
  );
  console.log(result);
};

await performCalculations();

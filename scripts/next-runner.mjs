import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const [command, ...args] = process.argv.slice(2);

if (!command) {
  throw new Error("Informe o comando do Next.js: dev, build ou start.");
}

const env = { ...process.env };
const wasmDirectory = join(projectRoot, "node_modules", "@next", "swc-wasm-nodejs");

if (
  process.platform === "win32" &&
  existsSync(join(wasmDirectory, "wasm.js"))
) {
  env.NEXT_TEST_WASM_DIR = wasmDirectory;
}

const nextCli = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
const child = spawn(process.execPath, [nextCli, command, ...args], {
  cwd: projectRoot,
  env,
  stdio: "inherit",
});

child.on("exit", code => {
  process.exit(code ?? 1);
});

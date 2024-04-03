import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["app/sdk.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  splitting: false,
  clean: true,
  dts: true,
  bundle: true,
})

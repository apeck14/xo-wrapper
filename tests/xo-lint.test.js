import { exec } from "child_process";
import { describe, it, expect } from "vitest";
import path from "path";

describe("xo-lint CLI", () => {
  it("should run without crashing on a sample file", (done) => {
    const cliPath = path.resolve("./bin/xo-lint.js");
    const testFile = path.resolve("./tests/sample.js"); // create a simple test JS file

    exec(`node ${cliPath} ${testFile}`, (error, stdout, stderr) => {
      expect(error).toBeNull();
      expect(stdout).toContain("No lint errors"); // or whatever your output is
      done();
    });
  });
});

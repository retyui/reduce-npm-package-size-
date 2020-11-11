import { appendFileSync } from "fs";
import editJsonFile from "edit-json-file";

import SH from "sh-exec";
import {
  examplesDirectories,
  android,
  assetDirectories,
  babelConfig,
  buildScripts,
  configs,
  coverage,
  editors,
  eslintConfig,
  lintstagedrcConfig,
  prettierConfig,
  testDirectories,
  testFiles
} from "./ignores.js";
import { getFiles } from "./files.js";
import { getTable } from "./report.js";

const allIgnores = [
  ...editors,
  ...examplesDirectories,
  ...testDirectories,
  ...android,
  ...assetDirectories,
  ...babelConfig,
  ...buildScripts,
  ...configs,
  ...coverage,
  ...eslintConfig,
  ...lintstagedrcConfig,
  ...prettierConfig,
  ...testFiles
];

const { quiet: sh } = SH;

async function main() {
  const pkg = process.argv[2];

  await sh`rm -rf ./package`;
  const downloadTarZip = await sh`npm view "${pkg}" dist.tarball`;
  await sh`wget -c "${downloadTarZip.trim()}" -O - | tar -xz`;

  const f = editJsonFile(`./package/package.json`, {
    autosave: true
  });

  f.unset("scripts");
  const isHasFiles = f.get("files");

  const npmPathOutputBefore = (await sh`cd package && npm pack --dry-run`).split(
    "\n"
  );
  let npmPathOutput = npmPathOutputBefore;
  let files = getFiles({ npmPathOutput });

  const fixes = [];

  for (const { check, fix } of allIgnores) {
    const needFix = files.some(path => check(path));

    if (needFix) {
      const fixPattern = fix();

      fixes.push(fixPattern);

      if (isHasFiles) {
        f.set("files", [...f.get("files"), `!${fixPattern}`]);
      } else {
        appendFileSync("./package/.npmignore", `\n${fixPattern}\n`);
      }

      npmPathOutput = (await sh`cd package && npm pack --dry-run`).split("\n");
      files = getFiles({ npmPathOutput });
    }
  }

  if (fixes.length === 0) {
    return console.log(" --- xdebug Everithin CORRECT");
  }

  console.log(" --- xdebug OK ---");
  console.log("\n --- xdebug .npmignore: ---\n");

  if (isHasFiles) {
    console.log(`
files: [
${fixes.map(e => JSON.stringify(`!${e}`)).join(",\n")}
]

      `);
  } else {
    console.log(fixes.join("\n"));
  }

  console.log("\n --- xdebug README: ---\n");
  console.log(
    `
[Infrastructure] Reduce npm package size



**To test:**
\`\`\`sh
npm pack --dry-run
\`\`\`


**Diff:**
${getTable({
  npmPathOutputAfter: npmPathOutput,
  npmPathOutputBefore
})}


- [See package content on the web](https://unpkg.com/browse/${pkg}/)

`
  );
}

main().catch(e => {
  console.log(" --- xdebug ERROR:::", e);
});

const getTestFilesByExt = ({ extension, suffix }) => [
  {
    fix: () => `*.${suffix}.${extension}`,
    check: path => path.includes(`.${suffix}.${extension}`)
  },
  {
    fix: () => `*.${suffix}.${extension}x`,
    check: path => path.includes(`.${suffix}.${extension}x`)
  }
];
const getSideBySideCheck = ({ chunk }) => ({
  fix: () => chunk,
  check: path => path.includes(chunk)
});

const getExtension = ({ extension }) => ({
  fix: () => `*.${extension}`,
  check: path => path.endsWith(`.${extension}`)
});

const getDirectory = ({ name }) => ({
  fix: () => name,
  check: path => path.includes(`${name}/`)
});

const getTestFilesBySuffix = ({ suffix }) => [
  ...getTestFilesByExt({ suffix, extension: "js" }),
  ...getTestFilesByExt({ suffix, extension: "ts" }),
  {
    fix: () => `*.${suffix}.d.ts`,
    check: path => path.includes(`.${suffix}.d.ts`)
  },
  {
    fix: () => `*.js.snap`,
    check: path => path.includes(`.js.snap`)
  },
  {
    fix: () => `*.test.js.map`,
    check: path => path.includes(`.test.js.map`)
  }
];

export const testDirectories = [
  getDirectory({ name: "e2e" }),
  getDirectory({ name: "spec" }),
  getDirectory({ name: "tests" }),
  getDirectory({ name: "test" }),
  getDirectory({ name: "powered-test" }),
  getSideBySideCheck({ chunk: "__tests__" }),
  getSideBySideCheck({ chunk: "__snapshots__" })
];

export const assetDirectories = [
  getSideBySideCheck({ chunk: "Documentation" }),
  getSideBySideCheck({ chunk: "docs" }),
  getSideBySideCheck({ chunk: "doc" }),
  getSideBySideCheck({ chunk: "website" }),
  getSideBySideCheck({ chunk: "images" }),
  getSideBySideCheck({ chunk: "assets" })
];

export const examplesDirectories = [
  getDirectory({ name: "example" }),
  getDirectory({ name: "examples" })
];

export const coverage = [
  getDirectory({ name: "coverage" }),
  getSideBySideCheck({ chunk: ".nyc_output" })
];

export const buildScripts = [
  getSideBySideCheck({ chunk: "Makefile" }),
  getSideBySideCheck({ chunk: "Gulpfile.js" }),
  getSideBySideCheck({ chunk: "rollup.config.js" }),
  getSideBySideCheck({ chunk: "Gruntfile.js" })
];

export const configs = [
  {
    fix: () => ".*ignore",
    check: path => path.endsWith("ignore")
  },
  getSideBySideCheck({ chunk: "appveyor.yml" }),
  getSideBySideCheck({ chunk: "circle.yml" }),
  getSideBySideCheck({ chunk: "codeship-services.yml" }),
  getSideBySideCheck({ chunk: "codeship-steps.yml" }),
  getSideBySideCheck({ chunk: "wercker.yml" }),
  getSideBySideCheck({ chunk: ".tern-project" }),
  getSideBySideCheck({ chunk: ".gitattributes" }),
  getSideBySideCheck({ chunk: ".editorconfig" }),
  getSideBySideCheck({ chunk: ".eslintrc" }),
  getSideBySideCheck({ chunk: ".jshintrc" }),
  getSideBySideCheck({ chunk: ".flowconfig" }),
  getSideBySideCheck({ chunk: ".documentup.json" }),
  getSideBySideCheck({ chunk: ".yarn-metadata.json" }),
  getSideBySideCheck({ chunk: ".travis.yml" }),
  getSideBySideCheck({ chunk: "jsconfig.json" }),
  getSideBySideCheck({ chunk: ".watchmanconfig" }),
  getSideBySideCheck({ chunk: ".nvmrc" }),
  getSideBySideCheck({ chunk: ".clang-format" }),
  getSideBySideCheck({ chunk: ".grenrc.js" }),
  getDirectory({ name: ".github" }),
  getDirectory({ name: ".circleci" }),
  getSideBySideCheck({ chunk: "package-lock.json" }),
  getSideBySideCheck({ chunk: "yarn.lock" }),
  getSideBySideCheck({ chunk: ".release-it.json" }),
  getSideBySideCheck({ chunk: ".all-contributorsrc" }),
  getSideBySideCheck({ chunk: ".codeclimate.yml" }),
  getSideBySideCheck({ chunk: ".coveralls.yml" }),
  {
    ...getSideBySideCheck({ chunk: "tsconfig" }),
    fix: () => "tsconfig*.json"
  }
];

export const testFiles = [
  ...getTestFilesBySuffix({ suffix: "test" }),
  ...getTestFilesBySuffix({ suffix: "spec" })
];

export const editors = [
  getSideBySideCheck({ chunk: ".vscode" }),
  getSideBySideCheck({ chunk: ".idea" })
];

export const android = [
  getSideBySideCheck({ chunk: "android/gradlew" }),
  getDirectory({ name: "android/build" }),
  getSideBySideCheck({ chunk: "android/gradlew.bat" }),
  getSideBySideCheck({ chunk: "android/gradle" })
];

export const lintstagedrcConfig = [
  // https://www.npmjs.com/package/lint-staged#configuration
  getSideBySideCheck({ chunk: ".lintstagedrc" }),
  getSideBySideCheck({ chunk: ".lintstagedrc.cjs" }),
  getSideBySideCheck({ chunk: ".lintstagedrc.js" }),
  getSideBySideCheck({ chunk: ".lintstagedrc.json" }),
  getSideBySideCheck({ chunk: ".lintstagedrc.yaml" }),
  getSideBySideCheck({ chunk: ".lintstagedrc.yml" }),
  getSideBySideCheck({ chunk: "lint-staged.config.js" })
];

export const babelConfig = [
  // https://babeljs.io/docs/en/config-files#configuration-file-types
  getSideBySideCheck({ chunk: ".babelrc" }),
  getSideBySideCheck({ chunk: ".babelrc.js" }),
  getSideBySideCheck({ chunk: ".babelrc.cjs" }),
  getSideBySideCheck({ chunk: ".babelrc.json" }),
  getSideBySideCheck({ chunk: ".babelrc.mjs" }),
  getSideBySideCheck({ chunk: "babel.config.cjs" }),
  getSideBySideCheck({ chunk: "babel.config.json" }),
  getSideBySideCheck({ chunk: "babel.config.mjs" }),
  getSideBySideCheck({ chunk: "babel.config.json" }),
  getSideBySideCheck({ chunk: "babel.config.js" }),
  getSideBySideCheck({ chunk: "babel.config.cjs" }),
  getSideBySideCheck({ chunk: "babel.config.mjs" })
];

export const prettierConfig = [
  getSideBySideCheck({ chunk: ".prettierrc" }),
  getSideBySideCheck({ chunk: ".prettierrc.cjs" }),
  getSideBySideCheck({ chunk: ".prettierrc.js" }),
  getSideBySideCheck({ chunk: ".prettierrc.json" }),
  getSideBySideCheck({ chunk: ".prettierrc.json5" }),
  getSideBySideCheck({ chunk: ".prettierrc.toml" }),
  getSideBySideCheck({ chunk: ".prettierrc.yaml" }),
  getSideBySideCheck({ chunk: ".prettierrc.yml" }),
  getSideBySideCheck({ chunk: "prettier.config.cjs" }),
  getSideBySideCheck({ chunk: "prettier.config.js" })
];

export const docs = [
  {
    fix: () => `*.md`,
    check: path =>
      path.endsWith(`.md`) &&
      (!path.toLowerCase().includes("readme") ||
        !path.toLowerCase().includes("changelog"))
  }
];

export const eslintConfig = [
  // https://eslint.org/docs/user-guide/configuring#configuration-file-formats
  getSideBySideCheck({ chunk: ".eslintrc.js" }),
  getSideBySideCheck({ chunk: ".eslintrc.cjs" }),
  getSideBySideCheck({ chunk: ".eslintrc.yaml" }),
  getSideBySideCheck({ chunk: ".eslintrc.yml" }),
  getSideBySideCheck({ chunk: ".eslintrc.json" }),
  getSideBySideCheck({ chunk: ".eslintrc" })
];

//
// buck-out/
// \.buckd/
// lib/android/app/libs
// lib/android/keystores/debug.keystore
//
// wallaby.js
//
//
// AndroidE2E/
// integration/
// playground/
// scripts/
// website/
//
//
// # Xcode
// *.pbxuser
// *.mode1v3
// *.mode2v3
// *.perspectivev3
// *.xcuserstate
// ios/Pods
// ios/build
// *project.xcworkspace*
// *xcuserdata*
//
//
// ehthumbs.db
//
//
//
// android/.settings
// *.coverage.json
//
//

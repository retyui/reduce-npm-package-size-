export const getFiles = ({ npmPathOutput }) => {
  const startIndex = npmPathOutput.findIndex(e =>
    e.includes("Tarball Contents")
  );
  const endIndex = npmPathOutput.findIndex(e => e.includes("Tarball Details"));

  return npmPathOutput
    .slice(startIndex + 1, endIndex)
    .map(path =>
      path
        .trim()
        .replace("npm notice ", "")
        .replace(/^[0-9.a-zA-Z]+\s/, "")
        .trim()
    )
    .sort();
};

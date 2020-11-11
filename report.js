const getSize = ({ searchQuery, npmPathOutput }) => {
  const line = npmPathOutput.find(line => line.includes(searchQuery));

  if (line) {
    return line.split(":")[1].trim();
  }

  return "";
};

export const getTable = ({ npmPathOutputBefore, npmPathOutputAfter }) => {
  const packageSize = getSize({
    npmPathOutput: npmPathOutputBefore,
    searchQuery: "package size:"
  });
  const unpackedSize = getSize({
    npmPathOutput: npmPathOutputBefore,
    searchQuery: "unpacked size:"
  });
  const packageSizeAfter = getSize({
    npmPathOutput: npmPathOutputAfter,
    searchQuery: "package size:"
  });
  const unpackedSizeAfter = getSize({
    npmPathOutput: npmPathOutputAfter,
    searchQuery: "unpacked size:"
  });

  return `|   | package size | unpacked size |
|---|---|---|
|Before| ${packageSize} | ${unpackedSize} |
|After| ${packageSizeAfter} | ${unpackedSizeAfter} |`;
};

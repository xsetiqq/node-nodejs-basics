const parseEnv = () => {
  const envVariables = Object.entries(process.env);
  const rssVariables = envVariables.filter(([key, value]) =>
    key.startsWith("RSS_")
  );
  const formattedVariables = rssVariables.map(
    ([key, value]) => `${key}=${value}`
  );
  const resultString = formattedVariables.join("; ");

  console.log(resultString);
};

parseEnv();

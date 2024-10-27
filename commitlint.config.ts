import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // A new feature
        "fix", // A bug fix
        "docs", // Documentation only changes
        "chore", // Changes to the build process or auxiliary tools and libraries such as documentation generation
        "style", // Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
        "refactor", // A code change that neither fixes a bug nor adds a feature
        "ci", // Changes to our CI configuration files and scripts
        "test", // Adding missing tests or correcting existing tests
        "revert", // Reverts a previous commit
        "perf" // A code change that improves performance
      ]
    ]
  }
};

export default Configuration;

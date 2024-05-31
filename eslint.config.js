import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: { globals: globals.browser }, 
    rules: {
      // Add any additional rules or overrides here
    },
  },
  pluginJs.configs.recommended,
];
//###BABEL###///
//npm install -D @babel/core @babel/cli @babel/preset-env

//VSCODE EXTENTION
//Pretier
//ESLint

//
// npm install -D eslint prettier
// or for interactive shell ->
// npm init @eslint/config

//  npm install -D @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser eslint-config-prettier
// npm install -D lint-staged npm-run-all

//###to check ###//
// npx eslint .

//###to fix ###//
// npx eslint . --fix

//###RULES###//
//eslint:recommended it's good choice, but if we need to change or overwrite some rules
//https://eslint.org/docs/rules/

///### .elsintrc ###//

// "env": {
//     "browser": true,
//     "es2021": true
// },
// "plugins": ["@typescript-eslint/eslint-plugin"],
// "extends": [
//   "eslint:recommended",
//   "plugin:@typescript-eslint/eslint-recommended",
//   "plugin:@typescript-eslint/recommended",
//   "eslint-config-prettier"
// ],
// "rules": {
//   "strict": ["error", "never"]
// },

//### package.json ###//

// "scripts": {
//     "build": "babel src --out-dir dist",
//     "lint": "eslint --ignore-path .gitignore --ext .js,.ts,.tsx .",
//     "check-types": "tsc",
//     "prettier": "prettier --ignore-path .gitignore \"**/*.+(js|json)\"",
//     "format": "npm run prettier -- --write",
//     "check-format": "npm run prettier -- --list-different",
//     "validate": "npm-run-all --parallel check-types check-format lint build"
//   },
//   "devDependencies": {
//     "@babel/cli": "^7.12.8",
//     "@babel/core": "^7.12.9",
//     "@babel/preset-env": "^7.12.7",
//     "@typescript-eslint/eslint-plugin": "^4.9.0",
//     "@typescript-eslint/parser": "^4.9.0",
//     "eslint": "^7.14.0",
//     "eslint-config-prettier": "^6.15.0",
//     "husky": "^4.3.0",
//     "lint-staged": "^10.5.2",
//     "npm-run-all": "^4.1.5",
//     "prettier": "^2.2.1",
//     "typescript": "^4.1.2"
//   }

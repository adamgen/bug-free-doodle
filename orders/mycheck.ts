import * as generate from "./tests/utils/generate";

const { email, password } = generate.signinForm();

console.log(email, password);

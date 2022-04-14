// https://testingjavascript.com/courses/test-node-js-backends
// https://github.com/kentcdodds/testing-node-apps
// https://jestjs.io/docs/cli

// npm install -D jest jest-cli jest-in-case supertest
// npm i -D ts-jest @types/jest

//interactive shell
// "scripts": {
//     "test:watch": "jest --watch",
// }   ---->>>> {some key}
// Watch Usage
//  › Press a to run all tests.
//  › Press f to run only failed tests.
//  › Press q to quit watch mode.
//  › Press p to filter by a filename regex pattern.
//  › Press P to select projects (all selected).
//  › Press t to filter by a test name regex pattern.
//  › Press Enter to trigger a test run.

//#### direct test file with test global ####
// npm install jest --global
// jest {test filename} --verbose
//### Note:
//  You don't have to enter the full path to your test file.
//  The argument is interpreted as a regular expression.
//  Any part of the full path that uniquely identifies a file suffices.
//##

//################## standart test #############################///

// import {isPasswordAllowed} from '../auth'

// test('isPasswordAllowed returns true for valid passwords', () => {
//   expect(isPasswordAllowed('!aBc123')).toBe(true)
// })

// test('isPasswordAllowed returns false for invalid passwords', () => {
//   expect(isPasswordAllowed('a2c!')).toBe(false)
//   expect(isPasswordAllowed('123456!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef!')).toBe(false)
//   expect(isPasswordAllowed('abc123!')).toBe(false)
//   expect(isPasswordAllowed('ABC123!')).toBe(false)
//   expect(isPasswordAllowed('ABCdef123')).toBe(false)
// })

//######### result #######//
// √ isPasswordAllowed returns true for valid passwords (4 ms)
// × isPasswordAllowed returns false for invalid passwords (6 ms)

// ● isPasswordAllowed returns false for invalid passwords

//   expect(received).toBe(expected) // Object.is equality

//   Expected: false
//   Received: true

//     11 |   expect(isPasswordAllowed('123456!')).toBe(false)
//     12 |   expect(isPasswordAllowed('ABCdef!')).toBe(false)
//   > 13 |   expect(isPasswordAllowed('abc123!')).toBe(false)
//        |                                        ^
//     14 |   expect(isPasswordAllowed('ABC123!')).toBe(false)
//     15 |   expect(isPasswordAllowed('ABCdef123')).toBe(false)
//     16 | })

//###################################################################//

//##############  test with cases and more information #############///

// import cases from 'jest-in-case'
// import {isPasswordAllowed} from '../auth'

// function casify(obj) {
//   return Object.entries(obj).map(([name, password]) => ({
//     name: `${password} - ${name}`,
//     password,
//   }))
// }

// cases(
//   'isPasswordAllowed: valid passwords',
//   ({password}) => {
//     expect(isPasswordAllowed(password)).toBe(true)
//   },
//   casify({'valid password': '!aBc123'}),
// )

// cases(
//   'isPasswordAllowed: invalid passwords',
//   ({password}) => {
//     expect(isPasswordAllowed(password)).toBe(false)
//   },
//   casify({
//     'too short': 'a2c!',
//     'no letters': '123456!',
//     'no numbers': 'ABCdef!',
//     'no uppercase letters': 'abc123!',
//     'no lowercase letters': 'ABC123!',
//     'no non-alphanumeric characters': 'ABCdef123',
//   }),
// )

//###### result #####////
// FAIL   final  src/utils/__tests__/auth.final.js (6.624 s)
// isPasswordAllowed: valid passwords
//   √ !aBc123 - valid password (5 ms)
// isPasswordAllowed: invalid passwords
//   √ a2c! - too short
//   √ 123456! - no letters (1 ms)
//   √ ABCdef! - no numbers (2 ms)
//   × abc123! - no uppercase letters (10 ms)
//   √ ABC123! - no lowercase letters
//   √ ABCdef123 - no non-alphanumeric characters

// ● isPasswordAllowed: invalid passwords › abc123! - no uppercase letters

//   expect(received).toBe(expected) // Object.is equality

//   Expected: false
//   Received: true

//###################################################################//

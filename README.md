# Testing node application
 * Trong khóa học này ta dùng thư viện ```jest``` của Facebook.  It works well for testing backends, and it shines when it comes to testing React applications.

 * Trước đây hay dùng thư viện Mocha để test
 * Hiện tại cũng có thể dùng [ava](https://github.com/avajs/ava)

 *  ```js
    npm install --save-dev jest
    ```

 * Let's define the npm script test to execute tests with Jest and to report about the test execution with the verbose style:
    ```js
        {
            //...
            "scripts": {
                "start": "node index.js",
                "dev": "nodemon index.js",
                "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
                "deploy": "git push heroku master",
                "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
                "logs:prod": "heroku logs --tail",
                "lint": "eslint .",
                "test": "jest --verbose"
            },
            //...
        }
    ```

* Jest requires one to specify that the execution environment is Node. This can be done by adding the following to the end of package.json:
    ```js
        {
            //...
            "jest": {
            "testEnvironment": "node"
            }
        }
    ```

* Alternatively, Jest can look for a configuration file with the default name jest.config.js, where we can define the execution environment like this:
    ```js
        module.exports = {
            testEnvironment: 'node',
        };
    ```

* Tạo file for_testing.js trong thư mục utils, file này dùng để phục vụ cho việc áp dụng thư viện jest (để test)
* Tạo thư mục tests để chứa các unit test. Trong thư mục ta tạo 2 file: palindrome.test.js và average.test.js, các file này có convention là có đuôi test.js.
* Finally run file npm run test: npm test



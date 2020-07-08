# 4b_2: SuperTest
* Cài thư viện [supertest](https://github.com/visionmedia/supertest) 
    ```js 
    npm install --save-dev supertest
    ```
* Add file `note_api.test.js` vào thư mục tests, trong file này ta có 33 unit test: `notes are returned as json`, `there are two notes`, `the first note is about HTTP methods`.
    Run test bằng lệnh:
    ```js
    test toàn bộ: npm test
    ```
     ```js
    test theo file: npm test 'note_api.test.js'
    ```
     ```js
    test theo unit test: npm test -- -t 'notes are returned as json'
    ```
    Trong file này ta dùng hàm [expect](https://jestjs.io/docs/en/expect.html#content) của Jest để kiểm tra kết quả test.


    




# 4b_1: Test environment
* Node quy ước chế độ thực thực thi (environment modemode) thông qua biến môi trường: NODE_ENV
* Giờ chúng ta thiết lập biến môi trường cho 3 chế độ chạy là production, development, test như sau:
    ```js
    {
    // ...
    "scripts": {
        "start": "NODE_ENV=production node index.js",
        "dev": "NODE_ENV=development nodemon index.js",
        "build:ui": "rm -rf build && cd ../../../2/luento/notes && npm run build && cp -r build ../../../3/luento/notes-backend",
        "deploy": "git push heroku master",
        "deploy:full": "npm run build:ui && git add . && git commit -m uibuild && git push && npm run deploy",
        "logs:prod": "heroku logs --tail",
        "lint": "eslint .",
        "test": "NODE_ENV=test jest --verbose --runInBand"
    },
    // ...
    }
    ```

* Để ý [runInBand](https://jestjs.io/docs/en/cli.html#--runinband) option. This option will prevent Jest from running tests in parallel; we will discuss its significance once our tests start using the database.
* Có một vấn để nho nhỏ là khi thiêt lập chế chạy như trên thì app không  work trên window. Do đó chúng ta cài thêm thư viện [cross-env](https://www.npmjs.com/package/cross-env) : 
    > ```npm install cross-env```
    chỉnh lại package.json như sau:
    ```js
        {
        // ...
        "scripts": {
            "start": "cross-env NODE_ENV=production node index.js",
            "dev": "cross-env NODE_ENV=development nodemon index.js",
            // ...
            "test": "cross-env NODE_ENV=test jest --verbose --runInBand",
        },
        // ...
        }
    ```
* Bây giờ chúng ta sẽ vào MongoDB Atlas để tạo thêm 1 database dùng để test, thêm hằng số TEST_MONGODB_URI vào ile .env như sau:
    MONGODB_URI='mongodb+srv://fullstackopen:quang2000@cluster0-lbo1o.mongodb.net/fullstackopendb-test?retryWrites=true&w=majority'

    TEST_MONGODB_URI='mongodb+srv://fullstackopen:quang2000@cluster0-lbo1o.mongodb.net/fullstackopendb-test?retryWrites=true&w=majority'

    Thay đổi file config.js trong thư mục utils như sau:
    ```js
        require('dotenv').config()

        let PORT = process.env.PORT
        let MONGODB_URI = process.env.MONGODB_URI
        
        if (process.env.NODE_ENV === 'test') {
            MONGODB_URI = process.env.TEST_MONGODB_URI
        }

        module.exports = {
            MONGODB_URI,
            PORT
        }
    ```


    




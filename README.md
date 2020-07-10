# 4b_9: Eliminating the try catch
* Như ta thấy ở trong code backend các router đều có try catch
    ```js
    try {
        // do the async operations here
    } catch(exception) {
        next(exception)
    }
    ```
* Câu hỏi đặt ra là có cách nào loại bỏ try catch này mà vẫn catch được lỗi hay không? Giải pháp là dùng thư viện `express-async-errors`. Chỉ cần khai báo thư viện này trong file `app.js`, lỗi sẽ được catch như bình thường.
    ```js
    npm install express-async-errors --save
    ```

    ```js
    const config = require('./utils/config')
    const express = require('express')
    require('express-async-errors')
    const app = express()
    const cors = require('cors')
    const notesRouter = require('./controllers/notes')
    const middleware = require('./utils/middleware')
    const logger = require('./utils/logger')
    const mongoose = require('mongoose')

    // ...

    module.exports = app
    ```

* Code trong controller sẽ như sau:
    ```js
    notesRouter.delete('/:id', async (request, response, next) => {
        try {
            await Note.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } catch (exception) {
            next(exception)
        }
    })
    ```
    sau khi loại bỏ try/catchcatch
    ```js
    notesRouter.delete('/:id', async (request, response) => {
        await Note.findByIdAndRemove(request.params.id)
        response.status(204).end()
    })
    ```
    `






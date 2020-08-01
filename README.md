# 4d_0_1_2 Token authorization
* install ```npm install jsonwebtoken --save```
* create login.js in controllers
    * open file app.js và include login.js vào
        ```js
        const loginRouter = require('./controllers/login')
        .....
        .....
        .....
        app.use('/api/login', loginRouter)
        ```
    * Sau đó ta gọi đến login router để tạo token dùng Postman hoặc VisualStudio. Ở đây ta dùng VisualStudio
        ```js
            POST http://localhost:5000/api/login
            Content-Type: application/json

            {
                "username": "quang",    
                "name": "hvquang",
                "password": "123456"
            }
        ```
    * Sau khi có token rồi ta dùng token này để login vào và tạo note

* Ở controller notes.js ta bổ sung code để kiểm tra tính hợp lệ của token
    ```js
        //identify user by token
        const getTokenFrom = request => {
            const authorization = request.get('authorization')
            if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
                return authorization.substring(7)
            }
            return null
        }
        const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
    ```

* Error handling
    * open file middleware.js trong thư mục util và bổ sung thêm code sau:
        ```js
            ......
            else if(error.name === 'JsonWebTokenError'){
                return response.status(401).json({
                    error: 'invalid token'
                })
            }
        ```













# 4c_3: Creating Users
* The password hash is the output of a [one-way](https://en.wikipedia.org/wiki/Cryptographic_hash_function) hash function applied to the user's password. It is never wise to store unencrypted plain text passwords in the database!.
* Let's install the [bcrypt](https://github.com/kelektiv/node.bcrypt.js) package for generating the password hashes:
    ```js
    npm install bcrypt --save
    ```
* Tạo file controllers/users.js
    ```js
    const usersRouter = require('express').Router()
    const User = require('../models/user')

    usersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
    })

    module.exports = usersRouter
    ```
* Nhúng file controllers/users.js vào file app.js
    ```js
    const usersRouter = require('./controllers/users')
    app.use('/api/users', usersRouter)
    ```
* Cài thêm thư viện `npm install --save mongoose-unique-validator` để set unique cho một field nào đó, trong trường hợp này là userName
    * Sau khi cài xong thư viện thì ta phải chỉnh sửa lại model của user như sau:
        ```js
        const mongoose = require('mongoose')
        const uniqueValidator = require('mongoose-unique-validator') //add

        const userSchema = mongoose.Schema({
        username: {
            type: String,
            unique: true //add
        },
        name: String,
        passwordHash: String,
        notes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Note'
            }
        ],
        })

        userSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
            delete returnedObject.passwordHash
        }
        })

        userSchema.plugin(uniqueValidator) //add

        const User = mongoose.model('User', userSchema)

        module.exports = User
        ```












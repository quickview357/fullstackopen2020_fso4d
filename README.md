# 4c_2: Mongoose schema for users
* Giả sử ta tạo bảng User, bảng User và bảng Note có quan hệ 1-nhiều.
* Mongo db là document database, nó ko biết khóa ngoại như cơ sở dữ liệu quan hệ. 
    * Nếu là dữ liệu quan hệ ta sẽ lưu UserID ở bảng Note
    * Còn MongoDb thì có nhiều cách lưu, tùy cách chúng ta thiết kế sao cho phù hợp với ứng dụng.         
        * Bảng User lưu danh sách các Id của Note, còn Note thì lưu Id của User
        * Ví dụ bảng User sẽ lưu danh sách các Note, bảng Note thì lưu User
* Tạo file user.js trong thư mục models. Ta định nghĩ cấu trúc cho bảng User như sau:
    ```js
    const mongoose = require('mongoose')

    const userSchema = new mongoose.Schema({
        username: String,
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
        // the passwordHash should not be revealed
        delete returnedObject.passwordHash
    }
    })

    const User = mongoose.model('User', userSchema)

    module.exports = User
    ```
* Model của bảng Note sẽ thêm đoạn code sau để tham chiếu tới User
    ```js
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  ```














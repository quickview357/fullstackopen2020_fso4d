# Sử dụng thư viện dotenv để tạo biến môi trường, ```npm install dotenv --save'''
* Tạo file .env ở thư mục gốc để lưu biến môi trường:    
    ```js
    MONGODB_URI='......'
    PORT=5000
    ```

# Tạo thư mục models để chứa các model. Trong trường hơp này ta chứ model của note với file note.js. Xem chi tiết nội dung file note.js
* Sau đó ta nhúng file note.js vào index và đồng thời khởi tạo model
    ```js
        const Note = require('./models/note')
    ```

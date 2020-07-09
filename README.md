# 4b_5: Async/Await
* Async/Awaint là 2 keyworks được giới thiệu trong ES7, cho phép chúng ta viết các hàm bất đồng bộ theo cái cách mà code của chúng ta như là đồng bộ.
    ```js
    Note.find({}).then(notes => {
        console.log('operation returned the following notes', notes)
    })
    ```
* Như ở ví dụ trên hàm `Note.find()` trả về một promise, để truy xuất kết quả cuối cùng của hàm này ta phải đăng ký một hàm `callback` trong phương thức `then`.
* Tất cả các code muốn thực thi sau khi hàm `Note.find()` hoàn thành đều phải đặt trong hàm `callback`. Do đó nếu chúng ta muốn thực thi nhiều hàm bất đồng bộ theo một thứ tự nào đó thì code trở nên phức tạp hơn nhiều, các hàm `callback` này sẽ phải lồng nhau theo rất nhiều cấp. Điều này sẽ làm code phức tạp khó đọc và từ đóđó sinh ra một khái niệm gọi là [callback hell](http://callbackhell.com/).
* Để tránh [callback hell](http://callbackhell.com/) chúng ta có thể sử dụng [chaining promises](https://javascript.info/promise-chaining) như sau:
    ```js
    Note.find({})
        .then(notes => {
            return notes[0].remove()
        })
        .then(response => {
            console.log('the first note is removed')
            // more code here
        })
    ```
    Như ví dụ trên ta thấy 2 hàm bất đồng bộ là `Note.find()` và `note[0].remove()` được thực thi theo thứ tự và chúng không lồng nhau, code trở nên rõ ràng hơn.
* Sử dụng `chaining promises` như trên ok, nhưng ta có một cách tốt hơn nữa là dùng `async/await ` như sau:
    ```js
    const main = async () => {
        const notes = await Note.find({})
        console.log('operation returned the following notes', notes)

        const response = await notes[0].remove()
        console.log('the first note is removed')
    }

    main()
    ```
    * Muốn sử dụng `await` thì phải đặt trong một hàm nào đó với từ khóa `async` ở trước (có thể gọi là `async function`). Ở ví dụ trên là đặt trong hàm main
    * `await` phải đi với một hàm trả về `promise`. Ở ví dụt trên hàm `Node.find(), notes[0].remove()` trả về promise
    * Đoạn code trên trông giống như code đồng bộ, rất dễ đọc.
        * Code sẽ dừng lại ở `const notes = await Note.find({})` và đợi cho đến khi promise (hàm `Node.find()` trả về 1 promise) hoàn thành (resolve) và thực thi dòng code kế tiếp







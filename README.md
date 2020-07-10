# 4b_10: Optimizing beforeEach function
* Hàm beforeEach như cũ chạy ok, như có vẻ hơi thủ công
    ```js
    beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()

    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
    })
    ```
    * Ta có thể chỉnh lại như sau:
    ```js
    beforeEach(async () => {
        await Note.deleteMany({})
        console.log('cleared')

        helper.initialNotes.forEach(async (note) => {
            let noteObject = new Note(note)
            await noteObject.save()
            console.log('saved')
        })
        console.log('done')
    })

    test('notes are returned as json', async () => {
        console.log('entered test')
        // ...
    }
    ```
    Đoạn code trên chạy có vẻ không ổn, kết quả in ra sẽ là:
    `
    cleared
    done
    entered test
    saved
    saved
    `
    Mặc dù chúng ta dùng `await` nhưng các dòng lệnh ngoài vòng forEach vẫn tiếp tục chạy, điều này dẫn đến sai kêt quả test, vì code chạy không đúng thứ tự.

* Để giải quyết vấn đề trên ta dùng phương thức [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
    ```js
    beforeEach(async () => {
        await Note.deleteMany({})

        const noteObjects = helper.initialNotes.map(note => new Note(note))
        const promiseArray = noteObjects.map(note => note.save())
        await Promise.all(promiseArray)
    })
    ```
* Ta cũng có thể lấy giá trị trả về của Promise.all:
    ```js
    const results = await Promise.all(promiseArray)
    ```
    `results` chứa các giá trị đã được resolved của mỗi promise theo đúng thứ tự của các promise trong mảng promiseArray

* Promise.all executes the promises it receives in parallel. If the promises need to be executed in a particular order, this will be problematic. In situations like this, the operations can be executed inside of a for...of block, that guarantees a specific execution order.
    ```js
    beforeEach(async () => {
        await Note.deleteMany({})

        for (let note of helper.initialNotes) {
            let noteObject = new Note(note)
            await noteObject.save()
        }
    })
    ```









# 4b_3: Initializing the database before tests
Các unit test của chúng ta ở trên hoạt động tốt, tuy nhiên chúng thật sự hơi tệ vì phụ thuộc vào trạng thái dữ liệu của database. Do đó để cải tiến chúng ta cần reset database và generate test data theo cách được kiểm soát trước khi run test.
* Ở bài trước Jest cho phép đóng kết nối với db sau khi test done bằng lệnh [afterAll](https://jestjs.io/docs/en/api.html#afterallfn-timeout), thì bây jo Jest cũng cung cấp cho ta các [functions](https://jestjs.io/docs/en/setup-teardown.html#content) để run trước khi chạy test, ví dụ [beforeEach](https://jestjs.io/docs/en/setup-teardown.html#content)
* Let's initialize the database before every test with the [beforeEach](https://jestjs.io/docs/en/setup-teardown.html#content) function:
    ```js
    const api = supertest(app)
    const Note = require('../models/note')

    const initialNotes = [
    {
        content: 'HTML is easy',
        important: false,
    },
    {
        content: 'Browser can execute only Javascript',
        important: true,
    },
    ]

    beforeEach(async () => {
    await Note.deleteMany({})

    let noteObject = new Note(initialNotes[0])
    await noteObject.save()

    noteObject = new Note(initialNotes[1])
    await noteObject.save()
    })
    ```
    Sau đó thêm 2 unit test sau vào file note_api.test.jsjs
    ```js
    test('all notes are returned', async () => {
        const response = await api.get('/api/notes')

        expect(response.body).toHaveLength(initialNotes.length)
    })
    
    test('a specific note is within the returned notes', async () => {
        const response = await api.get('/api/notes')

        const contents = response.body.map(r => r.content)

        expect(contents).toContain(
            'Browser can execute only Javascript'
        )
    })
    ```
* Với cách cài đặt như trên thì các unit test vẫn run ok mà ko phụ thuộc vào trạng thái dữ liệu của database.


    




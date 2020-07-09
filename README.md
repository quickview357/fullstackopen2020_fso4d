# 4b_6: Async/Await in backend
* Let's change the backend to async and await. Ở phần backend ta thấy các hoạt động bất đồng bộ đều được thực hiện trong một hàm và như thế là đủ để chuyểnchuyển route handler functions into async functions.
    ```js
    notesRouter.get('/', async (request, response) => { 
        const notes = await Note.find({})
        response.json(notes)
    })
    ```









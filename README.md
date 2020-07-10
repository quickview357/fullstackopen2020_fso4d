# 4b_7: More test and refactoring backend
* Trong phần này ta move những hàm dùng chung vào trong file `test_helper.js`, sau đó dùng nó cho file `note_api.test.js` để test.
* Cần lưu ý là hàm `async` luôn trả về một promise, do đó ta có thể dùng `await` lại cho những hàm này.
    * Ví dụ cho điều này là trong file `test_helper.js` ta có hàm async là `notesInDb`, và khi ta dùng hàm này trong file `note_api.test.js` thì ta có thể `await` lại hàm này.

* Refactoring backend bằng cách dùng `async/await` ta sẽ di chuyển qua branch sausau









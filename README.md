# fullstackopen2020_fso3a: a1_webserver
* Sử dụng thư viện nodemon để khi chúng ta chỉnh sửa lại code thì ko cần restart server mà chỉ cần refresh browser.
```html
npm install --save-dev nodemon
```
* add đoạn code sau vào file package.json
```js
"scripts": {
  "dev": "nodemon index.js"
 },
```
* start server bằng cách:
```html
  npm run dev
```
  


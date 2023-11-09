const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('연결 완료');
})
.catch(err => {
    console.log("백 에러임")
    console.error(err);
})

app.get('/', (req, res, next) => {
    setImmediate(() => { next(new Error('it is an error')) });
    res.send('안녕하세요');
});

app.post('/', (req, res) => {
    console.log(req.body);
    res.json(req.body);
})

// routes\users.js에서 내보낸 라우터를 여기 엔트리 파일에서 가져와야 함
// 여기서 /users 붙여놨으므로 /routes/users.js에서는 /users 생략가능 
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.send(error.message || '서버에서 에러가 났습니다.');
})

app.use(express.static(path.join(__dirname, '../uploads')));

app.listen(port, () => {
    console.log(`${port}번에서 실행되었습니다.`);
});
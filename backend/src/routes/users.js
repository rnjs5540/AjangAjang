// 유저에 관한 라우트들 
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');

router.get('/auth', auth, (req, res) => {
    // status는 안넣어도 express가 자동으로 넣어주기도 함
    return res.json({
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

router.post('/register', async (req, res, next) => {
    // 유저 객체를 만들고 user.save()하면 자동으로 MongoDB에 저장됨
    try {
        const user = new User(req.body);
        await user.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log('에러: ' + error);
        next(error);
    }
})

router.post('/login', async (req, res) => {
    console.log(req)
    // req.body => email, password
    try {
        // 존재하는 유저인지 확인
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send("Auth failed, email not found");
        }

        // 비밀번호가 올바른 것인지 체크
        const isMatch = await user.comparePassword(req.body.password);  // plain password
        if (!isMatch) {
            return res.status(400).send("Wrong Password");
        }

        const payload = {
            userId: user._id.toHexString(), // mongoDB의 id는 object id로 되어있기 떄문에 바꿔줌
        }

        // token을 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'})
         
        return res.json({user, accessToken})
        
    } catch (error) {
        console.log('에러: ' + error);
        next(error);
    }
})

router.post('/logout', auth, async (req, res, next) => {
    // auth 통과하면 올바른 유저
    try {
        return res.sendStatus(200);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const Joi = require('Joi');
const _ = require('lodash');
const userModel = require('../model/user-inform');
const jwt = require("jwt-simple");
const dotenv = require('dotenv');
dotenv.config();



const login_schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});



router.get('/', async (req, res) => {
    const query = await userModel.find();
    console.log(query);
    res.json();
})

router.post('/', async (req, res) => {
    const { error: validated_error, value: sanitized_data} =
        login_schema.validate(req.body);
    if (validated_error) {
        console.error('this is login validated error', validated_error);
    }
    try{
        const data = await userModel.findOne({username: _.get(sanitized_data, 'username')});
        console.log(data);
        if (data == null) {
            console.error("Not have data in this id");
            res.status(400);
            res.json({ ok: false, status: 400, error: "user"})
        }
        console.log(data);
        const isValid = (passwordHash.verify( _.get(sanitized_data, 'password'), _.get(data, 'hash_password')));
        const expiredTime = new Date();
        expiredTime.setHours(expiredTime.getHours()+3);
        if (isValid) {
            const jwt_payload = {
                username: _.get(sanitized_data, 'username'),
                _id: _.get(data, '_id'),
                expired_at: expiredTime
            }
            const jwt_code = await jwt.encode(jwt_payload, process.env.JWT_SECRETE);
            res.setHeader('authorization', jwt_code);
            res.status(200);
            res.json({ ok: true, status: 200 , authorization: jwt_code});
        }
    }
    catch(error){
        console.error("this is login error", error);
    }

})

module.exports = router;

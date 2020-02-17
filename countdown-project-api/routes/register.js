const express = require('express');
const router = express.Router();
const passwordHash = require('password-hash');
const Joi = require('Joi');
const _ = require('lodash');
const userModel = require('../model/user-inform');



const register_schema = Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    username: Joi.string(),
    email: Joi.string(),
    password: Joi.string(),
    created_at: Joi.date()
});

const checkDependenceUser = async (username) => {
  const userData = await userModel.find({ username: username });
  if (userData == null){
    return false;
  }
  return true;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async (req, res) => {
  const data = await req.body;
  data.created_at = new Date();
  console.log(data);
  const { error: validated_error, value: sanitized_data} = register_schema.validate(data);
  if (validated_error){
    res.status(400);
    res.json({ ok: false, status: 400 });
    throw new Error('validated data in register is error', validated_error);
  }
  if (checkDependenceUser( _.get(sanitized_data, 'username'))) {
    res.status(400);
    res.json({ ok: false, status: 400 });
    throw new Error('It\'s already has this username in database');
  }
  console.log(passwordHash.verify( _.get(sanitized_data, 'password'), 'sha1$c26614d9$1$c67dfbf56923e712f4fc291d1681b1169a98e022'));
  sanitized_data ['hash_password'] = passwordHash.generate(sanitized_data['password']);
  const payload = await delete sanitized_data.password;
  console.log(sanitized_data)
  console.log(payload);
  try{
    const resCreated = await userModel.create(sanitized_data);
    console.log('ID is: ',resCreated.id);
    res.status(200);
    res.json({ ok: true});
  }
  catch(error){
    res.status(400);
    res.json({ ok: false, status: 400, error: error});
    throw new Error('created user information is error', error);
  }
})

module.exports = router;

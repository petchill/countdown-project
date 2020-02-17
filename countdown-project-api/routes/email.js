var express = require('express');
var router = express.Router();
const axios = require('axios');

const emailApi = axios.create({
    baseURL: "https://api.postmarkapp.com",
    timeout: 2000,
    header: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Postmark-Server-Token": "POSTMARK_API_TEST"
    }
})

router.post('/', async (req, res) => {
    const reqEmail = {
        From: "songpon111333@gmail.com",
        To: "songpon111333@gmail.com",
        TextBody: "Hello"
    }
    const response = await emailApi.post('/email',reqEmail);
    
})

module.exports = router;
/**
 * TODO 1: SETUP SERVER USING EXPRESS.JS.
 * UBAH SERVER DI BAWAH MENGGUNAKAN EXPRESS.JS.
 * SERVER INI DIBUAT MENGGUNAKAN NODE.JS NATIVE.
 */
const express = require("express");
const router = require('./routes/api.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(router);

app.listen(3000);

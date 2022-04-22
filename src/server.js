require('dotenv/config')
const express = require("express");
const AdminBro = require('admin-bro');
const options = require('./admin.options')
const buildAdminRouter = require('./admin.router')
const {mongoose} = require('mongoose')

const app = express();

const run = async () => {
    
    await mongoose.connect(`${process.env.MONGO_URL}`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })

    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);

    app.use(admin.options.rootPath,router);

    app.listen(process.env.PORT, () => { console.log(`Server is run in port: ${process.env.PORT}`)});
}

module.exports = run;


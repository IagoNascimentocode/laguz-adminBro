const AdminBro = require('admin-bro');
const { buildAuthenticatedRouter } = require('admin-bro-expressjs');
const express = require('express');
const { User } = require('./user/user.model');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const buildAdminRouter = (admin) => {
    const router = buildAuthenticatedRouter(admin, {
        cookieName: 'admin-bro',
        cookiePassword: 'superlongandcomplicatedname',
        authenticate: async (email, password) => {
            const user = await User.findOne({ email })

            if (user && await argon2.verify(user.encryptedPassword, password)) {
                return user.toJSON()
            }
            return null;
        },
    }, null,
        {
            resave: false,
            saveUninitialized: true,
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_URL
            }) 
        }
    );
    return router;
};



module.exports = buildAdminRouter;
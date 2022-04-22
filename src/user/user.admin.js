const AdminBro = require('admin-bro')
const { before:passwordBeforeHook,after:passwordAfterHook } = require('./actions/password.hook')

const optionsUser = {
    properties: {
        encryptedPassword: {
           isVisible: false
        },
        created_at: {
            isVisible: false,edit:false,show:true
        },
        password: {
            type: 'password' ,
        },
    },
    actions: {
        new: {
            after:passwordAfterHook,
            before:passwordBeforeHook,
        },
        edit:{
            after:passwordAfterHook,
            before:passwordBeforeHook,
        }
    }
}

module.exports = optionsUser

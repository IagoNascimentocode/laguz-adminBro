const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const {User} = require('./user/user.model')
const optionsUser = require('./user/user.admin')

const {Campaing} = require('./campaing/campaing.model')
const optionsCampaing = require('./campaing/campaing.admin')

const dashboard = require('./components/components.lead.jsx')

const options = {
    resources:[
        {resource:User,options:optionsUser},
        {resource:Campaing,options:optionsCampaing}
    ],
    branding:{
        logo:false,
        companyName:"Laguz Opportunities",
        softwareBrothers:true
    },
    locale:{
        translations:{
            labels:{
                User:"Usuarios",
                Campaing:"Campanhas"
            }
        }
    },
    dashboard:{
        component:AdminBro.bundle(dashboard)
    }

};

module.exports = options;
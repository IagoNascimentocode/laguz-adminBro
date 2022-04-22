const AdminBro = require('admin-bro')
const {before,after} = require('./actions/createCampaing.hook')
const express = require('express')

const optionsCampaing = {
    properties: {
        description:{
            type:"richtext",
            isVisible:{list:false,show:true,filter:false,edit:true}
        },
        isDead:{
            availableValues:[
                {value:"SIM",label:"Sim"},
                {value:"NAO",label:"Não"}
            ]
        },
        type:{
            availableValues:[
                {value:"A",label:"Aposentado"},
                {value:"P",label:"Pensionista"}
            ]
        },
        gender:{
            availableValues:[
                {value:"M",label:"Masculino"},
                {value:"F",label:"Feninino"}
            ]
        },
        phones:{
            isVisible:{list:true,filter:true,edit:false,show:true}
        },
        created_at: {
            isVisible: {list:true,filter:true,show:true,edit:false}
        },
    },
    actions:{
        new:{after,before},
        DispararCampanha:{
            actionType:'record',
            isVisible:true,
            handler: async (request,response,context) => {
                const phones = context.record.params
                console.log(phones)
            }
        },
        Statistics: {
            actionType: 'bulk',
            handler: async (request, response, context) => {

                context.records.forEach(element =>{
                    console.log(element)
                })
            }
        },
    }
}

module.exports = optionsCampaing
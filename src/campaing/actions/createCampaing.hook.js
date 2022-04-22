const AdminBro = require('admin-bro');
const axios = require('axios');

const after = async (response) => {

    if (response.record && response.record.errors) {
        response.record.errors.password = response.record.errors.encryptedPassword;

    }
    return response;
}

const before = async (request) => {

    if (request.method === 'post') {

        const {type ,isDead,age,document,gender,name,description, ...otherParams} = request.payload;


        let url = `https://laguz-gateway-hml.laguz.com.br/leads/list?page=1&pageSize=50`
        console.log(type,isDead,age,document,gender)
        if(type){
            url = url.concat(`&filters=type:${type}`)
        }
        if(isDead){
            url = url.concat(`&filters=isDead:${isDead}`)
        }
        if(age){
            url = url.concat(`&filters=age:${age}`)
        }
        if(document){
            url = url.concat(`&filters=document:${document}`)
        }
        if(gender){
            url = url.concat(`&filters=gender:${gender}`)
        }        
        console.log(url)
        const leads = await axios.get(`${url}`,
        {
            headers:{
                Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzaW9ucyI6WyJMaXN0TGVhZHMiLCJVcGRhdGVMZWFkcyJdLCJpYXQiOjE2NDY2NTI2NDIsImV4cCI6MTg5OTk5OTk5OX0.zYw5FHvZ56eDKJ0eCn5t9ub8magkv6rm90Ra_qHV9Eg"
            }
        })
        .then(async response => {
            
            return response.data.data.leads
        })
        .catch(err => {
            
            throw new Error(err)
            
        })

        let phones = []
        const contacts = leads.map(lead =>{

            return lead.contacts
        }) 
        
        contacts.forEach(contact =>{
            
            if(contact !== undefined){

                contact.forEach(contact =>{
                    phones.push(contact.cellphone)
                })
                
            }
        }) 

        return {
            ...request,
            payload: {
                otherParams,
                type,isDead,age,document,gender,phones,name,description
            },
        }
        }


        return request
    }


module.exports = { before, after }
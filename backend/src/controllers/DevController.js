//responsavel por receber a requisicao, ativar e devolver o que precisar
const axios = require('axios');
const Dev = require('../models/Dev');
const { findConnections, sendMessage } = require('../websocket')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(request, response) {
     const devs = await Dev.find();

     return response.json(devs)  
    },

    async store(request, response){
    const {github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({ github_username });

    if(!dev){
        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
            //continuar
        const {name = login, avatar_url, bio } = apiResponse.data;
            
        const techsArray = parseStringAsArray(techs);
            
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }
        
        dev = await Dev.create({
            github_username,
            name,
            avatar_url,
            bio,
            techs: techsArray,
            location
        })
        //filtrar as conecções que estão há no máximo 10km de distância e
        //que o novo Dev tenha pelo menos uma das tecnologias filtradas

        const sendSocketMessageTo = findConnections(
            { latitude, longitude },
            techsArray,
        )
        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return response.json(dev);
    }
}
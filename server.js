const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    const {limit, sortby, sortdir} = req.query
    
    let query = db('accounts')
    if (sortby || sortdir) query = query.orderBy(sortby||'id', sortdir)
    if (!isNaN(limit)) query = query.limit(limit)
    
    query
    .then(resp => {
        // console.log(resp)
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.get('/api/accounts/:id', (req, res) => {
    db('accounts').where({id: req.params.id}).first()
    .then(resp => {
        // console.log(resp)
        if (resp) res.json(resp)
        else res.status(404).json({message: `No account of id ${req.params.id} was found.`})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.post('/api/accounts', validateAccountBody, (req, res) => {
    const {name, budget} = req.body
    db('accounts').insert({name, budget})
    .then(resp => {
        // console.log(resp)
        res.status(201).json({id: resp[0]})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.put('/api/accounts/:id', validateAccountBody, (req, res) => {
    const {name, budget} = req.body
    const id = req.params.id
    
    db('accounts').where({id}).update({name, budget})
    .then(resp => {
        // console.log(resp)
        if (resp) res.sendStatus(204)
        else res.status(404).json({message: `No account of id ${req.params.id} was found.`})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.delete('/api/accounts/:id', (req, res) => {
    const id = req.params.id
    
    db('accounts').where({id}).delete()
    .then(resp => {
        console.log(resp)
        if (resp) res.sendStatus(204)
        else res.status(404).json({message: `No account of id ${req.params.id} was found.`})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

function validateAccountBody(req, res, next) {
    if (!req.body) return res.status(400).json({message: 'missing body data'})
    const {name, budget} = req.body
    if (!name || typeof name != 'string' || name.length > 255) {
        return res.status(400).json({message: `missing required 'name' field or exceeded 255 character limit`})
    }
    if (isNaN(budget)) {
        return res.status(400).json({message: `missing required 'budget' field or value was not a number`})
    }

    db('accounts').where({name}).first()
    .then(resp => {
        // console.log(resp)
        if (resp && (!req.params.id || resp.id != Number(req.params.id))) res.status(400).json({message: `an account with name: ${name} already exists.`})
        else next()
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
}

// function validateAccountId(req, res, next) {
//     db('accounts').where({id: req.params.id}).first()
//     .then(resp => {
//         // console.log(resp)
//         if (resp) {
//             res.locals.account = resp
//             next()
//         }
//         else res.status(404).json({message: `No account of id ${req.params.id} was found.`})
//     })
//     .catch(err => {
//         console.error(err)
//         res.sendStatus(500)
//     })
// }

module.exports = server;
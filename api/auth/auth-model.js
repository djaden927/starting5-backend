const db = require('../data/db-config')

function getUserById(id){
    return db('users').where('id', id).first()
}

function getUserByUsername(filter){
    return db('users').where(filter).first()
}

async function addUser(user) {
    const [newUserObject] = await db('users').insert(user, ['user_id', 'username'])
    return newUserObject 
}


module.exports = {
    getUserById,
    addUser,
    getUserByUsername
}
const models = {
    usersModel: require('./nosql/users'),
    tracksModel: require('./nosql/tracks'),
    storageModel: require('./nosql/storage'),
    authModel: require('./nosql/auth')
}

module.exports = models
const { bindUserWithRequest } = require('./authMiddleware')
const setLocals = require('./setLocals')




module.exports = [
    bindUserWithRequest,
    setLocals
]
const ModelDb = require('../options/operate')

function resStatus (reverseData, ctx) {
    ctx.res.statusCode = '100'
    ctx.res.message = 'ok'
    ctx.body = {'data': reverseData, 'status': ctx.res.statusCode, 'message':ctx.res.message}
}

async function saveDate (ctx) {
    const obj =ctx.request.body
    await ModelDb.save(obj)
    let data = await ModelDb.query()
    let reverseData = data.reverse()
    resStatus(reverseData, ctx)
}

async function getDate (ctx) {
    let data = await ModelDb.query()
    let reverseData = data.reverse()
    resStatus(reverseData, ctx)
}

module.exports = {
    saveDate,
    getDate
}
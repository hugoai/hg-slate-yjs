const Y = require('yjs');

const setValue = (doc, op)=>{
    if(!doc.hasOwnProperty('data')){
        doc.set("data", new Y.Map())
    }
    const syncData = doc.get('data')

    for (const [key, value] of Object.entries(op.properties.data.toJSON())) {
        syncData.set(key, value)
    }
    
    return doc
}


module.exports = setValue;
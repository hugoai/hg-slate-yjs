const Y = require('yjs');

const setValue = (doc, op)=>{
    const newData = new Y.Map()

    for (const [key, value] of Object.entries(op.properties.data.toJSON())) {
        newData.set(key, value)
    }

    doc.set("data", newData)
    
    return doc
}


module.exports = setValue;

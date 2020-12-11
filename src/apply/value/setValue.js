

const setValue = (doc, op)=>{
    const syncData = doc.get('data')

    for (const [key, value] of Object.entries(op.properties)) {
        syncData.set(key, value)
    }
    
    return doc
}


module.exports = setValue;
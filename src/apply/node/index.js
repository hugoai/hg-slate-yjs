const insertNode = require('./insertNode');
const mergeNode = require('./mergeNode');
const moveNode = require('./moveNode');
const removeNode = require('./removeNode');
const setNode = require('./setNode');
const splitNode = require('./splitNode');

const mapper = {
    insert_node: insertNode,
    merge_node: mergeNode,
    move_node: moveNode,
    remove_node: removeNode,
    set_node: setNode,
    split_node: splitNode,
};

module.exports = mapper;

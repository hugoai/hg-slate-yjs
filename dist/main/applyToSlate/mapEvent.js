"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
function translateMapEvent(event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    const targetSyncElement = event.target;
    const keyChanges = Array.from(event.changes.keys.entries());
    const newProperties = Object.fromEntries(keyChanges.map(([key, info]) => [
        key,
        info.action === 'delete' ? null : targetSyncElement.get(key),
    ]));
    const documentChanges = keyChanges.find((change) => change[0] === 'document');
    if (event.path.length === 0 &&
        documentChanges &&
        documentChanges[1].action === 'add') {
        const operations = [];
        const nodes = newProperties.document.toJSON();
        nodes.forEach((node, index) => operations.push({
            type: 'insert_node',
            path: [index],
            node,
        }));
        return operations;
    }
    // If it's not an operation to insert new Slate nodes and it has no path, it has no use.
    if (!targetPath.length) {
        return [];
    }
    return [
        { type: 'set_node', newProperties, properties: {}, path: targetPath },
    ];
}
exports.default = translateMapEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1NsYXRlL21hcEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR0EsOENBQStDO0FBRS9DOzs7O0dBSUc7QUFDSCxTQUF3QixpQkFBaUIsQ0FDdkMsS0FBMkI7SUFFM0IsTUFBTSxVQUFVLEdBQUcsSUFBQSxxQkFBVyxFQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQyxNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO0lBRXRELE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM1RCxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUN0QyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzlCLEdBQUc7UUFDSCxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQzdELENBQUMsQ0FDSCxDQUFDO0lBRUYsTUFBTSxlQUFlLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsQ0FBQyxDQUFDO0lBQzlFLElBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUN2QixlQUFlO1FBQ2YsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQ25DO1FBQ0EsTUFBTSxVQUFVLEdBQW9CLEVBQUUsQ0FBQztRQUN2QyxNQUFNLEtBQUssR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBWSxDQUFDO1FBQ3hELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDNUIsVUFBVSxDQUFDLElBQUksQ0FBQztZQUNkLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNiLElBQUk7U0FDTCxDQUFDLENBQ0gsQ0FBQztRQUVGLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0lBRUQsd0ZBQXdGO0lBQ3hGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3RCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxPQUFPO1FBQ0wsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUU7S0FDdEUsQ0FBQztBQUNKLENBQUM7QUF6Q0Qsb0NBeUNDIn0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const slate_1 = require("slate");
const convert_1 = require("../utils/convert");
/**
 * Translates a Yjs map event into a slate operations.
 *
 * @param event
 */
function translateMapEvent(editor, event) {
    const targetPath = (0, convert_1.toSlatePath)(event.path);
    const targetSyncElement = event.target;
    const targetElement = slate_1.Node.get(editor, targetPath);
    const keyChanges = Array.from(event.changes.keys.entries());
    const newProperties = Object.fromEntries(keyChanges.map(([key, info]) => [
        key,
        info.action === 'delete' ? null : targetSyncElement.get(key),
    ]));
    const properties = Object.fromEntries(keyChanges.map(([key]) => [key, targetElement[key]]));
    if (Object.keys(keyChanges).length === 1 &&
        keyChanges[0][0] === 'document' &&
        keyChanges[0][1].action === 'add') {
        const operations = [];
        const nodes = newProperties.document.toJSON();
        nodes.forEach((node, index) => operations.push({
            type: 'insert_node',
            path: [index],
            node,
        }));
        return operations;
    }
    if (keyChanges[0][0] === 'data' && !targetPath.length) {
        return [];
    }
    return [{ type: 'set_node', newProperties, properties, path: targetPath }];
}
exports.default = translateMapEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1NsYXRlL21hcEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQW9EO0FBR3BELDhDQUErQztBQUUvQzs7OztHQUlHO0FBQ0gsU0FBd0IsaUJBQWlCLENBQ3ZDLE1BQWMsRUFDZCxLQUEyQjtJQUUzQixNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFXLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7SUFDdEQsTUFBTSxhQUFhLEdBQUcsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFbkQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDOUIsR0FBRztRQUNILElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7S0FDN0QsQ0FBQyxDQUNILENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDckQsQ0FBQztJQUNGLElBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUNwQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVTtRQUMvQixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxLQUFLLEtBQUssRUFDakM7UUFDQSxNQUFNLFVBQVUsR0FBb0IsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFZLENBQUM7UUFDeEQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUM1QixVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ2QsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ2IsSUFBSTtTQUNMLENBQUMsQ0FDSCxDQUFDO1FBRUYsT0FBTyxVQUFVLENBQUM7S0FDbkI7SUFDRCxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO1FBQ3JELE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQXpDRCxvQ0F5Q0MifQ==
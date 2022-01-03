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
    return [{ type: 'set_node', newProperties, properties, path: targetPath }];
}
exports.default = translateMapEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwRXZlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1NsYXRlL21hcEV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQW9EO0FBR3BELDhDQUErQztBQUUvQzs7OztHQUlHO0FBQ0gsU0FBd0IsaUJBQWlCLENBQ3ZDLE1BQWMsRUFDZCxLQUEyQjtJQUUzQixNQUFNLFVBQVUsR0FBRyxJQUFBLHFCQUFXLEVBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLE1BQXFCLENBQUM7SUFDdEQsTUFBTSxhQUFhLEdBQUcsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFbkQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQzVELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQ3RDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDOUIsR0FBRztRQUNILElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7S0FDN0QsQ0FBQyxDQUNILENBQUM7SUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUNuQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDckQsQ0FBQztJQUNGLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLENBQUMsQ0FBQztJQUM5RSxJQUNFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUM7UUFDdkIsZUFBZTtRQUNmLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUNuQztRQUNBLE1BQU0sVUFBVSxHQUFvQixFQUFFLENBQUM7UUFDdkMsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQVksQ0FBQztRQUN4RCxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQzVCLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDZCxJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDYixJQUFJO1NBQ0wsQ0FBQyxDQUNILENBQUM7UUFFRixPQUFPLFVBQVUsQ0FBQztLQUNuQjtJQUVELHdGQUF3RjtJQUN4RixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtRQUN0QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUE1Q0Qsb0NBNENDIn0=
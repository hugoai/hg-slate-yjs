import invariant from 'tiny-invariant';
import { toSlatePath } from '../utils/convert';
/**
 * Translates a Yjs text event into a slate operations.
 *
 * @param event
 */
export default function translateTextEvent(event) {
    const targetPath = toSlatePath(event.path);
    let offset = 0;
    const ops = [];
    event.changes.delta.forEach((delta) => {
        var _a, _b;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const deleteLength = (_b = delta.delete) !== null && _b !== void 0 ? _b : 0;
            let removalText = '';
            for (let index = 0; index < deleteLength; index++) {
                // Yjs doesn't expose the portion of the string that was removed and Slate only
                // uses it to get the length of the substring that is going to be removed.
                // This populates the substring with dummy text making the lengths match.
                removalText += '0';
            }
            ops.push({
                type: 'remove_text',
                offset,
                path: targetPath,
                text: removalText,
            });
        }
        if ('insert' in delta) {
            invariant(typeof delta.insert === 'string', `Unexpected text insert content type: expected string, got ${typeof delta.insert}`);
            ops.push({
                type: 'insert_text',
                offset,
                text: delta.insert,
                path: targetPath,
            });
            offset += delta.insert.length;
        }
    });
    return ops;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dEV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwcGx5VG9TbGF0ZS90ZXh0RXZlbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxTQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFFdkMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRS9DOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUN4QyxLQUFtQjtJQUVuQixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLE1BQU0sR0FBRyxHQUFvQixFQUFFLENBQUM7SUFFaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1FBQ3BDLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixNQUFNLElBQUksTUFBQSxLQUFLLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsTUFBTSxZQUFZLEdBQUcsTUFBQSxLQUFLLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxZQUFZLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2pELCtFQUErRTtnQkFDL0UsMEVBQTBFO2dCQUMxRSx5RUFBeUU7Z0JBQ3pFLFdBQVcsSUFBSSxHQUFHLENBQUM7YUFDcEI7WUFFRCxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNQLElBQUksRUFBRSxhQUFhO2dCQUNuQixNQUFNO2dCQUNOLElBQUksRUFBRSxVQUFVO2dCQUNoQixJQUFJLEVBQUUsV0FBVzthQUNsQixDQUFDLENBQUM7U0FDSjtRQUVELElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixTQUFTLENBQ1AsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDaEMsNkRBQTZELE9BQU8sS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUNuRixDQUFDO1lBRUYsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDUCxJQUFJLEVBQUUsYUFBYTtnQkFDbkIsTUFBTTtnQkFDTixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU07Z0JBQ2xCLElBQUksRUFBRSxVQUFVO2FBQ2pCLENBQUMsQ0FBQztZQUVILE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUMvQjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIn0=
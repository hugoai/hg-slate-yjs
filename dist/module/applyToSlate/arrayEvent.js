import invariant from 'tiny-invariant';
import { toSlateNode, toSlatePath } from '../utils/convert';
/**
 * Translates a Yjs array event into a slate operations.
 *
 * @param event
 */
export default function translateArrayEvent(event) {
    const targetPath = toSlatePath(event.path);
    let offset = 0;
    const ops = [];
    event.changes.delta.forEach((delta) => {
        var _a;
        if ('retain' in delta) {
            offset += (_a = delta.retain) !== null && _a !== void 0 ? _a : 0;
        }
        if ('delete' in delta) {
            const removePath = [...targetPath, offset];
            const d = delta.delete || 0;
            for (let i = 0; i < d; i += 1) {
                ops.push({
                    type: 'remove_node',
                    path: removePath,
                    node: { children: [] },
                });
            }
        }
        if ('insert' in delta) {
            invariant(Array.isArray(delta.insert), `Unexpected array insert content type: expected array, got ${JSON.stringify(delta.insert)}`);
            const toInsert = delta.insert.map(toSlateNode);
            toInsert.forEach((node, i) => {
                ops.push({
                    type: 'insert_node',
                    path: [...targetPath, offset + i],
                    node,
                });
            });
            offset += delta.insert.length;
        }
    });
    return ops;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyYXlFdmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHBseVRvU2xhdGUvYXJyYXlFdmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLFNBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRTVEOzs7O0dBSUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLG1CQUFtQixDQUN6QyxLQUFpQztJQUVqQyxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztJQUNmLE1BQU0sR0FBRyxHQUFvQixFQUFFLENBQUM7SUFFaEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1FBQ3BDLElBQUksUUFBUSxJQUFJLEtBQUssRUFBRTtZQUNyQixNQUFNLElBQUksTUFBQSxLQUFLLENBQUMsTUFBTSxtQ0FBSSxDQUFDLENBQUM7U0FDN0I7UUFFRCxJQUFJLFFBQVEsSUFBSSxLQUFLLEVBQUU7WUFDckIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFHLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztZQUM1QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1AsSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxVQUFVO29CQUNoQixJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO2lCQUN2QixDQUFDLENBQUM7YUFDSjtTQUNGO1FBRUQsSUFBSSxRQUFRLElBQUksS0FBSyxFQUFFO1lBQ3JCLFNBQVMsQ0FDUCxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFDM0IsNkRBQTZELElBQUksQ0FBQyxTQUFTLENBQ3pFLEtBQUssQ0FBQyxNQUFNLENBQ2IsRUFBRSxDQUNKLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUUvQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO29CQUNQLElBQUksRUFBRSxhQUFhO29CQUNuQixJQUFJLEVBQUUsQ0FBQyxHQUFHLFVBQVUsRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDO29CQUNqQyxJQUFJO2lCQUNMLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQy9CO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMifQ==
import { getTarget } from '../../path';
/**
 * Applies a setNode operation to a SharedType
 *
 * @param doc
 * @param op
 */
export default function setNode(doc, op) {
    const node = getTarget(doc, op.path);
    Object.entries(op.newProperties).forEach(([key, value]) => {
        if (key === 'children' || key === 'text') {
            throw new Error(`Cannot set the "${key}" property of nodes!`);
        }
        node.set(key, value);
    });
    Object.entries(op.properties).forEach(([key]) => {
        // eslint-disable-next-line no-prototype-builtins
        if (!op.newProperties.hasOwnProperty(key)) {
            node.delete(key);
        }
    });
    return doc;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Tm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHBseVRvWWpzL25vZGUvc2V0Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRXZDOzs7OztHQUtHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzdCLEdBQWUsRUFDZixFQUFvQjtJQUVwQixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQWdCLENBQUM7SUFFcEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUN4RCxJQUFJLEdBQUcsS0FBSyxVQUFVLElBQUksR0FBRyxLQUFLLE1BQU0sRUFBRTtZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixHQUFHLHNCQUFzQixDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRTtRQUM5QyxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDbEI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyJ9
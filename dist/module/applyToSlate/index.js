import { Editor } from 'slate';
import * as Y from 'yjs';
import translateArrayEvent from './arrayEvent';
import translateMapEvent from './mapEvent';
import translateTextEvent from './textEvent';
/**
 * Translates a Yjs event into slate editor operations.
 *
 * @param event
 */
export function translateYjsEvent(event) {
    if (event instanceof Y.YArrayEvent) {
        return translateArrayEvent(event);
    }
    if (event instanceof Y.YMapEvent) {
        return translateMapEvent(event);
    }
    if (event instanceof Y.YTextEvent) {
        return translateTextEvent(event);
    }
    throw new Error('Unsupported yjs event');
}
/**
 * Applies multiple yjs events to a slate editor.
 */
export function applyYjsEvents(editor, events) {
    Editor.withoutNormalizing(editor, () => {
        events.forEach((event) => translateYjsEvent(event).forEach((op) => {
            editor.apply(op);
        }));
    });
}
export const toSlateOps = (events) => {
    const operations = [];
    events.forEach((event) => operations.push(...translateYjsEvent(event)));
    return operations;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1NsYXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQWEsTUFBTSxPQUFPLENBQUM7QUFDMUMsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7QUFDekIsT0FBTyxtQkFBbUIsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxpQkFBaUIsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxrQkFBa0IsTUFBTSxhQUFhLENBQUM7QUFFN0M7Ozs7R0FJRztBQUNILE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxLQUFlO0lBQy9DLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFDbEMsT0FBTyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNuQztJQUVELElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUU7UUFDaEMsT0FBTyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNqQztJQUVELElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUU7UUFDakMsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNsQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFVBQVUsY0FBYyxDQUFDLE1BQWMsRUFBRSxNQUFrQjtJQUMvRCxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FDdkIsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBa0IsRUFBZSxFQUFFO0lBQzVELE1BQU0sVUFBVSxHQUFnQixFQUFFLENBQUM7SUFDbkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==
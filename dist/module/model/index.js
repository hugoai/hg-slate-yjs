import * as Y from 'yjs';
export const slateYjsSymbol = Symbol('slate-yjs');
export const SyncElement = {
    getText(element) {
        return element === null || element === void 0 ? void 0 : element.get('text');
    },
    getChildren(element) {
        return element === null || element === void 0 ? void 0 : element.get('children');
    },
};
export const SyncNode = {
    getChildren(node) {
        if (node instanceof Y.Array) {
            return node;
        }
        return SyncElement.getChildren(node);
    },
    getText(node) {
        if (node instanceof Y.Array) {
            return undefined;
        }
        return SyncElement.getText(node);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7QUFPekIsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQVFsRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUc7SUFDekIsT0FBTyxDQUFDLE9BQW9CO1FBQzFCLE9BQU8sT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQW9CO1FBQzlCLE9BQU8sT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsQyxDQUFDO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRztJQUN0QixXQUFXLENBQUMsSUFBYztRQUN4QixJQUFJLElBQUksWUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFjO1FBQ3BCLElBQUksSUFBSSxZQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDM0IsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFFRCxPQUFPLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUMifQ==
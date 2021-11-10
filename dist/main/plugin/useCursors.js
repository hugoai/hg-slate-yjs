"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCursors = void 0;
const react_1 = require("react");
const slate_1 = require("slate");
const utils_1 = require("../cursor/utils");
const useCursors = (editor) => {
    const [cursors, setCursorData] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        editor.awareness.on('update', () => {
            const newCursorData = Array.from(editor.awareness.getStates())
                .filter(([clientId]) => { var _a; return clientId !== ((_a = editor.sharedType.doc) === null || _a === void 0 ? void 0 : _a.clientID); })
                .map(([, awareness]) => {
                let anchor = null;
                let focus = null;
                if (awareness.anchor) {
                    anchor = (0, utils_1.relativePositionToAbsolutePosition)(editor.sharedType, awareness.anchor);
                }
                if (awareness.focus) {
                    focus = (0, utils_1.relativePositionToAbsolutePosition)(editor.sharedType, awareness.focus);
                }
                return { anchor, focus, data: awareness };
            })
                .filter((cursor) => cursor.anchor && cursor.focus);
            setCursorData(newCursorData);
        });
    }, [editor]);
    const decorate = (0, react_1.useCallback)(([node, path]) => {
        const ranges = [];
        if (slate_1.Text.isText(node) && (cursors === null || cursors === void 0 ? void 0 : cursors.length)) {
            cursors.forEach((cursor) => {
                if (slate_1.Range.includes(cursor, path)) {
                    const { focus, anchor, data } = cursor;
                    const isFocusNode = slate_1.Path.equals(focus.path, path);
                    const isAnchorNode = slate_1.Path.equals(anchor.path, path);
                    const isForward = slate_1.Range.isForward({ anchor, focus });
                    ranges.push({
                        data,
                        isForward,
                        isCaret: isFocusNode,
                        anchor: {
                            path,
                            // eslint-disable-next-line no-nested-ternary
                            offset: isAnchorNode
                                ? anchor.offset
                                : isForward
                                    ? 0
                                    : node.text.length,
                        },
                        focus: {
                            path,
                            // eslint-disable-next-line no-nested-ternary
                            offset: isFocusNode
                                ? focus.offset
                                : isForward
                                    ? node.text.length
                                    : 0,
                        },
                    });
                }
            });
        }
        return ranges;
    }, [cursors]);
    return { decorate, cursors };
};
exports.useCursors = useCursors;
exports.default = exports.useCursors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlQ3Vyc29ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9wbHVnaW4vdXNlQ3Vyc29ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBeUQ7QUFDekQsaUNBQXFEO0FBRXJELDJDQUFxRTtBQUc5RCxNQUFNLFVBQVUsR0FBRyxDQUN4QixNQUFvQixFQUlwQixFQUFFO0lBQ0YsTUFBTSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQVcsRUFBRSxDQUFDLENBQUM7SUFFeEQsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDakMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUMzRCxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsV0FBQyxPQUFBLFFBQVEsTUFBSyxNQUFBLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRywwQ0FBRSxRQUFRLENBQUEsQ0FBQSxFQUFBLENBQUM7aUJBQ3BFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFO2dCQUNyQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztnQkFFakIsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO29CQUNwQixNQUFNLEdBQUcsSUFBQSwwQ0FBa0MsRUFDekMsTUFBTSxDQUFDLFVBQVUsRUFDakIsU0FBUyxDQUFDLE1BQU0sQ0FDakIsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7b0JBQ25CLEtBQUssR0FBRyxJQUFBLDBDQUFrQyxFQUN4QyxNQUFNLENBQUMsVUFBVSxFQUNqQixTQUFTLENB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
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSlateOps = exports.applyYjsEvents = exports.translateYjsEvent = void 0;
const slate_1 = require("slate");
const Y = __importStar(require("yjs"));
const arrayEvent_1 = __importDefault(require("./arrayEvent"));
const mapEvent_1 = __importDefault(require("./mapEvent"));
const textEvent_1 = __importDefault(require("./textEvent"));
/**
 * Translates a Yjs event into slate editor operations.
 *
 * @param event
 */
function translateYjsEvent(event) {
    if (event instanceof Y.YArrayEvent) {
        return (0, arrayEvent_1.default)(event);
    }
    if (event instanceof Y.YMapEvent) {
        return (0, mapEvent_1.default)(event);
    }
    if (event instanceof Y.YTextEvent) {
        return (0, textEvent_1.default)(event);
    }
    throw new Error('Unsupported yjs event');
}
exports.translateYjsEvent = translateYjsEvent;
/**
 * Applies multiple yjs events to a slate editor.
 */
function applyYjsEvents(editor, events) {
    slate_1.Editor.withoutNormalizing(editor, () => {
        events.forEach((event) => translateYjsEvent(event).forEach((op) => {
            editor.apply(op);
        }));
    });
}
exports.applyYjsEvents = applyYjsEvents;
const toSlateOps = (events) => {
    const operations = [];
    events.forEach((event) => operations.push(...translateYjsEvent(event)));
    return operations;
};
exports.toSlateOps = toSlateOps;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbHlUb1NsYXRlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBMEM7QUFDMUMsdUNBQXlCO0FBQ3pCLDhEQUErQztBQUMvQywwREFBMkM7QUFDM0MsNERBQTZDO0FBRTdDOzs7O0dBSUc7QUFDSCxTQUFnQixpQkFBaUIsQ0FBQyxLQUFlO0lBQy9DLElBQUksS0FBSyxZQUFZLENBQUMsQ0FBQyxXQUFXLEVBQUU7UUFDbEMsT0FBTyxJQUFBLG9CQUFtQixFQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ25DO0lBRUQsSUFBSSxLQUFLLFlBQVksQ0FBQyxDQUFDLFNBQVMsRUFBRTtRQUNoQyxPQUFPLElBQUEsa0JBQWlCLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDakM7SUFFRCxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsVUFBVSxFQUFFO1FBQ2pDLE9BQU8sSUFBQSxtQkFBa0IsRUFBQyxLQUFLLENBQUMsQ0FBQztLQUNsQztJQUVELE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBZEQsOENBY0M7QUFFRDs7R0FFRztBQUNILFNBQWdCLGNBQWMsQ0FBQyxNQUFjLEVBQUUsTUFBa0I7SUFDL0QsY0FBTSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7UUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQ3ZCLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJELHdDQVFDO0FBRU0sTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFrQixFQUFlLEVBQUU7SUFDNUQsTUFBTSxVQUFVLEdBQWdCLEVBQUUsQ0FBQztJQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQztBQUpXLFFBQUEsVUFBVSxjQUlyQiJ9
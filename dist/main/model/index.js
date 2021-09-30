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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncNode = exports.SyncElement = exports.slateYjsSymbol = void 0;
const Y = __importStar(require("yjs"));
exports.slateYjsSymbol = Symbol('slate-yjs');
exports.SyncElement = {
    getText(element) {
        return element === null || element === void 0 ? void 0 : element.get('text');
    },
    getChildren(element) {
        return element === null || element === void 0 ? void 0 : element.get('children');
    },
};
exports.SyncNode = {
    getChildren(node) {
        if (node instanceof Y.Array) {
            return node;
        }
        return exports.SyncElement.getChildren(node);
    },
    getText(node) {
        if (node instanceof Y.Array) {
            return undefined;
        }
        return exports.SyncElement.getText(node);
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVDQUF5QjtBQU9aLFFBQUEsY0FBYyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQVFyQyxRQUFBLFdBQVcsR0FBRztJQUN6QixPQUFPLENBQUMsT0FBb0I7UUFDMUIsT0FBTyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBb0I7UUFDOUIsT0FBTyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FDRixDQUFDO0FBRVcsUUFBQSxRQUFRLEdBQUc7SUFDdEIsV0FBVyxDQUFDLElBQWM7UUFDeEIsSUFBSSxJQUFJLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxtQkFBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsT0FBTyxDQUFDLElBQWM7UUFDcEIsSUFBSSxJQUFJLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUMzQixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUVELE9BQU8sbUJBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztDQUNGLENBQUMifQ==
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
exports.relativePositionToAbsolutePosition = exports.absolutePositionToRelativePosition = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const Y = __importStar(require("yjs"));
const model_1 = require("../model");
const path_1 = require("../path");
function absolutePositionToRelativePosition(sharedType, point) {
    const target = (0, path_1.getTarget)(sharedType, point.path);
    const text = model_1.SyncElement.getText(target);
    (0, tiny_invariant_1.default)(text, 'Slate point should point to Text node');
    return Y.createRelativePositionFromTypeIndex(text, point.offset);
}
exports.absolutePositionToRelativePosition = absolutePositionToRelativePosition;
function relativePositionToAbsolutePosition(sharedType, relativePosition) {
    (0, tiny_invariant_1.default)(sharedType.doc, 'Shared type should be bound to a document');
    const pos = Y.createAbsolutePositionFromRelativePosition(relativePosition, sharedType.doc);
    if (!pos) {
        return null;
    }
    return {
        path: (0, path_1.getSyncNodePath)(pos.type.parent),
        offset: pos.index,
    };
}
exports.relativePositionToAbsolutePosition = relativePositionToAbsolutePosition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3Vyc29yL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxvRUFBdUM7QUFDdkMsdUNBQXlCO0FBQ3pCLG9DQUE2RDtBQUM3RCxrQ0FBcUQ7QUFFckQsU0FBZ0Isa0NBQWtDLENBQ2hELFVBQXNCLEVBQ3RCLEtBQVk7SUFFWixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFTLEVBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxNQUFNLElBQUksR0FBRyxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxNQUFxQixDQUFDLENBQUM7SUFDeEQsSUFBQSx3QkFBUyxFQUFDLElBQUksRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkUsQ0FBQztBQVJELGdGQVFDO0FBRUQsU0FBZ0Isa0NBQWtDLENBQ2hELFVBQXNCLEVBQ3RCLGdCQUFvQztJQUVwQyxJQUFBLHdCQUFTLEVBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSwyQ0FBMkMsQ0FBQyxDQUFDO0lBRXZFLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQywwQ0FBMEMsQ0FDdEQsZ0JBQWdCLEVBQ2hCLFVBQVUsQ0FBQyxHQUFHLENBQ2YsQ0FBQztJQUVGLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDUixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTztRQUNMLElBQUksRUFBRSxJQUFBLHNCQUFlLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFrQixDQUFDO1FBQ2xELE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSztLQUNsQixDQUFDO0FBQ0osQ0FBQztBQW5CRCxnRkFtQkMifQ==
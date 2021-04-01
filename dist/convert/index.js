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
exports.toSlateOps = exports.toSlateOp = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Y = __importStar(require("yjs"));
const arrayEvent_1 = __importDefault(require("./arrayEvent"));
const mapEvent_1 = __importDefault(require("./mapEvent"));
const textEvent_1 = __importDefault(require("./textEvent"));
/**
 * Converts a yjs event into slate operations.
 *
 * toSlateOp(event: Y.YEvent): Operation[]
 */
const toSlateOp = (event) => {
    if (event instanceof Y.YArrayEvent) {
        return arrayEvent_1.default(event);
    }
    if (event instanceof Y.YMapEvent) {
        return mapEvent_1.default(event);
    }
    if (event instanceof Y.YTextEvent) {
        return textEvent_1.default(event);
    }
    throw new Error('Unsupported yjs event');
};
exports.toSlateOp = toSlateOp;
/**
 * Converts yjs events into slate operations.
 *
 * toSlateOps(events: Y.YEvent[]): Operation[]
 */
const toSlateOps = (events) => lodash_1.default.flatten(events.map(exports.toSlateOp));
exports.toSlateOps = toSlateOps;
//# sourceMappingURL=index.js.map
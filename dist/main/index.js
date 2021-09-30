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
exports.toSyncDoc = exports.applySlateOp = exports.applySlateOps = exports.applyYjsEvents = exports.translateYjsEvent = exports.toSyncElement = exports.toSlateDoc = exports.toSharedType = exports.YjsEditor = exports.withYjs = exports.withCursor = exports.useCursors = exports.SyncNode = exports.SyncElement = exports.CursorEditor = void 0;
const applyToSlate_1 = require("./applyToSlate");
Object.defineProperty(exports, "applyYjsEvents", { enumerable: true, get: function () { return applyToSlate_1.applyYjsEvents; } });
Object.defineProperty(exports, "translateYjsEvent", { enumerable: true, get: function () { return applyToSlate_1.translateYjsEvent; } });
const applyToYjs_1 = __importStar(require("./applyToYjs"));
exports.applySlateOps = applyToYjs_1.default;
Object.defineProperty(exports, "applySlateOp", { enumerable: true, get: function () { return applyToYjs_1.applySlateOp; } });
const model_1 = require("./model");
Object.defineProperty(exports, "SyncElement", { enumerable: true, get: function () { return model_1.SyncElement; } });
Object.defineProperty(exports, "SyncNode", { enumerable: true, get: function () { return model_1.SyncNode; } });
const plugin_1 = require("./plugin");
Object.defineProperty(exports, "CursorEditor", { enumerable: true, get: function () { return plugin_1.CursorEditor; } });
Object.defineProperty(exports, "useCursors", { enumerable: true, get: function () { return plugin_1.useCursors; } });
Object.defineProperty(exports, "withCursor", { enumerable: true, get: function () { return plugin_1.withCursor; } });
Object.defineProperty(exports, "withYjs", { enumerable: true, get: function () { return plugin_1.withYjs; } });
Object.defineProperty(exports, "YjsEditor", { enumerable: true, get: function () { return plugin_1.YjsEditor; } });
const utils_1 = require("./utils");
Object.defineProperty(exports, "toSharedType", { enumerable: true, get: function () { return utils_1.toSharedType; } });
Object.defineProperty(exports, "toSlateDoc", { enumerable: true, get: function () { return utils_1.toSlateDoc; } });
Object.defineProperty(exports, "toSyncElement", { enumerable: true, get: function () { return utils_1.toSyncElement; } });
Object.defineProperty(exports, "toSyncDoc", { enumerable: true, get: function () { return utils_1.toSyncDoc; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUFtRTtBQTJCakUsK0ZBM0JPLDZCQUFjLE9BMkJQO0FBRGQsa0dBMUJ1QixnQ0FBaUIsT0EwQnZCO0FBekJuQiwyREFBMkQ7QUEyQnpELHdCQTNCSyxvQkFBYSxDQTJCTDtBQUNiLDZGQTVCc0IseUJBQVksT0E0QnRCO0FBM0JkLG1DQUE0RDtBQWMxRCw0RkFkbUIsbUJBQVcsT0FjbkI7QUFDWCx5RkFmZ0MsZ0JBQVEsT0FlaEM7QUFkVixxQ0FPa0I7QUFLaEIsNkZBWEEscUJBQVksT0FXQTtBQUdaLDJGQWJBLG1CQUFVLE9BYUE7QUFDViwyRkFiQSxtQkFBVSxPQWFBO0FBQ1Ysd0ZBYkEsZ0JBQU8sT0FhQTtBQUVQLDBGQWJBLGtCQUFTLE9BYUE7QUFYWCxtQ0FBNkU7QUFZM0UsNkZBWk8sb0JBQVksT0FZUDtBQUNaLDJGQWJxQixrQkFBVSxPQWFyQjtBQUNWLDhGQWRpQyxxQkFBYSxPQWNqQztBQUtiLDBGQW5CZ0QsaUJBQVMsT0FtQmhEIn0=
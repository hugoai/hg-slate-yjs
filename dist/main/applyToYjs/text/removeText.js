"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const path_1 = require("../../path");
/**
 * Applies a remove text operation to a SharedType.
 *
 * @param doc
 * @param op
 */
function removeText(doc, op) {
    const node = (0, path_1.getTarget)(doc, op.path);
    const nodeText = model_1.SyncElement.getText(node);
    nodeText.delete(op.offset, op.text.length);
    return doc;
}
exports.default = removeText;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHBseVRvWWpzL3RleHQvcmVtb3ZlVGV4dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHVDQUFzRDtBQUN0RCxxQ0FBdUM7QUFFdkM7Ozs7O0dBS0c7QUFDSCxTQUF3QixVQUFVLENBQ2hDLEdBQWUsRUFDZixFQUF1QjtJQUV2QixNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQWdCLENBQUM7SUFDcEQsTUFBTSxRQUFRLEdBQUcsbUJBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUM7SUFDNUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0MsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBUkQsNkJBUUMifQ==
import { NodeOperation } from 'node.interface';
import { SyncDoc } from 'types';
import * as Y from 'yjs';
/**
 * Converts a Yjs Array event into Slate operations.
 *
 * arrayEvent(event: Y.YArrayEvent<SyncElement>): NodeOperation[]
 */
declare const arrayEvent: (event: Y.YArrayEvent<SyncDoc>) => NodeOperation[];
export default arrayEvent;
//# sourceMappingURL=arrayEvent.d.ts.map
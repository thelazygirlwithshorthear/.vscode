"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameMap = void 0;
const node_file_log_1 = require("node-file-log");
const cantor_1 = require("./cantor");
class StackFrame {
    constructor(contextId, frame) {
        this.contextId = contextId;
        this.frameId = (0, cantor_1.cantorPairing)(contextId, frame.rDepth);
        this.rDepth = frame.rDepth;
        this.sourceLine = frame.line;
        this.sourceUrl = frame.url;
    }
}
const log = node_file_log_1.Logger.create('FrameMap');
class FrameMap {
    constructor() {
        this.frameIdToFrame = new Map();
    }
    addFrames(contextId, frames) {
        // log.debug(`adding frames ${JSON.stringify(frames)} for context id ${contextId}`);
        const added = [];
        frames.forEach(frame => {
            // arrow-functions contain frame with name 'self-hosted'
            // portalScripting funtions contain frame with name '<inline>'
            if (frame.url !== "self-hosted" && frame.url !== "<inline>") {
                const entry = new StackFrame(contextId, frame);
                if (this.frameIdToFrame.has(entry.frameId)) {
                    // log.warn(`already mapped entry: ${entry.frameId} -> (${contextId}, ${entry.rDepth})`);
                }
                this.frameIdToFrame.set(entry.frameId, entry);
                added.push(entry);
            }
            else {
                log.debug(`ignore internal frame '${frame.url}'`);
            }
        });
        return added;
    }
    getStackFrame(frameId) {
        const frame = this.frameIdToFrame.get(frameId);
        if (frame === undefined) {
            throw new Error(`No such frame ${frameId}`);
        }
        return frame;
    }
    /**
     * Returns the current stackframe from a given context be returning the frame with the lowest depth.
     * @param {number} contextId - Context id
     * @returns {StackFrame|undefined} The current stackframe or undefined if no stackframe for this context is saved.
     */
    getCurrentStackFrame(contextId) {
        const stackframes = this.getStackFramesFromContext(contextId).sort((a, b) => {
            return a.rDepth - b.rDepth;
        });
        if (stackframes.length > 0) {
            // The first stackframe is the current one (because it's depth is the lowest one)
            return stackframes[0];
        }
        else {
            // No stackframe found for this context
            return undefined;
        }
    }
    /**
     * Returns all stackframes from a given context.
     * @param {number} contextId - Context id to match
     * @returns {Array.<StackFrame>} An array with every stackframe from a given context.
     */
    getStackFramesFromContext(contextId) {
        const stackFrames = [];
        this.frameIdToFrame.forEach((frame) => {
            if ((0, cantor_1.reverseCantorPairing)(frame.frameId).x === contextId) {
                stackFrames.push(frame);
            }
        });
        return stackFrames;
    }
}
exports.FrameMap = FrameMap;
//# sourceMappingURL=frameMap.js.map
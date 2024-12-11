"use strict";
// See https://en.wikipedia.org/wiki/Pairing_function#Cantor_pairing_function
Object.defineProperty(exports, "__esModule", { value: true });
exports.reverseCantorPairing = exports.cantorPairing = void 0;
function cantorPairing(x, y) {
    return (x + y) * (x + y + 1) / 2 + y;
}
exports.cantorPairing = cantorPairing;
function reverseCantorPairing(n) {
    const j = Math.floor(Math.sqrt(0.25 + 2 * n) - 0.5);
    return {
        x: j - (n - j * (j + 1) / 2),
        y: n - j * (j + 1) / 2,
    };
}
exports.reverseCantorPairing = reverseCantorPairing;
//# sourceMappingURL=cantor.js.map
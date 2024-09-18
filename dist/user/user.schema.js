"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    walletAddress: String,
    organizationId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Organization' },
});
//# sourceMappingURL=user.schema.js.map
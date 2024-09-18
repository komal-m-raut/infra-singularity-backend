"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrganizationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    adminId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    userIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
});
//# sourceMappingURL=organization.schema.js.map
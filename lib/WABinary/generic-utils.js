"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinaryNodeMessages = exports.reduceBinaryNodeToDictionary = exports.assertNodeErrorFree = exports.getAdditionalNode = exports.getBinaryNodeFilter = exports.getBinaryNodeChildUInt = exports.getBinaryNodeChildString = exports.getBinaryNodeChildBuffer = exports.getBinaryNodeChild = exports.getAllBinaryNodeChildren = exports.getBinaryNodeChildren = void 0;
exports.binaryNodeToString = binaryNodeToString;
const boom_1 = require("@hapi/boom");
const WAProto_1 = require("../../WAProto");
// some extra useful utilities
const getBinaryNodeChildren = (node, childTag) => {
    if (Array.isArray(node === null || node === void 0 ? void 0 : node.content)) {
        return node.content.filter(item => item.tag === childTag);
    }
    return [];
};
exports.getBinaryNodeChildren = getBinaryNodeChildren;
const getAllBinaryNodeChildren = ({ content }) => {
    if (Array.isArray(content)) {
        return content;
    }
    return [];
};
exports.getAllBinaryNodeChildren = getAllBinaryNodeChildren;
const getBinaryNodeChild = (node, childTag) => {
    if (Array.isArray(node === null || node === void 0 ? void 0 : node.content)) {
        return node === null || node === void 0 ? void 0 : node.content.find(item => item.tag === childTag);
    }
};
exports.getBinaryNodeChild = getBinaryNodeChild;
const getBinaryNodeChildBuffer = (node, childTag) => {
    var _a;
    const child = (_a = (0, exports.getBinaryNodeChild)(node, childTag)) === null || _a === void 0 ? void 0 : _a.content;
    if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return child;
    }
};
exports.getBinaryNodeChildBuffer = getBinaryNodeChildBuffer;
const getBinaryNodeChildString = (node, childTag) => {
    var _a;
    const child = (_a = (0, exports.getBinaryNodeChild)(node, childTag)) === null || _a === void 0 ? void 0 : _a.content;
    if (Buffer.isBuffer(child) || child instanceof Uint8Array) {
        return Buffer.from(child).toString('utf-8');
    }
    else if (typeof child === 'string') {
        return child;
    }
};
exports.getBinaryNodeChildString = getBinaryNodeChildString;
const getBinaryNodeChildUInt = (node, childTag, length) => {
    const buff = (0, exports.getBinaryNodeChildBuffer)(node, childTag);
    if (buff) {
        return bufferToUInt(buff, length);
    }
};
exports.getBinaryNodeChildUInt = getBinaryNodeChildUInt;
const getBinaryNodeFilter = (node) => {
    if (Array.isArray(node)) {
        return node.filter((item) => {
            var _a, _b, _c, _d, _e, _f;
            if ((item === null || item === void 0 ? void 0 : item.tag) === 'bot' && ((_a = item === null || item === void 0 ? void 0 : item.attrs) === null || _a === void 0 ? void 0 : _a.biz_bot) === '1') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz' && ((_b = item === null || item === void 0 ? void 0 : item.attrs) === null || _b === void 0 ? void 0 : _b.native_flow_name) === 'order_details') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz' && ((_c = item === null || item === void 0 ? void 0 : item.attrs) === null || _c === void 0 ? void 0 : _c.native_flow_name) === 'order_status') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz' && ((_d = item === null || item === void 0 ? void 0 : item.attrs) === null || _d === void 0 ? void 0 : _d.native_flow_name) === 'payment_info') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz' && ((_e = item === null || item === void 0 ? void 0 : item.attrs) === null || _e === void 0 ? void 0 : _e.native_flow_name) === 'payment_status') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz' && ((_f = item === null || item === void 0 ? void 0 : item.attrs) === null || _f === void 0 ? void 0 : _f.native_flow_name) === 'payment_method') {
                return false;
            }
            else if ((item === null || item === void 0 ? void 0 : item.tag) === 'biz') {
                return false;
            }
            return true;
        });
    }
    else {
        return node;
    }
};
exports.getBinaryNodeFilter = getBinaryNodeFilter;
const getAdditionalNode = (type) => {
    type = type.toLowerCase();
    if (type === 'interactive' || type === 'buttons') {
        return [{
                tag: 'biz',
                attrs: {},
                content: [{
                        tag: 'interactive',
                        attrs: {
                            type: 'native_flow',
                            v: '1'
                        },
                        content: [{
                                tag: 'native_flow',
                                attrs: {
                                    name: 'mixed',
                                    v: '9',
                                },
                                content: []
                            }]
                    }]
            }];
    }
    else if (type === 'review_and_pay') {
        return [{
                tag: 'biz',
                attrs: { native_flow_name: 'order_details' }
            }];
    }
    else if (type === 'review_order') {
        return [{
                tag: 'biz',
                attrs: { native_flow_name: 'order_status' }
            }];
    }
    else if (type === 'payment_info') {
        return [{
                tag: 'biz',
                attrs: { native_flow_name: 'payment_info' }
            }];
    }
    else if (type === 'payment_status') {
        return [{
                tag: 'biz',
                attrs: { native_flow_name: 'payment_status' }
            }];
    }
    else if (type === 'payment_method') {
        return [{
                tag: 'biz',
                attrs: { native_flow_name: 'payment_method' }
            }];
    }
    else if (type === 'list') {
        return [{
                tag: 'biz',
                attrs: {},
                content: [{
                        tag: 'list',
                        attrs: {
                            v: '2',
                            type: 'product_list'
                        }
                    }]
            }];
    }
    else if (type === 'bot') {
        return [{
                tag: 'bot',
                attrs: { biz_bot: '1' }
            }];
    }
    else {
        return [];
    }
};
exports.getAdditionalNode = getAdditionalNode;
const assertNodeErrorFree = (node) => {
    const errNode = (0, exports.getBinaryNodeChild)(node, 'error');
    if (errNode) {
        throw new boom_1.Boom(errNode.attrs.text || 'Unknown error', { data: +errNode.attrs.code });
    }
};
exports.assertNodeErrorFree = assertNodeErrorFree;
const reduceBinaryNodeToDictionary = (node, tag) => {
    const nodes = (0, exports.getBinaryNodeChildren)(node, tag);
    const dict = nodes.reduce((dict, { attrs }) => {
        dict[attrs.name || attrs.config_code] = attrs.value || attrs.config_value;
        return dict;
    }, {});
    return dict;
};
exports.reduceBinaryNodeToDictionary = reduceBinaryNodeToDictionary;
const getBinaryNodeMessages = ({ content }) => {
    const msgs = [];
    if (Array.isArray(content)) {
        for (const item of content) {
            if (item.tag === 'message') {
                msgs.push(WAProto_1.proto.WebMessageInfo.decode(item.content));
            }
        }
    }
    return msgs;
};
exports.getBinaryNodeMessages = getBinaryNodeMessages;
function bufferToUInt(e, t) {
    let a = 0;
    for (let i = 0; i < t; i++) {
        a = 256 * a + e[i];
    }
    return a;
}
const tabs = (n) => '\t'.repeat(n);
function binaryNodeToString(node, i = 0) {
    if (!node) {
        return node;
    }
    if (typeof node === 'string') {
        return tabs(i) + node;
    }
    if (node instanceof Uint8Array) {
        return tabs(i) + Buffer.from(node).toString('hex');
    }
    if (Array.isArray(node)) {
        return node.map((x) => tabs(i + 1) + binaryNodeToString(x, i + 1)).join('\n');
    }
    const children = binaryNodeToString(node.content, i + 1);
    const tag = `<${node.tag} ${Object.entries(node.attrs || {})
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}='${v}'`)
        .join(' ')}`;
    const content = children ? `>\n${children}\n${tabs(i)}</${node.tag}>` : '/>';
    return tag + content;
}

import { proto } from '../../WAProto';
import { BinaryNode } from './types';
export declare const getBinaryNodeChildren: (node: BinaryNode | undefined, childTag: string) => BinaryNode[];
export declare const getAllBinaryNodeChildren: ({ content }: BinaryNode) => BinaryNode[];
export declare const getBinaryNodeChild: (node: BinaryNode | undefined, childTag: string) => BinaryNode | undefined;
export declare const getBinaryNodeChildBuffer: (node: BinaryNode | undefined, childTag: string) => Uint8Array<ArrayBufferLike> | Buffer<ArrayBufferLike> | undefined;
export declare const getBinaryNodeChildString: (node: BinaryNode | undefined, childTag: string) => string | undefined;
export declare const getBinaryNodeChildUInt: (node: BinaryNode, childTag: string, length: number) => number | undefined;
export declare const getBinaryNodeFilter: (node: BinaryNode[] | undefined) => BinaryNode[] | undefined;
export declare const getAdditionalNode: (type: string) => {
    tag: string;
    attrs: {};
    content: {
        tag: string;
        attrs: {
            type: string;
            v: string;
        };
        content: {
            tag: string;
            attrs: {
                name: string;
                v: string;
            };
            content: never[];
        }[];
    }[];
}[] | {
    tag: string;
    attrs: {
        native_flow_name: string;
    };
}[] | {
    tag: string;
    attrs: {};
    content: {
        tag: string;
        attrs: {
            v: string;
            type: string;
        };
    }[];
}[] | {
    tag: string;
    attrs: {
        biz_bot: string;
    };
}[];
export declare const assertNodeErrorFree: (node: BinaryNode) => void;
export declare const reduceBinaryNodeToDictionary: (node: BinaryNode, tag: string) => {
    [_: string]: string;
};
export declare const getBinaryNodeMessages: ({ content }: BinaryNode) => proto.WebMessageInfo[];
export declare function binaryNodeToString(node: BinaryNode | BinaryNode['content'], i?: number): any;

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/// <reference path='../../node_modules/monaco-editor-core/monaco.d.ts'/>

declare interface String {
    endsWith(searchString: string, length?: number ):boolean;
}

/**
 * For Some reason Bridge.Net doesn't bother to generate declarations for this one.
 */
declare module System.Text.RegularExpressions {
    export interface  Regex{
    }

    export interface Match {}
    export interface MatchCollection {}
}

/**
* Stubs for Kusto.JavaScript.Client and Kusto.Language.Bridge
*/
declare module System {
    export interface StringComparison {}
}

declare module System.Collections.Generic {
    export type IReadOnlyList$1<T> = any;
    export interface IReadOnlyDictionary$2<TKey, TValue> {}
}

declare interface Plugin {}

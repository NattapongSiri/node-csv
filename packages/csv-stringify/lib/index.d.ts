/// <reference types="node" />

import * as stream from "stream";
export = stringify

declare function stringify<I = any>(callback?: stringify.Callback): stringify.Stringifier<I>
declare function stringify<I = any>(options: stringify.Options<I>, callback?: stringify.Callback): stringify.Stringifier<I>
declare function stringify<I = any>(input: stringify.Input<I>, callback?: stringify.Callback): stringify.Stringifier<I>
declare function stringify<I = any>(input: stringify.Input<I>, options?: stringify.Options<I>, callback?: stringify.Callback): stringify.Stringifier<I>
declare namespace stringify {
    type Callback = (err: Error | undefined, output: string) => void
    type RecordDelimiter = string | Buffer | 'auto' | 'unix' | 'mac' | 'windows' | 'ascii' | 'unicode'
    type Cast<I, T> = (value: T, context: CastingContext<I>) => string
    type PlainObject<I, T> = Record<keyof I, T>
    type Input<I> = I[]
    interface ColumnOption<I = any> {
        key: keyof I
        header?: string
    }
    interface CastingContext<I = any> {
        readonly column?: number | keyof I;
        readonly header: boolean;
        readonly index: number;
        readonly records: number;
    }
    interface Options<I = any> {
        /**
         * Prepend the byte order mark (BOM) to the output stream.
         */
        bom?: boolean
        /**
         * Key-value object which defines custom cast for certain data types
         */
        cast?: {
            boolean?: Cast<I, boolean>
            date?: Cast<I, Date>
            number?: Cast<I, number>
            /**
             * Custom formatter for generic object values
             */
            object?: Cast<I, Record<keyof(I[keyof I]), any>>
            string?: Cast<I, string>
        }
        /**
         * List of fields, applied when `transform` returns an object
         * order matters
         * read the transformer documentation for additionnal information
         * columns are auto discovered in the first record when the user write objects
         * can refer to nested properties of the input JSON
         * see the "header" option on how to print columns names on the first line
         */
        columns?: (keyof I)[] | PlainObject<I, string> | ColumnOption<I>[]
        /**
         * Set the field delimiter, one character only, defaults to a comma.
         */
        delimiter?: string | Buffer
        /**
         * Add the value of "options.RecordDelimiter" on the last line, default to true.
         */
        eof?: boolean
        /**
         * Defaults to the escape read option.
         */
        escape?: string | Buffer
        /**
         * Display the column names on the first line if the columns option is provided or discovered.
         */
        header?: boolean
        /**
         * The quote characters, defaults to the ", an empty quote value will preserve the original field.
         */
        quote?: string | Buffer | boolean
        /**
         * Boolean, default to false, quote all the non-empty fields even if not required.
         */
        quoted?: boolean

        /**
         * Boolean, no default, quote empty fields and overrides `quoted_string` on empty strings when defined.
         */
        quoted_empty?: boolean
        /**
         * String or RegExp, no default, quote all fields matching a regular expression.
         */
        quoted_match?: string | RegExp
        /**
         * Boolean, default to false, quote all fields of type string even if not required.
         */
        quoted_string?: boolean
        /**
         * String used to delimit record rows or a special value
         * special values are 'auto', 'unix', 'mac', 'windows', 'ascii', 'unicode'
         * defaults to 'auto' (discovered in source or 'unix' if no source is specified).
         */
        record_delimiter?: RecordDelimiter
    }
    class Stringifier<I = any> extends stream.Transform implements Iterator<string>, Iterable<string> {
        constructor(options: Options<I>)
        readonly options: Options

        write(chunk: I, encoding?: BufferEncoding, cb?: (error: Error | null | undefined) => void): boolean;
        write(chunk: I, cb?: (error: Error | null | undefined) => void): boolean;

        next(): IteratorResult<string>

        [Symbol.iterator](): this
    }
}

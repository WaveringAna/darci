/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

class EnumBase {
    #_type;
    #_id;
    #_label;

    constructor(type, id, label = undefined) {
        this._type = type;
        this._id = id;
        this._label = label;
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    static _fromId(classType, id) {
        let properties = Object.getOwnPropertyNames(classType);

        for (let p of properties) {
            if (p === "prototype" || p === "length" || p === "name") {
                continue;
            }

            let o = classType[p];

            if (!(o instanceof classType)) {
                continue;
            }

            if (id === o.id) {
                return o;
            }
        }

        return undefined;
    }

    static _fromType(classType, type) {
        if (!type) {
            return undefined;
        }
        let n = type.toUpperCase();
        let properties = Object.getOwnPropertyNames(classType);

        for (let p of properties) {
            let o = classType[p];

            if (!(o instanceof classType)) {
                continue;
            }

            if (n === o.type.toUpperCase()) {
                return o;
            }
        }
        return undefined;
    }

    get label() {
        if (!this._label) {
            return this._type;
        }

        return this._label;
    }

    get value() {
        return this._type;
    }

    toString() {
        return this._type;
    }
}

module.exports = EnumBase;

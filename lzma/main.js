/*
Copyright © 2023, Maxim Logaev <maximlogaev2001ezro@gmail.com>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; If not, see <http://www.gnu.org/licenses/>.
*/

function isPowerOf2(n)
{
   return n > 0 && (n & (n - 1)) == 0;
}

function validateLzmaHeader()
{
    if (!isPowerOf2(this.DictonarySize.value) &&
        !isPowerOf2(this.DictonarySize.value/3)) {
        this.validationError = "Dictionary size does not match 2^n or 2^n + 2^(n-1)";
        return false;
    }

    if (this.UncompressedSize.value == 0) {
        this.validationError = "Uncompressed size cannot be zero";
        return false;
    }

    return true;
}

function init() 
{
    const SpecSizeEnum = {
        "Uncompressed size unknown": -1
    };

    /* The LZMA header. */
    var LzmaHeader = struct({
        Properties          : uint8(),
        DictonarySize       : uint32(),
        UncompressedSize    : enumeration("SpecialSize", uint64(), SpecSizeEnum)
    });

    LzmaHeader.byteOrder = "little-endian";
    LzmaHeader.validationFunc = validateLzmaHeader;
    LzmaHeader.name = "LZMA";

    return LzmaHeader;
}

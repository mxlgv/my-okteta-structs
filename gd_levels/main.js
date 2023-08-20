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

function init() 
{

    const Track = struct({
        Address: pointer(uint32(), uint8()),
        Name:    string('ascii')
    });

    const Difficulty = struct({
        TracksNum:  uint32(),
        Tracks:     array(Track, function() { return this.parent.TracksNum.value; })
    });

    var DifficultyLevels = struct({
        LevelEasy:      Difficulty,
        LevelMedium:    Difficulty,
        LevelPro:       Difficulty
    });

    DifficultyLevels.byteOrder = "big-endian";
    DifficultyLevels.name = "DifficultyLevels";

    return DifficultyLevels;
}

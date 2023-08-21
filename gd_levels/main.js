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
    /*
     * To get the coordinates of the start and finish of the track,
     * you need: (value >> 16) << 3.
    */
    const TrackData = struct({
        Separator:  uint8(), // Separates point data (0x33).
        StartEncX:  int32(), // Encrypted coordinate X of start the track.
        StartEncY:  int32(), // Encrypted coordinate Y of start the track.
        FinishEncX: int32(), // Encrypted coordinate X of finish the track.
        FinishEncY: int32(), // Encrypted coordinate Y of finish the track.
        PointsNum:  uint16(),// The number of points in the track, not including the base ones.
        BasePointX: int32(), // The base X coordinate from which all other points are calculated.
        BasePointY: int32()  // The base Y coordinate from which all other points are calculated.
        // DiffPoints:
        /*
         * An array of difference points. Like {x: uint8, y: uint8}.
         * Point differences are calculated from the base point.
         * The previous one is subtracted from the next one.
        */
    });

    const Track = struct({
        Address: pointer(uint32(), TrackData),            // Address to TrackData.
        Name:    string('ascii').set({terminatedBy : 0}), // Track name in ASCIIZ.
    });

    const Level = struct({
        TracksNum:  uint32(), // Number of tracks in difficulty level.
        Tracks:     array(Track, function() { return this.parent.TracksNum.value; })
    });

    const Levels = struct({
        LevelEasy:      Level,
        LevelMedium:    Level,
        LevelPro:       Level
    });

    Levels.defaultLockOffset = 0x0;
    Levels.byteOrder = "big-endian";
    Levels.name = "Levels";

    return Levels;
}

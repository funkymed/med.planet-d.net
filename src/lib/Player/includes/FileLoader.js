/*
  Flod JS 2.1
  2012/04/30
  Christian Corti
  Neoart Costa Rica

  Last Update: Flod JS 2.1 - 2012/04/16

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR
  IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  This work is licensed under the Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/ or send a letter to
  Creative Commons, 171 Second Street, Suite 300, San Francisco, California, 94105, USA.
*/

import { Amiga } from "./Amiga";
import { ByteArray } from "./Core";
import F2Player from "./F2Player";
import MKPlayer from "./MKPlayer";
import PTPlayer from "./PTPlayer";

function _FileLoader() {
  var o = Object.create(null, {
    player: { value: null, writable: true },
    index: { value: 0, writable: true },
    amiga: { value: null, writable: true },
    mixer: { value: null, writable: true },

    tracker: {
      get: function () {
        return this.player
          ? TRACKERS[this.index + this.player.version]
          : TRACKERS[0];
      },
    },

    load: {
      value: function (stream) {
        var id, value;
        if (!stream.view) stream = ByteArray(stream);
        stream.endian = 1;
        stream.position = 0;

        if (stream.readUint() === 67324752) {
          if (window.neoart.Unzip) {
            //archive = ZipFile(stream);
            //stream = archive.uncompress(archive.entries[0]);
          } else {
            //throw "Unzip support is not available.";
          }
        }

        if (!stream) return null;

        if (this.player && this.player.id !== "STPlayer") {
          this.player.load(stream);
          if (this.player.version) return this.player;
        }

        if (stream.length > 336) {
          stream.position = 38;
          id = stream.readString(20);

          if (
            id === "FastTracker v2.00   " ||
            id === "FastTracker v 2.00  " ||
            id === "Sk@le Tracker" ||
            id === "MadTracker 2.0" ||
            id === "MilkyTracker        " ||
            id === "DigiBooster Pro 2.18" ||
            id.indexOf("OpenMPT") !== -1
          ) {
            this.player = F2Player(this.mixer);
            this.player.load(stream);
            if (this.player.version) {
              this.index = FASTTRACKER;
              return this.player;
            }
          }
        }

        stream.endian = 0;

        if (stream.length > 2105) {
          stream.position = 1080;
          id = stream.readString(4);

          if (id === "M.K." || id === "FLT4") {
            this.player = MKPlayer(this.amiga);
            this.player.load(stream);

            if (this.player.version) {
              this.index = NOISETRACKER;
              return this.player;
            }
          } else if (id === "FEST") {
            this.player = window.neoart.HMPlayer(this.amiga);
            this.player.load(stream);

            if (this.player.version) {
              this.index = HISMASTER;
              return this.player;
            }
          }
        }

        if (stream.length > 2105) {
          stream.position = 1080;
          id = stream.readString(4);

          if (id === "M.K." || id === "M!K!") {
            this.player = PTPlayer(this.amiga);
            this.player.load(stream);

            if (this.player.version) {
              this.index = PROTRACKER;
              return this.player;
            }
          }
        }

        if (stream.length > 5220) {
          this.player = window.neoart.S1Player(this.amiga);
          this.player.load(stream);

          if (this.player.version) {
            this.index = SIDMON;
            return this.player;
          }
        }

        stream.position = 0;
        value = stream.readUshort();
        stream.position = 0;
        id = stream.readString(4);

        if (
          id === "COSO" ||
          value === 0x6000 ||
          value === 0x6002 ||
          value === 0x600e ||
          value === 0x6016
        ) {
          this.player = window.neoart.JHPlayer(this.amiga);
          this.player.load(stream);

          if (this.player.version) {
            this.index = HIPPEL;
            return this.player;
          }
        }

        stream.position = 0;
        value = stream.readUshort();

        this.player = window.neoart.DWPlayer(this.amiga);
        this.player.load(stream);

        if (this.player.version) {
          this.index = WHITTAKER;
          return this.player;
        }

        stream.position = 0;
        value = stream.readUshort();

        if (value === 0x6000) {
          this.player = window.neoart.RHPlayer(this.amiga);
          this.player.load(stream);

          if (this.player.version) {
            this.index = HUBBARD;
            return this.player;
          }
        }

        if (stream.length > 1625) {
          this.player = window.neoart.STPlayer(this.amiga);
          this.player.load(stream);

          if (this.player.version) {
            this.index = SOUNDTRACKER;
            return this.player;
          }
        }

        stream.clear();
        this.index = 0;
        return (this.player = null);
      },
    },
  });

  o.amiga = Amiga();
  return Object.seal(o);
}

var SOUNDTRACKER = 0,
  NOISETRACKER = 4,
  PROTRACKER = 9,
  HISMASTER = 12,
  SIDMON = 26,
  WHITTAKER = 28,
  HIPPEL = 30,
  HUBBARD = 32,
  FASTTRACKER = 33,
  TRACKERS = [
    "Unknown Format",
    "Ultimate SoundTracker",
    "D.O.C. SoundTracker 9",
    "Master SoundTracker",
    "D.O.C. SoundTracker 2.0/2.2",
    "SoundTracker 2.3",
    "SoundTracker 2.4",
    "NoiseTracker 1.0",
    "NoiseTracker 1.1",
    "NoiseTracker 2.0",
    "ProTracker 1.0",
    "ProTracker 1.1/2.1",
    "ProTracker 1.2/2.0",
    "His Master's NoiseTracker",
    "SoundFX 1.0/1.7",
    "SoundFX 1.8",
    "SoundFX 1.945",
    "SoundFX 1.994/2.0",
    "BP SoundMon V1",
    "BP SoundMon V2",
    "BP SoundMon V3",
    "Delta Music 1.0",
    "Delta Music 2.0",
    "Digital Mugician",
    "Digital Mugician 7 Voices",
    "Future Composer 1.0/1.3",
    "Future Composer 1.4",
    "SidMon 1.0",
    "SidMon 2.0",
    "David Whittaker",
    "FredEd",
    "Jochen Hippel",
    "Jochen Hippel COSO",
    "Rob Hubbard",
    "FastTracker II",
    "Sk@leTracker",
    "MadTracker 2.0",
    "MilkyTracker",
    "DigiBooster Pro 2.18",
    "OpenMPT",
  ];

const FileLoader = _FileLoader();
export default FileLoader;

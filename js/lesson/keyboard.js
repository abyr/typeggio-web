var Keyboard;

const QWERTY_LAYOUT = 'qwerty';
const UA_LAYOUT = 'ua';

Keyboard = function (layout = QWERTY_LAYOUT) {
  this.layout = layout;

  this.fnkToClassMap = this.fnkToClassMapFactory(layout);
};

Keyboard.prototype.getLayout = function () {
  return this.layout;
}

Keyboard.prototype.fnkToClassMapFactory = function (layout) {
  if (layout === UA_LAYOUT) {
    return this.uaFnkToClassMap();
  } else {
    return this.qwertyFnkToClassMap();
  }
};

Keyboard.prototype.uaFnkToClassMap = function () {
  const qwerty = this.qwertyFnkToClassMap();

  return Object.assign({}, qwerty, {
    'й': 'bq',
    'ц': 'bw',
    'у': 'be',
    'к': 'br',
    'е': 'bt',
    'н': 'by',
    'г': 'bu',
    'ш': 'bi',
    'щ': 'bo',
    'з': 'bp',
    'х': 'bsqbro',
    'ї': 'bscbrc',
    'ґ': '',
    'ф': 'ba',
    'и': 'bb',
    'в': 'bd',
    'а': 'bf',
    'п': 'bg',
    'р': 'bh',
    'о': 'bj',
    'л': 'bk',
    'д': 'bl',
    'ж': 'bsemicolon',
    'є': 'bapostrophe',
    'я': 'bz',
    'ч': 'bx',
    'с': 'bc',
    'м': 'bv',
    'і': 'bs',
    'т': 'bn',
    'ь': 'bm',
    'б': 'bcomma',
    'ю': 'bpoint[',
  });
};

Keyboard.prototype.qwertyFnkToClassMap = function () {
  this.map = {
    "esc": "besc",
    "f1": "bf1",
    "f2": "bf2",
    "f3": "bf3",
    "f4": "bf4",
    "f5": "bf5",
    "f6": "bf6",
    "f7": "bf7",
    "f8": "bf8",
    "f9": "bf9",
    "f10": "bf10",
    "f11": "bf11",
    "f12": "bf12",
    "~": "btilda",
    "-": "bminus",
    "_": "bminus",
    "+": "bplus",
    "=": "bplus",
    "[": "bsqbro",
    "]": "bscbrc",
    ";": "bsemicolon",
    ":": "bsemicolon",
    "'": "bapostrophe",
    "\"": "bapostrophe",
    "enter": "benter",
    ",": "bcomma",
    ".": "bpoint",
    "\\": "bslash",
    "|": "bslash",
    "/": "bslash",
    "?": "bquestion",
    "shift": "bshift",
    "shiftr": "bshiftr",
    "ctrl": "bctrl",
    "win": "bwin",
    "alt": "balt",
    "altr": "baltr",
    "winr": "bwinr",
    "menu": "bmenu",
    "ctrlr": "bctrlr",

    'q': 'bq',
    'w': 'bw',
    'e': 'be',
    'r': 'br',
    't': 'bt',
    'y': 'by',
    'u': 'bu',
    'i': 'bi',
    'o': 'bo',
    'p': 'bp',
    'a': 'ba',
    's': 'bs',
    'd': 'bd',
    'f': 'bf',
    'g': 'bg',
    'h': 'bh',
    'j': 'bj',
    'k': 'bk',
    'l': 'bl',
    'z': 'bz',
    'x': 'bx',
    'c': 'bc',
    'v': 'bv',
    'b': 'bb',
    'n': 'bn',
    'm': 'bm',
  };
  return this;
};

Keyboard.prototype.getHTML = function () {
  const html = this.layoutFactory(this.layout);
  return html;
};

Keyboard.prototype.layoutFactory = function (layout) {
  if (layout === UA_LAYOUT) {
    return this.uaLayout();
  } else {
    return this.qwertyLayout();
  }
};

Keyboard.prototype.uaLayout = function () {
  return `
      <div>
          <div class="row">
              <div class="button btilda">\`<sub>~</sub></div>
              <div class="button b1">1<sub>!</sub></div>
              <div class="button b2">2<sub>"</sub></div>
              <div class="button b3">3<sub>№</sub></div>
              <div class="button b4">4<sub>%</sub></div>
              <div class="button b5">5<sub>:</sub></div>
              <div class="button b6">6<sub>,</sub></div>
              <div class="button b7">7<sub>.</sub></div>
              <div class="button b8">8<sub>;</sub></div>
              <div class="button b9">9<sub>(</sub></div>
              <div class="button b0">0<sub>)</sub></div>
              <div class="button bminus">-<sub>_</sub></div>
              <div class="button bplus">+<sub>=</sub></div>
              <div class="button jumper">back</div>
          </div>
          <div class="row">
              <div class="button jumper">tab</div>
              <div class="button bq">Й</div>
              <div class="button bw">Ц</div>
              <div class="button be">У</div>
              <div class="button br">К</div>
              <div class="button bt">Е</div>
              <div class="button by">Н</div>
              <div class="button bu">Г</div>
              <div class="button bi">Ш</div>
              <div class="button bo">Щ</div>
              <div class="button bp">З</div>
              <div class="button bsqbro">Х</div>
              <div class="button bscbrc">Ї</div>
              <div class="button jumper">Ґ</div>
          </div>
          <div class="row">
              <div class="button jumper">caps lock</div>
              <div class="button ba">Ф</div>
              <div class="button bs">І</div>
              <div class="button bd">В</div>
              <div class="button bf helper">А</div>
              <div class="button bg">П</div>
              <div class="button bh">Р</div>
              <div class="button bj helper">О</div>
              <div class="button bk">Л</div>
              <div class="button bl">Д</div>
              <div class="button bsemicolon">Ж</div>
              <div class="button bapostrophe">Є</div>
              <div class="button benter jumper">enter</div>
          </div>
          <div class="row">
              <div class="button bshift jumper">shift</div>
              <div class="button bz">Я</div>
              <div class="button bx">Ч</div>
              <div class="button bc">С</div>
              <div class="button bv">М</div>
              <div class="button bb">И</div>
              <div class="button bn">Т</div>
              <div class="button bm">Ь</div>
              <div class="button bcomma">Б</div>
              <div class="button bpoint">Ю</div>
              <div class="button bslash">/<sub>?</sub></div>
              <div class="button bshiftr jumper">shift</div>
          </div>
          <div class="row">
              <div class="button bctrl">ctl</div>
              <div class="button bfn">fn</div>
              <div class="button bwin">opt</div>
              <div class="button balt">alt</div>
              <div class="button bspace jumper">space</div>
              <div class="button baltr">alt</div>
              <div class="button bmenu">opt</div>
              <div class="button bctrlr">ctl</div>
          </div>
    </div>`;
};

Keyboard.prototype.qwertyLayout = function () {
  return `
      <div>
          <div class="row">
              <div class="button btilda">\`<sub>~</sub></div>
              <div class="button b1">1<sub>!</sub></div>
              <div class="button b2">2<sub>@</sub></div>
              <div class="button b3">3<sub>#</sub></div>
              <div class="button b4">4<sub>$</sub></div>
              <div class="button b5">5<sub>%</sub></div>
              <div class="button b6">6<sub>^</sub></div>
              <div class="button b7">7<sub>&</sub></div>
              <div class="button b8">8<sub>*</sub></div>
              <div class="button b9">9<sub>(</sub></div>
              <div class="button b0">0<sub>)</sub></div>
              <div class="button bminus">-<sub>_</sub></div>
              <div class="button bplus">+<sub>=</sub></div>
              <div class="button jumper">back</div>
          </div>
          <div class="row">
              <div class="button jumper">tab</div>
              <div class="button bq">Q</div>
              <div class="button bw">W</div>
              <div class="button be">E</div>
              <div class="button br">R</div>
              <div class="button bt">T</div>
              <div class="button by">Y</div>
              <div class="button bu">U</div>
              <div class="button bi">I</div>
              <div class="button bo">O</div>
              <div class="button bp">P</div>
              <div class="button bsqbro">[</div>
              <div class="button bscbrc">]</div>
              <div class="button jumper">\</div>
          </div>
          <div class="row">
              <div class="button jumper">caps lock</div>
              <div class="button ba">A</div>
              <div class="button bs">S</div>
              <div class="button bd">D</div>
              <div class="button bf helper">F</div>
              <div class="button bg">G</div>
              <div class="button bh">H</div>
              <div class="button bj helper">J</div>
              <div class="button bk">K</div>
              <div class="button bl">L</div>
              <div class="button bsemicolon">;<sub>:</sub></div>
              <div class="button bapostrophe">'<sub>"</sub></div>
              <div class="button benter jumper">enter</div>
          </div>
          <div class="row">
              <div class="button bshift jumper">shift</div>
              <div class="button bz">Z</div>
              <div class="button bx">X</div>
              <div class="button bc">C</div>
              <div class="button bv">V</div>
              <div class="button bb">B</div>
              <div class="button bn">N</div>
              <div class="button bm">M</div>
              <div class="button bcomma">,<sub><</sub></div>
              <div class="button bpoint">.<sub>></sub></div>
              <div class="button bslash">/<sub>?</sub></div>
              <div class="button bshiftr jumper">shift</div>
          </div>
          <div class="row">
              <div class="button bctrl">ctl</div>
              <div class="button bfn">fn</div>
              <div class="button bwin">opt</div>
              <div class="button balt">alt</div>
              <div class="button bspace jumper">space</div>
              <div class="button baltr">alt</div>
              <div class="button bmenu">opt</div>
              <div class="button bctrlr">ctl</div>
          </div>
    </div>`;
};

Keyboard.prototype.getTypingHTML = function () {
  return [
    '<span id="before"></span>',
    '<span id="line" class="typeNext"></span>',
    '<span id="after"></span>'
  ].join('');
};

Keyboard.prototype.getButtonClass = function (alias) {
  return this.fnkToClassMap[alias] || "b" + alias;
};

Keyboard.prototype.pressButton = function (button, add) {
  var className, lowerButton, upperButton;

  add = add || false;

  lowerButton = button.toLowerCase();
  upperButton = button.toUpperCase();

  const isCaseSensitive = lowerButton !== upperButton;

  if (!add) {
    const list = this.findElements(".active");

    list.forEach(x => x.classList.remove("active"));
  }

  className = this.getButtonClass(lowerButton);
  try {
    const list = this.findElements('.' + className);

    list.forEach(x => x.classList.add('active'));
  } catch (ex) {
    console.error('Class missed', '.' + className);
  }

  if (isCaseSensitive && button === upperButton) {
    const list = this.findElements(".bshift");

    list.forEach(x => x.classList.add('active'));
  }
};

/**
 * @private
 * @param {String} selector 
 * @returns {NodeList}
 */
Keyboard.prototype.findElements = function (selector) {
  return document.querySelectorAll(selector);
}

export default Keyboard;

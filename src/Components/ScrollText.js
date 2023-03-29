import { getInnerSize } from "../tools/tools";

export default class ScrollText {
  ctx;
  text;
  wiggle = 30;
  counter = 100;
  position;
  fontWidth = 39;
  fontHeight = 88;
  letters;
  bitmap;
  x = [];
  char = [];
  sizeScreen;
  constructor(ctx, txt) {
    // txt = " 0123456789 abcdefghijklmnopqrstuvwxyz";
    this.ctx = ctx;
    this.bitmap = new Image();
    this.bitmap.src = "./images/font11.png";
    this.bitmap.style.filter = "hue-rotate(180deg)";
    this.sizeScreen = getInnerSize();
    this.text = `  ${txt}`;
    this.bitmap.onload = this.updateText.bind(this);
  }

  updateText() {
    this.letters = this.text.length;
    this.position = this.letters;
    this.fontWidth = this.bitmap.width / 36;
    this.fontHeight = this.bitmap.height;
    for (let n = 0; n < this.letters; n++) {
      this.char[n] = this.getchar(n, this.text[n]);
      this.x[n] = n * this.fontWidth + this.sizeScreen.width;
    }
  }

  getchar(n, letter) {
    let posChar;
    if (parseInt(letter) || letter === "0") {
      posChar = this.text.charCodeAt(n) - 48;
    } else {
      posChar = this.text.charCodeAt(n) - 97 + 10;
    }
    return posChar;
  }

  animate(clear) {
    for (let n = 0; n < this.letters; n++) {
      let y =
        this.sizeScreen.height -
        this.fontHeight -
        this.fontHeight / 2 +
        Math.sin(n + this.counter / 6.28) * this.wiggle;

      if (this.ctx && this.bitmap) {
        this.ctx.drawImage(
          this.bitmap,
          this.char[n] * this.fontWidth,
          0,
          this.fontWidth,
          this.fontHeight,
          this.x[n],
          y,
          this.fontWidth,
          this.fontHeight
        );
      }

      this.x[n] -= 5;
      if (this.x[n] < -this.fontWidth) {
        this.x[n] = (this.letters - 1) * this.fontWidth + this.sizeScreen.width;
        this.char[n] = this.getchar(n, this.text[n]);
        this.position++;
        if (this.position > this.text.length) this.position = 0;
      }
    }
    if (this.counter > 200 && this.wiggle < 30) this.wiggle += 0.1;
    this.counter++;
  }
}

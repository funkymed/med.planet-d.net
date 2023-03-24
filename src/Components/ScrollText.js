import { getInnerSize } from "../tools/tools";

export default class ScrollText {
  ctx;
  text;
  wiggle = 20;
  counter = 0;
  position;
  fontWidth = 54;
  fontHeight = 71;
  letters = 12;
  bitmap;
  x = [];
  char = [];
  sizeScreen;
  constructor(ctx, txt) {
    this.ctx = ctx;
    this.text = txt;
    this.bitmap = new Image();
    this.bitmap.src = "./images/font.png";
    this.sizeScreen = getInnerSize();
    this.updateText(this.text);
  }

  updateText(text) {
    console.log(text);
    this.text = "      " + text + "                     ";
    this.letters = this.text.length;
    this.position = this.letters;
    for (let n = 0; n < this.letters; n++) {
      this.char[n] = this.text.charCodeAt(n) - 97;
      this.x[n] = n * this.fontWidth + this.sizeScreen.width;
    }
  }

  animate(clear) {
    if (clear) {
      // this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    for (let n = 0; n < this.letters; n++) {
      let y =
        this.sizeScreen.height -
        this.fontHeight -
        25 +
        this.wiggle * Math.sin(n + this.counter / 6.28);

      if (this.ctx && this.bitmap) {
        this.ctx.drawImage(
          this.bitmap,
          this.char[n] * this.fontWidth,
          0,
          this.fontWidth,
          this.fontHeight,
          +this.x[n],
          y,
          this.fontWidth,
          this.fontHeight
        );
      }

      this.x[n] -= 4;
      if (this.x[n] < -this.fontWidth) {
        this.x[n] = (this.letters - 1) * this.fontWidth + this.sizeScreen.width;
        this.char[n] = this.text.charCodeAt(this.position) - 97;
        this.position++;
        if (this.position > this.text.length) this.position = 0;
      }
    }
    if (this.counter > 200 && this.wiggle < 30) this.wiggle = this.wiggle + 0.1;
    this.counter++;
  }
}

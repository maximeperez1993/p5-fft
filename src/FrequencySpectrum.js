import P5 from "p5/lib/p5";

export default class FrequencySpectrum {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.margin = width / 128;
        this.height = height;
        this.fft = new P5.FFT(0.9, 128);
    }

    draw() {
        let spectrum = this.fft.analyze();
        let freqToDraw = null;
        for (let freq = 0; freq < spectrum.length; freq++) {
            sk.fill(255, freq * 2, 0);
            let amp = spectrum[freq];
            let y = sk.map(amp, 0, 256, this.height, 0);
            let x = freq * this.margin;
            sk.rect(x, y, this.margin, this.height - y);
            if (this.isMouseOnBar(x, y)) {
                freqToDraw = freq;
            }
        }

        if (freqToDraw != null) {
            sk.fill(255, 255, 255);
            sk.textSize(30);
            sk.text(freqToDraw, sk.mouseX, sk.mouseY);
        }
    }

    isMouseOnBar(x, y) {

        return sk.mouseX >= x &&
            sk.mouseY >= y &&
            sk.mouseX <= x + this.margin &&
            sk.mouseY <= this.height;

    }
}
import P5 from "p5/lib/p5";
import FrequencySpectrumBar from "./FrequencySpectrumBar";

const MAX_BARS = 128;
export default class FrequencySpectrum {
    constructor(vectorPosition, vectorSize) {
        this.vectorPosition = vectorPosition.copy();
        this.vectorSize = vectorSize.copy();
        this.bars = [];
        for (let i = 0; i < MAX_BARS; i++) {
            let barSize = sk.createVector(vectorSize.x / MAX_BARS, vectorSize.y);
            this.bars.push(new FrequencySpectrumBar(this.vectorPosition, barSize, i));
        }

        this.fft = new P5.FFT(0.9, 128);
        this.frameColor = sk.color(150);
    }

    draw() {
        sk.noFill();
        sk.stroke(this.frameColor);
        sk.rect(this.vectorPosition.x, this.vectorPosition.y, this.vectorSize.x, this.vectorSize.y);

        let spectrum = this.fft.analyze();
        this.bars.forEach(bar => bar.draw(spectrum));
        this.bars.forEach(bar => bar.drawIndex());
    }

}
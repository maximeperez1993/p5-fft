export default class FrequencySpectrumBar {
    constructor(vectorPosition, vectorSize, spectrumIndex) {
        this.vectorPosition = vectorPosition.copy();
        this.vectorPosition.x += spectrumIndex * vectorSize.x;
        this.vectorSize = vectorSize.copy();
        this.spectrumIndex = spectrumIndex;

        this.barColor = sk.color(255, this.spectrumIndex * 2, 0);
        this.textColor = sk.color(255);
    }

    draw(spectrum) {
        sk.fill(this.barColor);
        let amp = spectrum[this.spectrumIndex];
        let y = this.vectorPosition.y + sk.map(amp, 0, 256, this.vectorSize.y, 0);
        let height = this.vectorPosition.y + this.vectorSize.y - y
        sk.rect(this.vectorPosition.x, y, this.vectorSize.x, height);
    }

    drawIndex() {
        if (this.isMouseOn()) {
            sk.fill(255, 255, 255);
            sk.textSize(30);
            sk.text(this.spectrumIndex, sk.mouseX, sk.mouseY);
        }
    }

    isMouseOn() {
        return sk.mouseX >= this.vectorPosition.x &&
            sk.mouseY >= this.vectorPosition.y &&
            sk.mouseX <= this.vectorPosition.x + this.vectorSize.x &&
            sk.mouseY <= this.vectorPosition.y + this.vectorSize.y;

    }
}
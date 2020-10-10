import '../lib/p5.sound';
import FrequencySpectrum from "./FrequencySpectrum";

export default class Sketch {

    constructor() {
        this.fft = null;
    }

    preload() {
        this.sound = sk.loadSound('Bill_Vortex_-_10_-_Action_Breakbeat.mp3');
    }

    setup() {
        sk.createCanvas(sk.windowWidth, sk.windowHeight);
        sk.createButton('Toggle Play').mousePressed(() => this.togglePlay());
        this.frequencySpectrum = new FrequencySpectrum(0, 0, sk.width / 2, sk.height / 2);
        this.sound.play();
    }

    draw() {
        sk.background(0);
        this.frequencySpectrum.draw();
    }

    togglePlay() {
        this.sound.isPlaying() ? this.sound.pause() : this.sound.loop()
    }
}
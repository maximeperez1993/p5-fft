import '../lib/p5.sound';

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
        this.sound.play();
    }

    draw() {
        sk.background(0);
    }

    togglePlay() {
        this.sound.isPlaying() ? this.sound.pause() : this.sound.loop()
    }
}
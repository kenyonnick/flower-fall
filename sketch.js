var progression = 0;

var flowers = [];

var images = [];

var maxFlowerDiameter = 9;

function setup() {
    createCanvas(1920, 1080);
    background('rgba(0,0,0,0.0)');
    angleMode(DEGREES);

    images = [
        loadImage('imgs/Balloon.png'),
        loadImage('imgs/Cyan.png'),
        loadImage('imgs/Daisy.png'),
        loadImage('imgs/Gerber.png'),
        loadImage('imgs/Hibiscus.png'),
        loadImage('imgs/Rose.png'),
    ];

    for (var x = 0; x < width; x += maxFlowerDiameter) {
        const flowerIndex = Math.floor(Math.random() * images.length);
        flowers.push(new Flower(x, 0, Math.random() * 2, images[flowerIndex]));
    }
}

function draw() {
    clear();
    background('rgba(0,0,0,0.0)');
    flowers.forEach((flower) => {
        if (!flower.active && Math.random() > 0.8) {
            flower.active = true;
            flower.speed = Math.random() + 1;
        }
        flower.render();
    })
}

class Flower {
    initialX = 0;
    x = 0;
    y = 0;
    speed = 0;
    diameter = maxFlowerDiameter;
    active = false;
    amplitude = 10;
    frequency = 0.001;
    image = null;
    rotation = 0;

    constructor(x, y, speed, image) {
        this.initialX = x;
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.image = image;
    }

    render() {
        if (this.active) {
            this.y += this.speed;
            this.x = this.initialX + this.amplitude / this.speed * Math.cos(Math.PI * 2 * this.frequency * this.speed * this.y);
            this.rotation += Math.random(-1, 1);

            push();
            translate(this.x, this.y);
            rotate(this.rotation);
            image(this.image, 0, 0, this.diameter * this.speed, this.diameter * this.speed);
            pop();

            if (this.y >= height) {
                this.y = 0 - this.diameter;
                this.active = false;
            }
        }
    }
}

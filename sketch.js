const stars = [];
let angle = 0;

function createStar(initialVectorMagnitude) {
    let offsetX = random(-width / 2, width / 2);
    let offsetY = random(-height / 2, height / 2);

    while (offsetX === 0 && offsetY === 0) {
        offsetX = random(-width / 2, width / 2);
        offsetY = random(-height / 2, height / 2);
    }

    const star = new Star(offsetX, offsetY, initialVectorMagnitude || 0);
    return star;
}

function goFullScreen() {
    let cs = document.getElementsByTagName("CANVAS");
    if (cs && cs.length === 1) {
        const canvas = cs[0];
        if (canvas.requestFullScreen)
            canvas.requestFullScreen();
        else if (canvas.webkitRequestFullScreen)
            canvas.webkitRequestFullScreen();
        else if (canvas.mozRequestFullScreen)
            canvas.mozRequestFullScreen();
    }
}

function setup() {
    frameRate(15);

    let c = createCanvas(1280, 720);
    // console.log(c.canvas);
button = createButton('click me');
  button.mousePressed(goFullScreen);

    background(0);

    for (let i = 0; i < 150; i++) {
        const star = createStar(random(0, 100));
        stars.push(star);
    }
}

function draw() {
    background(0);

    noStroke();
    fill(255);

    translate(width / 2, height / 2);
    // rotate(angle+=0.01);
    for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.draw();
        star.move();

        const pos = star.pos();

        if (pos.x > width / 2 ||
            pos.x < width / -2 ||
            pos.y > height / 2 ||
            pos.y < height / -2) {
            stars[i] = createStar();
        }
    }
}

//class
function Star(offsetX, offsetY, vectorMagnitude) {

    function getRandomizedColor(){
        const colors=[
            color(255,149,0),
            color(200,255,255),
            color(255,0,0),
            color(255,255,100),
        ]

        return colors[floor(random(0,colors.length))];
    }

    this.color = getRandomizedColor();
    this.offset = createVector(offsetX, offsetY);
    this.vector = vectorMagnitude ?
        this.offset.copy().normalize().mult(vectorMagnitude) :
        this.offset.copy().normalize().mult(0.001);

    this.pos = function () {
        return p5.Vector.add(this.offset, this.vector);
    }

    this.draw = function () {
        const pos = this.pos();
        const factor = 3;
        const size = map(this.vector.mag(), 0, 300, 0.5 *factor, 4*factor);
        push();
        fill(this.color);
        ellipse(pos.x, pos.y, size);
        pop();
    };

    this.move = function () {
        this.vector.setMag(this.vector.mag() + 0.1);
        this.vector.mult(1.1);
    };
};

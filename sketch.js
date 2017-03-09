const stars = [];

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

function setup() {
    frameRate(15);

    createCanvas(400, 400);
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
    this.offset = createVector(offsetX, offsetY);
    this.vector = vectorMagnitude ?
        this.offset.copy().normalize().mult(vectorMagnitude) :
        this.offset.copy().normalize().mult(0.001);

    this.pos = function () {
        return p5.Vector.add(this.offset, this.vector);
    }

    this.draw = function () {
        const pos = this.pos();
        const size = map(this.vector.mag(), 0, 300, 0.5 * 2, 8 * 2);
        ellipse(pos.x, pos.y, size);
    };

    this.move = function () {
        this.vector.setMag(this.vector.mag() + 0.1);
        this.vector.mult(1.05);
    };
};

const stars = [];

function setup() {
    frameRate(15);

    createCanvas(400, 400);
    background(0);

    for(let i = 0; i < 150; i++){
        const vector = createVector(random(-200,200), random(-200,200));
        stars.push(vector);
    }
}

function draw() {
    background(0);

    noStroke();
    fill(255);

    translate(width/2, height/2);

    for(let i = 0; i < stars.length; i++)
    {   
        const star = stars[i];
        const size = map(star.mag(), 0,300, 0.5, 8);
        ellipse(star.x, star.y, size);
        star.mult(1.05);
        star.setMag(star.mag() +0.4);

        if( star.x > width / 2 || 
            star.x < width / -2 ||
            star.y > height / 2 || 
            star.y < height / -2 )
        {   
            const vector = createVector(random(-20,20), random(-20,20));
            stars[i] = vector;
        }
    }
}

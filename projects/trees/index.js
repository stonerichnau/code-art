// That's right... I'm using gobals... *gasp*
let width;
let height;
let canvas;
let ctx;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    document.body.appendChild(canvas);
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgb(255,255,200)';
    ctx.fillRect(0, 0, width, height);
    mainLoop([create()]);
};

function mainLoop(particles) {
    let nextParticles = [];

    requestAnimationFrame(function() {
        mainLoop(nextParticles);
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let i = 0, len = particles.length; i < len; i++) {
        renderParticle(particles[i]);
        updateParticle(particles[i], nextParticles);
    }

}

function renderParticle(p) {
    let n = 1 + (p.radius * p.radius + Math.PI) | 0;
    for (let i = 0; i < n; i++) {
        let a = Math.random() * Math.PI * 2;
        let r = Math.sqrt(Math.random()) * p.radius;
        let x = p.x + Math.cos(a) * r;
        let y = p.y + Math.sin(a) * r;
        ctx.fillRect(x, y, 1, 1);
    }
}

function updateParticle(p, nextParticles) {
    let d = Math.random() * 1.25;
    p.x += Math.cos(p.angle) * d;
    p.y += Math.sin(p.angle) * d;
    p.angle += Math.random() * 0.02 - 0.01;
    p.radius *= 0.998;
    if (p.radius > 0.5) {
        nextParticles.push(p);
        let splitCutoff = Math.min(0.005, 1.0 / (p.radius * 10));
        if (Math.random() < splitCutoff) {
            nextParticles.push({
                x: p.x,
                y: p.y,
                angle: p.angle + Math.random() - 0.5,
                radius: p.radius * 0.9
            });
            p.angle += Math.random() - 0.5;
            p.radius *= 0.9;
        }
    } else {
        // Let's have a moment of silence for the loss of this great branch.
        // ...
   }
}

// A newborn branch. Isn't it cute?
function create() {
    return {
        x: Math.random() * width,
        y: height + 5,
        angle: -Math.PI / 2,
        radius: Math.random() * 20 + 20,
    };
}

// Make the paper scope global, by injecting it into window:
paper.install(window);
window.onload = function () {
    let url = new URLSearchParams(window.location.search);
    let samples = url.get('samples') || 100;

    paper.setup('myCanvas');

    let radius = 250;
    let strokeColor = 'black';

    let rect = new Path.Rectangle(
        new Point(0, 0),
        new Point(2 * radius, 2 * radius)
    )
    rect.strokeColor = strokeColor;

    // inscribed circle
    let circ = new Path.Circle(
        new Point(radius, radius),
        radius
    );
    circ.strokeColor = strokeColor;

    view.draw();

    let inside = 0;
    let count = 0;

    for (var i = 0; i < samples; i++) {
        let randX = randInRange(0, 2 * radius);
        let randY = randInRange(0, 2 * radius);

        let point = new Path.Circle(
            new Point(randX, randY),
            3
        );
        point.fillColor = 'black';

        if (Math.pow(randX - radius, 2) + Math.pow(randY - radius, 2) <= Math.pow(radius, 2)) {
            inside += 1;
            point.fillColor = 'red';
        }
        count += 1;
        view.draw();
        let estimate = 4 * (inside / count);
        // console.log(inside, count, estimate);
    }
    let estimate = 4.0 * (inside / count);
    document.getElementById("result").innerHTML = estimate;
    console.log(inside, count, estimate);
}

function randInRange(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}

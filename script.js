// Wait for DOM + Matter.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 PHASE 2: Physics engine initializing...');

// === PHYSICS UNIVERSE SETUP === Engine: the "brain" that steps physics forward

    const engine = Matter.Engine.create();
    const world = engine.world;
    world.gravity.y = 1;
    world.gravity.scale = 0.001;

    console.log('🌍 Physics world created:', world);

    const ground = Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight - 50,
        window.innerWidth,
        100,
        {
            isStatic: true,
            render: {
                visible: false
            }
        }
    );

    Matter.World.add(world, ground);
    console.log('🪨 Ground created at:', ground.position);

    const gameLoop = () => {
        Matter.Engine.update(engine, 1000 / 60);

        requestAnimationFrame(gameLoop);
    };

    gameLoop();

    console.log('⏰ Game loop started at 60fps!');

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            Matter.Body.setPosition(ground, {
                x: window.innerWidth / 2,
                y: ground.position.y
            });
            Matter.Body.set(ground, 'width', window.innerWidth);
            console.log('📐 World resized:', window.innerWidth);
        }, 250); // debounce
    });

    console.log('✅ PHASE 2 COMPLETE: Physics engine running!');

});
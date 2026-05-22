// Wait for DOM + Matter.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 PHASE 3: DOM-to-Physics bridge initializing...');

    const engine = Matter.Engine.create();
    const world = engine.world;
    world.gravity.y = 1;
    world.gravity.scale = 0.001;

    console.log('🌍 Physics world created:', world);

    // select all elements that will become physics bodies
    const elements = {
        logo: document.querySelector('.logo h1'),
        searchInput: document.querySelector('.search-input'),
        googleBtn: document.querySelector('.google-btn'),
        luckyBtn: document.querySelector('.lucky-btn'),
        navApps: document.querySelector('.nav-apps'),
        navAccount: document.querySelector('.nav-account')
    };

    // verify elements exist
    Object.entries(elements).forEach(([name, el]) => {
        if (el) {
            console.log(`✓ ${name} found:`, el);
        } else {
             console.error(`✗ ${name} NOT FOUND`);
        }
    });

    const bodies = {}; // store physics bodies
    const bodiesMap = new Map(); // Map DOM -> Physics

    // Helper: create physics body from DOM element
    function createPhysicsBody(element,name) {
        const rect = element.getBoundingClientRect();

        const body = Matter.Bodies.rectangle(
            rect.x + rect.width / 2,
            rect.y + rect.height / 2,
            rect.width,
            rect.height,
            {
                restitution: 0.6,
                friction: 0.3,
                mass: 1,
                isStatic: false,
            }
        );

        body.label = name;
        body.initialRect = rect;
        console.log(`🌀 ${name} physics body created:`, body.position);
        
        return body;
    }

    bodies.logo = createPhysicsBody(elements.logo, 'logo');
    bodies.searchInput = createPhysicsBody(elements.searchInput, 'searchInput');
    bodies.googleBtn = createPhysicsBody(elements.googleBtn, 'googleBtn');
    bodies.luckyBtn = createPhysicsBody(elements.luckyBtn, 'luckyBtn');
    bodies.navApps = createPhysicsBody(elements.navApps, 'navApps');
    bodies.navAccount = createPhysicsBody(elements.navAccount, 'navAccount');

    Matter.World.add(world, Object.values(bodies));
    console.log('🎯 all bodies added to physics world');

    const ground = Matter.Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight - 50,
        window.innerWidth,
        100,
        {
            isStatic: true, render: { visible: false}
        });
});
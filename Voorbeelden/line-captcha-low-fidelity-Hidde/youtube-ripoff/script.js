function setThemeByPreference() {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    document.body.classList.toggle('light-theme', prefersLight);
}

setThemeByPreference();
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', setThemeByPreference);

const videoGrid = document.getElementById('videoGrid');

const titles = [
    "Epic Banana Explosion Compilation!", "World's Most Dangerous Slide", "Unicorns Invade New York", "Alien Dance Battle", "Exploding Watermelon Science!",
    "Extreme Cat Surfing", "Haunted Toaster Review", "DIY Jetpack Fail", "Invisible Dog Prank", "Ultimate Scream Challenge",
    "Wildest Rollercoaster POV", "Shark vs. Robot: Who Wins?", "Flying Pizza Delivery", "Giant Rubber Duck Race", "Spicy Ice Cream Taste Test",
    "Underwater Fireworks Show", "Monster Truck Ballet", "Space Hamster Olympics", "Reverse Gravity Experiment", "Chicken Karaoke Finals",
    "Zombie Fashion Show", "Laser Tag in the Rain", "World's Loudest Whisper", "Exploding Glitter Bombs", "Extreme Marshmallow Toss",
    "Ninja Goat Parkour", "Epic Slime Tsunami", "Unstoppable Bubble Machine", "Superhero Squirrel Rescue", "Wildest TikTok Trends",
    "Haunted VR Experience", "Alien Pizza Party", "Unicorn Rodeo", "Banana Phone Orchestra", "Extreme Llama Racing",
    "Invisible Skateboard Tricks", "Monster Under the Bed Interview", "Reverse Cooking Show", "Epic Meme Generator",
    "Flying Fish Parade", "Wildest Selfie Spots", "Exploding Cake Bake-Off", "Extreme Sleepwalking", "Laser Chicken Olympics",
    "Haunted Mirror Maze", "Unicorns vs Zombies", "Epic Water Balloon War", "Reverse Hide and Seek", "Wildest Elevator Rides"
    ,
    // Shitpost/slop titels
    "I put beans in my computer", "Ohio meme compilation", "Skibidi Toilet but in Ohio", "Sigma grindset tutorial", "You won’t believe this rat",
    "AI presidents play Minecraft", "Gmod nextbot chase", "I drank 1 liter of glue", "Minecraft but it’s cursed", "I made a nuclear bomb in Roblox",
    "Skibidi Ohio Sigma", "I turned my house into a pool", "I put my PC in the oven", "Shrek in Ohio", "I made a toilet fly",
    "I deepfried my phone", "I played chess with a pigeon", "I microwaved a Big Mac", "I made a car out of cheese", "I put my fridge in the sea",
    "I built a house in 1 minute", "I made a sandwich with 100 ingredients", "I played Fortnite in a fridge", "I made a Skibidi Toilet in Minecraft",
    "I turned my cat into a meme", "I made a rat president", "I played Roblox in Ohio", "I made a meme generator", "I deepfried my keyboard",
    "I made a toilet explode", "I played chess in the shower"
];

const channels = [
    "BananaBlaster", "UnicornNYC", "AlienGroove", "WatermelonLab", "CatSurferX",
    "HauntedHome", "JetpackDIY", "InvisibleDogTV", "ScreamMaster", "RollercoasterWild",
    "SharkBot", "PizzaFlyer", "RubberDuckRacer", "SpicyCream", "FireworksUnderwater",
    "MonsterBallet", "SpaceHamster", "GravityGone", "ChickenKaraoke", "ZombieFashion",
    "LaserRain", "WhisperLoud", "GlitterBombs", "MarshmallowToss", "NinjaGoat",
    "SlimeTsunami", "BubbleMachine", "SquirrelHero", "TikTokWild", "HauntedVR",
    "AlienPizza", "UnicornRodeo", "BananaOrchestra", "LlamaRacer", "InvisibleSkate",
    "MonsterBed", "ReverseCook", "MemeGen", "FlyingFish", "SelfieSpots",
    "CakeBakeOff", "Sleepwalker", "LaserChicken", "MirrorMaze", "UnicornZombie",
    "WaterBalloonWar", "HideSeekReverse", "ElevatorWild"
];

const wildThumbnails = [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    // Meme/slop thumbnails
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", // deepfried
    "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=400&q=80", // weird objects
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // meme face
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80", // cursed food
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80", // presidents
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // Skibidi Toilet
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80", // Ohio meme
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80", // Roblox
    "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80", // Fortnite
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80", // glue
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80", // Shrek
    "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80", // rat
    "https://images.unsplash.com/photo-1465101178521-c1a2b1c6413c?auto=format&fit=crop&w=400&q=80", // pigeon
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80", // deepfried food
    "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=400&q=80", // weird places
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80", // meme generator
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80", // toilet explode
    "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80", // chess in shower
];

function getRandomGradient() {
    // Generate two random colors
    const color1 = `hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`;
    const color2 = `hsl(${Math.floor(Math.random()*360)}, 70%, 60%)`;
    return `linear-gradient(135deg, ${color1}, ${color2})`;
}

function generateRandomVideos(count) {
    for (let i = 0; i < count; i++) {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';

        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';
        // 70% kans op een wilde afbeelding
        if (Math.random() > 0.2) {
            const img = document.createElement('img');
            img.src = wildThumbnails[Math.floor(Math.random() * wildThumbnails.length)];
            img.alt = 'Wild thumbnail';
            // Fallback: als de afbeelding niet laadt, gebruik een gradient
            img.onerror = function() {
                thumbnail.innerHTML = '';
                thumbnail.style.background = getRandomGradient();
            };
            thumbnail.appendChild(img);
        } else {
            thumbnail.style.background = getRandomGradient();
        }

        const title = document.createElement('h3');
        title.textContent = titles[Math.floor(Math.random() * titles.length)];

        const channel = document.createElement('p');
        channel.textContent = `${channels[Math.floor(Math.random() * channels.length)]} • ${Math.floor(Math.random() * 1000)}K views • ${Math.floor(Math.random() * 10)} days ago`;

        videoCard.appendChild(thumbnail);
        videoCard.appendChild(title);
        videoCard.appendChild(channel);
        videoGrid.appendChild(videoCard);
    }
}

generateRandomVideos(20);
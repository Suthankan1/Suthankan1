/**
 * DevRacer: Suthankan's Interactive Car Game & Telemetry Portfolio
 * Zero-dependency HTML5 Canvas 2D Game & Web Audio Engine.
 */

// SOUND SYNTHESIS ENGINE (Web Audio API)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.engineOsc = null;
    this.engineGain = null;
    this.isMuted = false;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      // Engine oscillator (continuous low frequency pitch)
      this.engineOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();
      this.engineOsc.type = 'triangle';
      this.engineOsc.frequency.setValueAtTime(45, this.ctx.currentTime);
      this.engineGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      this.engineOsc.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);
      this.engineOsc.start();

      this.initialized = true;
    } catch (e) {
      console.warn("AudioContext not supported or blocked", e);
    }
  }

  updateEngine(speed, maxSpeed, isNitro) {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    const ratio = Math.abs(speed) / maxSpeed;
    const baseFreq = isNitro ? 120 + ratio * 140 : 45 + ratio * 120;
    this.engineOsc.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.05);
    const volume = 0.03 + ratio * 0.05 + (isNitro ? 0.04 : 0);
    this.engineGain.gain.setTargetAtTime(volume, this.ctx.currentTime, 0.05);
  }

  playDrift() {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playChime() {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.18); // A5
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playHorn() {
    if (!this.initialized || !this.ctx || this.isMuted) return;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc1.type = 'triangle';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(370, this.ctx.currentTime);
    osc2.frequency.setValueAtTime(440, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);
    osc1.start();
    osc2.start();
    osc1.stop(this.ctx.currentTime + 0.3);
    osc2.stop(this.ctx.currentTime + 0.3);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.engineGain) {
      this.engineGain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);
    }
    return this.isMuted;
  }
}

// CAR ENTITY WITH 2D ARCADE DRIFT DYNAMICS
class Car {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 0;
    this.maxSpeed = 8.5;
    this.nitroSpeed = 13.5;
    this.accel = 0.22;
    this.friction = 0.965;
    this.turnSpeed = 0.048;
    this.driftFactor = 0.94;
    
    // Nitro system
    this.nitro = 100;
    this.isNitro = false;
    this.width = 24;
    this.height = 46;

    // Particles & Skids
    this.skids = [];
    this.particles = [];
  }

  update(input, sound) {
    const isAccelerating = input.up;
    const isBraking = input.down;
    const isTurningLeft = input.left;
    const isTurningRight = input.right;
    
    // Nitro handling
    if (input.nitro && this.nitro > 0 && isAccelerating) {
      this.isNitro = true;
      this.nitro = Math.max(0, this.nitro - 0.7);
    } else {
      this.isNitro = false;
      this.nitro = Math.min(100, this.nitro + 0.25);
    }

    const currentMaxSpeed = this.isNitro ? this.nitroSpeed : this.maxSpeed;

    // Acceleration & Braking
    if (isAccelerating) {
      this.speed += this.isNitro ? this.accel * 1.8 : this.accel;
      if (this.speed > currentMaxSpeed) this.speed = currentMaxSpeed;
      
      // Exhaust particles
      if (Math.random() < 0.6) {
        this.addExhaustParticle(this.isNitro);
      }
    } else if (isBraking) {
      if (this.speed > 0) {
        this.speed -= this.accel * 1.5;
        if (this.speed < 0) this.speed = 0;
      } else {
        this.speed -= this.accel * 0.7;
        if (this.speed < -currentMaxSpeed * 0.4) this.speed = -currentMaxSpeed * 0.4;
      }
    } else {
      this.speed *= this.friction;
      if (Math.abs(this.speed) < 0.02) this.speed = 0;
    }

    // Steering & Drifting
    if (Math.abs(this.speed) > 0.1) {
      const dir = this.speed > 0 ? 1 : -1;
      if (isTurningLeft) {
        this.angle -= this.turnSpeed * dir;
        if (Math.abs(this.speed) > 5) sound.playDrift();
      }
      if (isTurningRight) {
        this.angle += this.turnSpeed * dir;
        if (Math.abs(this.speed) > 5) sound.playDrift();
      }

      // Add tire skid marks during hard turns or braking
      if ((isTurningLeft || isTurningRight || isBraking) && Math.abs(this.speed) > 4.5) {
        this.addSkidMark();
      }
    }

    // Update position
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) this.particles.splice(i, 1);
    }

    // Limit skid marks memory
    if (this.skids.length > 300) {
      this.skids.splice(0, 10);
    }
  }

  addSkidMark() {
    const rearX = this.x - Math.cos(this.angle) * 16;
    const rearY = this.y - Math.sin(this.angle) * 16;
    const perp = this.angle + Math.PI / 2;
    const offset = 9;

    this.skids.push({
      x1: rearX + Math.cos(perp) * offset,
      y1: rearY + Math.sin(perp) * offset,
      x2: rearX - Math.cos(perp) * offset,
      y2: rearY - Math.sin(perp) * offset,
      alpha: 0.4
    });
  }

  addExhaustParticle(isNitro) {
    const rearX = this.x - Math.cos(this.angle) * 20;
    const rearY = this.y - Math.sin(this.angle) * 20;
    this.particles.push({
      x: rearX + (Math.random() - 0.5) * 6,
      y: rearY + (Math.random() - 0.5) * 6,
      vx: -Math.cos(this.angle) * (1.5 + Math.random() * 2) + (Math.random() - 0.5),
      vy: -Math.sin(this.angle) * (1.5 + Math.random() * 2) + (Math.random() - 0.5),
      life: 1.0,
      decay: isNitro ? 0.08 : 0.04,
      size: isNitro ? 4 + Math.random() * 3 : 2.5 + Math.random() * 2,
      color: isNitro ? '#f43f5e' : '#94a3b8'
    });
  }

  draw(ctx) {
    // Draw Skids
    ctx.save();
    for (const skid of this.skids) {
      ctx.fillStyle = `rgba(15, 23, 42, ${skid.alpha})`;
      ctx.beginPath();
      ctx.arc(skid.x1, skid.y1, 2.5, 0, Math.PI * 2);
      ctx.arc(skid.x2, skid.y2, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Draw Particles
    ctx.save();
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Draw Car Body
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle + Math.PI / 2); // Orient forward

    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 4, this.width, this.height);

    // Chassis / Body (Cyberpunk Racer)
    const bodyGrad = ctx.createLinearGradient(-this.width / 2, 0, this.width / 2, 0);
    bodyGrad.addColorStop(0, '#0284c7');
    bodyGrad.addColorStop(0.5, '#38bdf8');
    bodyGrad.addColorStop(1, '#0284c7');

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.roundRect(-this.width / 2, -this.height / 2, this.width, this.height, [8, 8, 4, 4]);
    ctx.fill();

    // Roof & Cockpit Window
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.roundRect(-this.width / 2 + 3, -this.height / 2 + 12, this.width - 6, 16, 4);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Windshield Accent
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 13, this.width - 10, 5);

    // Front Headlights (Neon White/Cyan)
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(-this.width / 2 + 2, -this.height / 2 + 2, 5, 3);
    ctx.fillRect(this.width / 2 - 7, -this.height / 2 + 2, 5, 3);

    // Headlight Beams (Glowing Cast)
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.beginPath();
    ctx.moveTo(-this.width / 2, -this.height / 2);
    ctx.lineTo(-this.width / 2 - 25, -this.height / 2 - 90);
    ctx.lineTo(this.width / 2 + 25, -this.height / 2 - 90);
    ctx.lineTo(this.width / 2, -this.height / 2);
    ctx.closePath();
    ctx.fill();

    // Rear Taillights (Neon Red)
    ctx.fillStyle = this.isNitro ? '#f43f5e' : '#ef4444';
    ctx.fillRect(-this.width / 2 + 2, this.height / 2 - 3, this.width - 4, 3);

    // Aero Rear Spoiler
    ctx.fillStyle = '#0369a1';
    ctx.fillRect(-this.width / 2 - 2, this.height / 2 - 6, this.width + 4, 3);

    ctx.restore();
  }
}

// PROJECT & LANDMARK BUILDING BLOCKS
const PROJECTS_DATA = [
  {
    id: 'voltgrid',
    name: 'VoltGrid MegaStation',
    category: 'Distributed EV Charging Platform',
    color: '#38bdf8',
    borderColor: '#0284c7',
    x: 1850,
    y: 650,
    width: 220,
    height: 180,
    pitX: 1850,
    pitY: 780,
    description: 'A resilient, high-throughput distributed EV charging network platform managing distributed stations across 3 independent Spring Boot services, OCPP 2.0.1 WebSockets, gRPC, and Kafka.',
    specs: [
      { title: 'TRANSACTIONAL OUTBOX', desc: 'Guarantees zero dual-write inconsistencies between PostgreSQL and Apache Kafka.' },
      { title: 'OCPP 2.0.1 COMPLIANCE', desc: 'Real-time WebSocket protocol handling remote commands and meter values.' },
      { title: 'OBSERVABILITY', desc: 'OpenTelemetry end-to-end distributed tracing across gRPC microservice hops.' },
      { title: 'INFRASTRUCTURE', desc: 'Containerized on AWS ECS Fargate, RDS PostgreSQL, VPC, and Terraform.' }
    ],
    tags: ['Java 25', 'Spring Boot 4', 'Kafka', 'gRPC', 'PostgreSQL', 'AWS ECS', 'Terraform'],
    links: [
      { text: '📂 GitHub Repository', url: 'https://github.com/Suthankan1/voltgrid', primary: true },
      { text: '📖 Architecture Docs', url: 'https://github.com/Suthankan1/voltgrid/blob/main/README.md', primary: false }
    ]
  },
  {
    id: 'proofmesh',
    name: 'ProofMesh Citadel',
    category: 'Zero-Trust Agent Runtime Governance',
    color: '#c084fc',
    borderColor: '#7e22ce',
    x: 650,
    y: 500,
    width: 220,
    height: 180,
    pitX: 650,
    pitY: 630,
    description: 'A zero-trust execution platform separating policy evaluation from tool invocation for autonomous AI agents, featuring cryptographic authorization and deterministic replay prevention.',
    specs: [
      { title: 'ES256 CRYPTO VERIFICATION', desc: 'RFC 8785 canonical JSON binding ensures grants cannot be tampered with in-flight.' },
      { title: 'FAIL-CLOSED ARCHITECTURE', desc: 'Stripped credentials, durable PostgreSQL claims, and instant authorization revocation.' },
      { title: 'HYBRID TECH STACK', desc: 'High-assurance Spring Modulith control plane with lightning-fast Go execution gateway.' }
    ],
    tags: ['Java 25', 'Spring Modulith', 'Go (Golang)', 'Keycloak', 'PostgreSQL', 'ES256 / JWKS'],
    links: [
      { text: '📂 GitHub Repository', url: 'https://github.com/Suthankan1/proofmesh', primary: true },
      { text: '🛡️ Security Invariants', url: 'https://github.com/Suthankan1/proofmesh#security-model--invariants', primary: false }
    ]
  },
  {
    id: 'settlecore',
    name: 'SettleCore Financial Exchange',
    category: 'Payment Reconciliation & Invariants',
    color: '#10b981',
    borderColor: '#047857',
    x: 2250,
    y: 1850,
    width: 220,
    height: 180,
    pitX: 2250,
    pitY: 1720,
    description: 'High-performance .NET 10 backend focused on payment state machines, provider reconciliation, and strict ledger data invariants.',
    specs: [
      { title: 'STATE RECONCILIATION', desc: 'Provider-reference uniqueness and zero-data-loss EF Core PostgreSQL migrations.' },
      { title: 'AUTOMATED TEST HARNESS', desc: 'Containerized integration testing with deterministic state transition assertions.' },
      { title: 'HIGH CONCURRENCY', desc: 'Optimistic locking and idempotent payment capture processing.' }
    ],
    tags: ['C#', '.NET 10', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'GitHub Actions'],
    links: [
      { text: '📂 GitHub Repository', url: 'https://github.com/Suthankan1/SettleCore', primary: true }
    ]
  },
  {
    id: 'planora',
    name: 'Planora Agile Headquarters',
    category: 'Agile Project Management Platform',
    color: '#fb923c',
    borderColor: '#c2410c',
    x: 650,
    y: 1850,
    width: 220,
    height: 180,
    pitX: 650,
    pitY: 1720,
    description: 'Led architecture, sprint planning, and code reviews for a 5-person engineering team delivering an agile Kanban/Scrum project management system.',
    specs: [
      { title: 'TEAM LEADERSHIP', desc: 'Directed sprint backlog, PR reviews, role-based ACLs, and delivery milestones.' },
      { title: 'MULTI-CLIENT ECOSYSTEM', desc: 'Next.js responsive web app and React Native mobile app backed by Spring Boot.' },
      { title: 'AUTOMATED PIPELINES', desc: 'Automated CI/CD with Netlify web deployments and automated testing.' }
    ],
    tags: ['Next.js', 'React Native', 'Java', 'Spring Boot', 'PostgreSQL', 'CI/CD'],
    links: [
      { text: '🚀 View Live Web App', url: 'https://planora-pma.netlify.app/', primary: true },
      { text: '📂 GitHub Repository', url: 'https://github.com/axzellinnovations/project_management_app', primary: false }
    ]
  },
  {
    id: 'moratuwa',
    name: 'University of Moratuwa Grand Arena',
    category: 'Academic Honors & Qualifications',
    color: '#facc15',
    borderColor: '#ca8a04',
    x: 1450,
    y: 1250,
    width: 260,
    height: 200,
    pitX: 1450,
    pitY: 1100,
    description: 'Undergraduate at the University of Moratuwa pursuing BSc (Hons) in Information Technology (2024–2028). Strong focus on core computing, distributed systems, and cloud infrastructure.',
    specs: [
      { title: 'GPA RECORD', desc: 'Current Cumulative GPA: 3.74 / 4.00 (L1S1: 3.76, L1S2: 3.72, L2S1: 3.74).' },
      { title: 'INDUSTRY CERTIFICATIONS', desc: 'AWS Educate Cloud 101, Cisco CCNA, HackerRank REST API, Packt Linux, Postman Student Expert.' },
      { title: 'CAREER OBJECTIVE', desc: 'Actively seeking Software Engineering, Backend, Platform, and DevOps Internships.' }
    ],
    tags: ['BSc (Hons) IT', 'GPA 3.74', 'AWS', 'Cisco CCNA', 'Postman Expert', 'Linux'],
    links: [
      { text: '🌐 Personal Portfolio', url: 'https://www.suthankan.tech/', primary: true },
      { text: '📄 View SE Resume', url: 'https://www.suthankan.tech/cv/Suthankan_B_SE.pdf', primary: false }
    ]
  },
  {
    id: 'opensource',
    name: 'Open Source Speedway Pitlane',
    category: 'Upstream Contributions & Tooling',
    color: '#f43f5e',
    borderColor: '#be123c',
    x: 1450,
    y: 400,
    width: 240,
    height: 160,
    pitX: 1450,
    pitY: 530,
    description: 'Active upstream open-source contributor fixing real-world bugs in high-impact desktop apps, cloud runtimes, and developer platforms.',
    specs: [
      { title: 'TELEGRAM DESKTOP', desc: 'Merged PR #31086 (Linux Mini App cookie support) & PR #31112 (concurrent proxy check).' },
      { title: 'TESTCONTAINERS JAVA', desc: 'PR #12076: Avoid changing global uncaught exception handler.' },
      { title: 'BALLERINA PLATFORM', desc: 'PR #2710 (HTTP ambiguity diagnostics) & PR #43 (YAML scalar tag regex compliance).' },
      { title: 'WSO2 API MANAGER', desc: 'PR #1424: Fix unnecessary Lambda resource requests for API products.' }
    ],
    tags: ['Telegram Desktop', 'Testcontainers', 'Ballerina', 'WSO2', 'C++', 'Java'],
    links: [
      { text: '💼 LinkedIn Profile', url: 'https://www.linkedin.com/in/suthankan/', primary: true },
      { text: '✉️ Email Suthankan', url: 'mailto:suthankanbala2019@gmail.com', primary: false }
    ]
  }
];

// TECH STACK ROAD MONUMENTS / COLLECTIBLES
const TECH_PICKUPS = [
  { name: 'Java 25', info: 'Virtual Threads, Modulith & Foreign Memory', x: 1000, y: 550, color: '#f89820' },
  { name: 'Go (Golang)', info: 'High-concurrency lightweight gateways', x: 1200, y: 550, color: '#00add8' },
  { name: 'C# .NET 10', info: 'ASP.NET Core, EF Core payment engines', x: 1700, y: 950, color: '#512bd4' },
  { name: 'Kafka', info: 'Distributed event streaming & outbox events', x: 2150, y: 1200, color: '#e0234e' },
  { name: 'PostgreSQL', info: 'ACID transactions, durable claims & Flyway', x: 2050, y: 1550, color: '#336791' },
  { name: 'Docker & AWS', info: 'ECS Fargate, RDS, VPC & Cloud Architecture', x: 1850, y: 2100, color: '#2496ed' },
  { name: 'Terraform', info: 'Infrastructure as Code & cloud provisioning', x: 1450, y: 2100, color: '#844fba' },
  { name: 'Linux', info: 'Kernel internals, bash automation & networking', x: 1050, y: 2100, color: '#fcc624' },
  { name: 'Redis', info: 'In-memory caching & distributed locks', x: 650, y: 1350, color: '#dc382d' },
  { name: 'TypeScript & Next.js', info: 'Server-side rendering & modern interactive UIs', x: 650, y: 950, color: '#3178c6' },
  { name: 'gRPC & Protobuf', info: 'Ultra-fast binary RPC microservices', x: 1450, y: 850, color: '#244c5a' }
];

// MAIN GAME CONTROLLER
class DevRacerGame {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.minimapCanvas = document.getElementById('minimapCanvas');
    this.minimapCtx = this.minimapCanvas.getContext('2d');

    this.sound = new SoundEngine();
    this.car = new Car(1450, 1100); // Start at Moratuwa Arena plaza

    // World size
    this.worldWidth = 3000;
    this.worldHeight = 2500;

    // Camera
    this.camX = this.car.x;
    this.camY = this.car.y;
    this.zoom = 1;

    // Input state
    this.input = { up: false, down: false, left: false, right: false, nitro: false };
    
    // Game stats
    this.xp = 0;
    this.collectedTech = new Set();
    this.activeBuilding = null;
    this.isAutopilot = false;
    this.autopilotWaypointIdx = 0;
    this.autopilotPauseTimer = 0;

    this.initEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Autopilot path waypoints
    this.autopilotRoute = [
      { x: 1450, y: 1100, targetId: 'moratuwa' },
      { x: 1450, y: 530, targetId: 'opensource' },
      { x: 1850, y: 780, targetId: 'voltgrid' },
      { x: 2250, y: 1720, targetId: 'settlecore' },
      { x: 650, y: 1720, targetId: 'planora' },
      { x: 650, y: 630, targetId: 'proofmesh' }
    ];

    // Start loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.minimapCanvas.width = 160;
    this.minimapCanvas.height = 135;
  }

  initEvents() {
    // Keyboard listeners
    window.addEventListener('keydown', (e) => {
      this.sound.init(); // AudioContext unlock
      if (document.getElementById('projectModal').classList.contains('open')) {
        if (e.key === 'Escape') this.closeModal();
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          this.input.up = true;
          this.disableAutopilot();
          break;
        case 's':
        case 'arrowdown':
          this.input.down = true;
          this.disableAutopilot();
          break;
        case 'a':
        case 'arrowleft':
          this.input.left = true;
          this.disableAutopilot();
          break;
        case 'd':
        case 'arrowright':
          this.input.right = true;
          this.disableAutopilot();
          break;
        case ' ':
          this.input.nitro = true;
          break;
        case 'e':
          if (this.activeBuilding) this.openModal(this.activeBuilding);
          break;
        case 't':
          this.toggleAutopilot();
          break;
        case 'h':
          this.sound.playHorn();
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          this.input.up = false;
          break;
        case 's':
        case 'arrowdown':
          this.input.down = false;
          break;
        case 'a':
        case 'arrowleft':
          this.input.left = false;
          break;
        case 'd':
        case 'arrowright':
          this.input.right = false;
          break;
        case ' ':
          this.input.nitro = false;
          break;
      }
    });

    // Touch controls
    const bindTouch = (id, key) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.sound.init();
        this.input[key] = true;
        this.disableAutopilot();
      });
      el.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.input[key] = false;
      });
    };

    bindTouch('btnLeft', 'left');
    bindTouch('btnRight', 'right');
    bindTouch('btnGas', 'up');
    bindTouch('btnBrake', 'down');
    bindTouch('btnNitro', 'nitro');

    // UI Buttons
    document.getElementById('muteBtn')?.addEventListener('click', () => {
      this.sound.init();
      const muted = this.sound.toggleMute();
      document.getElementById('muteBtn').innerText = muted ? '🔇 SOUND OFF' : '🔊 SOUND ON';
    });

    document.getElementById('tourBtn')?.addEventListener('click', () => {
      this.sound.init();
      this.toggleAutopilot();
    });

    document.getElementById('proximityAlert')?.addEventListener('click', () => {
      if (this.activeBuilding) this.openModal(this.activeBuilding);
    });

    document.getElementById('closeModalBtn')?.addEventListener('click', () => {
      this.closeModal();
    });
  }

  toggleAutopilot() {
    this.isAutopilot = !this.isAutopilot;
    const tourBtn = document.getElementById('tourBtn');
    if (this.isAutopilot) {
      tourBtn?.classList.add('active');
      tourBtn.innerText = '⏹️ STOP TOUR';
      this.showToast('🚀 AUTOPILOT TOUR ACTIVATED');
    } else {
      tourBtn?.classList.remove('active');
      tourBtn.innerText = '🚀 CRUISE TOUR';
      this.showToast('🎮 MANUAL CONTROL RESUMED');
    }
  }

  disableAutopilot() {
    if (this.isAutopilot) {
      this.isAutopilot = false;
      const tourBtn = document.getElementById('tourBtn');
      tourBtn?.classList.remove('active');
      tourBtn.innerText = '🚀 CRUISE TOUR';
    }
  }

  updateAutopilot() {
    if (!this.isAutopilot) return;

    if (this.autopilotPauseTimer > 0) {
      this.autopilotPauseTimer--;
      this.input.up = false;
      this.input.down = true; // gently stop
      this.input.left = false;
      this.input.right = false;
      return;
    }

    const target = this.autopilotRoute[this.autopilotWaypointIdx];
    const dx = target.x - this.car.x;
    const dy = target.y - this.car.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 80) {
      // Arrived at destination
      const bldg = PROJECTS_DATA.find(p => p.id === target.targetId);
      if (bldg) {
        this.openModal(bldg);
        this.autopilotPauseTimer = 300; // Pause 5 seconds for viewing
      }
      this.autopilotWaypointIdx = (this.autopilotWaypointIdx + 1) % this.autopilotRoute.length;
      return;
    }

    // Steer towards target waypoint
    const targetAngle = Math.atan2(dy, dx);
    let angleDiff = targetAngle - this.car.angle;

    // Normalize angle to -PI..PI
    while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
    while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

    this.input.up = true;
    this.input.down = false;
    this.input.nitro = dist > 400;

    if (angleDiff > 0.1) {
      this.input.right = true;
      this.input.left = false;
    } else if (angleDiff < -0.1) {
      this.input.left = true;
      this.input.right = false;
    } else {
      this.input.left = false;
      this.input.right = false;
    }
  }

  checkCollisionsAndPickups() {
    // Check Tech Pickups
    for (let i = 0; i < TECH_PICKUPS.length; i++) {
      const p = TECH_PICKUPS[i];
      if (this.collectedTech.has(p.name)) continue;

      const dist = Math.hypot(this.car.x - p.x, this.car.y - p.y);
      if (dist < 50) {
        this.collectedTech.add(p.name);
        this.xp += 100;
        this.sound.playChime();
        this.showToast(`⚡ UNLOCKED: ${p.name}`);
        document.getElementById('xpVal').innerText = `${this.xp} XP`;
      }
    }

    // Check Proximity to Project Pit-Stops
    let foundNearBuilding = null;
    for (const bldg of PROJECTS_DATA) {
      const dist = Math.hypot(this.car.x - bldg.pitX, this.car.y - bldg.pitY);
      if (dist < 120) {
        foundNearBuilding = bldg;
        break;
      }
    }

    const alertEl = document.getElementById('proximityAlert');
    if (foundNearBuilding) {
      this.activeBuilding = foundNearBuilding;
      alertEl.classList.add('visible');
      document.getElementById('alertBldgName').innerText = foundNearBuilding.name;
    } else {
      this.activeBuilding = null;
      alertEl.classList.remove('visible');
    }
  }

  openModal(bldg) {
    const modal = document.getElementById('projectModal');
    document.getElementById('modalCategory').innerText = bldg.category;
    document.getElementById('modalTitle').innerHTML = `<span>${bldg.name}</span>`;
    document.getElementById('modalDesc').innerText = bldg.description;

    // Specs grid
    const specsEl = document.getElementById('modalSpecs');
    specsEl.innerHTML = bldg.specs.map(s => `
      <div class="spec-item">
        <div class="spec-title">${s.title}</div>
        <div class="spec-desc">${s.desc}</div>
      </div>
    `).join('');

    // Tags
    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = bldg.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

    // Links
    const linksEl = document.getElementById('modalLinks');
    linksEl.innerHTML = bldg.links.map(l => `
      <a href="${l.url}" target="_blank" class="link-btn ${l.primary ? 'primary' : 'secondary'}">
        ${l.text}
      </a>
    `).join('');

    modal.classList.add('open');
    this.sound.playChime();
  }

  closeModal() {
    document.getElementById('projectModal').classList.remove('open');
  }

  showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }

  updateHUD() {
    const speedKmh = Math.round(Math.abs(this.car.speed) * 22);
    document.getElementById('speedVal').innerText = speedKmh;

    // Gear logic
    let gear = 'N';
    if (this.car.speed < -0.1) gear = 'R';
    else if (speedKmh === 0) gear = 'P';
    else if (speedKmh < 35) gear = 'D1';
    else if (speedKmh < 75) gear = 'D2';
    else if (speedKmh < 120) gear = 'D3';
    else if (speedKmh < 160) gear = 'D4';
    else if (speedKmh < 210) gear = 'D5';
    else gear = 'D6';
    document.getElementById('gearVal').innerText = gear;

    // Nitro Bar
    document.getElementById('nitroFill').style.width = `${this.car.nitro}%`;
  }

  drawRoads() {
    const ctx = this.ctx;
    
    // Background Grid Arena
    ctx.fillStyle = '#060913';
    ctx.fillRect(0, 0, this.worldWidth, this.worldHeight);

    // Subtle arena grid
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1;
    for (let x = 0; x < this.worldWidth; x += 150) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.worldHeight);
      ctx.stroke();
    }
    for (let y = 0; y < this.worldHeight; y += 150) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.worldWidth, y);
      ctx.stroke();
    }

    // MAIN GRAND PRIX HIGHWAY LOOPS (Asphalt & Neon Stripes)
    const highways = [
      // Outer Loop
      { x1: 500, y1: 500, x2: 2400, y2: 500 },
      { x1: 2400, y1: 500, x2: 2400, y2: 2000 },
      { x1: 2400, y1: 2000, x2: 500, y2: 2000 },
      { x1: 500, y1: 2000, x2: 500, y2: 500 },
      // Central Cross Expressway
      { x1: 500, y1: 1250, x2: 2400, y2: 1250 },
      { x1: 1450, y1: 500, x2: 1450, y2: 2000 }
    ];

    // Asphalt Base
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 140;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (const hw of highways) {
      ctx.beginPath();
      ctx.moveTo(hw.x1, hw.y1);
      ctx.lineTo(hw.x2, hw.y2);
      ctx.stroke();
    }

    // Road Inner Surface
    ctx.strokeStyle = '#0b1329';
    ctx.lineWidth = 120;
    for (const hw of highways) {
      ctx.beginPath();
      ctx.moveTo(hw.x1, hw.y1);
      ctx.lineTo(hw.x2, hw.y2);
      ctx.stroke();
    }

    // Neon Highway Borders (Cyan Glow)
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    for (const hw of highways) {
      // Offset borders
      ctx.save();
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.moveTo(hw.x1, hw.y1 - 60);
      ctx.lineTo(hw.x2, hw.y2 - 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hw.x1, hw.y1 + 60);
      ctx.lineTo(hw.x2, hw.y2 + 60);
      ctx.stroke();
      ctx.restore();
    }

    // Yellow Dashed Centerlines
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 4;
    ctx.setLineDash([24, 28]);
    for (const hw of highways) {
      ctx.beginPath();
      ctx.moveTo(hw.x1, hw.y1);
      ctx.lineTo(hw.x2, hw.y2);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  drawBuildings() {
    const ctx = this.ctx;

    for (const bldg of PROJECTS_DATA) {
      ctx.save();
      // Drop Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
      ctx.shadowBlur = 25;
      ctx.fillStyle = '#090f1d';
      ctx.strokeStyle = bldg.color;
      ctx.lineWidth = 2.5;

      // Main Building Block
      const bx = bldg.x - bldg.width / 2;
      const by = bldg.y - bldg.height / 2;
      ctx.beginPath();
      ctx.roundRect(bx, by, bldg.width, bldg.height, 16);
      ctx.fill();
      ctx.stroke();

      // Glowing Neon Roof Accent
      ctx.shadowColor = bldg.color;
      ctx.shadowBlur = 15;
      ctx.fillStyle = bldg.color;
      ctx.fillRect(bx + 12, by + 12, bldg.width - 24, 4);

      // Building Label
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(bldg.name, bldg.x, by + 45);

      ctx.fillStyle = bldg.color;
      ctx.font = 'bold 11px monospace';
      ctx.fillText(bldg.category.toUpperCase(), bldg.x, by + 68);

      // Mini architectural glyph / icon representation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.strokeRect(bx + 20, by + 85, bldg.width - 40, 45);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px -apple-system, sans-serif';
      ctx.fillText('[DRIVE IN TO INSPECT]', bldg.x, by + 112);

      // Pit Stop Bay Marker on Road
      ctx.strokeStyle = bldg.color;
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(bldg.pitX, bldg.pitY, 45, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
      ctx.beginPath();
      ctx.arc(bldg.pitX, bldg.pitY, 45, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = bldg.color;
      ctx.font = 'bold 11px monospace';
      ctx.fillText('PIT BAY', bldg.pitX, bldg.pitY + 4);

      ctx.restore();
    }
  }

  drawPickups(time) {
    const ctx = this.ctx;
    for (const p of TECH_PICKUPS) {
      const isCollected = this.collectedTech.has(p.name);
      const floatOffset = Math.sin(time * 0.004 + p.x) * 6;

      ctx.save();
      ctx.translate(p.x, p.y + floatOffset);

      if (isCollected) {
        // Dimmed collected node
        ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.font = 'bold 9px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✓', 0, 3);
      } else {
        // Glowing Neon Token
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 18;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 7, 0, Math.PI * 2);
        ctx.fill();

        // Label above token
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 12px -apple-system, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(p.name, 0, -26);
      }

      ctx.restore();
    }
  }

  drawMinimap() {
    const mctx = this.minimapCtx;
    const mw = this.minimapCanvas.width;
    const mh = this.minimapCanvas.height;

    mctx.fillStyle = '#020617';
    mctx.fillRect(0, 0, mw, mh);

    const scaleX = mw / this.worldWidth;
    const scaleY = mh / this.worldHeight;

    // Draw roads on radar
    mctx.strokeStyle = '#334155';
    mctx.lineWidth = 4;
    mctx.strokeRect(500 * scaleX, 500 * scaleY, 1900 * scaleX, 1500 * scaleY);
    mctx.beginPath();
    mctx.moveTo(500 * scaleX, 1250 * scaleY);
    mctx.lineTo(2400 * scaleX, 1250 * scaleY);
    mctx.moveTo(1450 * scaleX, 500 * scaleY);
    mctx.lineTo(1450 * scaleX, 2000 * scaleY);
    mctx.stroke();

    // Draw Buildings
    for (const bldg of PROJECTS_DATA) {
      mctx.fillStyle = bldg.color;
      mctx.fillRect((bldg.x - bldg.width / 2) * scaleX, (bldg.y - bldg.height / 2) * scaleY, bldg.width * scaleX, bldg.height * scaleY);
    }

    // Draw Player Car Blip
    mctx.fillStyle = '#f43f5e';
    mctx.beginPath();
    mctx.arc(this.car.x * scaleX, this.car.y * scaleY, 4.5, 0, Math.PI * 2);
    mctx.fill();

    // Heading ray
    mctx.strokeStyle = '#ffffff';
    mctx.lineWidth = 1.5;
    mctx.beginPath();
    mctx.moveTo(this.car.x * scaleX, this.car.y * scaleY);
    mctx.lineTo(
      (this.car.x + Math.cos(this.car.angle) * 80) * scaleX,
      (this.car.y + Math.sin(this.car.angle) * 80) * scaleY
    );
    mctx.stroke();
  }

  gameLoop(time) {
    // 1. Update
    this.updateAutopilot();
    this.car.update(this.input, this.sound);
    this.sound.updateEngine(this.car.speed, this.car.maxSpeed, this.car.isNitro);
    this.checkCollisionsAndPickups();
    this.updateHUD();

    // Smooth camera tracking
    this.camX += (this.car.x - this.camX) * 0.1;
    this.camY += (this.car.y - this.camY) * 0.1;

    // 2. Render
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.save();
    // Center camera on car
    this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.scale(this.zoom, this.zoom);
    this.ctx.translate(-this.camX, -this.camY);

    // World Elements
    this.drawRoads();
    this.drawBuildings();
    this.drawPickups(time);
    this.car.draw(this.ctx);

    this.ctx.restore();

    // 3. Minimap
    this.drawMinimap();

    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

// Bootstrap on DOM Load
window.addEventListener('DOMContentLoaded', () => {
  window.devRacer = new DevRacerGame();
});

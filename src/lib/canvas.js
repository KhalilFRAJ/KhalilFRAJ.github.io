// Canvas animation engines for the hero/about globes and the skills galaxy.
// Both honor prefers-reduced-motion (single static frame, no rAF loop) and
// pause their loop while the canvas is off-screen.

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function runLoop(canvas, drawFrame, onCleanup) {
  if (prefersReducedMotion()) {
    drawFrame();
    return () => onCleanup?.();
  }

  let frameId = 0;
  let running = false;

  const loop = () => {
    drawFrame();
    if (running) frameId = window.requestAnimationFrame(loop);
  };

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !running) {
      running = true;
      frameId = window.requestAnimationFrame(loop);
    } else if (!entry.isIntersecting && running) {
      running = false;
      window.cancelAnimationFrame(frameId);
    }
  });
  observer.observe(canvas);

  return () => {
    running = false;
    window.cancelAnimationFrame(frameId);
    observer.disconnect();
    onCleanup?.();
  };
}

export function startGlobe(canvas) {
  if (!canvas) return () => {};
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  let angle = 0;

  const drawFrame = () => {
    const size = Math.min(canvas.clientWidth || 170, canvas.clientHeight || 170);
    canvas.width = size;
    canvas.height = size;
    context.clearRect(0, 0, size, size);

    const radius = size * 0.41;
    const centerX = size / 2;
    const centerY = size / 2;
    const latCount = 10;
    const lonCount = 18;

    for (let lat = 0; lat <= latCount; lat += 1) {
      const phi = -Math.PI / 2 + (lat * Math.PI) / latCount;
      context.beginPath();
      let first = true;
      for (let t = 0; t <= 64; t += 1) {
        const lambda = (t / 64) * Math.PI * 2 + angle;
        const x = centerX + radius * Math.cos(phi) * Math.cos(lambda);
        const y = centerY + radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(lambda);
        if (z > -radius * 0.2) {
          if (first) context.moveTo(x, y);
          else context.lineTo(x, y);
          first = false;
        } else {
          first = true;
        }
      }
      context.strokeStyle = 'rgba(212,168,83,0.18)';
      context.lineWidth = 0.6;
      context.stroke();
    }

    for (let lon = 0; lon < lonCount; lon += 1) {
      const lambda = (lon / lonCount) * Math.PI * 2 + angle;
      context.beginPath();
      let first = true;
      for (let t = 0; t <= 32; t += 1) {
        const phi = -Math.PI / 2 + (t * Math.PI) / 32;
        const x = centerX + radius * Math.cos(phi) * Math.cos(lambda);
        const y = centerY + radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.sin(lambda);
        if (z > -radius * 0.2) {
          if (first) context.moveTo(x, y);
          else context.lineTo(x, y);
          first = false;
        } else {
          first = true;
        }
      }
      context.strokeStyle = 'rgba(212,168,83,0.1)';
      context.lineWidth = 0.5;
      context.stroke();
    }

    const tunisiaLat = (34 * Math.PI) / 180;
    const tunisiaLon = (9 * Math.PI) / 180 + angle;
    const dotX = centerX + radius * Math.cos(tunisiaLat) * Math.cos(tunisiaLon);
    const dotY = centerY + radius * Math.sin(tunisiaLat);
    const dotZ = radius * Math.cos(tunisiaLat) * Math.sin(tunisiaLon);

    if (dotZ > 0) {
      const pulse = (Date.now() % 2000) / 2000;
      [1, 2, 3].forEach((ring) => {
        context.beginPath();
        context.arc(dotX, dotY, 4 + ring * 5 * pulse, 0, Math.PI * 2);
        context.strokeStyle = `rgba(212,168,83,${(0.55 * (1 - pulse)) / ring})`;
        context.lineWidth = 0.8;
        context.stroke();
      });
      context.beginPath();
      context.arc(dotX, dotY, 4, 0, Math.PI * 2);
      context.fillStyle = 'rgba(212,168,83,0.95)';
      context.fill();
    }

    angle += 0.005;
  };

  return runLoop(canvas, drawFrame);
}

const GALAXY_COLORS = ['#d4a853', '#4a9eff', '#ff7057', '#4ade80', '#a78bfa', '#f472b6'];
const GALAXY_CATEGORIES = ['Frontend', 'Backend', 'Languages', 'Databases', 'DevOps', 'Specializations'];
const GALAXY_SKILLS = [
  { name: 'React', category: 0 },
  { name: 'Next.js', category: 0 },
  { name: 'Angular', category: 0 },
  { name: 'Flutter', category: 0 },
  { name: 'JavaFX', category: 0 },
  { name: 'HTMX', category: 0 },
  { name: 'FlutterFlow', category: 0 },
  { name: 'NestJS', category: 1 },
  { name: 'Node.js', category: 1 },
  { name: 'Spring Boot', category: 1 },
  { name: 'Django', category: 1 },
  { name: 'Symfony', category: 1 },
  { name: '.NET', category: 1 },
  { name: 'TypeScript', category: 2 },
  { name: 'Python', category: 2 },
  { name: 'Java', category: 2 },
  { name: 'C#', category: 2 },
  { name: 'PHP', category: 2 },
  { name: 'SQL', category: 2 },
  { name: 'MongoDB', category: 3 },
  { name: 'PostgreSQL', category: 3 },
  { name: 'Neo4j', category: 3 },
  { name: 'MySQL', category: 3 },
  { name: 'Docker', category: 4 },
  { name: 'GitHub', category: 4 },
  { name: 'REST APIs', category: 4 },
  { name: 'CI/CD', category: 4 },
  { name: 'Machine Learning', category: 5 },
  { name: 'Architecture', category: 5 },
  { name: 'Mobile Dev', category: 5 },
];

export function startSkillsGalaxy(canvas) {
  if (!canvas) return () => {};
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  const nodes = GALAXY_SKILLS.map((skill, index) => {
    const phi = Math.acos(1 - (2 * (index + 0.5)) / GALAXY_SKILLS.length);
    const theta = Math.PI * (1 + Math.sqrt(5)) * index;
    const radius = 170 + Math.random() * 75;
    return {
      skill,
      ox: radius * Math.sin(phi) * Math.cos(theta),
      oy: radius * Math.sin(phi) * Math.sin(theta),
      oz: radius * Math.cos(phi),
      radius,
    };
  });

  const edges = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if (nodes[i].skill.category === nodes[j].skill.category) edges.push([i, j]);
    }
  }

  const projections = nodes.map(() => ({ x: 0, y: 0, z: 0, radius: 0, scale: 0 }));
  let rotationX = 0.25;
  let rotationY = 0;
  let velocityX = 0;
  let velocityY = 0.007;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let hoverIndex = -1;
  const zoom = 1.5;
  let time = 0;

  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };

  const drawFrame = () => {
    time += 0.008;
    if (!dragging) {
      velocityX *= 0.97;
      velocityY *= 0.97;
      if (Math.abs(velocityY) < 0.004) velocityY = 0.004;
    }

    rotationX += velocityX;
    rotationY += velocityY;

    const width = canvas.width;
    const height = canvas.height;
    context.clearRect(0, 0, width, height);

    const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width * 0.5);
    glow.addColorStop(0, 'rgba(212,168,83,0.03)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    const cosY = Math.cos(rotationY);
    const sinY = Math.sin(rotationY);
    const cosX = Math.cos(rotationX);
    const sinX = Math.sin(rotationX);

    nodes.forEach((node, index) => {
      const fx = node.ox + Math.sin(time * 0.55 + index * 0.4) * 7;
      const fy = node.oy + Math.cos(time * 0.48 + index * 0.3) * 5;
      const fz = node.oz + Math.sin(time * 0.38 + index * 0.5) * 7;
      const x1 = fx * cosY - fz * sinY;
      const z1 = fx * sinY + fz * cosY;
      const y2 = fy * cosX - z1 * sinX;
      const z2 = fy * sinX + z1 * cosX;
      const scale = (500 / (500 + z2 + 300)) * zoom;
      projections[index] = {
        x: width / 2 + x1 * scale,
        y: height / 2 + y2 * scale,
        z: z2,
        radius: Math.max(3.5, scale * 8.5),
        scale,
      };
    });

    const sorted = [...nodes.keys()].sort((a, b) => projections[a].z - projections[b].z);

    edges.forEach(([a, b]) => {
      const pa = projections[a];
      const pb = projections[b];
      const highlighted = hoverIndex === a || hoverIndex === b;
      context.beginPath();
      context.moveTo(pa.x, pa.y);
      context.lineTo(pb.x, pb.y);
      context.globalAlpha = Math.min(pa.scale, pb.scale) * (highlighted ? 0.5 : 0.15);
      context.strokeStyle = GALAXY_COLORS[nodes[a].skill.category];
      context.lineWidth = highlighted ? 0.9 : 0.45;
      context.stroke();
    });

    context.globalAlpha = 1;
    sorted.forEach((index) => {
      const point = projections[index];
      if (point.z < -270) return;

      const skill = nodes[index].skill;
      const color = GALAXY_COLORS[skill.category];
      const highlighted = hoverIndex === index;
      const size = highlighted ? point.radius * 2.1 : point.radius;
      const alpha = (0.22 + point.scale * 0.65) * (point.z > 0 ? 1 : 0.42);

      context.save();
      context.globalAlpha = alpha;
      if (highlighted) {
        context.shadowBlur = 26;
        context.shadowColor = color;
      }

      if (point.scale > 0.45) {
        const red = Number.parseInt(color.slice(1, 3), 16);
        const green = Number.parseInt(color.slice(3, 5), 16);
        const blue = Number.parseInt(color.slice(5, 7), 16);
        context.beginPath();
        context.arc(point.x, point.y, size + 5, 0, Math.PI * 2);
        context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha * 0.2})`;
        context.fill();
      }

      context.beginPath();
      context.arc(point.x, point.y, size, 0, Math.PI * 2);
      context.fillStyle = color;
      context.fill();
      context.globalAlpha = alpha * 0.5;
      context.strokeStyle = 'rgba(255,255,255,0.7)';
      context.lineWidth = 0.6;
      context.stroke();
      context.shadowBlur = 0;

      if (point.scale > 0.46 || highlighted) {
        const fontSize = Math.max(9, Math.min(13, point.scale * 11 + (highlighted ? 3 : 0)));
        context.globalAlpha = Math.min(1, alpha + 0.1);
        context.font = `${highlighted ? 600 : 400} ${fontSize}px Inter, sans-serif`;
        context.fillStyle = highlighted ? '#ffffff' : color;
        context.textAlign = 'center';
        context.fillText(skill.name, point.x, point.y - size - 5);
      }

      context.restore();
    });

    GALAXY_CATEGORIES.forEach((name, index) => {
      context.save();
      context.beginPath();
      context.arc(14, 14 + index * 19, 4, 0, Math.PI * 2);
      context.fillStyle = GALAXY_COLORS[index];
      context.globalAlpha = 0.8;
      context.fill();
      context.globalAlpha = 0.65;
      context.font = '11px Inter, sans-serif';
      context.fillStyle = GALAXY_COLORS[index];
      context.textAlign = 'left';
      context.fillText(name, 22, 18 + index * 19);
      context.restore();
    });
  };

  const handleMouseMove = (event) => {
    if (dragging) {
      velocityY += (event.clientX - lastX) * 0.004;
      velocityX += (event.clientY - lastY) * 0.004;
      lastX = event.clientX;
      lastY = event.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    hoverIndex = -1;
    projections.forEach((point, index) => {
      if (Math.hypot(point.x - mouseX, point.y - mouseY) < point.radius + 5) hoverIndex = index;
    });
  };

  const handleMouseDown = (event) => {
    dragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    velocityX = 0;
    velocityY = 0;
  };

  const stopDrag = () => {
    dragging = false;
  };

  const handleMouseLeave = () => {
    hoverIndex = -1;
  };

  resize();

  if (prefersReducedMotion()) {
    drawFrame();
    return () => {};
  }

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', stopDrag);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  return runLoop(canvas, drawFrame, () => {
    window.removeEventListener('resize', resize);
    canvas.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', stopDrag);
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mouseleave', handleMouseLeave);
  });
}

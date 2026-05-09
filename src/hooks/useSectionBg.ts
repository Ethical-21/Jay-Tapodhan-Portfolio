import { useEffect } from 'react';

/** Resize a canvas to fill its parent section */
function fitCanvas(canvas: HTMLCanvasElement) {
  const section = canvas.parentElement!;
  canvas.width  = section.offsetWidth;
  canvas.height = section.offsetHeight;
}

/** Start/stop RAF loop based on section visibility */
function createAnimLoop(canvas: HTMLCanvasElement, drawFn: () => void): () => void {
  let running = false;
  let animId  = 0;

  function tick() {
    if (!running) return;
    drawFn();
    animId = requestAnimationFrame(tick);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !running) {
        running = true;
        fitCanvas(canvas);
        tick();
      } else if (!e.isIntersecting && running) {
        running = false;
        cancelAnimationFrame(animId);
      }
    });
  }, { threshold: 0.05 });

  obs.observe(canvas.parentElement!);
  const onResize = () => { if (running) fitCanvas(canvas); };
  window.addEventListener('resize', onResize);

  return () => {
    obs.disconnect();
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
  };
}

// ── 1. ABOUT — Diagonal Lattice Grid ──────────────────────────
function initLatticeGrid(): () => void {
  const c = document.getElementById('about-bg') as HTMLCanvasElement;
  if (!c) return () => {};
  const ctx = c.getContext('2d')!;
  const SPACING = 80;
  let offset = 0;
  let nodes: { x: number; y: number; phase: number }[] = [];
  let time = 0;

  function buildNodes() {
    nodes = [];
    const W = c.width, H = c.height;
    const ext = SPACING * 2;
    for (let i = -Math.ceil((W + ext) / SPACING); i < Math.ceil((W + H + ext) / SPACING); i++) {
      for (let j = -Math.ceil((W + ext) / SPACING); j < Math.ceil((W + H + ext) / SPACING); j++) {
        const x = (i + j) * SPACING / 2;
        const y = (j - i) * SPACING / 2;
        if (x > -ext && x < W + ext && y > -ext && y < H + ext) {
          nodes.push({ x, y, phase: Math.random() * Math.PI * 2 });
        }
      }
    }
  }

  function drawLattice(ox: number) {
    const W = c.width, H = c.height;
    const ext = SPACING * 3;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `rgba(0,245,255,0.055)`;
    for (let k = -Math.ceil((W + H + ext) / SPACING); k < Math.ceil((W + H + ext) / SPACING); k++) {
      const sx = k * SPACING + ox - H;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx + H, H); ctx.stroke();
    }
    ctx.strokeStyle = `rgba(0,245,255,0.038)`;
    for (let k = -Math.ceil((W + H + ext) / SPACING); k < Math.ceil((W + H + ext) / SPACING); k++) {
      const sx = k * SPACING + ox;
      ctx.beginPath(); ctx.moveTo(sx, 0); ctx.lineTo(sx - H, H); ctx.stroke();
    }
  }

  function draw() {
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    time += 0.004;
    offset = Math.sin(time * 0.15) * 12;
    drawLattice(offset);
    nodes.forEach(n => {
      const nx = n.x + offset, ny = n.y;
      if (nx < -20 || nx > W + 20 || ny < -20 || ny > H + 20) return;
      const pulse  = (Math.sin(time * 1.2 + n.phase) + 1) / 2;
      const alpha  = 0.04 + pulse * 0.1;
      const radius = 1.2 + pulse * 1.0;
      ctx.beginPath(); ctx.arc(nx, ny, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,245,255,${alpha})`; ctx.fill();
      if (n.phase > 5.5) {
        ctx.beginPath(); ctx.arc(nx, ny, radius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,184,0,${alpha * 0.7})`; ctx.fill();
      }
    });
    const scanY = ((time * 30) % (H + 80)) - 40;
    const sg = ctx.createLinearGradient(0, scanY, 0, scanY + 80);
    sg.addColorStop(0,   'rgba(0,245,255,0)');
    sg.addColorStop(0.4, 'rgba(0,245,255,0.025)');
    sg.addColorStop(0.6, 'rgba(0,245,255,0.025)');
    sg.addColorStop(1,   'rgba(0,245,255,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, scanY, W, 80);
  }

  const cleanup = createAnimLoop(c, draw);
  const ro = new ResizeObserver(() => { fitCanvas(c); buildNodes(); });
  ro.observe(c.parentElement!);
  buildNodes();
  return () => { cleanup(); ro.disconnect(); };
}

// ── 2. PROJECTS — Hex Grid + Light Ants + Data Packets ─────────
function initHexGrid(): () => void {
  const c = document.getElementById('projects-bg') as HTMLCanvasElement;
  if (!c) return () => {};
  const ctx = c.getContext('2d')!;
  const section = c.parentElement!;
  const HEX_SIZE = 40;
  type Edge = { ax: number; ay: number; bx: number; by: number };
  type Ant  = { edgeIdx: number; t: number; dir: number; speed: number; isAmber: boolean; trail: { x: number; y: number }[] };
  type Packet = { x: number; y: number; vx: number; vy: number; char: string; alpha: number; isAmber: boolean; life: number; decay: number };
  type Pulse  = { x: number; y: number; r: number; maxR: number; alpha: number; speed: number };

  let edges: Edge[] = [];
  let edgeMap: Record<string, number[]> = {};
  let ants: Ant[] = [];
  let packets: Packet[] = [];
  let pulses: Pulse[] = [];
  let hexCenters: { x: number; y: number }[] = [];
  let hoveredRect: { left: number; top: number; right: number; bottom: number } | null = null;
  let mouseX = 0, mouseY = 0, time = 0;
  const PACKET_CHARS = ['>','<','{','}','//','01','AI','>>','[]','**'];

  section.addEventListener('mousemove', e => {
    const r = section.getBoundingClientRect();
    mouseX = e.clientX - r.left; mouseY = e.clientY - r.top;
  });

  function vKey(x: number, y: number) { return `${Math.round(x)},${Math.round(y)}`; }
  function hexVerts(cx: number, cy: number, s: number) {
    const v: [number,number][] = [];
    for (let i = 0; i < 6; i++) { const a = Math.PI/3*i - Math.PI/6; v.push([cx+Math.cos(a)*s, cy+Math.sin(a)*s]); }
    return v;
  }

  function buildEdges() {
    edges = []; edgeMap = {}; hexCenters = []; ants = []; packets = []; pulses = [];
    const s = HEX_SIZE, dx = s*1.75, dy = s*1.5, W = c.width, H = c.height;
    const seen = new Set<string>();
    for (let row = -1; row < H/dy+2; row++) {
      for (let col = -1; col < W/dx+2; col++) {
        const hx = col*dx + (row%2 ? dx/2 : 0), hy = row*dy;
        hexCenters.push({ x: hx, y: hy });
        const verts = hexVerts(hx, hy, s);
        for (let i = 0; i < 6; i++) {
          const [ax,ay] = verts[i], [bx,by] = verts[(i+1)%6];
          const key = [vKey(ax,ay), vKey(bx,by)].sort().join('|');
          if (seen.has(key)) continue; seen.add(key);
          const idx = edges.length;
          edges.push({ ax, ay, bx, by });
          [vKey(ax,ay), vKey(bx,by)].forEach(k => { if (!edgeMap[k]) edgeMap[k]=[]; edgeMap[k].push(idx); });
        }
      }
    }
    for (let i = 0; i < 10; i++) spawnAnt();
    for (let i = 0; i < 10; i++) spawnPacket();
  }

  function spawnAnt() {
    if (!edges.length) return;
    const ei = Math.floor(Math.random()*edges.length);
    ants.push({ edgeIdx: ei, t: Math.random(), dir: Math.random()>0.5?1:-1, speed: 0.008+Math.random()*0.010, isAmber: Math.random()>0.78, trail: [] });
  }
  function spawnPacket() {
    const W = c.width, H = c.height;
    packets.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.25,
      char: PACKET_CHARS[Math.floor(Math.random()*PACKET_CHARS.length)], alpha: 0.04+Math.random()*0.07,
      isAmber: Math.random()>0.7, life: 1.0, decay: 0.0008+Math.random()*0.0006 });
  }
  function spawnPulse() {
    if (!hexCenters.length) return;
    const h = hexCenters[Math.floor(Math.random()*hexCenters.length)];
    pulses.push({ x: h.x, y: h.y, r: 0, maxR: HEX_SIZE*1.4, alpha: 0.5, speed: 0.7 });
  }

  function drawHexGrid(px: number, py: number) {
    const s = HEX_SIZE, dx = s*1.75, dy = s*1.5, W = c.width, H = c.height;
    for (let row = -1; row < H/dy+2; row++) {
      for (let col = -1; col < W/dx+2; col++) {
        const hx = col*dx+(row%2?dx/2:0)+px, hy = row*dy+py;
        const dist = Math.hypot(hx-mouseX, hy-mouseY);
        const prox = Math.max(0, 1-dist/260);
        let cardGlow = 0;
        if (hoveredRect) {
          const inZone = hx>=hoveredRect.left-s && hx<=hoveredRect.right+s && hy>=hoveredRect.top-s && hy<=hoveredRect.bottom+s;
          if (inZone) {
            const cx2=(hoveredRect.left+hoveredRect.right)/2, cy2=(hoveredRect.top+hoveredRect.bottom)/2;
            const hw=(hoveredRect.right-hoveredRect.left)/2+s, hh=(hoveredRect.bottom-hoveredRect.top)/2+s;
            cardGlow = Math.max(0, 1-Math.sqrt(((hx-cx2)/hw)**2+((hy-cy2)/hh)**2))*0.35;
          }
        }
        const alpha = 0.035+prox*0.08+cardGlow;
        const verts = hexVerts(hx, hy, s);
        ctx.beginPath();
        verts.forEach(([vx,vy],i) => i===0?ctx.moveTo(vx,vy):ctx.lineTo(vx,vy));
        ctx.closePath();
        ctx.strokeStyle = `rgba(0,245,255,${alpha})`; ctx.lineWidth = cardGlow>0.05?0.9:0.6; ctx.stroke();
        if (cardGlow>0.08) {
          ctx.beginPath();
          verts.forEach(([vx,vy],i) => i===0?ctx.moveTo(vx,vy):ctx.lineTo(vx,vy));
          ctx.closePath(); ctx.fillStyle=`rgba(0,245,255,${cardGlow*0.06})`; ctx.fill();
        }
      }
    }
  }

  function draw() {
    const W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H); time++;
    const px = (mouseX/W-0.5)*12, py = (mouseY/H-0.5)*12;
    drawHexGrid(px,py);
    if (time%140===0) spawnPulse();
    for (let i=pulses.length-1;i>=0;i--) {
      const p=pulses[i]; p.r+=p.speed; p.alpha-=0.008;
      if (p.r>p.maxR||p.alpha<=0){pulses.splice(i,1);continue;}
      ctx.beginPath();ctx.arc(p.x+px,p.y+py,p.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,245,255,${p.alpha})`;ctx.lineWidth=1;ctx.stroke();
    }
    for (let i=packets.length-1;i>=0;i--) {
      const p=packets[i]; p.x+=p.vx;p.y+=p.vy;p.life-=p.decay;
      if (p.life<=0||p.x<-60||p.x>W+60||p.y<-40||p.y>H+40){packets.splice(i,1);spawnPacket();continue;}
      const col=p.isAmber?'255,184,0':'0,245,255';
      ctx.font="9px 'Orbitron',monospace";ctx.fillStyle=`rgba(${col},${p.alpha*p.life})`;ctx.fillText(p.char,p.x,p.y);
    }
    ants.forEach(ant => {
      const e=edges[ant.edgeIdx];
      const mx2=(e.ax+e.bx)/2,my2=(e.ay+e.by)/2;
      const boost=Math.max(1,1+(1-Math.min(1,Math.hypot(mx2-mouseX,my2-mouseY)/200))*1.5);
      ant.t+=ant.speed*ant.dir*boost;
      const cx2=e.ax+(e.bx-e.ax)*ant.t, cy2=e.ay+(e.by-e.ay)*ant.t;
      ant.trail.push({x:cx2,y:cy2}); if(ant.trail.length>22) ant.trail.shift();
      if(ant.t>=1||ant.t<=0){
        const endKey=ant.t>=1?vKey(e.bx,e.by):vKey(e.ax,e.ay);
        const nb=(edgeMap[endKey]||[]).filter(i=>i!==ant.edgeIdx);
        if(nb.length>0){const ni=nb[Math.floor(Math.random()*nb.length)];const ne=edges[ni];const sA=Math.hypot(ne.ax-cx2,ne.ay-cy2)<2;ant.edgeIdx=ni;ant.t=sA?0:1;ant.dir=sA?1:-1;}
        else{ant.t=Math.random();ant.edgeIdx=Math.floor(Math.random()*edges.length);ant.dir=Math.random()>0.5?1:-1;}
      }
      if(ant.trail.length<2) return;
      const col=ant.isAmber?'255,184,0':'0,245,255';
      for(let i=1;i<ant.trail.length;i++){
        ctx.beginPath();ctx.moveTo(ant.trail[i-1].x,ant.trail[i-1].y);ctx.lineTo(ant.trail[i].x,ant.trail[i].y);
        ctx.strokeStyle=`rgba(${col},${(i/ant.trail.length)*0.75})`;ctx.lineWidth=1.5;ctx.stroke();
      }
      const head=ant.trail[ant.trail.length-1];
      const hg=ctx.createRadialGradient(head.x,head.y,0,head.x,head.y,7);
      hg.addColorStop(0,`rgba(${col},1)`);hg.addColorStop(1,`rgba(${col},0)`);
      ctx.beginPath();ctx.arc(head.x,head.y,7,0,Math.PI*2);ctx.fillStyle=hg;ctx.fill();
    });
  }

  // Attach card hover tracking after mount
  requestAnimationFrame(() => {
    section.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const sr=section.getBoundingClientRect(), cr=card.getBoundingClientRect();
        hoveredRect={left:cr.left-sr.left,top:cr.top-sr.top,right:cr.right-sr.left,bottom:cr.bottom-sr.top};
      });
      card.addEventListener('mouseleave', () => { hoveredRect=null; });
    });
  });

  const cleanup = createAnimLoop(c, draw);
  const ro = new ResizeObserver(() => { fitCanvas(c); buildEdges(); });
  ro.observe(section); buildEdges();
  return () => { cleanup(); ro.disconnect(); };
}

// ── 3. SKILLS — Matrix Data Rain ──────────────────────────────
function initMatrixRain(): () => void {
  const c = document.getElementById('skills-bg') as HTMLCanvasElement;
  if (!c) return () => {};
  const ctx = c.getContext('2d')!;
  const chars = '01アイウエオカキクケコサシスセソ{}[]<>=/';
  type Col = { x: number; y: number; speed: number; fontSize: number };
  let columns: Col[] = [];

  function buildColumns() {
    columns = [];
    const fontSize = 14, W = c.width;
    const count = Math.floor(W / fontSize);
    for (let i = 0; i < count; i++) {
      columns.push({ x: i*fontSize, y: Math.random()*c.height, speed: 0.5+Math.random()*2, fontSize });
    }
    ctx.clearRect(0, 0, c.width, c.height);
  }

  function draw() {
    const W = c.width, H = c.height;
    ctx.fillStyle = 'rgba(8,13,26,0.25)'; ctx.fillRect(0,0,W,H);
    columns.forEach(col => {
      col.y += col.speed;
      if (col.y > H+100) { col.y = -50 - Math.random()*200; col.speed = 0.5+Math.random()*2; }
      const char = chars[Math.floor(Math.random()*chars.length)];
      const isAmber = Math.random() > 0.94;
      ctx.font = `${col.fontSize}px 'Orbitron',monospace`;
      ctx.fillStyle = isAmber ? 'rgba(255,184,0,0.3)' : 'rgba(0,245,255,0.18)';
      ctx.fillText(char, col.x, col.y);
      for (let t=1; t<4; t++) {
        ctx.fillStyle = `rgba(0,245,255,${0.08*(1-t/4)})`;
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)], col.x, col.y-t*col.fontSize);
      }
    });
  }

  const cleanup = createAnimLoop(c, draw);
  const ro = new ResizeObserver(() => { fitCanvas(c); buildColumns(); });
  ro.observe(c.parentElement!); buildColumns();
  return () => { cleanup(); ro.disconnect(); };
}

// ── 4. CONTACT — Pulsing Network Nodes ───────────────────────
function initNetworkNodes(): () => void {
  const c = document.getElementById('contact-bg') as HTMLCanvasElement;
  if (!c) return () => {};
  const ctx = c.getContext('2d')!;
  type Node = { x:number;y:number;vx:number;vy:number;radius:number;isAmber:boolean };
  type Rip  = { x:number;y:number;r:number;maxR:number;alpha:number };
  let nodes: Node[] = [], ripples: Rip[] = [], time = 0;

  function buildNodes() {
    nodes = []; const W=c.width,H=c.height;
    for (let i=0;i<35;i++) {
      nodes.push({ x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,
        radius:1.5+Math.random()*2,isAmber:Math.random()>0.75 });
    }
  }

  function draw() {
    const W=c.width,H=c.height;
    ctx.clearRect(0,0,W,H); time++;
    if (time%90===0&&nodes.length>0) {
      const n=nodes[Math.floor(Math.random()*nodes.length)];
      ripples.push({x:n.x,y:n.y,r:0,maxR:80+Math.random()*60,alpha:0.3});
    }
    for (let i=ripples.length-1;i>=0;i--) {
      const rp=ripples[i]; rp.r+=0.8; rp.alpha*=0.985;
      if (rp.r>rp.maxR||rp.alpha<0.01){ripples.splice(i,1);continue;}
      ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
      ctx.strokeStyle=`rgba(0,245,255,${rp.alpha})`;ctx.lineWidth=1;ctx.stroke();
    }
    for (let i=0;i<nodes.length;i++) {
      for (let j=i+1;j<nodes.length;j++) {
        const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d=Math.sqrt(dx*dx+dy*dy);
        if (d<150){ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);
          ctx.strokeStyle=`rgba(0,245,255,${(1-d/150)*0.12})`;ctx.lineWidth=0.5;ctx.stroke();}
      }
    }
    nodes.forEach(n => {
      n.x+=n.vx;n.y+=n.vy;
      if(n.x<0||n.x>W)n.vx*=-1;if(n.y<0||n.y>H)n.vy*=-1;
      n.x=Math.max(0,Math.min(W,n.x));n.y=Math.max(0,Math.min(H,n.y));
      const pulse=0.5+Math.sin(time*0.02+n.x)*0.3;
      ctx.beginPath();ctx.arc(n.x,n.y,n.radius,0,Math.PI*2);
      ctx.fillStyle=n.isAmber?`rgba(255,184,0,${0.2+pulse*0.2})`:`rgba(0,245,255,${0.15+pulse*0.15})`;ctx.fill();
      ctx.beginPath();ctx.arc(n.x,n.y,n.radius+4,0,Math.PI*2);
      ctx.fillStyle=n.isAmber?`rgba(255,184,0,${pulse*0.06})`:`rgba(0,245,255,${pulse*0.05})`;ctx.fill();
    });
  }

  const cleanup = createAnimLoop(c, draw);
  const ro = new ResizeObserver(() => { fitCanvas(c); buildNodes(); });
  ro.observe(c.parentElement!); buildNodes();
  return () => { cleanup(); ro.disconnect(); };
}

// ── Hook: mount all 4 section backgrounds ─────────────────────
export function useSectionBg() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const c1 = initLatticeGrid();
    const c2 = initHexGrid();
    const c3 = initMatrixRain();
    const c4 = initNetworkNodes();
    return () => { c1(); c2(); c3(); c4(); };
  }, []);
}

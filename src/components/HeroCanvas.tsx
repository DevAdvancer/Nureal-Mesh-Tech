import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 5, 5);
    scene.add(dir);

    // Octahedron - violet
    const octGeo = new THREE.OctahedronGeometry(1.3, 0);
    const octMat = new THREE.MeshStandardMaterial({
      color: 0x7b2fff, flatShading: true, roughness: 0.4, metalness: 0.2,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    const octWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(octGeo),
      new THREE.LineBasicMaterial({ color: 0xeee9ff, transparent: true, opacity: 0.4 })
    );
    oct.add(octWire);
    oct.position.set(1.6, 0.6, 0);
    scene.add(oct);

    // Torus knot - coral
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.75, 0.18, 140, 18),
      new THREE.MeshStandardMaterial({ color: 0xff4d6d, roughness: 0.3, metalness: 0.5 })
    );
    knot.position.set(2.9, -1.2, -1);
    scene.add(knot);

    // Dodecahedron - amber, transparent
    const dodGeo = new THREE.DodecahedronGeometry(1.1);
    const dod = new THREE.Mesh(
      dodGeo,
      new THREE.MeshStandardMaterial({
        color: 0xffb830, transparent: true, opacity: 0.55, roughness: 0.2, metalness: 0.3,
      })
    );
    const dodWire = new THREE.LineSegments(
      new THREE.EdgesGeometry(dodGeo),
      new THREE.LineBasicMaterial({ color: 0xffb830, transparent: true, opacity: 0.7 })
    );
    dod.add(dodWire);
    dod.position.set(0.4, -1.4, 0.5);
    scene.add(dod);

    const mouse = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let frame = 0;
    const baseOct = oct.position.clone();
    const baseKnot = knot.position.clone();
    const baseDod = dod.position.clone();

    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = performance.now() * 0.0005;

      oct.rotation.x = t * 0.6; oct.rotation.y = t * 0.8;
      knot.rotation.x = t * 0.5; knot.rotation.y = t * 0.7;
      dod.rotation.x = -t * 0.4; dod.rotation.y = t * 0.5;

      // Parallax (max ~0.4 world units ≈ 20px feel)
      const px = mouse.x * 0.35;
      const py = -mouse.y * 0.35;
      oct.position.x = baseOct.x + px;
      oct.position.y = baseOct.y + py;
      knot.position.x = baseKnot.x + px * 0.6;
      knot.position.y = baseKnot.y + py * 0.6;
      dod.position.x = baseDod.x + px * 0.8;
      dod.position.y = baseDod.y + py * 0.8;

      // Breathing
      const breathe = 1 + Math.sin(t * 2) * 0.03;
      oct.scale.setScalar(breathe);
      dod.scale.setScalar(2 - breathe);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      octGeo.dispose(); octMat.dispose();
      knot.geometry.dispose(); (knot.material as THREE.Material).dispose();
      dodGeo.dispose(); (dod.material as THREE.Material).dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 hidden md:block" />;
}

export function MobileShapes() {
  return (
    <div className="md:hidden absolute inset-0 flex items-center justify-end pr-6 pointer-events-none">
      <div className="relative w-64 h-64" style={{ perspective: "800px" }}>
        <div className="absolute inset-8 shape-spin" style={{ background: "#7B2FFF", clipPath: "polygon(50% 0,100% 50%,50% 100%,0 50%)", opacity: 0.85 }} />
        <div className="absolute top-0 right-0 w-24 h-24 shape-spin rounded-full border-2 border-[#FF4D6D]" style={{ animationDuration: "12s" }} />
        <div className="absolute bottom-2 left-2 w-20 h-20 shape-spin" style={{ background: "#FFB830", opacity: 0.6, animationDuration: "22s" }} />
      </div>
    </div>
  );
}

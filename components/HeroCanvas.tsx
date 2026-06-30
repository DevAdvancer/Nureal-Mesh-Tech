"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let frame = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let pointsGeometry: THREE.BufferGeometry | null = null;
    let pointsMaterial: THREE.PointsMaterial | null = null;
    let lineGeometry: THREE.BufferGeometry | null = null;
    let lineMaterial: THREE.LineBasicMaterial | null = null;
    
    // Core hub node mesh variables (for dynamic glowing central node)
    let hubGeometry: THREE.SphereGeometry | null = null;
    let hubMaterial: THREE.MeshBasicMaterial | null = null;
    let hubMesh: THREE.Mesh | null = null;

    let onMove: ((e: MouseEvent) => void) | null = null;
    let onTouch: ((e: TouchEvent) => void) | null = null;
    let onResize: (() => void) | null = null;

    // Delay initialization slightly to prioritize critical page paint (Lighthouse TTI optimization)
    const initTimer = setTimeout(() => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      
      const isMobile = window.innerWidth < 768;
      const maxNodes = isMobile ? 30 : 40;
      const connectionDist = isMobile ? 1.25 : 1.35;

      // Shift the cluster further right on desktop to clear room for the text on the left
      const xOffset = isMobile ? 0 : 2.2;

      const scene = new THREE.Scene();
      
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = isMobile ? 7 : 6;

      renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        powerPreference: "high-performance" 
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const nodes: {
        pos: THREE.Vector3;
        vel: THREE.Vector3;
      }[] = [];

      const areaWidth = isMobile ? 4.5 : 5.5;
      const areaHeight = isMobile ? 4.5 : 5.5;
      const areaDepth = 3;

      // Generate nodes: cluster a small group on the right side
      for (let i = 0; i < maxNodes; i++) {
        let pos: THREE.Vector3;
        let vel: THREE.Vector3;

        if (i < 10 && !isMobile) {
          // Core cluster (fewer nodes for a cleaner hub)
          pos = new THREE.Vector3(
            xOffset + (Math.random() - 0.5) * 1.1,
            (Math.random() - 0.5) * 1.1,
            (Math.random() - 0.5) * 1.1
          );
          vel = new THREE.Vector3(
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.012,
            (Math.random() - 0.5) * 0.008
          );
        } else {
          // Outer mesh connecting nodes
          pos = new THREE.Vector3(
            xOffset + (Math.random() - 0.5) * areaWidth,
            (Math.random() - 0.5) * areaHeight,
            (Math.random() - 0.5) * areaDepth
          );
          vel = new THREE.Vector3(
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.004,
            (Math.random() - 0.5) * 0.002
          );
        }
        
        nodes.push({ pos, vel });
      }

      // Add a dedicated glowing amber mesh for the central node that anchors all three card lines
      if (!isMobile) {
        hubGeometry = new THREE.SphereGeometry(0.12, 16, 16);
        hubMaterial = new THREE.MeshBasicMaterial({
          color: 0xffb830, // bright amber
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending
        });
        hubMesh = new THREE.Mesh(hubGeometry, hubMaterial);
        scene.add(hubMesh);
      }

      // Points (Nodes) Geometry
      pointsGeometry = new THREE.BufferGeometry();
      const pointsPositions = new Float32Array(maxNodes * 3);
      const pointsColors = new Float32Array(maxNodes * 3);

      const colorCore1 = new THREE.Color(0xff4d6d); // coral core
      const colorCore2 = new THREE.Color(0xffb830); // amber core
      const colorOuter = new THREE.Color(0x7b2fff); // violet outer mesh

      for (let i = 0; i < maxNodes; i++) {
        const node = nodes[i];
        pointsPositions[i * 3] = node.pos.x;
        pointsPositions[i * 3 + 1] = node.pos.y;
        pointsPositions[i * 3 + 2] = node.pos.z;

        let color: THREE.Color;
        if (i < 10 && !isMobile) {
          color = i % 2 === 0 ? colorCore1 : colorCore2;
        } else {
          color = colorOuter;
        }
        pointsColors[i * 3] = color.r;
        pointsColors[i * 3 + 1] = color.g;
        pointsColors[i * 3 + 2] = color.b;
      }

      pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointsPositions, 3));
      pointsGeometry.setAttribute("color", new THREE.BufferAttribute(pointsColors, 3));

      const createCircleTexture = () => {
        const size = 64;
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
          gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
          gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
          gradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, size, size);
        }
        return new THREE.CanvasTexture(canvas);
      };

      pointsMaterial = new THREE.PointsMaterial({
        size: isMobile ? 0.25 : 0.16,
        vertexColors: true,
        map: createCircleTexture(),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
      scene.add(pointCloud);

      // Dynamic Lines Geometry
      const maxConnections = maxNodes * 8;
      lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(maxConnections * 2 * 3);
      const lineColors = new Float32Array(maxConnections * 2 * 3);

      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

      lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lines);

      // Mouse and Touch Interaction
      const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
      
      onMove = (e: MouseEvent) => {
        mouse.targetX = (e.clientX / window.innerWidth - 0.5) * (isMobile ? 4 : 6) + (isMobile ? 0 : 1.1);
        mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * (isMobile ? 4 : 5);
      };
      window.addEventListener("mousemove", onMove, { passive: true });

      onTouch = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          mouse.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 4;
          mouse.targetY = -(e.touches[0].clientY / window.innerHeight - 0.5) * 4;
        }
      };
      window.addEventListener("touchmove", onTouch, { passive: true });

      const minX = xOffset - areaWidth / 2;
      const maxX = xOffset + areaWidth / 2;
      const minY = -areaHeight / 2;
      const maxY = areaHeight / 2;
      const minZ = -areaDepth / 2;
      const maxZ = areaDepth / 2;

      const animate = () => {
        frame = requestAnimationFrame(animate);

        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Pulsate the central hub size
        if (hubMesh && nodes.length > 0) {
          hubMesh.position.copy(nodes[0].pos);
          const pulse = 1.0 + Math.sin(frame * 0.045) * 0.28;
          hubMesh.scale.set(pulse, pulse, pulse);
        }

        const positions = pointsGeometry!.attributes.position.array as Float32Array;
        const lPositions = lineGeometry!.attributes.position.array as Float32Array;
        const lColors = lineGeometry!.attributes.color.array as Float32Array;

        let lineCount = 0;

        for (let i = 0; i < maxNodes; i++) {
          const node = nodes[i];
          node.pos.add(node.vel);

          // Core gravity to keep cluster cohesive on the right
          if (i < 10 && !isMobile) {
            const coreCenter = new THREE.Vector3(xOffset, 0, 0);
            const pullDir = new THREE.Vector3().subVectors(coreCenter, node.pos);
            node.pos.addScaledVector(pullDir, 0.012);
          }

          // Boundary collision
          if (node.pos.x < minX || node.pos.x > maxX) {
            node.vel.x *= -1;
            node.pos.x = THREE.MathUtils.clamp(node.pos.x, minX, maxX);
          }
          if (node.pos.y < minY || node.pos.y > maxY) {
            node.vel.y *= -1;
            node.pos.y = THREE.MathUtils.clamp(node.pos.y, minY, maxY);
          }
          if (node.pos.z < minZ || node.pos.z > maxZ) {
            node.vel.z *= -1;
            node.pos.z = THREE.MathUtils.clamp(node.pos.z, minZ, maxZ);
          }

          // Magnet attraction to mouse position
          const mouseVec = new THREE.Vector3(mouse.x, mouse.y, 0);
          const distToMouse = node.pos.distanceTo(mouseVec);
          if (distToMouse < 2.5) {
            const force = (2.5 - distToMouse) * 0.0012;
            const dir = new THREE.Vector3().subVectors(mouseVec, node.pos).normalize();
            node.pos.addScaledVector(dir, force);
          }

          positions[i * 3] = node.pos.x;
          positions[i * 3 + 1] = node.pos.y;
          positions[i * 3 + 2] = node.pos.z;
        }

        pointsGeometry!.attributes.position.needsUpdate = true;

        // Link nearby vertices into a mesh network
        for (let i = 0; i < maxNodes; i++) {
          const nodeA = nodes[i];
          
          for (let j = i + 1; j < maxNodes; j++) {
            const nodeB = nodes[j];
            const dist = nodeA.pos.distanceTo(nodeB.pos);

            if (dist < connectionDist && lineCount < maxConnections) {
              const idx = lineCount * 6;
              
              lPositions[idx] = nodeA.pos.x;
              lPositions[idx + 1] = nodeA.pos.y;
              lPositions[idx + 2] = nodeA.pos.z;

              lPositions[idx + 3] = nodeB.pos.x;
              lPositions[idx + 4] = nodeB.pos.y;
              lPositions[idx + 5] = nodeB.pos.z;

              const alpha = 1.0 - (dist / connectionDist);
              const intensity = alpha * 0.22;

              const cA = i < 10 && !isMobile ? (i % 2 === 0 ? colorCore1 : colorCore2) : colorOuter;
              const cB = j < 10 && !isMobile ? (j % 2 === 0 ? colorCore1 : colorCore2) : colorOuter;

              lColors[idx] = cA.r * intensity;
              lColors[idx + 1] = cA.g * intensity;
              lColors[idx + 2] = cA.b * intensity;

              lColors[idx + 3] = cB.r * intensity;
              lColors[idx + 4] = cB.g * intensity;
              lColors[idx + 5] = cB.b * intensity;

              lineCount++;
            }
          }
        }

        // Project HTML card coordinates to Three.js world space in real-time
        if (!isMobile && nodes.length >= 1) {
          const webCard = document.getElementById("hero-card-web");
          const mobileCard = document.getElementById("hero-card-mobile");
          const backendCard = document.getElementById("hero-card-backend");

          // Verify if elements exist and are currently displayed in screen space (width > 0)
          const isWebVisible = webCard && webCard.offsetWidth > 0;
          const isMobileVisible = mobileCard && mobileCard.offsetWidth > 0;
          const isBackendVisible = backendCard && backendCard.offsetWidth > 0;

          if (isWebVisible || isMobileVisible || isBackendVisible) {
            const canvasRect = mount.getBoundingClientRect();

            const get3DCoord = (el: HTMLElement, xAlign: "left" | "right") => {
              const rect = el.getBoundingClientRect();
              const pixelX = xAlign === "left" ? rect.left - canvasRect.left : rect.right - canvasRect.left;
              const pixelY = (rect.top + rect.height / 2) - canvasRect.top;

              const ndcX = (pixelX / canvasRect.width) * 2 - 1;
              const ndcY = -(pixelY / canvasRect.height) * 2 + 1;

              const vector = new THREE.Vector3(ndcX, ndcY, 0.5);
              vector.unproject(camera);

              const dir = vector.sub(camera.position).normalize();
              const distance = -camera.position.z / dir.z;
              return camera.position.clone().addScaledVector(dir, distance);
            };

            const cardAnchors: THREE.Vector3[] = [];
            const cardColors: THREE.Color[] = [];

            if (isWebVisible) {
              try {
                cardAnchors.push(get3DCoord(webCard, "left"));
                cardColors.push(colorCore1);
              } catch (e) {}
            }
            if (isMobileVisible) {
              try {
                cardAnchors.push(get3DCoord(mobileCard, "right"));
                cardColors.push(colorCore2);
              } catch (e) {}
            }
            if (isBackendVisible) {
              try {
                cardAnchors.push(get3DCoord(backendCard, "left"));
                cardColors.push(colorOuter);
              } catch (e) {}
            }

            for (let i = 0; i < cardAnchors.length; i++) {
              const nodePos = nodes[0].pos;
              const anchor = cardAnchors[i];

              if (lineCount < maxConnections) {
                const idx = lineCount * 6;

                lPositions[idx] = anchor.x;
                lPositions[idx + 1] = anchor.y;
                lPositions[idx + 2] = anchor.z;

                lPositions[idx + 3] = nodePos.x;
                lPositions[idx + 4] = nodePos.y;
                lPositions[idx + 5] = nodePos.z;

                const c = cardColors[i];
                const intensity = 0.65;

                lColors[idx] = c.r * intensity;
                lColors[idx + 1] = c.g * intensity;
                lColors[idx + 2] = c.b * intensity;

                lColors[idx + 3] = c.r * intensity;
                lColors[idx + 4] = c.g * intensity;
                lColors[idx + 5] = c.b * intensity;

                lineCount++;
              }
            }
          }
        }

        // Hide inactive segments in buffer
        const totalElements = maxConnections * 6;
        const activeElements = lineCount * 6;
        for (let i = activeElements; i < totalElements; i++) {
          lPositions[i] = 0;
        }

        lineGeometry!.attributes.position.needsUpdate = true;
        lineGeometry!.attributes.color.needsUpdate = true;

        // Parallax camera rotation
        camera.position.x += (mouse.x * 0.12 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.12 - camera.position.y) * 0.05;
        camera.lookAt(xOffset * 0.5, 0, 0);

        if (renderer) renderer.render(scene, camera);
      };

      animate();

      onResize = () => {
        const w = mount.clientWidth;
        const h = mount.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        if (renderer) renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize, { passive: true });
    }, 150);

    return () => {
      clearTimeout(initTimer);
      if (frame) cancelAnimationFrame(frame);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onTouch) window.removeEventListener("touchmove", onTouch);
      if (onResize) window.removeEventListener("resize", onResize);
      
      if (renderer) {
        if (mount && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      if (pointsGeometry) pointsGeometry.dispose();
      if (pointsMaterial) pointsMaterial.dispose();
      if (lineGeometry) lineGeometry.dispose();
      if (lineMaterial) lineMaterial.dispose();

      // Dispose of hub geometry & material
      if (hubGeometry) hubGeometry.dispose();
      if (hubMaterial) hubMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

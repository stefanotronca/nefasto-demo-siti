/*
 * Vetrina — demo scrollytelling 3D
 * Materiale dimostrativo/portfolio tecnico di nefaSto. Non è il codice del
 * sito consegnato ai clienti (quello resta HTML/CSS statico semplice).
 *
 * Scelta tecnica: Three.js "vanilla" (UMD via CDN) + GSAP/ScrollTrigger,
 * invece di React Three Fiber o Spline, per restare coerenti con
 * l'architettura del resto del progetto (pagine HTML statiche senza build
 * step). R3F richiederebbe JSX + bundler; Spline richiederebbe o un iframe
 * di terze parti (dipendenza esterna fuori dal nostro controllo, spesso con
 * cookie propri) o l'export di un runtime che comunque va pilotato a mano
 * per ottenere il preciso lerp wireframe->glossy legato allo scroll richiesto
 * da Sofia. Three.js puro dà lo stesso risultato visivo con meno pezzi in
 * movimento da mantenere.
 *
 * Su mobile/touch stretto, o se WebGL non è disponibile, o se l'utente ha
 * richiesto "prefers-reduced-motion", NON scarichiamo nemmeno le librerie
 * 3D: passiamo a una versione CSS-only (vedi index.html, #fallback-art),
 * per non scaldare la batteria né rallentare il dispositivo.
 */

(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function hasWebGL() {
    try {
      var c = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  function decideMode() {
    if (prefersReducedMotion()) return 'fallback';
    if (!hasWebGL()) return 'fallback';
    var coarse = window.matchMedia('(pointer: coarse)').matches;
    var narrow = window.matchMedia('(max-width: 820px)').matches;
    // Telefoni (puntatore touch + schermo stretto): evitiamo il rendering 3D
    // continuo per non scaldare la batteria né rallentare il dispositivo.
    if (coarse && narrow) return 'fallback';
    return 'full';
  }

  // --- Fade-in testo delle sezioni: uguale in entrambe le modalità -------
  function initBeatTextObserver() {
    var beats = document.querySelectorAll('.beat-inner');
    if (!('IntersectionObserver' in window)) {
      beats.forEach(function (b) { b.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
      },
      { threshold: 0.32 }
    );
    beats.forEach(function (b) { io.observe(b); });
  }

  // --- Modalità fallback: solo CSS, nessuna libreria 3D scaricata ---------
  function initFallbackArt() {
    var art = document.getElementById('fallback-art');
    var sections = document.querySelectorAll('.beat');
    if (!art || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            art.setAttribute('data-stage', entry.target.getAttribute('data-beat'));
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (s) { io.observe(s); });
  }

  // --- Caricamento librerie 3D solo quando servono davvero -----------------
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.async = false; // mantiene l'ordine: three -> gsap -> ScrollTrigger
      s.onload = resolve;
      s.onerror = function () { reject(new Error('Impossibile caricare ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadThreeStack() {
    return loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/0.149.0/three.min.js')
      .then(function () {
        return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
      })
      .then(function () {
        return loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');
      });
  }

  // --- Scena 3D --------------------------------------------------------------
  function initThreeScene() {
    var THREE = window.THREE;
    var canvas = document.getElementById('webgl-canvas');

    var scene = new THREE.Scene();
    scene.background = new THREE.Color('#070A12');

    var camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Luci: fredde (signal blue / electric cyan) di base, una calda che si
    // accende solo nella sezione finale (CTA).
    var ambient = new THREE.AmbientLight(0x22335a, 0.55);
    scene.add(ambient);

    var key = new THREE.PointLight(0x2952e3, 1.5, 22);
    key.position.set(3, 3, 4);
    scene.add(key);

    var rim = new THREE.PointLight(0x4debd1, 1.1, 22);
    rim.position.set(-3.2, -1.6, 3);
    scene.add(rim);

    var warmLight = new THREE.PointLight(0xffc98a, 0, 22);
    warmLight.position.set(0, 1.8, 3.6);
    scene.add(warmLight);

    // --- Costruzione del poliedro low-poly a frammenti -----------------------
    var group = new THREE.Group();
    scene.add(group);

    var inkColor = new THREE.Color('#0F1B33');
    var signalColor = new THREE.Color('#2952E3');
    var cyanColor = new THREE.Color('#4DEBD1');
    var blackColor = new THREE.Color('#000000');

    var baseGeo = new THREE.IcosahedronGeometry(1.3, 0);
    var nonIndexed = baseGeo.index ? baseGeo.toNonIndexed() : baseGeo;
    var posAttr = nonIndexed.attributes.position;
    var faceCount = posAttr.count / 3;

    var fragments = [];
    var identityQuat = new THREE.Quaternion();

    for (var i = 0; i < faceCount; i++) {
      var a = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3);
      var b = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3 + 1);
      var c = new THREE.Vector3().fromBufferAttribute(posAttr, i * 3 + 2);
      var centroid = new THREE.Vector3().add(a).add(b).add(c).divideScalar(3);
      var normal = centroid.clone().normalize();

      var localGeo = new THREE.BufferGeometry();
      var verts = new Float32Array([
        a.x - centroid.x, a.y - centroid.y, a.z - centroid.z,
        b.x - centroid.x, b.y - centroid.y, b.z - centroid.z,
        c.x - centroid.x, c.y - centroid.y, c.z - centroid.z
      ]);
      localGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      localGeo.computeVertexNormals();

      var solidMat = new THREE.MeshPhysicalMaterial({
        color: inkColor.clone(),
        transparent: true,
        opacity: 0.05,
        roughness: 0.85,
        metalness: 0.15,
        clearcoat: 0.7,
        clearcoatRoughness: 0.25,
        emissive: new THREE.Color('#000000'),
        emissiveIntensity: 0.15,
        side: THREE.DoubleSide
      });
      var faceMesh = new THREE.Mesh(localGeo, solidMat);

      var edgesGeo = new THREE.EdgesGeometry(localGeo);
      var edgeMat = new THREE.LineBasicMaterial({
        color: inkColor.clone(),
        transparent: true,
        opacity: 0.85
      });
      var edgeMesh = new THREE.LineSegments(edgesGeo, edgeMat);

      var fragGroup = new THREE.Group();
      fragGroup.add(faceMesh);
      fragGroup.add(edgeMesh);
      fragGroup.position.copy(centroid);
      group.add(fragGroup);

      var jitter = new THREE.Vector3(
        (Math.random() - 0.5),
        (Math.random() - 0.5),
        (Math.random() - 0.5)
      ).multiplyScalar(0.6);
      var scatterOffset = normal.clone().multiplyScalar(1.5 + Math.random() * 0.9).add(jitter);

      var scatterQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          (Math.random() - 0.5) * Math.PI,
          (Math.random() - 0.5) * Math.PI,
          (Math.random() - 0.5) * Math.PI
        )
      );

      fragments.push({
        fragGroup: fragGroup,
        solidMat: solidMat,
        edgeMat: edgeMat,
        home: centroid.clone(),
        scatterOffset: scatterOffset,
        scatterQuat: scatterQuat
      });
    }

    // --- Stato animato: target (impostato dallo scroll) + current (smorzato) -
    var target = { explosion: 0.35, materialMix: 0, cameraZ: 4.4, warm: 0, rotSpeed: 0.45, groupOpacity: 1 };
    var current = {};
    for (var k in target) current[k] = target[k];

    function smoothstep(t) {
      t = Math.max(0, Math.min(1, t));
      return t * t * (3 - 2 * t);
    }
    function lerp(a, b, t) { return a + (b - a) * t; }

    // Le 4 sezioni della pagina occupano circa un quarto ciascuna dello
    // scroll totale (min-height: 100vh su ognuna) -> quattro fasi.
    function updateFromScroll(p) {
      if (p < 0.25) {
        // Hero: oggetto fermo, wireframe scomposto, rotazione lenta.
        target.explosion = 0.35;
        target.materialMix = 0;
        target.cameraZ = 4.4;
        target.warm = 0;
        target.rotSpeed = 0.45;
        target.groupOpacity = 1;
      } else if (p < 0.5) {
        // Problema: i frammenti si allontanano, zoom out, opacità ridotta.
        var t1 = smoothstep((p - 0.25) / 0.25);
        target.explosion = lerp(0.35, 0.95, t1);
        target.materialMix = 0;
        target.cameraZ = lerp(4.4, 6.6, t1);
        target.warm = 0;
        target.rotSpeed = lerp(0.45, 0.65, t1);
        target.groupOpacity = lerp(1, 0.5, t1);
      } else if (p < 0.8) {
        // Soluzione: convergenza, rotazione più veloce, wireframe -> glossy.
        var t2 = smoothstep((p - 0.5) / 0.3);
        target.explosion = lerp(0.95, 0, t2);
        target.materialMix = t2;
        target.cameraZ = lerp(6.6, 4.0, t2);
        target.warm = 0;
        target.rotSpeed = lerp(0.65, 2.3, t2);
        target.groupOpacity = lerp(0.5, 1, t2);
      } else {
        // CTA: assemblato, luce più calda, rotazione idle continua.
        var t3 = smoothstep((p - 0.8) / 0.2);
        target.explosion = 0;
        target.materialMix = 1;
        target.cameraZ = 4.0;
        target.warm = t3;
        target.rotSpeed = lerp(2.3, 0.55, t3);
        target.groupOpacity = 1;
      }
    }

    var rotationY = 0;
    var clock = new THREE.Clock();

    function tick() {
      requestAnimationFrame(tick);
      var delta = Math.min(clock.getDelta(), 0.05);
      var lerpFactor = 1 - Math.exp(-6 * delta);
      for (var key2 in target) {
        current[key2] += (target[key2] - current[key2]) * lerpFactor;
      }

      rotationY += current.rotSpeed * delta * 0.7;
      group.rotation.y = rotationY;
      group.rotation.x = Math.sin(rotationY * 0.25) * 0.06;
      camera.position.z = current.cameraZ;
      warmLight.intensity = current.warm * 1.6;
      key.intensity = 1.5 + current.warm * 0.3;

      var peak = 4 * current.materialMix * (1 - current.materialMix);

      for (var fi = 0; fi < fragments.length; fi++) {
        var f = fragments[fi];
        f.fragGroup.position.set(
          f.home.x + f.scatterOffset.x * current.explosion,
          f.home.y + f.scatterOffset.y * current.explosion,
          f.home.z + f.scatterOffset.z * current.explosion
        );
        f.fragGroup.quaternion.slerpQuaternions(identityQuat, f.scatterQuat, current.explosion);

        f.solidMat.opacity = lerp(0.05, 0.92, current.materialMix) * current.groupOpacity;
        f.solidMat.color.copy(inkColor).lerp(signalColor, current.materialMix);
        f.solidMat.roughness = lerp(0.85, 0.16, current.materialMix);
        f.solidMat.metalness = lerp(0.15, 0.55, current.materialMix);
        f.solidMat.emissive.copy(blackColor).lerp(cyanColor, 0.12 + peak * 0.55 + current.warm * 0.05);
        f.solidMat.emissiveIntensity = 0.12 + peak * 0.9 + current.warm * 0.25;

        f.edgeMat.color.copy(inkColor).lerp(cyanColor, current.materialMix);
        f.edgeMat.opacity = lerp(0.85, 0.42, current.materialMix) * current.groupOpacity;
      }

      renderer.render(scene, camera);
    }
    tick();

    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    }
    window.addEventListener('resize', onResize);

    // --- ScrollTrigger: un unico progresso 0..1 su tutta la pagina -----------
    var gsap = window.gsap;
    var ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: '#scroll-main',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: function (self) { updateFromScroll(self.progress); }
    });

    // Stato iniziale coerente anche prima del primo scroll event.
    updateFromScroll(0);
  }

  // --- Bootstrap ---------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    initBeatTextObserver();

    var mode = decideMode();
    document.documentElement.setAttribute('data-mode', mode);

    if (mode === 'fallback') {
      initFallbackArt();
      return;
    }

    loadThreeStack()
      .then(function () {
        initThreeScene();
      })
      .catch(function (err) {
        // Se il caricamento delle librerie fallisce (rete, CDN down...),
        // non lasciamo la pagina rotta: passiamo alla versione CSS.
        console.warn('[Vetrina demo] fallback a versione CSS:', err.message);
        document.documentElement.setAttribute('data-mode', 'fallback');
        initFallbackArt();
      });
  });
})();

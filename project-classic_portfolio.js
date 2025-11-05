const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

var tl = gsap.timeline()

tl.to("#page1",{
    y:"100vh",
    scale:0.6,
    duration:0
})
tl.to("#page1",{
    y:"30vh",
    duration:1,
    delay:1
})
tl.to("#page1",{
    y:"0vh",
    rotate:360,
    scale:1,
    duration:0.7
})

// premium.js — Advanced animation system (Ashish's original GSAP + Locomotive preserved)
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Locomotive Scroll
  const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    multiplier: 1.2,
    lerp: 0.07,
    smartphone: { smooth: true },
    tablet: { smooth: true },
  });

  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });
  scroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.addEventListener("refresh", () => scroll.update());
  ScrollTrigger.refresh();

  /* -----------------------------------
     ✴️ Your original GSAP timeline (kept & enhanced)
  ----------------------------------- */
  var tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to("#page1", {
    y: "100vh",
    scale: 0.6,
    opacity: 0.3,
    duration: 0,
  })
    .to("#page1", {
      y: "30vh",
      opacity: 0.6,
      filter: "blur(5px)",
      duration: 1.2,
      delay: 0.5,
    })
    .to("#page1", {
      y: "0vh",
      rotate: 360,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.4,
      ease: "expo.out",
    });

  /* -----------------------------------
     🌫 Scroll-based fade-ins
  ----------------------------------- */
  gsap.utils.toArray("#elems > div").forEach((box) => {
    gsap.from(box, {
      scrollTrigger: {
        trigger: box,
        scroller: "#main",
        start: "top 85%",
        end: "bottom 60%",
        scrub: 1.3,
      },
      opacity: 0,
      y: 70,
      scale: 0.95,
      duration: 1.2,
      ease: "power3.out",
    });
  });

  /* -----------------------------------
     ✨ Hover animation (cards)
  ----------------------------------- */
  document.querySelectorAll("#elems > div").forEach((card) => {
    const img = card.querySelector("#image-div img");
    const title = card.querySelector("h4");

    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.04,
        duration: 0.5,
        ease: "power3.out",
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
      });
      if (img)
        gsap.to(img, {
          scale: 1.15,
          rotate: 3,
          duration: 0.8,
          ease: "power4.out",
        });
      if (title)
        gsap.to(title, {
          color: "#fff",
          letterSpacing: "2px",
          duration: 0.4,
          ease: "sine.out",
        });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.6,
        ease: "power2.inOut",
      });
      if (img)
        gsap.to(img, {
          scale: 1,
          rotate: 0,
          duration: 0.7,
          ease: "power2.inOut",
        });
      if (title)
        gsap.to(title, {
          color: "",
          letterSpacing: "0px",
          duration: 0.4,
        });
    });
  });

  /* -----------------------------------
     🧲 Magnetic hover (Apple-like motion)
  ----------------------------------- */
  const magneticItems = document.querySelectorAll("#elems > div");

  magneticItems.forEach((item) => {
    let strength = 40; // movement intensity
    item.addEventListener("mousemove", (e) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(item, {
        x: x / strength,
        y: y / strength,
        rotationY: x / 60,
        rotationX: -y / 60,
        duration: 0.4,
        ease: "power3.out",
      });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(item, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.4)",
      });
    });
  });

  /* -----------------------------------
     🌀 Parallax motion (images)
  ----------------------------------- */
  gsap.utils.toArray("#image-div img").forEach((img) => {
    gsap.to(img, {
      yPercent: 10,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        scroller: "#main",
        scrub: 1.5,
      },
    });
  });

  /* -----------------------------------
     💫 Custom soft-glow cursor
  ----------------------------------- */
  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.body.appendChild(cursor);

  gsap.set(cursor, {
    position: "fixed",
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "rgba(255,255,255,0.5)",
    mixBlendMode: "difference",
    pointerEvents: "none",
    zIndex: 9999,
  });

  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX - 12,
      y: e.clientY - 12,
      duration: 0.15,
      ease: "power3.out",
    });
  });
});

// Hero Text Cursor-Responsive Lighting
const heroText = document.querySelector('#page1 h1');
if (heroText) {
  heroText.addEventListener('mousemove', (e) => {
    const rect = heroText.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroText.style.setProperty('--x', `${x}%`);
    heroText.style.setProperty('--y', `${y}%`);
  });
  heroText.addEventListener('mouseleave', () => {
    heroText.style.removeProperty('--x');
    heroText.style.removeProperty('--y');
  });
}

// Optional: Floating magnetic glow on hover
document.querySelectorAll(".social-link").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  });
});

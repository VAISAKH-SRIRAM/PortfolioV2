/* ══════════════════════════════════════════════════════════════════════
   VAISAKH SRIRAM PORTFOLIO — Dynamic Interactive Logic
   Light Theme · Interactive X-Ray Hover on VAISAKH · Ruler Ticks · Router
 ══════════════════════════════════════════════════════════════════════ */

const PROJECT_MAP = [
  {
    match: ["arshiasinghofficial.com", "arshia-singh", "arshia singh"],
    url: "https://arshiasinghofficial.com"
  },
  {
    match: ["theriverpromenade.com", "riverpromenade", "river promenade"],
    url: "https://theriverpromenade.com"
  },
  {
    match: ["edenjohncaterers.in", "eden-john", "eden john"],
    url: "https://edenjohncaterers.in"
  },
  {
    match: ["purapaceco.com", "pura-pac", "pura pac", "northlight"],
    url: "https://purapaceco.com"
  }
];

const CONTACT_INFO = {
  phoneText: "+91 8848932653",
  phoneHref: "tel:+918848932653",
  emailText: "vaisakhs2255@gmail.com",
  emailHref: "mailto:vaisakhs2255@gmail.com",
  instagramUrl: "https://www.instagram.com/_vaisakhsriram?igsh=OGc3YjNiOGU1d252"
};

// 1. High-priority capture-phase click handler for project links and social links
document.addEventListener("click", function(e) {
  const target = e.target;
  const link = target.closest("a");
  const href = link ? (link.getAttribute("href") || link.href || "") : "";
  const lowerHref = href.toLowerCase();

  // Find parent text context to catch "VIEW PROJECT" clicks
  const parentContainer = target.closest("a, .framer-1arg1x, .framer-1aov81g, [data-framer-name], div");
  const containerText = ((parentContainer ? parentContainer.textContent : "") + " " + href).toLowerCase();

  // Check if click matches any project
  for (const proj of PROJECT_MAP) {
    let isMatch = false;

    // Check href matches
    for (const key of proj.match) {
      if (lowerHref.includes(key)) {
        isMatch = true;
        break;
      }
    }

    // If click is on "View Project" or project card text
    if (!isMatch && (containerText.includes("view project") || link)) {
      for (const key of proj.match) {
        if (containerText.includes(key)) {
          isMatch = true;
          break;
        }
      }
    }

    if (isMatch) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      window.open(proj.url, "_blank", "noopener,noreferrer");
      return;
    }
  }

  // Handle Instagram account link opening in new tab
  if (lowerHref.includes("instagram.com")) {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    window.open(CONTACT_INFO.instagramUrl, "_blank", "noopener,noreferrer");
    return;
  }

  // Handle navigation header links with root-absolute full-page load
  if (link) {
    const isNav = link.closest("nav, header, .pg-nav");
    if (isNav && href && !href.startsWith("#") && !href.startsWith("javascript:")) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      
      let navTarget = href;
      if (lowerHref.includes("play-ground") || lowerHref.includes("playground")) {
        navTarget = "/play-ground/";
      } else if (lowerHref.includes("about")) {
        navTarget = "/about/";
      } else if (lowerHref.includes("contact")) {
        navTarget = "/contact/";
      } else if (lowerHref === "./" || lowerHref === "." || lowerHref === "/" || lowerHref.includes("index")) {
        navTarget = "/";
      }

      window.location.href = navTarget;
      return;
    }
  }
}, true);

// 2. Remove buy badge & Framer badge containers
function hideBuyBadge() {
  const badgeContainer = document.getElementById('__framer-badge-container');
  if (badgeContainer) badgeContainer.remove();

  const buyButtons = document.querySelectorAll('a[href*="polar.sh"], .framer-187vpa3, .framer-tg9meo-container');
  buyButtons.forEach(btn => btn.remove());
}

// 3. Remove any remaining Case Study items from header navigation
function removeCaseStudyHeader() {
  const containers = document.querySelectorAll('.framer-12hsxtv-container');
  containers.forEach(el => el.remove());

  const navLinks = document.querySelectorAll('nav a, header a');
  navLinks.forEach(a => {
    const text = (a.textContent || '').trim().toLowerCase();
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (text === 'case study' || href.endsWith('/case-study') || href === './case-study') {
      const container = a.closest('.framer-12hsxtv-container') || a.parentElement;
      if (container) container.remove();
      else a.remove();
    }
  });
}

// 4. Update EM and PH contact tooltips & Social links dynamically
function updateContactTooltips() {
  // Update Phone links & text
  const telLinks = document.querySelectorAll('a[href*="tel:"]');
  telLinks.forEach(a => {
    a.setAttribute("href", CONTACT_INFO.phoneHref);
    if (a.textContent && (a.textContent.includes("+1") || a.textContent.includes("123456789") || a.textContent.includes("88489"))) {
      a.textContent = CONTACT_INFO.phoneText;
    }
  });

  // Update Email links & text
  const mailLinks = document.querySelectorAll('a[href*="mailto:"]');
  mailLinks.forEach(a => {
    a.setAttribute("href", CONTACT_INFO.emailHref);
    if (a.textContent && (a.textContent.includes("selenadesigns") || a.textContent.includes("VAISAKHdesigns") || a.textContent.includes("Hello@") || a.textContent.includes("vaisakhs2255"))) {
      a.textContent = CONTACT_INFO.emailText;
    }
  });

  // Hide Facebook & LinkedIn
  const fbAndLi = document.querySelectorAll('.framer-1aov81g-container, .framer-1oxf391-container, a[href*="facebook.com"], a[href*="linkedin.com"]');
  fbAndLi.forEach(el => el.remove());

  // Update Instagram links
  const instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
  instaLinks.forEach(a => {
    a.setAttribute("href", CONTACT_INFO.instagramUrl);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener noreferrer");
  });
}

function updateHeaderLogo() {
  const containers = document.querySelectorAll('.framer-rfbnv9-container');
  containers.forEach(container => {
    const existingImg = container.querySelector('img[src*="bear-logo"]');
    if (!existingImg) {
      container.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;position:relative"><a href="/" style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-decoration:none;"><img src="/bear-logo.png" alt="Logo" style="height:24px;max-height:24px;width:auto;display:block;object-fit:contain;"></a></div>`;
    } else {
      existingImg.style.height = "24px";
      existingImg.style.maxHeight = "24px";
    }
  });
}

function ensureFavicon() {
  let link = document.querySelector('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/gif';
  if (!link.href.includes('favicon.gif')) {
    link.href = '/favicon.gif?v=' + Date.now();
  }
}

function cleanupUI() {
  document.title = "VAISAKH SRIRAM - PRTFLIO";
  hideBuyBadge();
  removeCaseStudyHeader();
  updateContactTooltips();
  updateHeaderLogo();
}

document.addEventListener("DOMContentLoaded", () => {
  initRulerTicks();
  initLiveClock();
  initRouter();
  initXrayHoverEffect();
  initContactForm();
  cleanupUI();
  setTimeout(cleanupUI, 300);
});

window.addEventListener("load", cleanupUI);

/* Dynamically generate ruler marks (0, 100, 200, 300...) across window width */
function initRulerTicks() {
  const container = document.getElementById("rulerTicksRow");
  if (!container) return;

  const w = window.innerWidth;
  const step = 100;
  container.innerHTML = "";

  for (let x = 0; x <= w; x += step) {
    const mark = document.createElement("div");
    mark.className = "ruler-mark";
    mark.style.left = x + "px";
    mark.innerHTML = `<span>${x}</span><div class="ruler-line"></div>`;
    container.appendChild(mark);
  }
}

window.addEventListener("resize", initRulerTicks);

/* Update live clock every second (IST Live Time) */
function initLiveClock() {
  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    const clockEl = document.getElementById("rulerClock");
    if (clockEl) clockEl.textContent = timeStr;

    const framerTimeEls = document.querySelectorAll('.framer-1x2dk32, [data-framer-name="Time"]');
    framerTimeEls.forEach(container => {
      const textNode = container.querySelector('.framer-1frrjid-container div, div') || container;
      if (textNode) textNode.textContent = timeStr;
    });
  }
  update();
  setInterval(update, 1000);
}

/* INTERACTIVE X-RAY HOVER EFFECT ON VAISAKH */
function initXrayHoverEffect() {
  const canvas       = document.querySelector(".home-canvas");
  const bejamanBox   = document.querySelector(".sel-box-bejaman");
  const blackSquare  = document.querySelector(".black-square-box");
  const bejamanText  = document.querySelector(".hero-bejaman-text");

  if (!bejamanBox || !blackSquare || !bejamanText || !canvas) return;

  bejamanBox.addEventListener("mousemove", (e) => {
    const canvasRect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - canvasRect.left;
    const mouseY = e.clientY - canvasRect.top;

    blackSquare.style.left = mouseX + "px";
    blackSquare.style.top  = mouseY + "px";

    blackSquare.classList.add("active");
    bejamanText.classList.add("xray-active");
  });

  bejamanBox.addEventListener("mouseleave", () => {
    blackSquare.classList.remove("active");
    bejamanText.classList.remove("xray-active");
  });
}

/* SPA Hash Router */
function initRouter() {
  const tabs = document.querySelectorAll(".gtab[data-page]");
  const pages = document.querySelectorAll(".page[data-page]");

  function showPage(targetId) {
    pages.forEach(page => {
      if (page.dataset.page === targetId) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    tabs.forEach(tab => {
      if (tab.dataset.page === targetId) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const target = tab.dataset.page;
      showPage(target);
      window.location.hash = target;
    });
  });

  document.querySelectorAll("a[data-page]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.page;
      showPage(target);
      window.location.hash = target;
    });
  });

  const currentHash = window.location.hash.replace("#", "") || "home";
  showPage(currentHash);
}

/* Real Email Contact Form Handler (Delivers direct to vaisakhs2255@gmail.com) */
function initContactForm() {
  const forms = document.querySelectorAll('form, #contactForm, [data-framer-name="Contact Form"]');
  forms.forEach(form => {
    if (form.dataset.emailBound) return;
    form.dataset.emailBound = "true";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      formData.append("_to", "vaisakhs2255@gmail.com");
      formData.append("_subject", "New Portfolio Enquiry from Vaisakh's Website!");

      try {
        const res = await fetch("https://formsubmit.co/ajax/vaisakhs2255@gmail.com", {
          method: "POST",
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          alert("Success! Your enquiry has been sent directly to Vaisakh at vaisakhs2255@gmail.com 📩");
          form.reset();
        } else {
          window.location.href = "mailto:vaisakhs2255@gmail.com?subject=Portfolio%20Enquiry&body=Hello%20Vaisakh,";
        }
      } catch (err) {
        window.location.href = "mailto:vaisakhs2255@gmail.com?subject=Portfolio%20Enquiry&body=Hello%20Vaisakh,";
      }
    });
  });
}

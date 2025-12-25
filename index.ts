/* about.ts
   Self-contained About page (DOM + CSS injected from this file)
   - No external libraries
   - Swap images by editing LOGO_IMAGE_URL and ABOUT_IMAGE_URL
*/

type AboutPageOptions = {
  mountId?: string;
  logoImageUrl?: string;   // e.g. "/assets/yicc-logo.png"
  aboutImageUrl?: string;  // e.g. "/assets/about-hero.jpg"
};

const DEFAULT_MOUNT_ID = "app";

/** Put your images here (recommended: Vite public/assets/...) */
const LOGO_IMAGE_URL = "/assets/yicc-logo.png";     // <-- replace
const ABOUT_IMAGE_URL = "/assets/about-hero.jpg";   // <-- replace

export function mountAboutPage(options: AboutPageOptions = {}) {
  const mountId = options.mountId ?? DEFAULT_MOUNT_ID;

  const root = document.getElementById(mountId);
  if (!root) {
    throw new Error(
      `mountAboutPage: Could not find element with id="${mountId}". Add <div id="${mountId}"></div> to your HTML.`
    );
  }

  const logoUrl = options.logoImageUrl ?? LOGO_IMAGE_URL;
  const aboutImgUrl = options.aboutImageUrl ?? ABOUT_IMAGE_URL;

  // ---- 1) Inject CSS (scoped by .yicc-about) ----
  const styleId = "yicc-about-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = getStyles();
    document.head.appendChild(style);
  }

  // ---- 2) Build HTML ----
  root.innerHTML = `
    <div class="yicc-about">
      <div class="yicc-shell">
        <!-- Top Nav -->
        <header class="yicc-topbar" role="banner">
          <div class="yicc-brand" aria-label="YICC brand">
            <div class="yicc-mark" aria-hidden="true">
              ${
                logoUrl && logoUrl.trim().length > 0
                  ? `<img class="yicc-mark-img" src="${escapeHtml(
                      logoUrl
                    )}" alt="" />`
                  : inlineLeafSvg()
              }
            </div>

            <div class="yicc-brand-text">
              <div class="yicc-brand-name">YICC</div>
              <div class="yicc-brand-tag">Future is Green</div>
            </div>
          </div>

          <nav class="yicc-nav" aria-label="Primary navigation">
            ${navItem("Home", "home", false)}
            ${navItem("About", "info", true)}
            ${navItem("Programs", "programs", false)}
            ${navItem("Impact", "target", false)}
            ${navItem("Team", "users", false)}
            ${navItem("Contact", "mail", false)}
          </nav>

          <!-- Mobile menu button (visual only; you can wire it later if you want) -->
          <button class="yicc-burger" type="button" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </header>

        <!-- Content -->
        <main class="yicc-main" role="main">
          <section class="yicc-content">
            <div class="yicc-left">
              <h1 class="yicc-title">
                What is <span class="yicc-title-accent">YICC</span>?
              </h1>

              <p class="yicc-p">
                Youth Initiative in Climate Change (YICC) is a youth-led movement
                dedicated to advancing SDG 13: Climate Action in Rwanda. What began
                as a high school tree-planting project has evolved into a comprehensive
                initiative.
              </p>

              <p class="yicc-p">
                We equip young people with the knowledge and skills to implement both
                mitigation and adaptation strategies. Our mission is to empower Rwandan
                high school students and youth to become environmental leaders.
              </p>

              <p class="yicc-p yicc-emph">
                The urgency of climate change demands immediate action. Rising temperatures
                threaten ecosystems, livelihoods, and human survival— but we believe youth
                hold the potential to drive change.
              </p>

              <p class="yicc-quote">
                Because there is no Planet B.
              </p>
            </div>

            <aside class="yicc-right" aria-label="About image">
              <div class="yicc-image-card">
                ${
                  aboutImgUrl && aboutImgUrl.trim().length > 0
                    ? `<img class="yicc-image" src="${escapeHtml(
                        aboutImgUrl
                      )}" alt="YICC volunteers at work" />`
                    : `<div class="yicc-image-fallback">
                         <div class="yicc-fallback-title">Drop your About image here</div>
                         <div class="yicc-fallback-sub">Set ABOUT_IMAGE_URL in about.ts</div>
                       </div>`
                }
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  `;
}

/* --------------------------- helpers --------------------------- */

function getStyles() {
  return `
  :root{
    --yicc-bg: #eef2f6;
    --yicc-surface: rgba(255,255,255,0.78);
    --yicc-text: #111827;
    --yicc-muted: #6b7280;
    --yicc-border: rgba(17,24,39,0.10);
    --yicc-green: #24b47e;
    --yicc-green-soft: rgba(36,180,126,0.12);
    --yicc-shadow: 0 10px 28px rgba(17,24,39,0.10);
    --yicc-shadow-soft: 0 6px 18px rgba(17,24,39,0.08);
    --yicc-radius-lg: 22px;
    --yicc-radius-md: 14px;
    --yicc-max: 1180px;
  }

  /* Page background */
  .yicc-about{
    min-height: 100vh;
    background: radial-gradient(1200px 500px at 18% 10%, rgba(36,180,126,0.12), transparent 55%),
                radial-gradient(900px 420px at 85% 25%, rgba(59,130,246,0.07), transparent 52%),
                var(--yicc-bg);
    color: var(--yicc-text);
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }

  .yicc-shell{
    max-width: var(--yicc-max);
    margin: 0 auto;
    padding: clamp(14px, 2vw, 22px) clamp(14px, 3vw, 26px) 28px;
  }

  /* Topbar */
  .yicc-topbar{
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap: 14px;
    padding: 10px 12px;
  }

  .yicc-brand{
    display:flex;
    align-items:center;
    gap: 10px;
    min-width: 200px;
  }

  .yicc-mark{
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: rgba(36,180,126,0.18);
    border: 1px solid rgba(36,180,126,0.35);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
  }
  .yicc-mark-img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .yicc-brand-name{
    font-weight: 800;
    letter-spacing: 0.2px;
    line-height: 1.05;
  }
  .yicc-brand-tag{
    font-size: 12px;
    color: var(--yicc-muted);
    margin-top: 2px;
  }

  .yicc-nav{
    display:flex;
    align-items:center;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 999px;
    background: var(--yicc-surface);
    border: 1px solid var(--yicc-border);
    box-shadow: var(--yicc-shadow-soft);
    backdrop-filter: blur(12px);
  }

  .yicc-nav a{
    display:flex;
    align-items:center;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 999px;
    text-decoration:none;
    color: rgba(17,24,39,0.72);
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.1px;
    white-space: nowrap;
    border: 1px solid transparent;
  }

  .yicc-nav a svg{
    width: 16px;
    height: 16px;
    opacity: 0.8;
  }

  .yicc-nav a:hover{
    background: rgba(255,255,255,0.7);
    border-color: rgba(17,24,39,0.08);
  }

  .yicc-nav a.is-active{
    background: var(--yicc-green-soft);
    border-color: rgba(36,180,126,0.35);
    color: #0f172a;
  }

  /* Burger (shows on small screens) */
  .yicc-burger{
    display:none;
    width: 44px;
    height: 44px;
    border-radius: 12px;
    border: 1px solid var(--yicc-border);
    background: var(--yicc-surface);
    box-shadow: var(--yicc-shadow-soft);
    backdrop-filter: blur(10px);
    cursor:pointer;
  }
  .yicc-burger span{
    display:block;
    width: 18px;
    height: 2px;
    background: rgba(17,24,39,0.65);
    margin: 4px auto;
    border-radius: 2px;
  }

  /* Main layout */
  .yicc-main{
    margin-top: 8px;
  }

  .yicc-content{
    display:grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(18px, 3vw, 36px);
    align-items: start;
    padding: clamp(8px, 1.2vw, 14px) 6px;
  }

  /* Left */
  .yicc-title{
    margin: 26px 0 14px;
    font-size: clamp(36px, 4.4vw, 56px);
    letter-spacing: -0.7px;
    line-height: 1.05;
  }
  .yicc-title-accent{
    color: var(--yicc-green);
  }

  .yicc-p{
    margin: 0 0 14px;
    color: rgba(17,24,39,0.60);
    line-height: 1.7;
    font-size: 15px;
    max-width: 56ch;
  }

  .yicc-emph{
    color: rgba(15,23,42,0.70);
    background: rgba(36,180,126,0.06);
    border-left: 4px solid rgba(36,180,126,0.45);
    padding: 10px 12px;
    border-radius: 10px;
    max-width: 60ch;
  }

  .yicc-quote{
    margin-top: 18px;
    font-weight: 800;
    letter-spacing: -0.2px;
    font-size: clamp(18px, 2vw, 22px);
  }

  /* Right image card */
  .yicc-image-card{
    border-radius: var(--yicc-radius-lg);
    overflow:hidden;
    background: rgba(255,255,255,0.7);
    border: 1px solid rgba(17,24,39,0.12);
    box-shadow: var(--yicc-shadow);
  }

  .yicc-image{
    display:block;
    width: 100%;
    height: clamp(300px, 36vw, 460px);
    object-fit: cover;
  }

  .yicc-image-fallback{
    width: 100%;
    height: clamp(300px, 36vw, 460px);
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    gap: 8px;
    background: linear-gradient(135deg, rgba(36,180,126,0.14), rgba(59,130,246,0.08));
  }
  .yicc-fallback-title{
    font-weight: 800;
    color: rgba(17,24,39,0.82);
  }
  .yicc-fallback-sub{
    font-size: 13px;
    color: rgba(17,24,39,0.60);
  }

  /* Responsive: stack like the template still “feels” the same */
  @media (max-width: 980px){
    .yicc-nav{
      gap: 6px;
      padding: 6px 8px;
    }
    .yicc-nav a{
      padding: 9px 10px;
      font-size: 13px;
    }
  }

  @media (max-width: 780px){
    .yicc-nav{ display:none; }
    .yicc-burger{ display:block; }

    .yicc-content{
      grid-template-columns: 1fr;
      gap: 16px;
    }
    .yicc-title{
      margin-top: 14px;
    }
    .yicc-p{
      max-width: 68ch;
    }
    .yicc-image{
      height: 320px;
    }
  }

  @media (max-width: 420px){
    .yicc-shell{ padding: 12px 12px 20px; }
    .yicc-mark{ width: 40px; height: 40px; border-radius: 12px; }
    .yicc-image{ height: 280px; }
  }
  `;
}

function navItem(label: string, iconName: IconName, active: boolean) {
  const cls = active ? "is-active" : "";
  return `
    <a class="${cls}" href="#" aria-current="${active ? "page" : "false"}">
      ${iconSvg(iconName)}
      <span>${escapeHtml(label)}</span>
    </a>
  `;
}

type IconName = "home" | "info" | "programs" | "target" | "users" | "mail";

function iconSvg(name: IconName) {
  // Small inline SVGs (so you don't need icon packs)
  const common = `fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  switch (name) {
    case "home":
      return `<svg viewBox="0 0 24 24" ${common}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 10v10h14V10"/></svg>`;
    case "info":
      return `<svg viewBox="0 0 24 24" ${common}><circle cx="12" cy="12" r="9"/><path d="M12 10v7"/><path d="M12 7h.01"/></svg>`;
    case "programs":
      return `<svg viewBox="0 0 24 24" ${common}><path d="M7 7h14"/><path d="M7 12h14"/><path d="M7 17h14"/><path d="M3 7h.01"/><path d="M3 12h.01"/><path d="M3 17h.01"/></svg>`;
    case "target":
      return `<svg viewBox="0 0 24 24" ${common}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><path d="M12 12l7-7"/></svg>`;
    case "users":
      return `<svg viewBox="0 0 24 24" ${common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="3"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a3 3 0 0 1 0 5.74"/></svg>`;
    case "mail":
      return `<svg viewBox="0 0 24 24" ${common}><path d="M4 4h16v16H4z"/><path d="m4 6 8 7 8-7"/></svg>`;
  }
}

function inlineLeafSvg() {
  // Fallback logo mark if you don't want an image file yet
  return `
    <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden="true">
      <path d="M48 12C30 12 18 22 14 38c-2 9 3 16 12 16 16 0 26-12 26-30 0-5-1-9-4-12Z" fill="rgba(36,180,126,0.95)"/>
      <path d="M18 50c10-14 18-20 30-26" fill="none" stroke="white" stroke-width="4" stroke-linecap="round"/>
    </svg>
  `;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function page(n, alt, caption) {
  const id = String(n).padStart(2, "0");
  const stem = `page-${id}`;
  return {
    src: `img/pages/${stem}.png`,
    lqip: `img/pages/lqip/${stem}.jpg`,
    preview: `img/pages/preview/${stem}.webp`,
    alt: alt || `Portfolio page ${n}`,
    caption: caption || alt || `Portfolio spread, page ${n}.`,
  };
}

function cardTiers(fullSrc) {
  const base = fullSrc.replace(/^img\/cards\//, "").replace(/\.png$/, "");
  return {
    lqip: `img/cards/lqip/${base}.jpg`,
    thumb: `img/cards/thumbs/${base}.webp`,
    full: fullSrc,
  };
}

let mediaLoadId = 0;

function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

async function loadProgressive(imgEl, tiers, { finalTier = "full" } = {}) {
  const loadId = ++mediaLoadId;
  const isStale = () => Number(imgEl.dataset.loadId) !== loadId;

  imgEl.dataset.loadId = String(loadId);
  imgEl.classList.add("progressive-img", "is-loading");

  if (tiers.lqip) {
    imgEl.src = tiers.lqip;
  }

  const steps = [];
  if (finalTier === "thumb") {
    if (tiers.thumb) steps.push(tiers.thumb);
  } else {
    if (tiers.preview) steps.push(tiers.preview);
    if (tiers.full && tiers.full !== tiers.preview) steps.push(tiers.full);
  }

  for (const src of steps) {
    if (isStale()) return;
    try {
      await preloadImage(src);
      if (isStale()) return;
      imgEl.src = src;
      imgEl.classList.remove("is-loading");
    } catch {
      break;
    }
  }

  if (!isStale()) {
    imgEl.classList.remove("is-loading");
  }
}

const PROJECTS = {
  telluride: {
    label: "Telluride Mountain Village",
    description: [
      "Telluride Mountain Village is a luxury 400,000 sq ft hotel and private residence complex accessed by gondola from downtown Telluride. The program emphasizes expansive greenscapes and wetlands, with a plaza that connects the gondola, pond, hotel, condos, and outdoor dining.",
      "The residential towers contain 28 units with two- through five-bedroom layouts. Subpenthouse and penthouse units share views of Campbell Peak Ridgeline, Mount Wilson, and Silver Peak. Towers are carved into the landscape with 14 ft stone retaining walls; parking connects north and south towers below grade before transitioning to a shared lobby.",
    ],
    media: [
      page(3, "Telluride Mountain Village site plan and hotel unit details", "Telluride Mountain Village — overall site plan, hotel plaza, branded residence towers, and operable wood screen and balcony details."),
      page(4, "Telluride private residence tower plans and aerial", "Telluride Mountain Village — private residence north and south sectors, penthouse layouts, and aerial view of the residential towers."),
    ],
  },
  homewood: {
    label: "Homewood Ski Resort",
    description: [
      "Homewood Ski Resort sits on the western slopes of Lake Tahoe. Phase 01 includes four five-story residential towers with lake-to-summit views, each oriented to bypass obstructions and maximize privacy. Buildings are carved into the landscape with ski-in/ski-out access.",
      "Phase 02 will add residential towers, townhouses, single-family homes, a hotel, restaurant, and additional sports amenities.",
    ],
    media: [
      page(5, "Homewood Ski Resort residential towers", "Homewood Ski Resort — typical two-unit floor plan, wall section through mezzanine and balconies, aerial of towers and Lake Tahoe, and down-slope ski-base view."),
    ],
  },
  moonlight: {
    label: "Moonlight Basin Resort",
    description: [
      "Moonlight Basin is a new development outside Big Sky, Montana, including hotel, spa, restaurant, branded residences, cabins, and a whisky shack. Six rental cabins each measure 1,366 sq ft.",
      "Drawings include cabin floor plans and interior photography from a full-scale hotel unit mock-up.",
    ],
    media: [
      page(6, "Moonlight Basin cabin and hotel mock-up", "Moonlight Basin Resort — cabin floor plan, roof level, and interior shots of the primary bedroom and bathroom from the full-scale mock-up."),
    ],
  },
  "ucsf-transplant": {
    label: "UCSF Connie Frank Transplant Center",
    description: [
      "Renovation within a brutalist landmark completed in 1972, with exposed structural concrete archways and floor-to-floor glass offering views of the city, Golden Gate, and ocean.",
      "Design forms complement and soften the existing structure while creating clear, flowing geometry inspired by how patients move through and occupy the space.",
    ],
    media: [
      page(7, "UCSF Connie Frank Transplant Center", "UCSF Connie Frank Transplant Center — reception desk plan and geometry, patient room equipment plan, and waiting area bench detail."),
    ],
  },
  "ucsf-medsurg": {
    label: "UCSF 15th Fl. Med Surg",
    description: [
      "The patient room of the future seeks to change healthcare workplace and patient care settings for generational shifts—maximizing connectivity, integrating technology, and better accommodating families.",
      "Moffitt Long focused on patient wellness through an airy recovery space drawn from San Francisco's sky, land, and sea, expressed in finish palette, light washes, and wall graphics.",
    ],
    media: [
      page(8, "UCSF 15th floor med-surg patient room of the future", "UCSF 15th Fl. Med Surg — north wing corridor cove light, nurse station desk details, staff breakroom, and nurse station."),
    ],
  },
  "the-box": {
    label: "The Box",
    description: [
      "The Box is a weekend retreat on a rock face overlooking Rocky Mountain National Park, accessible only by rock climbing. Playful metal cladding imitates rugged rock slab and allows program to push through the façade; folding planes function as balcony railings and rock-fall protection.",
      "Under 1,000 SF, the tiny overnight retreat accommodates up to four guests with beds on pulley-raised platforms, flexible layout options, and material studies in wood slats, screens, metal fabric, and polycarbonate.",
    ],
    media: [
      page(9, "The Box cliffside dwelling massing studies", "The Box — massing studies, view from kitchenette to living and balcony, and exposed rock wall with operable sleeping platforms."),
      page(10, "The Box flexible layout and material studies", "The Box — space configuration options, material studies, and section through arrival platform, living space, and upper deck."),
    ],
  },
  "shea-brewery": {
    label: "Shea Brewery + Retail",
    description: [
      "Shea Brewery + Retail creates a gathering hub for Denver's Meridian neighborhood—a new kind of main street centered on food, drinks, entertainment, and the craft of beer and liquor.",
      "The roofscape directs attention to entry and plaza. In the plaza, an L-shaped plan, garage doors, and sweeping overhang support outdoor seating and a sloped green amphitheater. Perforated exterior panels reveal color by day and light by night.",
    ],
    media: [
      page(12, "Shea Brewery + Retail site and plaza", "Shea Brewery + Retail — conceptual sketch, main entry, view toward amphitheater, site programming, and the plaza."),
    ],
  },
  "living-core": {
    label: "Living Core",
    description: [
      "Living Core is a nano-home for a six-person, multi-generational family under one roof—designed to erase boundaries of traditional program by creating spaces that accommodate multiple functions while meeting the character of shelter.",
      "Inspired by pine-cone biology, the home spirals living spaces around a central core. An operable façade of lightweight concrete blocks on rods mimics the pine cone's responsive skin, opening and closing with weather and occupant needs.",
    ],
    media: [
      page(13, "Living Core pine-cone inspired housing concept", "Living Core — Denver growth statistics, climatic operability diagrams, skin-core-circulation studies, and pine-cone inspiration."),
      page(14, "Living Core circulation and living core diagram", "Living Core — core pull-cut-carve process, reflective core shaft, plant wall, and circulation wrapping the central living core."),
    ],
  },
  "nine-yards": {
    label: "Nine Yards Hotel",
    description: [
      "The Nine Yards Hotel operates as a controller of pace and intensity—shifting programmatically from noisy to quiet, dynamic to static, working to relaxing. Concealing dilutes intensity; revealing projects views and reconnects occupants with the city.",
      "The urban backyard is formed by layered structure and a pleated occupiable skin. The front yard captures avenue intensity through layered glass and metal fabric, with staggered lofts and offices varying spatial composition.",
    ],
    media: [
      page(16, "Nine Yards Hotel urban backyard concept", "Nine Yards Hotel — avenue versus street intensity diagram and quiet-static versus loud-dynamic relationships."),
      page(17, "Nine Yards Hotel vertical street and occupiable skin", "Nine Yards Hotel — internalizing the intersection, backyard layering, rib structure, office and residential units, and skin enclosure."),
    ],
  },
  "light-pavilion": {
    label: "Light Pavilion",
    description: [
      "An exploration of sculpting light through material, methods, systems, and assemblies in the Black Rock Desert. CNC milling exposes wood layers, tones, and textures; water-jet scoring cuts panel tabs.",
      "A dialogue between metal, wood, and light narrates the unfolding story of shadow—grooved wood receives light while folded metal panels reflect in varying degrees, some rusted to cast color onto wood.",
    ],
    media: [
      page(18, "Light Pavilion material and light studies", "Light Pavilion — diagrammatic study, light-form-material studies, inspiration, and CNC process."),
      page(19, "Light Pavilion wood and metal shadow wall", "Light Pavilion — grooved wood receivers, folded metal panels, and shadow casting along the pavilion wall."),
    ],
  },
  "stair-fragment": {
    label: "Stair Fragment",
    description: [
      "A full-scale stair fragment focusing on detail and assembly of materials—designing and building with real-world cost, materiality, and team communication constraints.",
      "Bricks stack along floor-ceiling rebar with headers dominant; steel channels extend to support tread loads while wood treads bend up into a paneled guardrail.",
    ],
    media: [
      page(20, "Stair fragment axonometric and tread connections", "Stair Fragment — internal tread connection with rebar, staggered tread connection, and axonometric study."),
      page(21, "Stair fragment brick cantilever wall system", "Stair Fragment — brick stacking, lateral reinforcement, steel angle tread connections, and continuity of brick, steel, and wood."),
    ],
  },
  "decay-survival": {
    label: "Decay and Survival",
    description: [
      "An intervention in the Taklamakan Desert exploring immeasurable, continuously shifting dune surfaces. The refuge anchors travelers escaping extreme weather with amphitheater, sleeping spaces, and a cultural artifact gallery.",
      "Decay and survival emerge from how life persists through the desert's spontaneous transformation—bringing human scale and protection to an unfamiliar, boundless context.",
    ],
    media: [
      page(22, "Decay and Survival desert refuge", "Decay and Survival — Taklamakan Desert context and refuge concept for decay and survival."),
    ],
  },
  "john-muir": {
    label: "John Muir's Rest",
    description: [
      "A one-week wood workshop with Scandinavian architects Sami Rintala and Philip Tidwell to provide seating and meditation at Cedar Key Cemetery Point Park.",
      "John Muir's trip to Cedar Key generated the conceptual framework. The workshop focused on architectural joints, designing directly with tools, and material constraints.",
    ],
    media: [
      page(23, "John Muir's Rest Cedar Key design-build", "John Muir's Rest — design-build meditation and seating area at Cemetery Point Park."),
    ],
  },
  "gas-works": {
    label: "Gas Works Park",
    description: [
      "A school hosting seven craft and fabrication shops on the Seattle waterfront, with emphasis on site analysis, program clarity, and designing from the inside out.",
      "Partial separation of structure creates access points, overhangs over water, and spatial release. Sections and collages develop an architectural grammar of stone, wood, metal, textile, color, clay, and glass workshops.",
    ],
    media: [
      page(24, "Gas Works Park site analysis and program fragments", "Gas Works Park — elasticity of function, viewport diagrams, spatial overlaps, and material-program fragments."),
      page(25, "Gas Works Park sections and spatial sequence", "Gas Works Park — sections A through E studying water, ground, street, and subtractive relief drawing."),
      page(26, "Gas Works Park floor plans", "Gas Works Park — second, first, and ground floor plans with workshop and breakout program key."),
      page(27, "Gas Works Park sketch model and material studies", "Gas Works Park — ground-scaping model, excavation and landscape studies, and Bauhaus discipline mapping."),
    ],
  },
  "wedged-fissures": {
    label: "Wedged Fissures",
    description: [
      "An investigation in construction methods, materiality, joinery, and failure—iteratively testing concrete ratios, molds, textures, and fastening techniques.",
      "The final casting produced an interesting play of shadows; wood-to-concrete construction proved structurally strong despite scale-change alignment challenges.",
    ],
    media: [
      page(28, "Wedged Fissures concrete casting study", "Wedged Fissures — texture studies, mechanical spine, formwork and bracing, and final casting."),
    ],
  },
  "manhattan-block": {
    label: "Manhattan Block",
    description: [
      "Analysis of Chelsea brownstones and gallery buildings, clashing residential towers, galleries, and brownstones using methods inspired by Bernard Tschumi's Manhattan Transcripts.",
      "Two megacuts slice through the block center, revealing interior activity and admitting natural light. A dark courtyard celebrates intensity with artificial glow.",
    ],
    media: [
      page(29, "Manhattan Block density and building strategies", "Manhattan Block — site analysis, density calculations, and context-influenced block strategies."),
      page(30, "Manhattan Block envelope and structure", "Manhattan Block — outer envelope, unit shells, primary structure, screened mesh, and column framework."),
      page(31, "Manhattan Block megacuts and courtyard", "Manhattan Block — megacut sections revealing worker, family, and student pocket spaces across intensity zones."),
    ],
  },
  "abstracted-tower": {
    label: "Abstracted Tower",
    description: [
      "An interpretation of dreams as a revealing element of the unconscious mind—creating moments of detachment and transitional space between three components.",
      "Repression and penetration form a network between localities; the unconscious moment receives greater hierarchy, occupancy, and articulation as context shifts elevation and placement.",
    ],
    media: [
      page(32, "Abstracted Tower sectional study Dubai", "Abstracted Tower — diagrammatic process, sectional study, and analytical construct."),
      page(33, "Abstracted Tower diagrammatic process", "Abstracted Tower — dream, unconscious, and transitional space diagrammatic development."),
    ],
  },
  "polar-shelter": {
    label: "Polar Shelter",
    description: [
      "Temporal occupation responding to Tromsø site and climate, using snow-fence characteristics to filter snow drifts, wind, and horizontal shift.",
      "Architectural indexing assigned verbs to line abstractions—flutter, jump, dance, run, march, skip—to inform envelope control, filtered views, and moments of pause.",
    ],
    media: [
      page(34, "Polar Shelter Tromsø wind and husky pens", "Polar Shelter — wind diagram, measure and contour studies, and sleeping spaces."),
      page(35, "Polar Shelter process relief drawing", "Polar Shelter — process relief drawing and verb-based line abstraction indexing."),
      page(36, "Polar Shelter thickened vertical mass", "Polar Shelter — thickened vertical mass, contouring threshold, and spatial studies betwixt and between."),
    ],
  },
  "construct-sequence": {
    label: "Construct + Sequence",
    description: [
      "Urban fragment study between programmatic components, inspired by Lebbeus Woods' scab, scar, and injection construction forms woven into sites of destruction.",
      "A chapel uses scab as enclosed meditation; a library adopts scar to fuse old and new; the courtyard explores injection as a space within a space connecting the fragments.",
    ],
    media: [
      page(37, "Construct + Sequence urban exploration", "Construct + Sequence — Lebbeus Woods research and urban fragment site analysis."),
      page(38, "Construct + Sequence chapel and library", "Construct + Sequence — scab meditation spaces, scar library public-private relationship, and site intervention."),
      page(39, "Construct + Sequence courtyard injection", "Construct + Sequence — courtyard injection space, circulation, and programmatic composition on the grid."),
    ],
  },
  "bench-scape": {
    label: "Bench-scape",
    description: [
      "A bench-scape reflecting full-scale on-site design with community involvement between Design 08 studio, UF's Field and Fork group, and archaeology students.",
      "The process included detailing, intensive site analysis, materials and building systems analysis, and design charrettes to stimulate communal space for Field and Fork events.",
    ],
    media: [
      page(40, "Bench-scape Field and Fork community project", "Bench-scape — on-site design-build bench landscape for communal gathering."),
    ],
  },
  "fort-island": {
    label: "Fort Island Chapel",
    description: [
      "A self-sustaining, adaptive structure for Fort Island Trail Beach's open landscape and extreme weather. Coastal surface conditions and textures inform a parametric envelope.",
      "Folding surfaces wrap a skewed volume; the parametric skin responds to views, prevailing winds, and sun angles with components that open, close, and morph.",
    ],
    media: [
      page(41, "Fort Island Chapel parametric coastal pavilion", "Fort Island Chapel — section A, ribbed structure, layered skin, roofscape, and circulation."),
    ],
  },
  "artist-house": {
    label: "Artist's House + Shop",
    description: [
      "An artist house and fabrication shop off the Gainesville Railway producing carousel figure carvings—translating craftsmanship into detail-driven construction.",
      "A linear armature supports movement patterns around the activity; a vertical vessel acts as central organizer like a carousel center pole, with carving into the site embedding the structure.",
    ],
    media: [
      page(42, "Artist's House + Shop site and process analysis", "Artist's House + Shop — human versus mechanical process, site analysis, and person-movement-time diagrams."),
      page(43, "Artist's House + Shop section and diagram", "Artist's House + Shop — section A and diagrammatic process of artist craft with radial-linear axis negotiation."),
    ],
  },
  "charleston-theater": {
    label: "Charleston Theater",
    description: [
      "Charleston's varied, contained spaces connect seamlessly to the larger whole. The theater operates around receiving contextual and cultural qualities while holding its place with a quiet façade and accentuated form.",
      "A wrapping ribbed structure creates shifting light conditions; a two-storey waterfall and green wall capture Charleston's calming in-between spaces.",
    ],
    media: [
      page(44, "Charleston Theater urban fabric study", "Charleston Theater — spatial density, organization, urban fabric, and composition studies."),
      page(45, "Charleston Theater plans and lobby perspective", "Charleston Theater — first, second, and third floor plans with program key and lobby perspective."),
    ],
  },
};

function combineProjects(title, projectKeys, intro) {
  const description = intro ? [intro] : [];
  projectKeys.forEach((key) => {
    const project = PROJECTS[key];
    project.description.forEach((paragraph, i) => {
      description.push(
        i === 0
          ? `<strong>${project.label}.</strong> ${paragraph}`
          : paragraph
      );
    });
  });

  return {
    title,
    description,
    media: projectKeys.flatMap((key) => PROJECTS[key].media),
  };
}

const CONTENT = {
  "olson-kundig": combineProjects(
    "Mountain Resort Hospitality (<a href=\"https://www.olsonkundig.com/\" target=\"_blank\" rel=\"noreferrer\" class=\"detail-company-link\">Olson Kundig</a>)",
    ["telluride", "homewood", "moonlight"],
    "Ski-resort hotels, branded residences, and cabins across Telluride, Lake Tahoe, and Big Sky—drawings from concept through construction documentation."
  ),
  nbbj: combineProjects(
    "Healthcare (<a href=\"https://www.nbbj.com/\" target=\"_blank\" rel=\"noreferrer\" class=\"detail-company-link\">NBBJ</a>)",
    ["ucsf-transplant", "ucsf-medsurg"],
    "Healthcare interiors and patient environments at UCSF in San Francisco, including transplant center renovation and a med-surg floor patient room of the future."
  ),
  moa: combineProjects(
    "Dwelling &amp; Place-Making (<a href=\"https://www.moaarch.com/\" target=\"_blank\" rel=\"noreferrer\" class=\"detail-company-link\">MOA Architecture</a>)",
    ["the-box", "shea-brewery", "living-core"],
    "Residential, commercial, and conceptual work in Colorado—a cliffside retreat, neighborhood brewery and plaza, and adaptable housing inspired by pine-cone biology."
  ),
  uf: combineProjects(
    "Design Studio Work (<a href=\"https://www.ufl.edu/\" target=\"_blank\" rel=\"noreferrer\" class=\"detail-company-link\">University of Florida</a>)",
    [
      "nine-yards",
      "light-pavilion",
      "stair-fragment",
      "decay-survival",
      "john-muir",
      "gas-works",
      "wedged-fissures",
      "manhattan-block",
      "abstracted-tower",
      "polar-shelter",
      "construct-sequence",
      "bench-scape",
      "fort-island",
      "artist-house",
      "charleston-theater",
    ],
    "Fifteen academic studios spanning urban design, materials and assembly, landscape and climate, design-build, and program-driven architecture."
  ),
};

const detailEl = document.getElementById("detail");
const detailTitle = document.getElementById("detailTitle");
const mediaImg = document.getElementById("mediaImg");
const mediaCaption = document.getElementById("mediaCaption");
const detailBody = document.getElementById("detailBody");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const backTopFloat = document.getElementById("backTopFloat");
const emailLink = document.querySelector(".email-link");

let active = null;
let index = 0;
let currentDomain = null;

function renderDetail(key) {
  active = CONTENT[key];
  index = 0;
  currentDomain = key;

  detailTitle.innerHTML = active.title;

  const m = active.media[index];
  loadProgressive(mediaImg, {
    lqip: m.lqip,
    preview: m.preview,
    full: m.src,
  });
  mediaImg.alt = m.alt;
  mediaCaption.innerHTML = m.caption;

  const preloadRemaining = () => {
    active.media.forEach((item, i) => {
      if (i !== index && item.preview) {
        preloadImage(item.preview).catch(() => {});
      }
    });
  };

  if (window.requestIdleCallback) {
    requestIdleCallback(preloadRemaining, { timeout: 1000 });
  } else {
    setTimeout(preloadRemaining, 0);
  }

  prevBtn.disabled = false;
  nextBtn.disabled = false;

  detailBody.innerHTML = active.description.map((p) => `<p>${p}</p>`).join("");

  const detailHeight = Math.max(1600, 400 + active.description.length * 40);
  if (!detailEl.classList.contains("open")) {
    detailEl.style.maxHeight = "0px";
    detailEl.classList.add("open");
    requestAnimationFrame(() => {
      detailEl.style.maxHeight = `${detailHeight}px`;
    });
  } else {
    detailEl.style.maxHeight = `${detailHeight}px`;
  }

  document.querySelectorAll("button[data-domain]").forEach((btn) => {
    btn.setAttribute("aria-expanded", String(btn.dataset.domain === key));
  });

  setTimeout(() => {
    detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

function closeDetail() {
  if (!detailEl.classList.contains("open")) return;

  detailEl.style.maxHeight = "0px";
  detailEl.classList.remove("open");

  document.querySelectorAll("button[data-domain]").forEach((btn) => {
    btn.setAttribute("aria-expanded", "false");
  });

  setTimeout(() => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 600;

    function scrollToTop(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentPosition = startPosition * (1 - easeOutCubic);
      window.scrollTo(0, currentPosition);
      if (progress < 1) requestAnimationFrame(scrollToTop);
    }

    requestAnimationFrame(scrollToTop);
  }, 60);

  active = null;
  currentDomain = null;
  index = 0;
}

function updateMedia(delta) {
  if (!active) return;
  const len = active.media.length;
  index = (index + delta + len) % len;
  const m = active.media[index];
  loadProgressive(mediaImg, {
    lqip: m.lqip,
    preview: m.preview,
    full: m.src,
  });
  mediaImg.alt = m.alt;
  mediaCaption.innerHTML = m.caption;
}

document.querySelectorAll(".grid").forEach((grid) => {
  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-domain]");
    if (!btn) return;

    if (currentDomain === btn.dataset.domain && detailEl.classList.contains("open")) {
      closeDetail();
    } else {
      renderDetail(btn.dataset.domain);
    }
  });
});

prevBtn.addEventListener("click", () => updateMedia(-1));
nextBtn.addEventListener("click", () => updateMedia(1));

document.addEventListener("keydown", (e) => {
  if (!detailEl.classList.contains("open")) return;
  if (e.key === "ArrowLeft") updateMedia(-1);
  if (e.key === "ArrowRight") updateMedia(1);
});

emailLink.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = "jamiemarchini@outlook.com";

  try {
    await navigator.clipboard.writeText(email);
    emailLink.classList.add("copied");
    setTimeout(() => emailLink.classList.remove("copied"), 1700);
  } catch (err) {
    console.error("Failed to copy email:", err);
  }
});

backTopFloat.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  const y = window.scrollY || document.documentElement.scrollTop;
  if (y > 0) backTopFloat.classList.add("show");
  else backTopFloat.classList.remove("show");
});

prevBtn.disabled = false;
nextBtn.disabled = false;

document.querySelectorAll(".card-thumb img[data-src-full]").forEach((img) => {
  loadProgressive(img, cardTiers(img.dataset.srcFull), { finalTier: "thumb" });
});

export const business = {
  name: "SteelStud.ca",
  phone: "604-761-1518",
  phoneHref: "+16047611518",
  email: "frameinsteel@gmail.com",
  yearsSteel: 16,
  yearsContracting: 35,
};

export const services = [
  { slug: "framing-in-steel", name: "Steel Stud Framing", short: "Interior steel stud walls, bulkheads, backing and architectural assemblies built straight, strong and ready for finishing.", image: "service-steel.png", details: ["Commercial partitions and demising walls", "Condominium and strata renovations", "Bulkheads, soffits and ceiling features", "Backing, blocking and service coordination"] },
  { slug: "drywall", name: "Drywall Installation & Finishing", short: "Boarding, taping, finishing and repairs for renovations, offices, retail and multi-unit residential properties.", image: "service-drywall.png", details: ["Standard and fire-rated assemblies", "Level 4 and Level 5 finishing", "Patches and water-damage repairs", "Texture matching and smooth ceilings"] },
  { slug: "t-bar", name: "T-Bar & Suspended Ceilings", short: "Accessible acoustic ceiling systems for offices, retail, institutional and commercial interiors.", image: "service-tbar.png", details: ["Grid layout and installation", "Acoustic ceiling panels", "Lighting and mechanical coordination", "Repairs and tile replacement"] },
  { slug: "drop-ceilings", name: "Dropped Drywall Ceilings", short: "Custom framed ceiling drops and cloud features that create clean space for lighting, services and architectural detail.", image: "service-drop-ceilings.png", details: ["Recessed-lighting ceiling drops", "Cloud and tray ceilings", "Mechanical-service concealment", "Steel framing and drywall finish"] },
  { slug: "tenant-improvements", name: "Tenant Improvements", short: "Interior construction for offices, retail and mixed-use spaces, coordinated from framing through final finish.", image: "service-tenant-improvements.png", details: ["Office and retail partitions", "Ceilings and drywall", "Occupied-building coordination", "Deficiency and turnover work"] },
  { slug: "office-buildouts", name: "Office Buildouts", short: "Practical, durable office interiors for corporate, medical, technology and professional-service environments.", image: "service-tenant-improvements.png", details: ["Private offices and meeting rooms", "Reception and common areas", "Acoustic ceiling systems", "Phased and occupied renovations"] },
  { slug: "framing-in-wood", name: "Wood Framing", short: "Precise wood framing for interior renovations, backing, partitions and residential construction details.", image: "service-wood.png", details: ["Interior partitions", "Backing and blocking", "Renovation framing", "Ceiling and feature framing"] },
  { slug: "architectural-steel", name: "Architectural Steel", short: "Custom steel features and structural details coordinated with modern interior design.", image: "service-architectural-steel.png", details: ["Feature framing", "Custom supports", "Interior architectural details", "Trade coordination"] },
  { slug: "smoothing-ceilings", name: "Ceiling Smoothing", short: "Removal and refinishing of outdated textured ceilings for a clean, modern appearance.", image: "service-smoothing.png", details: ["Texture removal", "Surface preparation", "Skim coating", "Smooth final finish"] },
  { slug: "texture", name: "Wall & Ceiling Textures", short: "Professional texture application and matching for repairs, renovations and new construction.", image: "service-texture.png", details: ["Knockdown texture", "Orange peel", "Texture matching", "Repair blending"] },
  { slug: "repairs", name: "Drywall & Framing Repairs", short: "Careful repair of damaged drywall, framing and ceiling systems with clean integration into existing finishes.", image: "service-repairs.png", details: ["Water-damage repairs", "Drywall patches", "Framing corrections", "Ceiling repairs"] },
  { slug: "home-improvement", name: "Interior Home Improvements", short: "Interior renovation work backed by decades of general contracting and problem-solving experience.", image: "service-home-improvement.png", details: ["Condominium renovations", "Interior reconfiguration", "Ceiling upgrades", "Framing and drywall packages"] },
];

export const cities = [
  ["vancouver", "Vancouver", "Downtown towers, older West Side homes and East Vancouver mixed-use properties require careful access, noise and parking coordination."],
  ["burnaby", "Burnaby", "High-rise strata, Metrotown renovations and Brentwood commercial interiors benefit from organized deliveries and occupied-building planning."],
  ["new-westminster", "New Westminster", "Heritage buildings, compact sites and condominium renovations often demand custom ceiling and framing solutions."],
  ["richmond", "Richmond", "Retail, light-industrial and multi-unit projects require moisture-aware assemblies and dependable trade coordination."],
  ["surrey", "Surrey", "Growing commercial centres and multi-unit communities need scalable framing, drywall and ceiling crews."],
  ["delta", "Delta", "Industrial, commercial and residential interiors across North Delta, Ladner and Tsawwassen receive practical, site-specific planning."],
  ["white-rock", "White Rock", "Condominium and residential renovations require tidy work, careful access and respect for occupied buildings."],
  ["coquitlam", "Coquitlam", "High-rise development, retail and established residential properties create a broad mix of interior construction needs."],
  ["port-coquitlam", "Port Coquitlam", "Commercial units, industrial spaces and family homes receive durable framing and finish packages."],
  ["port-moody", "Port Moody", "Condominium growth and hillside homes call for precise interior assemblies and controlled logistics."],
  ["north-vancouver", "North Vancouver", "Sloped sites, high-value homes and strata buildings require careful planning, access and finish quality."],
  ["west-vancouver", "West Vancouver", "Custom residences and premium renovations demand exact tolerances, clean sites and immaculate finishes."],
  ["langley", "Langley", "Rapidly growing commercial, strata and residential areas need reliable crews across Langley City and Township."],
  ["maple-ridge", "Maple Ridge", "Residential growth and commercial interiors require flexible framing and drywall solutions."],
  ["pitt-meadows", "Pitt Meadows", "Commercial, agricultural and residential properties benefit from straightforward scheduling and durable assemblies."],
  ["abbotsford", "Abbotsford", "Fraser Valley commercial, multi-family and residential projects are supported with coordinated interior construction."],
].map(([slug,name,local]) => ({slug,name,local}));

export const projects = [
  { title: "New Westminster condominium dropped ceiling", image: "service-drop-ceilings.png", text: "A steel-stud and drywall ceiling drop created a clean cavity for recessed lighting and building services while preserving usable ceiling height." },
  { title: "Custom suspended cloud ceiling", image: "hero-home-wide.png", text: "A suspended steel-stud framework formed a precise architectural ceiling feature, then received drywall and a smooth finish." },
  { title: "Suspended T-bar acoustic ceiling", image: "real-tbar-ceiling-example.jpg", text: "A serviceable acoustic grid ceiling provided clean access to lighting and mechanical systems for a commercial interior." },
];

import {readFile,writeFile,cp} from 'node:fs/promises';
import {join} from 'node:path';

// Publication dates are editorial records, never the build timestamp.
const notes=[
 {slug:'vestibule-opening-review-rambo-burnaby',date:'2026-11-02',label:'November 2, 2026',title:'Vestibule openings: review the frame before boarding',description:'Two credited Rambo archive views from Burnaby General Hospital organise the review of an opening, its overhead frame and the next trade’s scope.',image:'vestibule-openings/share.jpg',alt:'SteelStud.ca vestibule opening field note, with Rambo project photography'},
 {slug:'commercial-demising-walls-ceiling-interfaces',date:'2026-10-27',label:'October 27, 2026',title:'Demising walls and ceilings: read the interfaces before close-in',description:'Credited Rambo project photographs support a review of wall lines, ceiling edges and installation handoffs.',image:'commercial-demising-walls-ceiling-interfaces-share.jpg',alt:'Demising-wall and ceiling-interface field note'},
 {slug:'commercial-bulkheads-grid-overhead-coordination',date:'2026-10-21',label:'October 21, 2026',title:'Commercial bulkheads and ceiling grids: coordinate before close-in',description:'Construction-stage photographs connect framing lines, ceiling levels and overhead services.',image:'commercial-bulkheads-grid-overhead-coordination-share.jpg',alt:'Bulkhead and overhead coordination field note'},
];
export async function publishFieldNotes({root,dist,page,emit}){
 for(const note of notes)await cp(join(root,'blog',note.slug),join(dist,'blog',note.slug),{recursive:true});
 const cards=notes.map(n=>`<article class="card"><a href="/blog/${n.slug}"><img src="/images/field-notes/${n.image}" alt="${n.alt}" width="1200" height="630" loading="lazy" style="width:100%;height:auto;aspect-ratio:1200/630;object-fit:contain;background:#10242b"></a><div class="card-body"><p><time datetime="${n.date}">${n.label}</time></p><h3><a href="/blog/${n.slug}">${n.title}</a></h3><p>${n.description}</p></div></article>`).join('');
 const section=`<section class="section" id="latest-field-notes"><div class="wrap"><div class="eyebrow">SteelStud.ca field notes</div><h2>Latest articles</h2><p>Latest article published: <time datetime="${notes[0].date}">${notes[0].label}</time></p><div class="grid">${cards}</div><p><a href="/blog">All field notes →</a></p></div></section>`;
 const hp=join(dist,'index.html');let home=await readFile(hp,'utf8');
 home=home.replace(/<section aria-label="Latest project planning story"[\s\S]*?<\/section>/,'').replace(/<section data-rambo-oct27="true"[\s\S]*?<\/section>/,'');
 home=home.replace('</main>',section+'</main>').replace('</head>','<link rel="alternate" type="application/rss+xml" title="SteelStud.ca field notes" href="/feed.xml"></head>');await writeFile(hp,home);
 await emit('/blog',page({path:'/blog',title:'Project field notes | SteelStud.ca',description:'Dated SteelStud.ca field notes with credited framing, wall and ceiling project photography.',body:`<section class="section"><div class="wrap"><div class="eyebrow">SteelStud.ca editorial archive</div><h1>Project field notes</h1><p>Practical project reviews, with the photographed work credited to its performing business.</p><div class="grid">${cards}</div></div></section>`}));
 const archive=join(dist,'blog/index.html');await writeFile(archive,(await readFile(archive,'utf8')).replace('</head>','<link rel="alternate" type="application/rss+xml" title="SteelStud.ca field notes" href="/feed.xml"></head>'));
 const xmlEscape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 await writeFile(join(dist,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>SteelStud.ca field notes</title><link>https://www.steelstud.ca/blog</link><description>Credited framing, wall and ceiling project field notes.</description>${notes.map(n=>`<item><title>${xmlEscape(n.title)}</title><link>https://www.steelstud.ca/blog/${n.slug}</link><guid isPermaLink="true">https://www.steelstud.ca/blog/${n.slug}</guid><description>${xmlEscape(n.description)}</description><dc:date>${n.date}</dc:date></item>`).join('')}</channel></rss>`);
 // Preserve previously recorded lastmod dates across unchanged historical routes.
 const historical=await readFile(join(root,'sitemap.xml'),'utf8');
 const dates=new Map([...historical.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(m=>[m[1],m[2]]));
 const sm=join(dist,'sitemap.xml');let xml=await readFile(sm,'utf8');
 xml=xml.replace(/<url><loc>([^<]+)<\/loc><lastmod>[^<]+<\/lastmod>/g,(tag,url)=>dates.has(url)?`<url><loc>${url}</loc><lastmod>${dates.get(url)}</lastmod>`:tag);
 xml=xml.replace('<loc>https://www.steelstud.ca/</loc><lastmod>'+dates.get('https://www.steelstud.ca/')+'</lastmod>',`<loc>https://www.steelstud.ca/</loc><lastmod>${notes[0].date}</lastmod>`).replace('</urlset>',`<url><loc>https://www.steelstud.ca/blog/${notes[0].slug}</loc><lastmod>${notes[0].date}</lastmod></url><url><loc>https://www.steelstud.ca/blog</loc><lastmod>${notes[0].date}</lastmod></url></urlset>`);
 await writeFile(sm,xml);
 const configPath=join(root,'vercel.json'),config=JSON.parse(await readFile(configPath,'utf8'));
 config.rewrites=[{source:'/blog/'+notes[0].slug,destination:'/blog/'+notes[0].slug+'/index.html'},...(config.rewrites||[])];
 await writeFile(configPath,JSON.stringify(config,null,2)+'\n');
}

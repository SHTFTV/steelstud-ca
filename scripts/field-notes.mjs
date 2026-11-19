import {readFile,writeFile,cp} from 'node:fs/promises';
import {join} from 'node:path';
import {guides} from '../src/site-data.mjs';

// Publication dates are editorial records, never the build timestamp.
const notes=[
 {slug:'vestibule-opening-review-rambo-burnaby',date:'2026-11-02',label:'November 2, 2026',title:'Vestibule openings: review the frame before boarding',description:'Two credited Rambo archive views from Burnaby General Hospital organise the review of an opening, its overhead frame and the next trade’s scope.',image:'vestibule-openings/share.jpg',alt:'SteelStud.ca vestibule opening field note, with Rambo project photography'},
 {slug:'commercial-demising-walls-ceiling-interfaces',date:'2026-10-27',label:'October 27, 2026',title:'Demising walls and ceilings: read the interfaces before close-in',description:'Credited Rambo project photographs support a review of wall lines, ceiling edges and installation handoffs.',image:'commercial-demising-walls-ceiling-interfaces-share.jpg',alt:'Demising-wall and ceiling-interface field note'},
 {slug:'commercial-bulkheads-grid-overhead-coordination',date:'2026-10-21',label:'October 21, 2026',title:'Commercial bulkheads and ceiling grids: coordinate before close-in',description:'Construction-stage photographs connect framing lines, ceiling levels and overhead services.',image:'commercial-bulkheads-grid-overhead-coordination-share.jpg',alt:'Bulkhead and overhead coordination field note'},
];
const dateLabel=value=>new Date(value).toLocaleDateString('en-US',{timeZone:'America/Los_Angeles',year:'numeric',month:'long',day:'numeric'});
const escapeHtml=value=>String(value).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const noteArticles=notes.map(n=>({...n,path:`/blog/${n.slug}`,image:`/images/field-notes/${n.image}`,kind:'Field note'}));
// Only guides with a recorded publication receipt enter the dated discovery list.
const guideArticles=guides.filter(g=>g.publishedAt).map(g=>({
 slug:g.slug,path:`/guides/${g.slug}`,date:g.publishedAt,label:dateLabel(g.publishedAt),
 title:g.title,description:g.intro,image:`/images/${g.image}`,alt:g.title,kind:'Guide',
}));
const articles=[...noteArticles,...guideArticles].sort((a,b)=>new Date(b.date)-new Date(a.date));
const articleCards=items=>items.map(n=>`<article class="card"><a href="${n.path}"><img src="${n.image}" alt="${escapeHtml(n.alt)}" width="1200" height="630" loading="lazy" style="width:100%;height:auto;aspect-ratio:1200/630;object-fit:contain;background:#10242b"></a><div class="card-body"><p>${n.kind} · <time datetime="${n.date}">${n.label}</time></p><h3><a href="${n.path}">${escapeHtml(n.title)}</a></h3><p>${escapeHtml(n.description)}</p></div></article>`).join('');
export async function publishFieldNotes({root,dist,page,emit}){
 for(const note of notes)await cp(join(root,'blog',note.slug),join(dist,'blog',note.slug),{recursive:true});
 const cards=articleCards(noteArticles),latest=articles[0];
 const section=`<section class="section" id="latest-field-notes"><div class="wrap"><div class="eyebrow">SteelStud.ca guides &amp; field notes</div><h2>Latest articles</h2><p>Latest article published: <time datetime="${latest.date}">${latest.label}</time></p><div class="grid">${articleCards(articles.slice(0,3))}</div><p><a href="/blog">All field notes →</a> · <a href="/guides">All guides →</a></p></div></section>`;
 const hp=join(dist,'index.html');let home=await readFile(hp,'utf8');
 home=home.replace(/<section aria-label="Latest project planning story"[\s\S]*?<\/section>/,'').replace(/<section data-rambo-oct27="true"[\s\S]*?<\/section>/,'');
 home=home.replace('</main>',section+'</main>').replace('</head>','<link rel="alternate" type="application/rss+xml" title="SteelStud.ca articles" href="/feed.xml"></head>');await writeFile(hp,home);
 await emit('/blog',page({path:'/blog',title:'Project field notes | SteelStud.ca',description:'Dated SteelStud.ca field notes with credited framing, wall and ceiling project photography.',body:`<section class="section"><div class="wrap"><div class="eyebrow">SteelStud.ca editorial archive</div><h1>Project field notes</h1><p>Practical project reviews, with the photographed work credited to its performing business.</p><div class="grid">${cards}</div></div></section>`}));
 const archive=join(dist,'blog/index.html');await writeFile(archive,(await readFile(archive,'utf8')).replace('</head>','<link rel="alternate" type="application/rss+xml" title="SteelStud.ca articles" href="/feed.xml"></head>'));
 const xmlEscape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 await writeFile(join(dist,'feed.xml'),`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"><channel><title>SteelStud.ca articles</title><link>https://www.steelstud.ca/#latest-field-notes</link><description>Construction guides and credited framing, wall and ceiling project field notes.</description>${articles.map(n=>`<item><title>${xmlEscape(n.title)}</title><link>https://www.steelstud.ca${n.path}</link><guid isPermaLink="true">https://www.steelstud.ca${n.path}</guid><description>${xmlEscape(n.description)}</description><category>${n.kind}</category><dc:date>${n.date}</dc:date>${n.kind==='Guide'?`<pubDate>${new Date(n.date).toUTCString()}</pubDate>`:''}</item>`).join('')}</channel></rss>`);
 // Preserve previously recorded lastmod dates across unchanged historical routes.
 const historical=await readFile(join(root,'sitemap.xml'),'utf8');
 const dates=new Map([...historical.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map(m=>[m[1],m[2]]));
 const sm=join(dist,'sitemap.xml');let xml=await readFile(sm,'utf8');
 xml=xml.replace(/<url><loc>([^<]+)<\/loc><lastmod>[^<]+<\/lastmod>/g,(tag,url)=>dates.has(url)?`<url><loc>${url}</loc><lastmod>${dates.get(url)}</lastmod>`:tag);
 xml=xml.replace('<loc>https://www.steelstud.ca/</loc><lastmod>'+dates.get('https://www.steelstud.ca/')+'</lastmod>',`<loc>https://www.steelstud.ca/</loc><lastmod>${latest.date.slice(0,10)}</lastmod>`).replace('</urlset>',`<url><loc>https://www.steelstud.ca/blog/${notes[0].slug}</loc><lastmod>${notes[0].date}</lastmod></url><url><loc>https://www.steelstud.ca/blog</loc><lastmod>${notes[0].date}</lastmod></url></urlset>`);
 await writeFile(sm,xml);
 const configPath=join(root,'vercel.json'),config=JSON.parse(await readFile(configPath,'utf8'));
 config.rewrites=[{source:'/blog/'+notes[0].slug,destination:'/blog/'+notes[0].slug+'/index.html'},...(config.rewrites||[])];
 await writeFile(configPath,JSON.stringify(config,null,2)+'\n');
}

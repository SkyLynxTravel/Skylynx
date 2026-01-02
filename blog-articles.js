const blogArticles=[
{id:1,slug:'luxury-travel-guide-ottawa-canada',title:'Luxury Travel Guide to Ottawa 2026',category:'Destinations',categoryIcon:'🍁',excerpt:'Discover Ottawa luxury hotels, dining, and exclusive experiences.',image:'https://images.unsplash.com/photo-1578831812483-ecf3f0489c38?auto=format&fit=crop&q=80&w=800',date:'2026-01-12',readTime:'15 min',featured:true},
{id:2,slug:'luxury-travel-dubai-2026',title:'Complete Guide to Luxury Travel in Dubai 2026',category:'Destinations',categoryIcon:'⭐',excerpt:'Best luxury hotels, Michelin restaurants in Dubai.',image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',date:'2026-01-01',readTime:'12 min',featured:false},
{id:3,slug:'free-flight-upgrades-secrets',title:'10 Ways to Get Free Flight Upgrades',category:'Travel Tips',categoryIcon:'💰',excerpt:'Insider secrets to score free upgrades.',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',date:'2026-01-03',readTime:'8 min',featured:true},
{id:4,slug:'luxury-hotels-paris-2026',title:'Top Luxury Hotels in Paris 2026',category:'Hotels',categoryIcon:'🏨',excerpt:'Top 10 finest hotels in Paris.',image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',date:'2026-01-02',readTime:'10 min',featured:false},
{id:5,slug:'luxury-travel-tokyo-guide',title:'Ultimate Luxury Travel Guide to Tokyo 2026',category:'Destinations',categoryIcon:'🗾',excerpt:'Tokyo tradition meets innovation.',image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',date:'2026-01-04',readTime:'14 min',featured:false},
{id:6,slug:'canadian-rockies-luxury-resorts',title:'Luxury Resorts in Canadian Rockies',category:'Hotels',categoryIcon:'🏔️',excerpt:'Mountain resorts in Banff, Jasper, Lake Louise.',image:'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=800',date:'2026-01-14',readTime:'13 min',featured:false}
];

function displayBlogArticles(){
const container=document.getElementById('blog-grid');
if(!container)return;
container.innerHTML=blogArticles.slice(0,6).map(a=>`
<article class="blog-card" onclick="window.location.href='article.html?slug=${a.slug}'">
<div class="blog-image" style="background-image:url('${a.image}')">
${a.featured?'<span class="blog-badge featured">⭐ Featured</span>':''}
</div>
<div class="blog-content">
<div class="blog-category">${a.categoryIcon} ${a.category}</div>
<h3 class="blog-title">${a.title}</h3>
<p class="blog-excerpt">${a.excerpt}</p>
<div class="blog-meta">
<span><i class="far fa-calendar"></i> ${new Date(a.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
<span><i class="far fa-clock"></i> ${a.readTime}</span>
</div>
</div>
</article>
`).join('');
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',displayBlogArticles);
}else{
displayBlogArticles();
}

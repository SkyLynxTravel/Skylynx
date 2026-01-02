const blogArticles=[
{id:1,slug:'luxury-travel-guide-ottawa-canada',title:'Luxury Travel Guide to Ottawa 2026',titleAr:'دليل السفر الفاخر إلى أوتاوا 2026',category:'Destinations',categoryAr:'وجهات سفر',categoryIcon:'🍁',excerpt:'Discover Ottawa luxury hotels, dining, and exclusive experiences.',excerptAr:'اكتشف فنادق أوتاوا الفاخرة والطعام والتجارب الحصرية.',image:'https://images.unsplash.com/photo-1578831812483-ecf3f0489c38?auto=format&fit=crop&q=80&w=800',date:'2026-01-12',readTime:'15 min',readTimeAr:'15 دقيقة',featured:true},
{id:2,slug:'luxury-travel-dubai-2026',title:'Complete Guide to Luxury Travel in Dubai 2026',titleAr:'دليل دبي الكامل 2026',category:'Destinations',categoryAr:'وجهات سفر',categoryIcon:'⭐',excerpt:'Best luxury hotels and Michelin restaurants in Dubai.',excerptAr:'أفضل الفنادق الفاخرة ومطاعم ميشلان في دبي.',image:'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',date:'2026-01-01',readTime:'12 min',readTimeAr:'12 دقيقة',featured:false},
{id:3,slug:'free-flight-upgrades-secrets',title:'10 Ways to Get Free Flight Upgrades',titleAr:'10 طرق للحصول على ترقيات مجانية',category:'Travel Tips',categoryAr:'نصائح سفر',categoryIcon:'💰',excerpt:'Insider secrets to score free upgrades to business or first class.',excerptAr:'أسرار داخلية للحصول على ترقيات مجانية لدرجة الأعمال أو الأولى.',image:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',date:'2026-01-03',readTime:'8 min',readTimeAr:'8 دقائق',featured:true},
{id:4,slug:'luxury-hotels-paris-2026',title:'Top 10 Luxury Hotels in Paris 2026',titleAr:'أفضل 10 فنادق فاخرة في باريس 2026',category:'Hotels',categoryAr:'فنادق',categoryIcon:'🏨',excerpt:'Discover the finest luxury hotels in Paris.',excerptAr:'اكتشف أفضل الفنادق الفاخرة في باريس.',image:'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',date:'2026-01-02',readTime:'10 min',readTimeAr:'10 دقائق',featured:false},
{id:5,slug:'luxury-travel-tokyo-guide',title:'Ultimate Luxury Travel Guide to Tokyo 2026',titleAr:'دليل طوكيو الفاخر الشامل 2026',category:'Destinations',categoryAr:'وجهات سفر',categoryIcon:'🗾',excerpt:'Tokyo tradition meets futuristic innovation.',excerptAr:'طوكيو حيث التقاليد تلتقي بالابتكار المستقبلي.',image:'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',date:'2026-01-04',readTime:'14 min',readTimeAr:'14 دقيقة',featured:false},
{id:6,slug:'ai-travel-planning-future',title:'AI Revolution in Travel Planning',titleAr:'ثورة الذكاء الاصطناعي في تخطيط السفر',category:'AI Technology',categoryAr:'تقنية الذكاء الاصطناعي',categoryIcon:'💡',excerpt:'How AI is transforming luxury travel experiences.',excerptAr:'كيف يحول الذكاء الاصطناعي تجارب السفر الفاخر.',image:'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',date:'2026-01-15',readTime:'12 min',readTimeAr:'12 دقيقة',featured:false}
];

function displayBlogArticles(){
const container=document.getElementById('blog-grid');
if(!container)return;

const lang=localStorage.getItem('siteLang')||'en';

container.innerHTML=blogArticles.slice(0,6).map(a=>`
<div class="col-md-6 col-lg-4 mb-4">
<article class="blog-card h-100" onclick="window.location.href='article.html?slug=${a.slug}'" style="cursor:pointer">
<div class="blog-image" style="background-image:url('${a.image}');height:200px;background-size:cover;background-position:center;position:relative;border-radius:15px 15px 0 0">
${a.featured?'<span style="position:absolute;top:15px;right:15px;background:linear-gradient(135deg,#d4af37 0%,#f4d03f 100%);color:#00111c;padding:8px 20px;border-radius:25px;font-weight:700;font-size:0.9rem;box-shadow:0 4px 15px rgba(212,175,55,0.4)">⭐ Featured</span>':''}
</div>
<div class="blog-content" style="padding:25px;background:linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(0,166,251,0.05) 100%);border-radius:0 0 15px 15px">
<div class="blog-category" style="color:#00a6fb;font-size:0.95rem;margin-bottom:12px;font-weight:700">${a.categoryIcon} ${lang==='ar'?a.categoryAr:a.category}</div>
<h3 class="blog-title" style="font-family:'Cinzel',serif;font-size:1.3rem;margin-bottom:15px;color:white;line-height:1.4">${lang==='ar'?a.titleAr:a.title}</h3>
<p class="blog-excerpt" style="color:#e0e1dd;font-size:0.95rem;line-height:1.6;margin-bottom:20px">${lang==='ar'?a.excerptAr:a.excerpt}</p>
<div class="blog-meta" style="display:flex;gap:20px;font-size:0.85rem;color:#888;padding-top:15px;border-top:1px solid rgba(255,255,255,0.1)">
<span><i class="far fa-calendar" style="color:#00a6fb"></i> ${new Date(a.date).toLocaleDateString(lang==='ar'?'ar-SA':'en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
<span><i class="far fa-clock" style="color:#00a6fb"></i> ${lang==='ar'?a.readTimeAr:a.readTime}</span>
</div>
</div>
</article>
</div>
`).join('');
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',displayBlogArticles);
}else{
displayBlogArticles();
}

// إعادة تحميل عند تغيير اللغة
window.addEventListener('storage',function(e){
if(e.key==='siteLang'){
displayBlogArticles();
}
});

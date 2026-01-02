// SkyLynx Travel Blog Articles Data - 30 Articles
const blogArticles = [
  // Article 1 - Ottawa Guide (Featured)
  {
    id: 1,
    lang: 'en',
    slug: 'luxury-travel-guide-ottawa-canada',
    title: 'Luxury Travel Guide to Ottawa: Canada\'s Capital City 2026',
    category: 'Destinations',
    categoryIcon: '🍁',
    excerpt: 'Discover Ottawa\'s luxury hotels, fine dining, exclusive experiences, and hidden gems from our home base in Canada\'s capital.',
    image: 'https://images.unsplash.com/photo-1578831812483-ecf3f0489c38?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel - Ottawa Team',
    date: '2026-01-12',
    readTime: '15 min',
    featured: true,
    localExpertise: true
  },
  // Article 2 - Dubai
  {
    id: 2,
    lang: 'en',
    slug: 'luxury-travel-dubai-2026',
    title: 'Complete Guide to Luxury Travel in Dubai 2026',
    category: 'Destinations',
    categoryIcon: '⭐',
    excerpt: 'Discover the best luxury hotels, Michelin-star restaurants, and unique experiences in Dubai with exclusive tips.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-01',
    readTime: '12 min',
    featured: false
  },
  // Article 3 - Paris Hotels
  {
    id: 3,
    lang: 'en',
    slug: 'luxury-hotels-paris-2026',
    title: 'Top 10 Luxury Hotels in Paris 2026',
    category: 'Hotels',
    categoryIcon: '🏨',
    excerpt: 'Detailed review of the finest hotels in Paris. Compare services, locations, and amenities.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-02',
    readTime: '10 min',
    featured: false
  },
  // Article 4 - Flight Upgrades
  {
    id: 4,
    lang: 'en',
    slug: 'free-flight-upgrades-secrets',
    title: '10 Proven Ways to Get Free Flight Upgrades',
    category: 'Travel Tips',
    categoryIcon: '💰',
    excerpt: 'Learn insider secrets to score free upgrades to business or first class.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-03',
    readTime: '8 min',
    featured: true
  },
  // Article 5 - Tokyo
  {
    id: 5,
    lang: 'en',
    slug: 'luxury-travel-tokyo-guide',
    title: 'Ultimate Luxury Travel Guide to Tokyo 2026',
    category: 'Destinations',
    categoryIcon: '🗾',
    excerpt: 'Experience Tokyo\'s perfect blend of ancient tradition and futuristic innovation.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-04',
    readTime: '14 min',
    featured: false
  },
  // Article 6 - Canadian Rockies
  {
    id: 6,
    lang: 'en',
    slug: 'canadian-rockies-luxury-resorts',
    title: 'Luxury Resorts in the Canadian Rockies 2026',
    category: 'Hotels',
    categoryIcon: '🏔️',
    excerpt: 'Discover exclusive mountain resorts in Banff, Jasper, and Lake Louise.',
    image: 'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-14',
    readTime: '13 min',
    featured: false
  },
  // Article 7 - Group Travel
  {
    id: 7,
    lang: 'en',
    slug: 'group-travel-planning-guide',
    title: 'Complete Guide to Planning Luxury Group Travel',
    category: 'Group Travel',
    categoryIcon: '👥',
    excerpt: 'Expert tips for organizing unforgettable group trips and corporate retreats.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-05',
    readTime: '11 min',
    featured: false
  },
  // Article 8 - Best Time to Book
  {
    id: 8,
    lang: 'en',
    slug: 'best-time-book-flights-ai',
    title: 'AI-Powered Guide: Best Time to Book Flights 2026',
    category: 'Booking Tips',
    categoryIcon: '📊',
    excerpt: 'Save up to 60% on airfare with AI-driven booking insights.',
    image: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-06',
    readTime: '9 min',
    featured: false
  },
  // Article 9 - Maldives
  {
    id: 9,
    lang: 'en',
    slug: 'maldives-luxury-resorts-2026',
    title: '15 Best Luxury Resorts in Maldives 2026',
    category: 'Destinations',
    categoryIcon: '🏝️',
    excerpt: 'Exclusive overwater villas and private island resorts in paradise.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-07',
    readTime: '13 min',
    featured: false
  },
  // Article 10 - Private Jets
  {
    id: 10,
    lang: 'en',
    slug: 'private-jet-charter-guide',
    title: 'Complete Guide to Private Jet Charters 2026',
    category: 'Luxury Travel',
    categoryIcon: '✈️',
    excerpt: 'Everything about chartering private jets: types, pricing, and booking.',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-08',
    readTime: '12 min',
    featured: false
  },
  // Article 11 - London
  {
    id: 11,
    lang: 'en',
    slug: 'london-luxury-experiences',
    title: 'Exclusive Luxury Experiences in London 2026',
    category: 'Destinations',
    categoryIcon: '🇬🇧',
    excerpt: 'Private tours, afternoon tea at The Ritz, and London\'s hidden gems.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-09',
    readTime: '11 min',
    featured: false
  },
  // Article 12 - Travel Insurance
  {
    id: 12,
    lang: 'en',
    slug: 'luxury-travel-insurance-guide',
    title: 'Ultimate Guide to Luxury Travel Insurance 2026',
    category: 'Travel Tips',
    categoryIcon: '🛡️',
    excerpt: 'Protect high-value trips with specialized luxury travel insurance.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-10',
    readTime: '10 min',
    featured: false
  },
  // Article 13 - AI Travel
  {
    id: 13,
    lang: 'en',
    slug: 'ai-revolutionizing-luxury-travel',
    title: 'How AI is Revolutionizing Luxury Travel Planning',
    category: 'Technology',
    categoryIcon: '🤖',
    excerpt: 'Discover how AI transforms travel planning with predictive pricing and personalization.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-11',
    readTime: '9 min',
    featured: false
  },
  // Article 14 - Toronto & Vancouver
  {
    id: 14,
    lang: 'en',
    slug: 'toronto-vancouver-luxury-guide',
    title: 'Toronto & Vancouver: Luxury City Break Guide 2026',
    category: 'Destinations',
    categoryIcon: '🇨🇦',
    excerpt: 'Canada\'s two largest cities offer distinct luxury experiences.',
    image: 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-15',
    readTime: '16 min',
    featured: false
  },
  // Article 15 - Montreal & Quebec
  {
    id: 15,
    lang: 'en',
    slug: 'montreal-quebec-french-canada',
    title: 'Luxury in French Canada: Montreal & Quebec City',
    category: 'Destinations',
    categoryIcon: '⚜️',
    excerpt: 'European charm in North America with French cuisine and old-world elegance.',
    image: 'https://images.unsplash.com/photo-1519894110903-85f36c1a8f3a?auto=format&fit=crop&q=80&w=800',
    author: 'SkyLynx Travel',
    date: '2026-01-16',
    readTime: '14 min',
    featured: false
  }
];

// Display articles function
function displayBlogArticles() {
  const blogGrid = document.querySelector('.blog-grid');
  if (!blogGrid) return;
  
  // Get current language
  const currentLang = document.documentElement.lang || 'en';
  
  // Filter articles by language and get first 6
  const articlesToShow = blogArticles
    .filter(article => article.lang === currentLang)
    .slice(0, 6);
  
  // Clear existing content
  blogGrid.innerHTML = '';
  
  // Add articles
  articlesToShow.forEach(article => {
    const articleCard = `
      <article class="blog-card" data-aos="fade-up">
        <img src="${article.image}" alt="${article.title}" class="blog-image">
        ${article.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
        ${article.localExpertise ? '<span class="local-badge">🍁 Local Expertise</span>' : ''}
        <div class="blog-content">
          <span class="blog-category">${article.categoryIcon} ${article.category}</span>
          <h3 class="blog-title">${article.title}</h3>
          <p class="blog-excerpt">${article.excerpt}</p>
          <div class="blog-meta">
            <span><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
            <span><i class="far fa-clock"></i> ${article.readTime}</span>
          </div>
          <a href="#ai-assistant" class="read-more">
            <span>Read More</span>
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </article>
    `;
    blogGrid.insertAdjacentHTML('beforeend', articleCard);
  });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', displayBlogArticles);

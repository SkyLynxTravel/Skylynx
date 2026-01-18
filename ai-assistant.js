/**
 * SkyLynx AI Assistant - Complete Local Version
 * Version: 3.0.0 - No API Required
 */

class SkyLynxAIAssistant {
    constructor() {
        this.currentLanguage = 'en';
        this.conversationHistory = [];
        this.isTyping = false;
        
        // قاعدة معرفة شاملة بالسفر الفاخر
        this.knowledgeBase = this.createKnowledgeBase();
        
        this.initialize();
    }

    /**
     * إنشاء قاعدة المعرفة
     */
    createKnowledgeBase() {
        return {
            // شركات الطيران الفاخرة
            airlines: {
                premium: {
                    arabic: [
                        'الخطوط الجوية الإماراتية (EK) - رائدة الفخامة العالمية',
                        'الخطوط الجوية القطرية (QR) - مقعد Qsuite الأفضل عالمياً',
                        'الاتحاد للطيران (EY) - شقق الأبراج في الجو',
                        'الخطوط السعودية (SV) - خدمة VIP متكاملة',
                        'عمان للطيران (WY) - الأناقة العربية الأصيلة',
                        'الخطوط السنغافورية (SQ) - الخدمة الآسيوية المتميزة',
                        'كانثاس (QF) - الخبرة الأسترالية'
                    ],
                    english: [
                        'Emirates (EK) - Global luxury leader with first class suites',
                        'Qatar Airways (QR) - Qsuite is world\'s best business class',
                        'Etihad Airways (EY) - The Residence luxury apartments',
                        'Saudi Arabian Airlines (SV) - Premium VIP service',
                        'Oman Air (WY) - Authentic Arabian elegance',
                        'Singapore Airlines (SQ) - Exceptional Asian service',
                        'Qantas (QF) - Australian expertise and safety'
                    ]
                },
                businessClass: {
                    arabic: [
                        'الخطوط الجوية البريطانية (BA) - نادي العالم',
                        'لوفتهانزا (LH) - درجة رجال الأعمال الجديدة',
                        'طيران الإمارات (EK) - بار في السماء',
                        'طيران الخليج (GF) - الخدمة الخليجية المتميزة'
                    ],
                    english: [
                        'British Airways (BA) - Club World with lie-flat beds',
                        'Lufthansa (LH) - New Business Class with privacy doors',
                        'Emirates (EK) - Onboard lounge and shower spa',
                        'Gulf Air (GF) - Premium Gulf hospitality'
                    ]
                }
            },
            
            // فنادق 5 نجوم
            hotels: {
                luxuryChains: {
                    arabic: [
                        'فور سيزونز - الخدمة المثالية والمواقع المتميزة',
                        'ريتز كارلتون - الأناقة الكلاسيكية والاهتمام بالتفاصيل',
                        'ستريجيس - التصميم الفريد وخدمة الزبائن',
                        'فيرمونت - القصور التاريخية والمواقع الاستراتيجية',
                        'أمان - الخصوصية المطلقة في أماكن طبيعية',
                        'وان أند أونلي - التجارب الفريدة والحصرية',
                        'روز وود - الفنادق ذات الشخصية المميزة'
                    ],
                    english: [
                        'Four Seasons - Perfect service at prime locations',
                        'Ritz Carlton - Classic elegance and attention to detail',
                        'St Regis - Unique design and butler service',
                        'Fairmont - Historic castles and strategic locations',
                        'Aman - Ultimate privacy in natural settings',
                        'One & Only - Unique and exclusive experiences',
                        'Rosewood - Hotels with distinctive personality'
                    ]
                },
                
                cityHotels: {
                    dubai: {
                        arabic: [
                            'برج العرب - رمز دبي وسبع نجوم حقيقية',
                            'أتلانتس النخلة - مدينة ملاهي مائية وفخامة',
                            'فندق القصر - الفخامة العربية الأصيلة',
                            'فندق بولغاري - التصميم الإيطالي على الجزيرة',
                            'فور سيزونز دبي - الخدمة العالمية في قلب دبي'
                        ],
                        english: [
                            'Burj Al Arab - Dubai icon with 7-star service',
                            'Atlantis The Palm - Waterpark and luxury combined',
                            'Palace Hotel - Authentic Arabian luxury',
                            'Bulgari Hotel - Italian design on the island',
                            'Four Seasons Dubai - Global service in heart of Dubai'
                        ]
                    },
                    paris: {
                        arabic: [
                            'فور سيزونز جورج الخامس - الفخامة الفرنسية التقليدية',
                            'ريتز باريس - التاريخ والأناقة منذ 1898',
                            'شانغريلا - مناظر برج إيفل المذهلة',
                            'لو بريستول - الأناقة الباريسية العصرية',
                            'فندق دي كريلون - القصر على شانزليزيه'
                        ],
                        english: [
                            'Four Seasons George V - Traditional French luxury',
                            'Ritz Paris - History and elegance since 1898',
                            'Shangri-La - Breathtaking Eiffel Tower views',
                            'Le Bristol - Modern Parisian elegance',
                            'Hotel de Crillon - Palace on Champs-Élysées'
                        ]
                    },
                    london: {
                        arabic: [
                            'كلاريدج - الأناقة البريطانية في مايفير',
                            'ذا ريتز لندن - الشاي الفاخر والتقاليد',
                            'شانغريلا لندن - أعلى فندق في أوروبا الغربية',
                            'روز وود لندن - الفخامة في هولبورن',
                            'فندق سافوي - التاريخ على نهر التايمز'
                        ],
                        english: [
                            'Claridge\'s - British elegance in Mayfair',
                            'The Ritz London - Luxury afternoon tea and tradition',
                            'Shangri-La London - Highest hotel in Western Europe',
                            'Rosewood London - Luxury in Holborn',
                            'The Savoy - History on the River Thames'
                        ]
                    }
                }
            },
            
            // سيارات فاخرة
            cars: {
                luxuryBrands: {
                    arabic: [
                        'مرسيدس بنز S-Class - الراحة والتكنولوجيا المتقدمة',
                        'بي إم دبليو الفئة السابعة - الأداء والرفاهية',
                        'أودي A8 - التصميم والتقنية الألمانية',
                        'لكزس LS - الهدوء والموثوقية اليابانية',
                        'رولز رويس - القمة في الفخامة البريطانية',
                        'بنتلي - الفخامة والأداء الرياضي',
                        'مايباخ - الفخامة المطلقة من مرسيدس'
                    ],
                    english: [
                        'Mercedes-Benz S-Class - Ultimate comfort and technology',
                        'BMW 7 Series - Performance and luxury combined',
                        'Audi A8 - German design and technology',
                        'Lexus LS - Japanese quietness and reliability',
                        'Rolls Royce - Peak British luxury',
                        'Bentley - Luxury meets sports performance',
                        'Maybach - Ultimate luxury from Mercedes'
                    ]
                },
                
                suvLuxury: {
                    arabic: [
                        'رينج روفر - ملك السيارات الرياضية الفاخرة',
                        'بورشه كايين - الأداء الرياضي في SUV',
                        'مرسيدس G-Class - الأيقونة ذات التصميم المميز',
                        'بي إم دبليو X7 - الفخامة العائلية الكبيرة',
                        'لكزس LX - الصلابة مع الفخامة'
                    ],
                    english: [
                        'Range Rover - King of luxury SUVs',
                        'Porsche Cayenne - Sports performance in SUV',
                        'Mercedes G-Class - Icon with distinctive design',
                        'BMW X7 - Large family luxury',
                        'Lexus LX - Ruggedness with luxury'
                    ]
                }
            },
            
            // طائرات خاصة
            privateJets: {
                types: {
                    arabic: [
                        'طائرة خفيفة (4-6 أشخاص): مثالية للرحلات القصيرة والإقليمية',
                        'طائرة متوسطة (8-10 أشخاص): الراحة لرحلات أطول',
                        'طائرة كبيرة (12-16 شخص): الفخامة الكاملة وعبر القارات',
                        'طائرة رجال الأعمال: مصممة للمسافرين التنفيذيين'
                    ],
                    english: [
                        'Light Jet (4-6 people): Perfect for short and regional trips',
                        'Mid-size Jet (8-10 people): Comfort for longer journeys',
                        'Heavy Jet (12-16 people): Full luxury for intercontinental',
                        'Business Jet: Designed for executive travelers'
                    ]
                },
                
                popularModels: {
                    arabic: [
                        'سيسنا سايتايشن - للرحلات القصيرة والمتوسطة',
                        'جلف ستريم - الجودة الأمريكية والراحة',
                        'بومباردييه - التصميم الكندي المتقدم',
                        'إيرباص كوربوريت جيت - الفخامة على مستوى جديد',
                        'داسو فالكون - الأداء الفرنسي المتميز'
                    ],
                    english: [
                        'Cessna Citation - For short to medium range',
                        'Gulfstream - American quality and comfort',
                        'Bombardier - Advanced Canadian design',
                        'Airbus Corporate Jet - Luxury on a new level',
                        'Dassault Falcon - Excellent French performance'
                    ]
                }
            },
            
            // نصائح السفر
            travelTips: {
                flights: {
                    arabic: [
                        'احجز قبل 6-8 أسابيع للرحلات الدولية للحصول على أفضل الأسعار',
                        'سافر أيام الثلاثاء والأربعاء للأسعار المنخفضة',
                        'انضم لبرامج الولاء للحصول على ترقيات مجانية',
                        'استخدم بطاقات السفر المميزة لتراكم الأميال',
                        'احجز مقاعد المقدمة للخروج السريع من الطائرة'
                    ],
                    english: [
                        'Book 6-8 weeks in advance for international flights for best prices',
                        'Travel on Tuesdays and Wednesdays for lower fares',
                        'Join loyalty programs for free upgrades',
                        'Use premium travel cards for mileage accumulation',
                        'Book front seats for quick aircraft exit'
                    ]
                },
                
                hotels: {
                    arabic: [
                        'احجز مباشرة عبر موقع الفندق للحصول على أفضل العروض',
                        'اطلب ترقية الغرفة عند الوصول بتهذيب',
                        'استخدم خدمات الكونسيرج للأنشطة والحجوزات',
                        'احجز الإفطار مسبقاً لتوفير المال',
                        'اختر الغرف العالية للإطلالة الأفضل'
                    ],
                    english: [
                        'Book directly through hotel website for best offers',
                        'Politely request room upgrade at check-in',
                        'Use concierge services for activities and reservations',
                        'Book breakfast in advance to save money',
                        'Choose higher floors for better views'
                    ]
                },
                
                saving: {
                    arabic: [
                        'سافر خارج مواسم الذروة لتوفير حتى 40%',
                        'استخدم الحجوزات الجماعية للخصومات',
                        'احجز الرحلات الطويلة مسبقاً',
                        'قارن الأسعار بين المواقع المختلفة',
                        'استفد من عروض اللحظة الأخيرة'
                    ],
                    english: [
                        'Travel off-peak seasons to save up to 40%',
                        'Use group bookings for discounts',
                        'Book long trips in advance',
                        'Compare prices across different websites',
                        'Take advantage of last-minute offers'
                    ]
                }
            },
            
            // الأسعار التقريبية
            pricing: {
                flights: {
                    arabic: {
                        economy: '500 - 2,000 دولار',
                        premiumEconomy: '1,500 - 4,000 دولار',
                        business: '2,000 - 8,000 دولار',
                        first: '5,000 - 20,000 دولار+'
                    },
                    english: {
                        economy: '$500 - $2,000',
                        premiumEconomy: '$1,500 - $4,000',
                        business: '$2,000 - $8,000',
                        first: '$5,000 - $20,000+'
                    }
                },
                
                hotels: {
                    arabic: {
                        standard: '300 - 800 دولار لليلة',
                        luxury: '800 - 2,000 دولار لليلة',
                        suite: '2,000 - 10,000 دولار لليلة',
                        palace: '5,000 - 50,000 دولار لليلة'
                    },
                    english: {
                        standard: '$300 - $800 per night',
                        luxury: '$800 - $2,000 per night',
                        suite: '$2,000 - $10,000 per night',
                        palace: '$5,000 - $50,000 per night'
                    }
                },
                
                cars: {
                    arabic: {
                        daily: '300 - 800 دولار يومياً',
                        weekly: '1,800 - 4,500 دولار أسبوعياً',
                        monthly: '6,000 - 15,000 دولار شهرياً',
                        chauffeur: '+200 - 500 دولار يومياً'
                    },
                    english: {
                        daily: '$300 - $800 daily',
                        weekly: '$1,800 - $4,500 weekly',
                        monthly: '$6,000 - $15,000 monthly',
                        chauffeur: '+$200 - $500 daily'
                    }
                },
                
                jets: {
                    arabic: {
                        light: '5,000 - 12,000 دولار للساعة',
                        mid: '8,000 - 20,000 دولار للساعة',
                        heavy: '12,000 - 30,000 دولار للساعة',
                        ultra: '25,000 - 100,000 دولار للساعة'
                    },
                    english: {
                        light: '$5,000 - $12,000 per hour',
                        mid: '$8,000 - $20,000 per hour',
                        heavy: '$12,000 - $30,000 per hour',
                        ultra: '$25,000 - $100,000 per hour'
                    }
                }
            }
        };
    }

    /**
     * تهيئة النظام
     */
    initialize() {
        console.log('🚀 SkyLynx AI Assistant - Local Version Initialized');
        
        // اكتشاف اللغة
        this.currentLanguage = localStorage.getItem('siteLang') || 'en';
        document.body.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        
        // إنشاء واجهة المستخدم
        this.createUIElements();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        // تحميل المحفوظات
        this.loadConversationHistory();
        
        console.log('✅ AI Assistant Ready - No API Required');
    }

    /**
     * إنشاء عناصر واجهة إضافية
     */
    createUIElements() {
        const modalHeader = document.querySelector('.ai-modal-header');
        if (modalHeader && !document.getElementById('aiClearBtn')) {
            // زر مسح المحادثة
            const clearBtn = document.createElement('button');
            clearBtn.id = 'aiClearBtn';
            clearBtn.className = 'ai-clear-btn';
            clearBtn.innerHTML = '<i class="fas fa-eraser"></i>';
            clearBtn.title = this.currentLanguage === 'ar' ? 'مسح المحادثة' : 'Clear chat';
            clearBtn.addEventListener('click', () => this.clearChat());
            modalHeader.appendChild(clearBtn);
            
            // زر إظهار/إخفاء الاقتراحات
            const toggleBtn = document.createElement('button');
            toggleBtn.id = 'aiToggleSuggestions';
            toggleBtn.className = 'ai-clear-btn';
            toggleBtn.style.right = '75px';
            toggleBtn.innerHTML = '<i class="fas fa-lightbulb"></i>';
            toggleBtn.title = this.currentLanguage === 'ar' ? 'اقتراحات سريعة' : 'Quick suggestions';
            toggleBtn.addEventListener('click', () => this.toggleQuickSuggestions());
            modalHeader.appendChild(toggleBtn);
        }
        
        // اقتراحات سريعة
        this.createQuickSuggestions();
    }

    /**
     * إنشاء اقتراحات سريعة
     */
    createQuickSuggestions() {
        const chatContainer = document.getElementById('aiChatContainer');
        if (!chatContainer || document.getElementById('quickSuggestions')) return;
        
        const suggestions = document.createElement('div');
        suggestions.id = 'quickSuggestions';
        suggestions.className = 'quick-suggestions';
        
        const suggestionsData = this.currentLanguage === 'ar' ? [
            { emoji: '🏨', text: 'أفضل فنادق دبي' },
            { emoji: '✈️', text: 'ترقية مقعد الطائرة' },
            { emoji: '👑', text: 'طائرة خاصة' },
            { emoji: '🚗', text: 'تأجير سيارات فاخرة' },
            { emoji: '💰', text: 'أسعار السفر' },
            { emoji: '👥', text: 'حجوزات جماعية' }
        ] : [
            { emoji: '🏨', text: 'Best Dubai hotels' },
            { emoji: '✈️', text: 'Flight seat upgrade' },
            { emoji: '👑', text: 'Private jet' },
            { emoji: '🚗', text: 'Luxury car rental' },
            { emoji: '💰', text: 'Travel prices' },
            { emoji: '👥', text: 'Group bookings' }
        ];
        
        suggestions.innerHTML = suggestionsData.map(item => 
            `<button class="quick-btn" data-question="${item.text}">${item.emoji}</button>`
        ).join('');
        
        chatContainer.parentNode.insertBefore(suggestions, chatContainer);
    }

    /**
     * تبديل عرض الاقتراحات
     */
    toggleQuickSuggestions() {
        const suggestions = document.getElementById('quickSuggestions');
        if (suggestions) {
            suggestions.style.display = suggestions.style.display === 'none' ? 'flex' : 'none';
        }
    }

    /**
     * إعداد مستمعي الأحداث
     */
    setupEventListeners() {
        // زر فتح المساعد
        const aiBtn = document.getElementById('aiAssistantBtn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => this.toggleAssistant());
        }

        // زر الإرسال
        const sendBtn = document.getElementById('aiSendBtn');
        if (sendBtn) {
            sendBtn.addEventListener('click', () => this.sendMessage());
        }

        // إدخال الرسالة
        const aiInput = document.getElementById('aiInput');
        if (aiInput) {
            aiInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            // تحسين تجربة الكتابة
            aiInput.addEventListener('input', (e) => {
                this.showAutoSuggestions(e.target.value);
            });
        }

        // تغيير اللغة
        const langSelect = document.getElementById('lang-sel');
        if (langSelect) {
            langSelect.addEventListener('change', () => {
                this.currentLanguage = langSelect.value;
                this.updateUIForLanguage();
            });
        }

        // الأزرار السريعة
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-btn')) {
                const question = e.target.dataset.question;
                document.getElementById('aiInput').value = question;
                this.sendMessage();
            }
        });
    }

    /**
     * تحديث الواجهة للغة الجديدة
     */
    updateUIForLanguage() {
        // تحديث الاقتراحات السريعة
        this.createQuickSuggestions();
        
        // تحديث نصوص الواجهة
        const clearBtn = document.getElementById('aiClearBtn');
        if (clearBtn) {
            clearBtn.title = this.currentLanguage === 'ar' ? 'مسح المحادثة' : 'Clear chat';
        }
        
        const toggleBtn = document.getElementById('aiToggleSuggestions');
        if (toggleBtn) {
            toggleBtn.title = this.currentLanguage === 'ar' ? 'اقتراحات سريعة' : 'Quick suggestions';
        }
    }

    /**
     * تبديل حالة المساعد
     */
    toggleAssistant() {
        const modal = document.getElementById('aiAssistantModal');
        if (!modal) return;

        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        } else {
            modal.classList.add('show');
            this.focusInput();
            if (document.getElementById('aiChatContainer').children.length <= 2) {
                this.showWelcomeMessage();
            }
        }
    }

    /**
     * عرض رسالة الترحيب
     */
    showWelcomeMessage() {
        const chatContainer = document.getElementById('aiChatContainer');
        if (!chatContainer || chatContainer.children.length > 2) return;

        const welcomeMessage = this.currentLanguage === 'ar' 
            ? "👋 **أهلاً بك في SkyLynx Travel!**\n\nأنا مساعدك الذكي للرحلات الفاخرة. يمكنني:\n\n• 🛫 **رحلات طيران فاخرة** - أفضل الخطوط ونصائح الترقية\n• 🏨 **فنادق 5 نجوم** - توصيات لأفضل الفنادق العالمية\n• 🚗 **تأجير سيارات فاخرة** - مع سائق أو بدونه\n• 👑 **طائرات خاصة** - للسفر الحصري والفاخر\n• 👥 **حجوزات جماعية** - خصومات خاصة للمجموعات\n• 💰 **توقعات أسعار** - نصائح لتوفير المال\n\nما الذي تود معرفته اليوم؟"
            : "👋 **Welcome to SkyLynx Travel!**\n\nI'm your AI luxury travel assistant. I can help with:\n\n• 🛫 **Luxury Flights** - Best airlines and upgrade tips\n• 🏨 **5-Star Hotels** - Recommendations for world's best hotels\n• 🚗 **Luxury Car Rental** - With or without chauffeur\n• 👑 **Private Jets** - For exclusive luxury travel\n• 👥 **Group Bookings** - Special discounts for groups\n• 💰 **Price Predictions** - Money-saving tips\n\nWhat would you like to know today?";

        this.addMessage(welcomeMessage, 'bot');
    }

    /**
     * إرسال رسالة
     */
    sendMessage() {
        const input = document.getElementById('aiInput');
        if (!input) return;

        const message = input.value.trim();
        if (!message) return;

        // إضافة رسالة المستخدم
        this.addMessage(message, 'user');
        input.value = '';
        
        // إخفاء الاقتراحات التلقائية
        this.hideAutoSuggestions();
        
        // عرض مؤشر الكتابة
        this.showTypingIndicator();
        
        // الحصول على الرد بعد تأخير قصير للواقعية
        setTimeout(() => {
            const response = this.getAIResponse(message);
            
            // إخفاء مؤشر الكتابة
            this.hideTypingIndicator();
            
            // إضافة رد المساعد
            this.addMessage(response, 'bot');
            
            // حفظ في المحفوظات
            this.saveToHistory(message, response);
            
            // التمرير للأسفل
            this.scrollToBottom();
        }, 800);
    }

    /**
     * الحصول على رد الذكاء الاصطناعي
     */
    getAIResponse(userMessage) {
        const lang = this.currentLanguage;
        const lowerMessage = userMessage.toLowerCase();
        
        // الترحيب
        if (this.isGreeting(lowerMessage)) {
            return this.getGreetingResponse(lang);
        }
        
        // الشكر
        if (this.isThankYou(lowerMessage)) {
            return this.getThankYouResponse(lang);
        }
        
        // الرحلات الجوية
        if (this.isFlightQuery(lowerMessage)) {
            return this.getFlightResponse(lang, userMessage);
        }
        
        // الفنادق
        if (this.isHotelQuery(lowerMessage)) {
            return this.getHotelResponse(lang, userMessage);
        }
        
        // السيارات
        if (this.isCarQuery(lowerMessage)) {
            return this.getCarResponse(lang);
        }
        
        // الطائرات الخاصة
        if (this.isPrivateJetQuery(lowerMessage)) {
            return this.getPrivateJetResponse(lang);
        }
        
        // الأسعار
        if (this.isPriceQuery(lowerMessage)) {
            return this.getPriceResponse(lang, userMessage);
        }
        
        // الحجوزات الجماعية
        if (this.isGroupQuery(lowerMessage)) {
            return this.getGroupResponse(lang);
        }
        
        // نصائح عامة
        if (this.isGeneralTravelQuery(lowerMessage)) {
            return this.getGeneralTravelResponse(lang);
        }
        
        // إذا كان الاستعلام عن وجهة محددة
        const destination = this.extractDestination(userMessage);
        if (destination) {
            return this.getDestinationResponse(lang, destination);
        }
        
        // رد افتراضي
        return this.getDefaultResponse(lang);
    }

    /**
     * تحليل أنواع الاستعلام
     */
    isGreeting(message) {
        const greetings = this.currentLanguage === 'ar' 
            ? ['مرحبا', 'السلام', 'اهلا', 'اهلاً', 'hello', 'hi', 'hey']
            : ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'];
        
        return greetings.some(greet => message.includes(greet));
    }

    isThankYou(message) {
        const thanks = this.currentLanguage === 'ar' 
            ? ['شكرا', 'مشكور', 'متشكر', 'thanks', 'thank you']
            : ['thanks', 'thank you', 'appreciate', 'grateful'];
        
        return thanks.some(thank => message.includes(thank));
    }

    isFlightQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['طيران', 'رحلة', 'طائرة', 'مطار', 'مقعد', 'ترقية', 'خطوط', 'سفر جوي']
            : ['flight', 'airline', 'airplane', 'airport', 'seat', 'upgrade', 'fly', 'air travel'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isHotelQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['فندق', 'غرفة', 'جناح', 'إقامة', 'نوم', 'فطور', 'ريزورت', 'موتيل']
            : ['hotel', 'room', 'suite', 'stay', 'bed', 'breakfast', 'resort', 'motel'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isCarQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['سيارة', 'تأجير', 'سائق', 'مرسيدس', 'بي إم دبليو', 'فاخرة', 'عربية']
            : ['car', 'rental', 'chauffeur', 'mercedes', 'bmw', 'luxury car', 'vehicle'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isPrivateJetQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['طائرة خاصة', 'خاصة', 'جت', 'فاخرة طيران', 'جت خاص']
            : ['private jet', 'private', 'jet', 'luxury flight', 'charter'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isPriceQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['سعر', 'تكلفة', 'كم', 'ثمن', 'أسعار', 'رخيص', 'غالي', 'مكلف']
            : ['price', 'cost', 'how much', 'expensive', 'cheap', 'rate', 'budget'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isGroupQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['مجموعة', 'جماعي', 'عائلة', 'أصدقاء', 'شركة', 'موظفين']
            : ['group', 'family', 'friends', 'company', 'employees', 'team'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    isGeneralTravelQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['سفر', 'رحلة', 'سياحة', 'عطلة', 'اجازة', 'تخطيط', 'تذكرة']
            : ['travel', 'trip', 'vacation', 'holiday', 'planning', 'itinerary', 'ticket'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    /**
     * استخراج الوجهة من الرسالة
     */
    extractDestination(message) {
        const destinations = [
            'dubai', 'dhabi', 'abu dhabi', 'riyadh', 'jeddah', 'doha', 
            'muscat', 'manama', 'kuwait', 'cairo', 'beirut', 'amman',
            'paris', 'london', 'new york', 'tokyo', 'singapore', 'bangkok',
            'istanbul', 'milan', 'rome', 'barcelona', 'madrid', 'geneva',
            'دبي', 'أبوظبي', 'الرياض', 'جدة', 'الدوحة', 'مسقط',
            'المنامة', 'الكويت', 'القاهرة', 'بيروت', 'عمان', 'الدار البيضاء',
            'باريس', 'لندن', 'نيويورك', 'طوكيو', 'سنغافورة', 'بانكوك',
            'إسطنبول', 'ميلان', 'روما', 'برشلونة', 'مدريد', 'جنيف'
        ];
        
        const lowerMsg = message.toLowerCase();
        for (const dest of destinations) {
            if (lowerMsg.includes(dest.toLowerCase())) {
                return dest;
            }
        }
        return null;
    }

    /**
     * ردود متخصصة
     */
    getGreetingResponse(lang) {
        return lang === 'ar'
            ? "👋 **مرحباً بك!**\n\nأهلاً وسهلاً بك في SkyLynx Travel. أنا مساعدك الذكي للرحلات الفاخرة.\n\nكيف يمكنني مساعدتك اليوم؟ هل تبحث عن:\n• رحلة طيران فاخرة؟\n• فندق 5 نجوم؟\n• تأجير سيارة فاخرة؟\n• طائرة خاصة؟\n• حجز جماعي؟"
            : "👋 **Hello there!**\n\nWelcome to SkyLynx Travel. I'm your AI luxury travel assistant.\n\nHow can I help you today? Are you looking for:\n• A luxury flight?\n• A 5-star hotel?\n• Luxury car rental?\n• Private jet?\n• Group booking?";
    }

    getThankYouResponse(lang) {
        return lang === 'ar'
            ? "🌟 **شكراً لك!**\n\nسعيد لأنني استطعت مساعدتك. إذا كان لديك أي أسئلة أخرى عن السفر الفاخر، فلا تتردد في سؤالي.\n\nتذكر أن SkyLynx تقدم:\n• ضمان أفضل سعر\n• خدمة 24/7\n• خبرة 20+ سنة في السفر الفاخر\n\nنتمنى لك رحلة سعيدة! ✈️"
            : "🌟 **Thank you!**\n\nI'm glad I could help you. If you have any more questions about luxury travel, feel free to ask.\n\nRemember that SkyLynx offers:\n• Best price guarantee\n• 24/7 service\n• 20+ years luxury travel experience\n\nWishing you happy travels! ✈️";
    }

        getFlightResponse(lang, message) {
        const lowerMessage = message.toLowerCase();
        const isUpgradeQuery = lowerMessage.includes('upgrade') || 
                              (lang === 'ar' && lowerMessage.includes('ترقية'));
        
        if (isUpgradeQuery) {
            return this.getUpgradeResponse(lang);
        }
        
        const airlines = this.knowledgeBase.airlines.premium[lang === 'ar' ? 'arabic' : 'english'];
        const tips = this.knowledgeBase.travelTips.flights[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `✈️ **رحلات الطيران الفاخرة**\n\n**أفضل شركات الطيران للرحلات الفاخرة:**\n\n${airlines.map((a, i) => `${i+1}. ${a}`).join('\n')}\n\n**نصائح ذهبية للطيران:**\n\n${tips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**للحصول على أفضل الأسعار:**\n1. استخدم ميزة **Smart Price Predictor** في موقعنا\n2. احجز قبل 6-8 أسابيع للرحلات الدولية\n3. سافر أيام الثلاثاء والأربعاء\n4. استفد من الحجوزات الجماعية للخصومات\n\n**للحجز:** استخدم نموذج البحث بالأعلى أو اتصل بنا!`
            : `✈️ **Luxury Flights**\n\n**Top premium airlines for luxury travel:**\n\n${airlines.map((a, i) => `${i+1}. ${a}`).join('\n')}\n\n**Golden flight tips:**\n\n${tips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**For best prices:**\n1. Use our **Smart Price Predictor** feature\n2. Book 6-8 weeks in advance for international flights\n3. Travel on Tuesdays and Wednesdays\n4. Take advantage of group bookings for discounts\n\n**To book:** Use the search form above or contact us!`;
    }
    
    /**
     * رد متخصص للترقيات
     */
    getUpgradeResponse(lang) {
        const upgradeTips = {
            arabic: [
                'انضم لبرنامج الولاء للشركة واكسب النقاط',
                'احجز تذاكر مكلفة (الأسعار الأعلى تحظى بالأولوية)',
                'سافر في رحلات مزدحمة (الترقيات أكثر احتمالاً)',
                'ارتدِ ملابس رسمية وأنيق عند الصعود',
                'كن لطيفاً مع طاقم الطائرة وحاجب الصعود',
                'سافر في أيام الأسبوع بدلاً من عطلات نهاية الأسبوع',
                'احجز مباشرة عبر موقع الشركة وليس عبر وكيل',
                'اطلب الترقية بلطف عند التسجيل عبر الإنترنت أو في المطار',
                'سافر بمفردك (الترقيات الفردية أسهل من المجموعات)',
                'اختر الرحلات الطويلة (فرص أفضل للترقية)'
            ],
            english: [
                'Join airline loyalty programs and earn points',
                'Book expensive tickets (higher fares get priority)',
                'Travel on busy flights (more upgrade chances)',
                'Dress well and look professional at boarding',
                'Be polite to airline staff and gate agents',
                'Travel on weekdays instead of weekends',
                'Book directly through airline website, not third-party',
                'Politely request upgrade during online check-in or at airport',
                'Travel alone (single upgrades easier than groups)',
                'Choose long-haul flights (better upgrade opportunities)'
            ]
        };
        
        const tips = upgradeTips[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `👑 **كيف تحصل على ترقية في الطائرة؟**\n\n**أفضل 10 نصائح للحصول على ترقية:**\n\n${tips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**شركات الطيران الأكثر ترقية:**\n1. **الخطوط الجوية الإماراتية** - برنامج سكاي واردز\n2. **الخطوط الجوية القطرية** - برنامج البريفيليدج كلوب\n3. **الاتحاد للطيران** - برنامج الاتحاد للضيف\n4. **الخطوط السنغافورية** - برنامج كريس فلاير\n5. **لوفتهانزا** - برنامج مايلز آند مور\n\n**نصائح إضافية:**\n• تحقق من ترقيات باستخدام الأميال عند الحجز\n• استخدم خدمات SkyLynz الكونسيرج للمساعدة\n• احجز في فئة "مرشح للترقية" إذا متوفرة\n• سافر في مواسم غير مزدحمة\n\n**ملاحظة:** الترقيات غير مضمونة، لكن هذه النصائح تزيد فرصك!`
            : `👑 **How to Get a Flight Upgrade?**\n\n**Top 10 Tips for Getting Upgraded:**\n\n${tips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**Airlines Most Likely to Upgrade:**\n1. **Emirates** - Skywards program\n2. **Qatar Airways** - Privilege Club\n3. **Etihad Airways** - Etihad Guest\n4. **Singapore Airlines** - KrisFlyer\n5. **Lufthansa** - Miles & More\n\n**Additional Tips:**\n• Check for mileage upgrade options when booking\n• Use SkyLynx concierge services for assistance\n• Book "Upgrade Eligible" fare classes if available\n• Travel during non-peak seasons\n\n**Note:** Upgrades are never guaranteed, but these tips increase your chances!`;
    }

    getHotelResponse(lang, message) {
        const destination = this.extractDestination(message);
        let destinationInfo = '';
        
        if (destination) {
            const destKey = destination.toLowerCase();
            if (this.knowledgeBase.hotels.cityHotels[destKey]) {
                const hotels = this.knowledgeBase.hotels.cityHotels[destKey][lang === 'ar' ? 'arabic' : 'english'];
                destinationInfo = `\n**أفضل فنادق ${destKey}:**\n\n${hotels.map((h, i) => `${i+1}. ${h}`).join('\n')}\n`;
            }
        }
        
        const chains = this.knowledgeBase.hotels.luxuryChains[lang === 'ar' ? 'arabic' : 'english'];
        const tips = this.knowledgeBase.travelTips.hotels[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `🏨 **فنادق 5 نجوم فاخرة**\n\n**أفضل سلاسل الفنادق الفاخرة عالمياً:**\n\n${chains.map((c, i) => `${i+1}. ${c}`).join('\n')}\n${destinationInfo}\n**نصائح للإقامة الفاخرة:**\n\n${tips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**مزايا الحجز عبر SkyLynx:**\n• أفضل سعر مضمون\n• ترقيات مجانية عند التوفر\n• خدمة VIP عند الوصول\n• تأكيد الحجز الفوري\n• دعم 24/7\n\n**للحجز:** استخدم نموذج الفنادق بالأعلى!`
            : `🏨 **5-Star Luxury Hotels**\n\n**World's top luxury hotel chains:**\n\n${chains.map((c, i) => `${i+1}. ${c}`).join('\n')}\n${destinationInfo}\n**Luxury stay tips:**\n\n${tips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**Benefits of booking with SkyLynx:**\n• Best price guarantee\n• Free upgrades when available\n• VIP check-in service\n• Instant booking confirmation\n• 24/7 support\n\n**To book:** Use the hotels form above!`;
    }

    getCarResponse(lang) {
        const luxuryBrands = this.knowledgeBase.cars.luxuryBrands[lang === 'ar' ? 'arabic' : 'english'];
        const suvBrands = this.knowledgeBase.cars.suvLuxury[lang === 'ar' ? 'arabic' : 'english'];
        const pricing = this.knowledgeBase.pricing.cars[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `🚗 **تأجير سيارات فاخرة**\n\n**الماركات الفاخرة المتاحة:**\n\n${luxuryBrands.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n**السيارات الرياضية الفاخرة (SUV):**\n\n${suvBrands.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n**الأسعار التقريبية:**\n• يومياً: ${pricing.daily}\n• أسبوعياً: ${pricing.weekly}\n• شهرياً: ${pricing.monthly}\n• مع سائق: ${pricing.chauffeur}\n\n**الخدمات المقدمة:**\n• استقبال في المطار\n• تأمين شامل\n• صيانة كاملة\n• استبدال السيارة إذا لزم الأمر\n• خدمة 24/7 على الطريق\n\n**للحجز:** استخدم نموذج السيارات بالأعلى!`
            : `🚗 **Luxury Car Rental**\n\n**Available luxury brands:**\n\n${luxuryBrands.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n**Luxury SUVs:**\n\n${suvBrands.map((b, i) => `${i+1}. ${b}`).join('\n')}\n\n**Approximate pricing:**\n• Daily: ${pricing.daily}\n• Weekly: ${pricing.weekly}\n• Monthly: ${pricing.monthly}\n• With chauffeur: ${pricing.chauffeur}\n\n**Services included:**\n• Airport meet & greet\n• Comprehensive insurance\n• Full maintenance\n• Replacement car if needed\n• 24/7 roadside assistance\n\n**To book:** Use the cars form above!`;
    }

    getPrivateJetResponse(lang) {
        const types = this.knowledgeBase.privateJets.types[lang === 'ar' ? 'arabic' : 'english'];
        const models = this.knowledgeBase.privateJets.popularModels[lang === 'ar' ? 'arabic' : 'english'];
        const pricing = this.knowledgeBase.pricing.jets[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `👑 **الطائرات الخاصة**\n\n**أنواع الطائرات الخاصة:**\n\n${types.map((t, i) => `${i+1}. ${t}`).join('\n')}\n\n**الموديلات المشهورة:**\n\n${models.map((m, i) => `${i+1}. ${m}`).join('\n')}\n\n**الأسعار التقريبية (للساعة):**\n• طائرة خفيفة: ${pricing.light}\n• طائرة متوسطة: ${pricing.mid}\n• طائرة كبيرة: ${pricing.heavy}\n• طائرة فائقة الفخامة: ${pricing.ultra}\n\n**مزايا السفر بطائرة خاصة:**\n• اختيار وقت المغادرة\n• تخطي المطارات المزدحمة\n• خصوصية كاملة\n• خدمة VIP من الباب للباب\n• طعام وشرب مخصص\n• اجتماعات عمل أثناء الطيران\n\n**للحصول على عرض سعر:** استخدم نموذج الطائرات الخاصة بالأعلى!`
            : `👑 **Private Jets**\n\n**Types of private jets:**\n\n${types.map((t, i) => `${i+1}. ${t}`).join('\n')}\n\n**Popular models:**\n\n${models.map((m, i) => `${i+1}. ${m}`).join('\n')}\n\n**Approximate pricing (per hour):**\n• Light jet: ${pricing.light}\n• Mid-size jet: ${pricing.mid}\n• Heavy jet: ${pricing.heavy}\n• Ultra luxury jet: ${pricing.ultra}\n\n**Benefits of private jet travel:**\n• Choose departure time\n• Skip crowded airports\n• Complete privacy\n• Door-to-door VIP service\n• Custom food & beverages\n• Business meetings while flying\n\n**For a quote:** Use the private jets form above!`;
    }

    getPriceResponse(lang, message) {
        const flightPricing = this.knowledgeBase.pricing.flights[lang === 'ar' ? 'arabic' : 'english'];
        const hotelPricing = this.knowledgeBase.pricing.hotels[lang === 'ar' ? 'arabic' : 'english'];
        const carPricing = this.knowledgeBase.pricing.cars[lang === 'ar' ? 'arabic' : 'english'];
        const jetPricing = this.knowledgeBase.pricing.jets[lang === 'ar' ? 'arabic' : 'english'];
        const savingTips = this.knowledgeBase.travelTips.saving[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `💰 **أسعار السفر الفاخر**\n\n**نطاقات الأسعار التقريبية:**\n\n✈️ **رحلات الطيران:**\n• الاقتصادية: ${flightPricing.economy}\n• الاقتصادية المميزة: ${flightPricing.premiumEconomy}\n• درجة رجال الأعمال: ${flightPricing.business}\n• الدرجة الأولى: ${flightPricing.first}\n\n🏨 **فنادق 5 نجوم:**\n• غرفة قياسية: ${hotelPricing.standard}\n• غرفة فاخرة: ${hotelPricing.luxury}\n• جناح: ${hotelPricing.suite}\n• قصر: ${hotelPricing.palace}\n\n🚗 **تأجير سيارات فاخرة:**\n• يومياً: ${carPricing.daily}\n• أسبوعياً: ${carPricing.weekly}\n• شهرياً: ${carPricing.monthly}\n• مع سائق: ${carPricing.chauffeur}\n\n👑 **طائرات خاصة:**\n• للساعة: ${jetPricing.light} - ${jetPricing.ultra}\n\n**نصائح لتوفير المال:**\n\n${savingTips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**ملاحظة:** الأسعار تختلف حسب:\n• الموسم (الذروة أغلى)\n• الوجهة (المدن الكبيرة أغلى)\n• المدة (الإقامات الطويلة أرخص نسبياً)\n• الوقت (الحجز المبكر أفضل)\n\nاستخدم **Smart Price Predictor** في موقعنا للتنبؤ بأفضل وقت للحجز!`
            : `💰 **Luxury Travel Pricing**\n\n**Approximate Price Ranges:**\n\n✈️ **Flights:**\n• Economy: ${flightPricing.economy}\n• Premium Economy: ${flightPricing.premiumEconomy}\n• Business Class: ${flightPricing.business}\n• First Class: ${flightPricing.first}\n\n🏨 **5-Star Hotels:**\n• Standard room: ${hotelPricing.standard}\n• Luxury room: ${hotelPricing.luxury}\n• Suite: ${hotelPricing.suite}\n• Palace: ${hotelPricing.palace}\n\n🚗 **Luxury Car Rental:**\n• Daily: ${carPricing.daily}\n• Weekly: ${carPricing.weekly}\n• Monthly: ${carPricing.monthly}\n• With chauffeur: ${carPricing.chauffeur}\n\n👑 **Private Jets:**\n• Per hour: ${jetPricing.light} - ${jetPricing.ultra}\n\n**Money-Saving Tips:**\n\n${savingTips.map((tip, i) => `• ${tip}`).join('\n')}\n\n**Note:** Prices vary based on:\n• Season (peak seasons are more expensive)\n• Destination (major cities are pricier)\n• Duration (longer stays are relatively cheaper)\n• Timing (early booking is better)\n\nUse our **Smart Price Predictor** to find best booking times!`;
    }

    getGroupResponse(lang) {
        return lang === 'ar'
            ? `👥 **الحجوزات الجماعية**\n\n**مزايا الحجوزات الجماعية مع SkyLynx:**\n\n1. **خصومات خاصة:** تصل إلى 30% على الرحلات الجماعية\n2. **خدمة مخصصة:** منسق مجموعات خاص لرحلتك\n3. **مرونة الدفع:** خطط دفع مرنة للمجموعات\n4. **تذاكر مجمعة:** جميع التذاكر في حجز واحد\n5. **اجتماع تخطيط:** اجتماع مع منسق الرحلات\n\n**أنواع المجموعات التي نخدمها:**\n• مجموعات الشركات والمؤتمرات\n• العائلات الكبيرة والتجمعات العائلية\n• الرحلات التعليمية والمدرسية\n• الفرق الرياضية والبطولات\n• الرحلات الدينية والحج\n• حفلات الزفاف والمناسبات\n\n**متطلبات المجموعة:**\n• الحد الأدنى: 9 مسافرين\n• الحجز المسبق: 60 يوماً على الأقل\n• الدفعة الأولى: 30% عند الحجز\n\n**للحصول على عرض سعر جماعي:** استخدم زر "حجز المجموعات" في نموذج البحث!`
            : `👥 **Group Bookings**\n\n**Benefits of group bookings with SkyLynx:**\n\n1. **Special discounts:** Up to 30% off on group travel\n2. **Dedicated service:** Personal group coordinator for your trip\n3. **Flexible payment:** Flexible payment plans for groups\n4. **Bulk tickets:** All tickets in one booking\n5. **Planning meeting:** Meeting with travel coordinator\n\n**Types of groups we serve:**\n• Corporate groups and conferences\n• Large families and family reunions\n• Educational and school trips\n• Sports teams and tournaments\n• Religious and pilgrimage trips\n• Weddings and special events\n\n**Group requirements:**\n• Minimum: 9 travelers\n• Advance booking: At least 60 days\n• Initial payment: 30% upon booking\n\n**For a group quote:** Use the "Group Booking" button in the search form!`;
    }

    getGeneralTravelResponse(lang) {
        const allTips = [
            ...this.knowledgeBase.travelTips.flights[lang === 'ar' ? 'arabic' : 'english'],
            ...this.knowledgeBase.travelTips.hotels[lang === 'ar' ? 'arabic' : 'english'],
            ...this.knowledgeBase.travelTips.saving[lang === 'ar' ? 'arabic' : 'english']
        ];
        
        const selectedTips = allTips.sort(() => 0.5 - Math.random()).slice(0, 8);
        
        return lang === 'ar'
            ? `🌍 **دليل السفر الفاخر الشامل**\n\n**أهم نصائح السفر الفاخر:**\n\n${selectedTips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**لماذا تختار SkyLynx للسفر الفاخر؟**\n\n✅ **خبرة 20+ سنة** في قطاع الطيران والضيافة\n✅ **منصة معززة بالذكاء الاصطناعي** بدقة 92% في التنبؤ بالأسعار\n✅ **مساعد ذكي 24/7** بلغتين (العربية والإنجليزية)\n✅ **شراكات عالمية** مع أفضل مقدمي الخدمات الفاخرة\n✅ **ضمان أفضل سعر** أو نعيد الفرق\n✅ **دعم متعدد العملات** (CAD, USD, EUR, GBP, SAR)\n✅ **كشف احتيال آمن** مدعوم بالذكاء الاصطناعي\n\n**مقرنا:** أوتاوا، أونتاريو، كندا\n**للتواصل:** [email protected]\n**الهاتف:** +1 (613) XXX-XXXX\n\n**نتمنى لك رحلة فاخرة لا تنسى!** ✈️🌟`
            : `🌍 **Complete Luxury Travel Guide**\n\n**Top luxury travel tips:**\n\n${selectedTips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**Why choose SkyLynx for luxury travel?**\n\n✅ **20+ years experience** in aviation & hospitality\n✅ **AI-enhanced platform** with 92% price prediction accuracy\n✅ **24/7 smart assistant** in two languages (English & Arabic)\n✅ **Global partnerships** with best luxury service providers\n✅ **Best price guarantee** or we refund the difference\n✅ **Multi-currency support** (CAD, USD, EUR, GBP, SAR)\n✅ **Secure AI-powered** fraud detection\n\n**Our headquarters:** Ottawa, Ontario, Canada\n**Contact:** [email protected]\n**Phone:** +1 (613) XXX-XXXX\n\n**Wishing you an unforgettable luxury journey!** ✈️🌟`;
    }

    getDestinationResponse(lang, destination) {
        // يمكن إضافة معلومات محددة لكل وجهة
        const destMap = {
            'dubai': {
                arabic: '**دبي - لؤلؤة الخليج**\n\nأفضل وقت للزيارة: نوفمبر إلى مارس\n\nمناخ: صحراوي حار صيفاً، معتدل شتاءً\n\nالتجارب الفاخرة:\n• تسوق في دبي مول - أكبر مركز تسوق في العالم\n• عشاء في برج العرب - تجربة 7 نجوم\n• تسلق برج خليفة - أطول مبنى في العالم\n• زيارة نخلة جميرا - الجزيرة الاصطناعية\n• سفاري في الصحراء - مع عشاء تقليدي\n\nالمطارات: مطار دبي الدولي (DXB)، مطار آل مكتوم (DWC)',
                english: '**Dubai - Pearl of the Gulf**\n\nBest time to visit: November to March\n\nClimate: Hot desert summer, mild winter\n\nLuxury experiences:\n• Shopping at Dubai Mall - World\'s largest mall\n• Dinner at Burj Al Arab - 7-star experience\n• Climb Burj Khalifa - World\'s tallest building\n• Visit Palm Jumeirah - Artificial island\n• Desert safari - With traditional dinner\n\nAirports: Dubai International (DXB), Al Maktoum (DWC)'
            },
            'paris': {
                arabic: '**باريس - مدينة النور**\n\nأفضل وقت للزيارة: أبريل إلى يونيو، سبتمبر إلى أكتوبر\n\nمناخ: معتدل بحري\n\nالتجارب الفاخرة:\n• عشاء في برج إيفل - مع إطلالة بانورامية\n• تسوق في الشانزليزيه - أشهر شارع في العالم\n• زيارة متحف اللوفر - أكبر متحف فني\n• رحلة نهرية في السين - مشاهدة المعالم\n• تذوق المأكولات الفرنسية - في مطاعم ميشلان\n\nالمطارات: مطار شارل ديغول (CDG)، مطار أورلي (ORY)',
                english: '**Paris - City of Light**\n\nBest time to visit: April to June, September to October\n\nClimate: Oceanic climate\n\nLuxury experiences:\n• Dinner at Eiffel Tower - With panoramic views\n• Shopping on Champs-Élysées - World\'s most famous street\n• Visit Louvre Museum - World\'s largest art museum\n• Seine river cruise - Sightseeing tour\n• French cuisine tasting - At Michelin restaurants\n\nAirports: Charles de Gaulle (CDG), Orly (ORY)'
            }
        };
        
        const destKey = destination.toLowerCase();
        if (destMap[destKey]) {
            return lang === 'ar' ? destMap[destKey].arabic : destMap[destKey].english;
        }
        
        return this.getGeneralTravelResponse(lang);
    }

    getDefaultResponse(lang) {
        return lang === 'ar'
            ? `🤖 **مرحباً! أنا مساعد SkyLynx الذكي**\n\nأرى أن سؤالك ليس عن السفر مباشرة. أنا متخصص في:\n\n• ✈️ **رحلات الطيران الفاخرة** - أفضل الخطوط، نصائح الترقية\n• 🏨 **فنادق 5 نجوم** - توصيات عالمية، تجارب فاخرة\n• 🚗 **تأجير سيارات فاخرة** - ماركات عالمية، مع سائق\n• 👑 **طائرات خاصة** - للسفر الحصري والفاخر\n• 👥 **حجوزات جماعية** - خصومات خاصة للمجموعات\n• 💰 **أسعار السفر** - نطاقات الأسعار، نصائح التوفير\n\nما الذي تود معرفته عن السفر الفاخر اليوم؟\n\nيمكنك أيضاً استخدام الأزرار السريعة للاقتراحات!`
            : `🤖 **Hello! I'm your SkyLynx AI Assistant**\n\nI see your question isn't directly about travel. I specialize in:\n\n• ✈️ **Luxury Flights** - Best airlines, upgrade tips\n• 🏨 **5-Star Hotels** - Global recommendations, luxury experiences\n• 🚗 **Luxury Car Rental** - Global brands, with chauffeur\n• 👑 **Private Jets** - For exclusive luxury travel\n• 👥 **Group Bookings** - Special discounts for groups\n• 💰 **Travel Prices** - Price ranges, saving tips\n\nWhat would you like to know about luxury travel today?\n\nYou can also use the quick buttons for suggestions!`;
    }

    /**
     * عرض اقتراحات تلقائية
     */
    showAutoSuggestions(text) {
        if (text.length < 2) {
            this.hideAutoSuggestions();
            return;
        }
        
        const suggestions = this.generateSuggestions(text);
        if (suggestions.length > 0) {
            this.displaySuggestions(suggestions);
        } else {
            this.hideAutoSuggestions();
        }
    }

    generateSuggestions(text) {
        const suggestions = [];
        const lang = this.currentLanguage;
        
        if (text.toLowerCase().includes('flight') || text.includes('طيران')) {
            suggestions.push(lang === 'ar' ? 'أفضل خطوط الطيران الفاخرة' : 'Best luxury airlines');
            suggestions.push(lang === 'ar' ? 'كيف أحصل على ترقية في الطائرة؟' : 'How to get flight upgrade?');
            suggestions.push(lang === 'ar' ? 'أسعار تذاكر الطيران إلى دبي' : 'Flight prices to Dubai');
        }
        
        if (text.toLowerCase().includes('hotel') || text.includes('فندق')) {
            suggestions.push(lang === 'ar' ? 'فنادق 5 نجوم في دبي' : '5-star hotels in Dubai');
            suggestions.push(lang === 'ar' ? 'أفضل فنادق باريس الفاخرة' : 'Best luxury hotels in Paris');
            suggestions.push(lang === 'ar' ? 'كيف أختار الفندق المناسب؟' : 'How to choose the right hotel?');
        }
        
        if (text.toLowerCase().includes('car') || text.includes('سيارة')) {
            suggestions.push(lang === 'ar' ? 'تأجير سيارات فاخرة في دبي' : 'Luxury car rental in Dubai');
            suggestions.push(lang === 'ar' ? 'أسعار تأجير السيارات الفاخرة' : 'Luxury car rental prices');
            suggestions.push(lang === 'ar' ? 'أفضل ماركات السيارات الفاخرة' : 'Best luxury car brands');
        }
        
        if (text.toLowerCase().includes('jet') || text.includes('طائرة خاصة')) {
            suggestions.push(lang === 'ar' ? 'أسعار الطائرات الخاصة' : 'Private jet prices');
            suggestions.push(lang === 'ar' ? 'حجز طائرة خاصة من دبي إلى لندن' : 'Private jet from Dubai to London');
            suggestions.push(lang === 'ar' ? 'مزايا السفر بطائرة خاصة' : 'Benefits of private jet travel');
        }
        
        if (text.toLowerCase().includes('price') || text.includes('سعر')) {
            suggestions.push(lang === 'ar' ? 'أسعار فنادق 5 نجوم' : '5-star hotel prices');
            suggestions.push(lang === 'ar' ? 'تكلفة السفر الفاخر' : 'Luxury travel costs');
            suggestions.push(lang === 'ar' ? 'كيف أوفر في السفر الفاخر؟' : 'How to save on luxury travel?');
        }
        
        return suggestions.slice(0, 3);
    }

    displaySuggestions(suggestions) {
        let suggestionsDiv = document.getElementById('aiSuggestions');
        
        if (!suggestionsDiv) {
            suggestionsDiv = document.createElement('div');
            suggestionsDiv.id = 'aiSuggestions';
            suggestionsDiv.className = 'ai-suggestions';
            
            const inputContainer = document.querySelector('.ai-input-container');
            if (inputContainer) {
                inputContainer.appendChild(suggestionsDiv);
            }
        }
        
        suggestionsDiv.innerHTML = suggestions.map(suggestion => 
            `<div class="suggestion-item" onclick="document.getElementById('aiInput').value = '${suggestion}'; this.parentNode.remove();">${suggestion}</div>`
        ).join('');
    }

    hideAutoSuggestions() {
        const suggestionsDiv = document.getElementById('aiSuggestions');
        if (suggestionsDiv) {
            suggestionsDiv.remove();
        }
    }

    /**
     * إضافة رسالة للدردشة
     */
    addMessage(text, type) {
        const chatContainer = document.getElementById('aiChatContainer');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${type}`;
        
        // تنسيق النص
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
        
        messageDiv.innerHTML = formattedText;
        chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * عرض مؤشر الكتابة
     */
    showTypingIndicator() {
        const chatContainer = document.getElementById('aiChatContainer');
        if (!chatContainer || this.isTyping) return;

        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typing-indicator';
        typingDiv.className = 'ai-message bot';
        typingDiv.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        chatContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    /**
     * إخفاء مؤشر الكتابة
     */
    hideTypingIndicator() {
        this.isTyping = false;
        const typingDiv = document.getElementById('typing-indicator');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    /**
     * مسح المحادثة
     */
    clearChat() {
        const chatContainer = document.getElementById('aiChatContainer');
        if (!chatContainer) return;
        
        if (confirm(this.currentLanguage === 'ar' 
            ? 'هل تريد مسح محادثتك مع المساعد الذكي؟'
            : 'Clear your chat with AI assistant?')) {
            
            chatContainer.innerHTML = '';
            this.conversationHistory = [];
            localStorage.removeItem('skylynx_ai_history');
            this.showWelcomeMessage();
        }
    }

    /**
     * حفظ المحادثة
     */
    saveToHistory(userMessage, aiResponse) {
        this.conversationHistory.push(
            { role: "user", content: userMessage },
            { role: "assistant", content: aiResponse }
        );
        
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }
        
        localStorage.setItem('skylynx_ai_history', JSON.stringify(this.conversationHistory));
    }

    /**
     * تحميل المحفوظات
     */
    loadConversationHistory() {
        try {
            const saved = localStorage.getItem('skylynx_ai_history');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
            }
        } catch (error) {
            console.log('No conversation history found');
        }
    }

    /**
     * التركيز على الإدخال
     */
    focusInput() {
        const input = document.getElementById('aiInput');
        if (input) {
            setTimeout(() => input.focus(), 100);
        }
    }

    /**
     * التمرير للأسفل
     */
    scrollToBottom() {
        const chatContainer = document.getElementById('aiChatContainer');
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }
}

// بدء النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    window.skylynxAI = new SkyLynxAIAssistant();
});

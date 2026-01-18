/**
 * SkyLynx AI Assistant - Enhanced Local Version
 * Version: 3.5.0 - Smart City Detection & Specific Responses
 */

class SkyLynxAIAssistant {
    constructor() {
        this.currentLanguage = 'en';
        this.conversationHistory = [];
        this.isTyping = false;
        
        // قاعدة معرفة شاملة بالسفر الفاخر مع تحسينات
        this.knowledgeBase = this.createEnhancedKnowledgeBase();
        
        this.initialize();
    }

    /**
     * إنشاء قاعدة المعرفة المحسنة
     */
    createEnhancedKnowledgeBase() {
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
                }
            },
            
            // فنادق 5 نجوم - محسنة مع مدن أكثر
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
                            'فور سيزونز دبي - الخدمة العالمية في قلب دبي',
                            'جميرا بيتش هوتل - على شاطئ جميرا الخاص',
                            'فندق أرماني - التصميم في برج خليفة'
                        ],
                        english: [
                            'Burj Al Arab - Dubai icon with 7-star service',
                            'Atlantis The Palm - Waterpark and luxury combined',
                            'Palace Hotel - Authentic Arabian luxury',
                            'Bulgari Hotel - Italian design on the island',
                            'Four Seasons Dubai - Global service in heart of Dubai',
                            'Jumeirah Beach Hotel - On private Jumeirah beach',
                            'Armani Hotel - Design in Burj Khalifa'
                        ]
                    },
                    paris: {
                        arabic: [
                            'فور سيزونز جورج الخامس - الفخامة الفرنسية التقليدية',
                            'ريتز باريس - التاريخ والأناقة منذ 1898',
                            'شانغريلا - مناظر برج إيفل المذهلة',
                            'لو بريستول - الأناقة الباريسية العصرية',
                            'فندق دي كريلون - القصر على شانزليزيه',
                            'بينالي باريس - الفخامة الفنية المعاصرة',
                            'فندق كوستيس - التراث والحداثة'
                        ],
                        english: [
                            'Four Seasons George V - Traditional French luxury',
                            'Ritz Paris - History and elegance since 1898',
                            'Shangri-La - Breathtaking Eiffel Tower views',
                            'Le Bristol - Modern Parisian elegance',
                            'Hotel de Crillon - Palace on Champs-Élysées',
                            'Bvlgari Paris - Contemporary artistic luxury',
                            'Hotel Costes - Heritage meets modernity'
                        ]
                    },
                    london: {
                        arabic: [
                            'كلاريدج - الأناقة البريطانية في مايفير',
                            'ذا ريتز لندن - الشاي الفاخر والتقاليد',
                            'شانغريلا لندن - أعلى فندق في أوروبا الغربية',
                            'روز وود لندن - الفخامة في هولبورن',
                            'فندق سافوي - التاريخ على نهر التايمز',
                            'ميدان - الفخامة المعاصرة في بيلغريف',
                            'فندق كوناوت - الأناقة في مايفير'
                        ],
                        english: [
                            'Claridge\'s - British elegance in Mayfair',
                            'The Ritz London - Luxury afternoon tea and tradition',
                            'Shangri-La London - Highest hotel in Western Europe',
                            'Rosewood London - Luxury in Holborn',
                            'The Savoy - History on the River Thames',
                            'The Mayfair - Contemporary luxury in Belgravia',
                            'Connaught Hotel - Elegance in Mayfair'
                        ]
                    },
                    ottawa: {
                        arabic: [
                            'فيرمونت شاتو لورييه - القصر التاريخي في قلب أوتاوا',
                            'ويستن أوتاوا - الفخامة الحديثة مع إطلالة على البرلمان',
                            'شيراتون أوتاوا - الموقع المركزي والخدمة المتميزة',
                            'بروكلفيلد هوتل آند سويتس - الأناقة في منطقة بايورد',
                            'أنداز أوتاوا بايورد ماركت - التصميم المعاصر الفاخر',
                            'نوفوتيل أوتاوا - الفخامة المعاصرة بالقرب من المتاحف',
                            'أركاندير رويال - التراث والأناقة الفرنسية الكندية'
                        ],
                        english: [
                            'Fairmont Château Laurier - Historic castle in heart of Ottawa',
                            'The Westin Ottawa - Modern luxury with Parliament views',
                            'Sheraton Ottawa - Central location with premium service',
                            'Brookstreet Hotel & Suites - Elegance in Kanata tech area',
                            'Andaz Ottawa ByWard Market - Contemporary luxury design',
                            'Novotel Ottawa - Modern luxury near museums',
                            'Arcandier Royal - French-Canadian heritage & elegance'
                        ]
                    },
                    toronto: {
                        arabic: [
                            'فور سيزونز تورنتو - الفخامة في قلب المدينة',
                            'شيراتون سنتر تورنتو - أكبر فندق في كندا',
                            'ريتز كارلتون تورنتو - الأناقة على خليج تورنتو',
                            'فيرمونت رويال يورك - التاريخ والتراث',
                            'إنتركونتيننتال تورنتو - الإطلالة على برج CN',
                            'هازلتون هوتل - الفخامة في يوركفيل',
                            'ذا دريك هوتل - التصميم الفني المعاصر'
                        ],
                        english: [
                            'Four Seasons Toronto - Luxury in city center',
                            'Sheraton Centre Toronto - Largest hotel in Canada',
                            'Ritz Carlton Toronto - Elegance on Toronto Bay',
                            'Fairmont Royal York - History and heritage',
                            'InterContinental Toronto - CN Tower views',
                            'Hazelton Hotel - Luxury in Yorkville',
                            'The Drake Hotel - Contemporary art design'
                        ]
                    },
                    vancouver: {
                        arabic: [
                            'فيرمونت هوتل فانكوفر - الفخامة في وسط المدينة',
                            'شيراتون وول إن هوتل - على الواجهة البحرية',
                            'بان باسيفيك هوتل - الإطلالة على الميناء',
                            'روز وود هوتل جورجيا - التراث المعاد تجديده',
                            'فندق لودج - الأناقة في جاستاون',
                            'أوبس هوتل - الفخامة البوتيكية',
                            'سوتون بليس هوتل - الأناقة في وسط المدينة'
                        ],
                        english: [
                            'Fairmont Hotel Vancouver - Luxury in downtown',
                            'Sheraton Wall Centre Hotel - On waterfront',
                            'Pan Pacific Hotel - Harbor views',
                            'Rosewood Hotel Georgia - Heritage restored',
                            'Loden Hotel - Elegance in Gastown',
                            'Opus Hotel - Boutique luxury',
                            'Sutton Place Hotel - Elegance in downtown'
                        ]
                    }
                },
                
                // تصنيفات الفنادق حسب النوع
                hotelCategories: {
                    luxury: {
                        arabic: 'فاخر (5 نجوم، خدمات VIP، مواقع متميزة)',
                        english: 'Luxury (5-star, VIP services, prime locations)'
                    },
                    boutique: {
                        arabic: 'بوتيك (تصميم فريد، خدمات مخصصة، حميمية)',
                        english: 'Boutique (unique design, personalized service, intimacy)'
                    },
                    budgetLuxury: {
                        arabic: 'فاخر بميزانية (4 نجوم، قيمة ممتازة، خدمات أساسية)',
                        english: 'Budget Luxury (4-star, excellent value, essential services)'
                    }
                }
            },
            
            // نصائح السفر المحسنة
            travelTips: {
                flights: {
                    arabic: [
                        'احجز قبل 6-8 أسابيع للرحلات الدولية للحصول على أفضل الأسعار',
                        'سافر أيام الثلاثاء والأربعاء للأسعار المنخفضة',
                        'انضم لبرامج الولاء للحصول على ترقيات مجانية',
                        'استخدم بطاقات السفر المميزة لتراكم الأميال',
                        'احجز مقاعد المقدمة للخروج السريع من الطائرة',
                        'تحقق من تأشيرات الدخول قبل الحجز بشهرين',
                        'استخدم تطبيقات الشركة للحصول على تحديثات فورية'
                    ],
                    english: [
                        'Book 6-8 weeks in advance for international flights for best prices',
                        'Travel on Tuesdays and Wednesdays for lower fares',
                        'Join loyalty programs for free upgrades',
                        'Use premium travel cards for mileage accumulation',
                        'Book front seats for quick aircraft exit',
                        'Check visa requirements 2 months before booking',
                        'Use airline apps for instant flight updates'
                    ]
                },
                
                hotels: {
                    arabic: [
                        'احجز مباشرة عبر موقع الفندق للحصول على أفضل العروض',
                        'اطلب ترقية الغرفة عند الوصول بتهذيب',
                        'استخدم خدمات الكونسيرج للأنشطة والحجوزات',
                        'احجز الإفطار مسبقاً لتوفير المال',
                        'اختر الغرف العالية للإطلالة الأفضل',
                        'تحقق من سياسة الإلغاء قبل الحجز',
                        'استخدم تطبيق الفندق للطلبات السريعة'
                    ],
                    english: [
                        'Book directly through hotel website for best offers',
                        'Politely request room upgrade at check-in',
                        'Use concierge services for activities and reservations',
                        'Book breakfast in advance to save money',
                        'Choose higher floors for better views',
                        'Check cancellation policy before booking',
                        'Use hotel app for quick requests'
                    ]
                },
                
                upgradeTips: {
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
                }
            },
            
            // معلومات المدن
            cityInfo: {
                ottawa: {
                    arabic: {
                        name: 'أوتاوا',
                        description: 'عاصمة كندا ومقر SkyLynx Travel العالمية',
                        bestTime: 'أفضل وقت للزيارة: مايو إلى أكتوبر',
                        attractions: 'المعالم: مبنى البرلمان، قناة ريدو، المتاحف الوطنية، غاتينو بارك',
                        airports: 'المطارات: مطار أوتاوا ماكدونالد-كارتييه (YOW)',
                        tip: 'نصيحة: قم بجولة في البرلمان عند الغروب للإطلالات الرائعة'
                    },
                    english: {
                        name: 'Ottawa',
                        description: 'Canada\'s capital & SkyLynx Travel headquarters',
                        bestTime: 'Best time to visit: May to October',
                        attractions: 'Attractions: Parliament Hill, Rideau Canal, National Museums, Gatineau Park',
                        airports: 'Airports: Ottawa Macdonald-Cartier International (YOW)',
                        tip: 'Tip: Visit Parliament Hill at sunset for stunning views'
                    }
                },
                dubai: {
                    arabic: {
                        name: 'دبي',
                        description: 'لؤلؤة الخليج وعاصمة الفخامة الحديثة',
                        bestTime: 'أفضل وقت للزيارة: نوفمبر إلى مارس',
                        attractions: 'المعالم: برج خليفة، دبي مول، برج العرب، نخلة جميرا',
                        airports: 'المطارات: مطار دبي الدولي (DXB)، مطار آل مكتوم (DWC)',
                        tip: 'نصيحة: استمتع بالسفاري الصحراوي مع عشاء تقليدي'
                    },
                    english: {
                        name: 'Dubai',
                        description: 'Pearl of the Gulf & modern luxury capital',
                        bestTime: 'Best time to visit: November to March',
                        attractions: 'Attractions: Burj Khalifa, Dubai Mall, Burj Al Arab, Palm Jumeirah',
                        airports: 'Airports: Dubai International (DXB), Al Maktoum (DWC)',
                        tip: 'Tip: Enjoy desert safari with traditional dinner'
                    }
                },
                toronto: {
                    arabic: {
                        name: 'تورنتو',
                        description: 'أكبر مدينة في كندا ومركز الأعمال والثقافة',
                        bestTime: 'أفضل وقت للزيارة: يونيو إلى سبتمبر',
                        attractions: 'المعالم: برج CN، منتزه أونتاريو، جزر تورنتو، حديقة الحيوانات',
                        airports: 'المطارات: مطار تورنتو بيرسون (YYZ)',
                        tip: 'نصيحة: اصعد إلى برج CN لمشاهدة بانورامية للمدينة'
                    },
                    english: {
                        name: 'Toronto',
                        description: 'Canada\'s largest city & business/cultural hub',
                        bestTime: 'Best time to visit: June to September',
                        attractions: 'Attractions: CN Tower, Ontario Place, Toronto Islands, Zoo',
                        airports: 'Airports: Toronto Pearson International (YYZ)',
                        tip: 'Tip: Visit CN Tower for panoramic city views'
                    }
                }
            }
        };
    }

    /**
     * تهيئة النظام
     */
    initialize() {
        console.log('🚀 SkyLynx AI Assistant - Enhanced Version Initialized');
        
        // اكتشاف اللغة
        this.currentLanguage = localStorage.getItem('siteLang') || 'en';
        document.body.dir = this.currentLanguage === 'ar' ? 'rtl' : 'ltr';
        
        // إنشاء واجهة المستخدم
        this.createUIElements();
        
        // إعداد مستمعي الأحداث
        this.setupEventListeners();
        
        // تحميل المحفوظات
        this.loadConversationHistory();
        
        console.log('✅ Enhanced AI Assistant Ready - Smart City Detection Enabled');
    }

    /**
     * الحصول على رد الذكاء الاصطناعي - النسخة المحسنة
     */
    getAIResponse(userMessage) {
        const lang = this.currentLanguage;
        const lowerMessage = userMessage.toLowerCase();
        
        // اكتشاف نوع السؤال أولاً
        const questionType = this.detectQuestionType(lowerMessage, userMessage);
        
        switch(questionType) {
            case 'hotel_city_specific':
                return this.getHotelResponse(lang, userMessage);
                
            case 'flight_upgrade':
                return this.getUpgradeResponse(lang);
                
            case 'flight_general':
                return this.getFlightResponse(lang, userMessage);
                
            case 'car_rental':
                return this.getCarResponse(lang);
                
            case 'private_jet':
                return this.getPrivateJetResponse(lang);
                
            case 'pricing':
                return this.getPriceResponse(lang, userMessage);
                
            case 'group_booking':
                return this.getGroupResponse(lang);
                
            case 'greeting':
                return this.getGreetingResponse(lang);
                
            case 'thank_you':
                return this.getThankYouResponse(lang);
                
            case 'city_info':
                return this.getCityInfoResponse(lang, userMessage);
                
            default:
                return this.getGeneralTravelResponse(lang);
        }
    }

    /**
     * اكتشاف نوع السؤال بدقة
     */
    detectQuestionType(message, originalMessage) {
        const lang = this.currentLanguage;
        
        // الترحيب
        if (this.isGreeting(message)) return 'greeting';
        
        // الشكر
        if (this.isThankYou(message)) return 'thank_you';
        
        // فنادق في مدينة محددة
        if (this.isHotelQuery(message) && this.extractDestination(originalMessage)) {
            return 'hotel_city_specific';
        }
        
        // ترقيات الطيران
        if (this.isUpgradeQuery(message)) return 'flight_upgrade';
        
        // رحلات عامة
        if (this.isFlightQuery(message)) return 'flight_general';
        
        // معلومات مدينة
        if (this.isCityInfoQuery(message)) return 'city_info';
        
        // أسعار
        if (this.isPriceQuery(message)) return 'pricing';
        
        // سيارات
        if (this.isCarQuery(message)) return 'car_rental';
        
        // طائرات خاصة
        if (this.isPrivateJetQuery(message)) return 'private_jet';
        
        // مجموعات
        if (this.isGroupQuery(message)) return 'group_booking';
        
        return 'general';
    }

    /**
     * فنادق في مدينة محددة - محسنة
     */
    getHotelResponse(lang, message) {
        const destination = this.extractDestination(message);
        const lowerMessage = message.toLowerCase();
        
        // اكتشاف نوع الفندق المطلوب
        const hotelType = this.detectHotelType(lowerMessage);
        
        if (destination) {
            return this.getSpecificCityHotels(lang, destination, hotelType);
        }
        
        // إذا لم تذكر مدينة، أعطِ قائمة عامة
        return this.getGeneralHotelsResponse(lang);
    }

    /**
     * اكتشاف نوع الفندق المطلوب
     */
    detectHotelType(message) {
        if (message.includes('luxury') || message.includes('فاخر') || message.includes('5 star') || message.includes('5 نجوم')) {
            return 'luxury';
        }
        if (message.includes('boutique') || message.includes('بوتيك') || message.includes('design')) {
            return 'boutique';
        }
        if (message.includes('budget') || message.includes('رخيص') || message.includes('cheap') || message.includes('اقتصادي')) {
            return 'budgetLuxury';
        }
        if (message.includes('best') || message.includes('أفضل') || message.includes('top')) {
            return 'best';
        }
        return 'general';
    }

    /**
     * فنادق مدينة محددة
     */
    getSpecificCityHotels(lang, cityKey, hotelType = 'best') {
        // تحويل مفتاح المدينة (مثل "ottawa" إلى "Ottawa")
        const normalizedKey = cityKey.toLowerCase();
        
        // التحقق إذا كانت المدينة موجودة في قاعدة البيانات
        if (!this.knowledgeBase.hotels.cityHotels[normalizedKey]) {
            return this.getCityNotInDatabaseResponse(lang, cityKey);
        }
        
        const cityData = this.knowledgeBase.cityInfo[normalizedKey];
        const cityName = cityData ? cityData[lang === 'ar' ? 'arabic' : 'english'].name : normalizedKey;
        const hotels = this.knowledgeBase.hotels.cityHotels[normalizedKey][lang === 'ar' ? 'arabic' : 'english'];
        
        // تحديد عدد الفنادق بناءً على نوع السؤال
        let displayedHotels = hotels;
        let hotelCountText = '';
        
        if (hotelType === 'best' || hotelType === 'luxury') {
            displayedHotels = hotels.slice(0, 5); // أفضل 5 فقط
            hotelCountText = lang === 'ar' ? 'أفضل 5 فنادق' : 'Top 5 hotels';
        } else if (hotelType === 'budgetLuxury') {
            displayedHotels = hotels.slice(-3); // آخر 3 (عادة الأرخص)
            hotelCountText = lang === 'ar' ? 'فنادق ذات قيمة ممتازة' : 'Excellent value hotels';
        }
        
        // معلومات المدينة
        const cityInfo = cityData ? this.formatCityInfo(cityData[lang === 'ar' ? 'arabic' : 'english']) : '';
        
        // نص نوع الفندق
        const typeText = this.getHotelTypeText(lang, hotelType);
        
        return lang === 'ar'
            ? `🏨 **${hotelCountText} ${typeText} في ${cityName}**\n\n${displayedHotels.map((h, i) => `${i+1}. ${h}`).join('\n')}\n\n${cityInfo}\n\n**نصائح للحجز في ${cityName}:**\n• احجز قبل 4-6 أسابيع لأفضل الأسعار\n• تحقق من عروض نهاية الأسبوع\n• استخدم كود SkyLynx للحصول على خصم إضافي\n\n**للحجز:** استخدم نموذج الفنادق بالأعلى واكتب "${cityName}"!`
            : `🏨 **${hotelCountText} ${typeText} in ${cityName}**\n\n${displayedHotels.map((h, i) => `${i+1}. ${h}`).join('\n')}\n\n${cityInfo}\n\n**Booking Tips for ${cityName}:**\n• Book 4-6 weeks in advance for best rates\n• Check weekend special offers\n• Use SkyLynx code for additional discount\n\n**To book:** Use the hotels form above and enter "${cityName}"!`;
    }

    /**
     * نص نوع الفندق
     */
    getHotelTypeText(lang, hotelType) {
        const types = {
            luxury: { arabic: 'فاخرة', english: 'luxury' },
            boutique: { arabic: 'بوتيك', english: 'boutique' },
            budgetLuxury: { arabic: 'فاخرة بميزانية', english: 'budget luxury' },
            best: { arabic: '', english: '' },
            general: { arabic: '', english: '' }
        };
        
        return types[hotelType] ? types[hotelType][lang === 'ar' ? 'arabic' : 'english'] : '';
    }

    /**
     * تنسيق معلومات المدينة
     */
    formatCityInfo(cityData) {
        return `**معلومات عن ${cityData.name}:**\n• ${cityData.description}\n• ${cityData.bestTime}\n• ${cityData.attractions}\n• ${cityData.airports}\n• ${cityData.tip}`;
    }

    /**
     * رد عندما المدينة غير موجودة في قاعدة البيانات
     */
    getCityNotInDatabaseResponse(lang, cityName) {
        return lang === 'ar'
            ? `🏨 **فنادق ${cityName}**\n\nعذراً، لا أملك قائمة مفصلة بفنادق ${cityName} حالياً.\n\nلكن يمكنني مساعدتك بالطرق التالية:\n\n1. استخدم نموذج البحث بالأعلى للعثور على فنادق في ${cityName}\n2. اتصل بفريق SkyLynx على +1 (613) XXX-XXXX\n3. اسأل عن مدن أخرى مثل: دبي، باريس، لندن، أوتاوا\n\nسأقوم بإضافة ${cityName} إلى قاعدة بياناتي قريباً!`
            : `🏨 **Hotels in ${cityName}**\n\nSorry, I don\'t have a detailed list for ${cityName} yet.\n\nBut I can help you in these ways:\n\n1. Use the search form above to find hotels in ${cityName}\n2. Call SkyLynx team at +1 (613) XXX-XXXX\n3. Ask about other cities like: Dubai, Paris, London, Ottawa\n\nI\'ll add ${cityName} to my database soon!`;
    }

    /**
     * ردود الترقيات المحسنة
     */
    getUpgradeResponse(lang) {
        const tips = this.knowledgeBase.travelTips.upgradeTips[lang === 'ar' ? 'arabic' : 'english'];
        const topAirlines = this.knowledgeBase.airlines.premium[lang === 'ar' ? 'arabic' : 'english'].slice(0, 5);
        
        return lang === 'ar'
            ? `👑 **كيف تحصل على ترقية في الطائرة؟**\n\n**أهم 10 نصائح للترقية:**\n\n${tips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**أفضل شركات الطيران للترقيات:**\n${topAirlines.map((airline, i) => `${i+1}. ${airline}`).join('\n')}\n\n**خدمات SkyLynx للمساعدة:**\n• مراقبة أسعار الترقيات\n• تفاوض على ترقيات المجموعات\n• استشارات برامج الولاء\n• ترتيب ترقيات عند الحجز\n\n**للحصول على مساعدة:** اتصل بفريق الترقيات لدينا!`
            : `👑 **How to Get a Flight Upgrade?**\n\n**Top 10 Upgrade Tips:**\n\n${tips.map((tip, i) => `${i+1}. ${tip}`).join('\n')}\n\n**Best Airlines for Upgrades:**\n${topAirlines.map((airline, i) => `${i+1}. ${airline}`).join('\n')}\n\n**SkyLynx Upgrade Services:**\n• Upgrade price monitoring\n• Group upgrade negotiations\n• Loyalty program consultations\n• Upgrade arrangements at booking\n\n**For upgrade assistance:** Contact our upgrade team!`;
    }

    /**
     * معلومات المدينة
     */
    getCityInfoResponse(lang, message) {
        const destination = this.extractDestination(message);
        
        if (!destination) {
            return lang === 'ar'
                ? '⚠️ لم أستطع تحديد المدينة. يرجى ذكر اسم المدينة في سؤالك.'
                : '⚠️ Could not detect city. Please mention the city name in your question.';
        }
        
        const normalizedKey = destination.toLowerCase();
        const cityData = this.knowledgeBase.cityInfo[normalizedKey];
        
        if (!cityData) {
            return this.getCityNotInDatabaseResponse(lang, destination);
        }
        
        const info = cityData[lang === 'ar' ? 'arabic' : 'english'];
        
        return lang === 'ar'
            ? `🏙️ **معلومات عن ${info.name}**\n\n${info.description}\n\n**معلومات أساسية:**\n• ${info.bestTime}\n• ${info.attractions}\n• ${info.airports}\n\n**نصيحة SkyLynx:**\n${info.tip}\n\n**للحجز إلى ${info.name}:** استخدم نماذج البحث بالأعلى!`
            : `🏙️ **About ${info.name}**\n\n${info.description}\n\n**Essential Info:**\n• ${info.bestTime}\n• ${info.attractions}\n• ${info.airports}\n\n**SkyLynx Tip:**\n${info.tip}\n\n**To book travel to ${info.name}:** Use the search forms above!`;
    }

    /**
     * اكتشاف أسئلة المعلومات عن المدينة
     */
    isCityInfoQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['معلومات عن', 'عن مدينة', 'تعرف على', 'about', 'info about', 'tell me about']
            : ['about', 'info about', 'tell me about', 'information on'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    /**
     * اكتشاف أسئلة الترقيات
     */
    isUpgradeQuery(message) {
        const keywords = this.currentLanguage === 'ar' 
            ? ['ترقية', 'ترقي', 'upgrade', 'business class', 'first class']
            : ['upgrade', 'business class', 'first class', 'class upgrade'];
        
        return keywords.some(keyword => message.includes(keyword));
    }

    /**
     * استخراج الوجهة المحسنة
     */
    extractDestination(message) {
        const destinations = [
            // الدول العربية
            'dubai', 'dhabi', 'abu dhabi', 'riyadh', 'jeddah', 'doha', 
            'muscat', 'manama', 'kuwait', 'cairo', 'beirut', 'amman',
            'casablanca', 'rabat', 'tunis', 'algiers',
            
            // المدن العالمية
            'paris', 'london', 'new york', 'tokyo', 'singapore', 'bangkok',
            'istanbul', 'milan', 'rome', 'barcelona', 'madrid', 'geneva',
            'sydney', 'melbourne', 'vancouver', 'toronto', 'montreal',
            
            // مدن كندا (مهم!)
            'ottawa', 'toronto', 'vancouver', 'montreal', 'calgary',
            'edmonton', 'winnipeg', 'quebec', 'halifax', 'victoria',
            
            // المدن بالعربية
            'دبي', 'أبوظبي', 'الرياض', 'جدة', 'الدوحة', 'مسقط',
            'المنامة', 'الكويت', 'القاهرة', 'بيروت', 'عمان', 'الدار البيضاء',
            'باريس', 'لندن', 'نيويورك', 'طوكيو', 'سنغافورة', 'بانكوك',
            'إسطنبول', 'ميلان', 'روما', 'برشلونة', 'مدريد', 'جنيف',
            'أوتاوا', 'تورنتو', 'فانكوفر', 'مونتريال', 'كالجاري'
        ];
        
        const lowerMsg = message.toLowerCase();
        
        // البحث عن مطابقة مباشرة أولاً
        for (const dest of destinations) {
            if (lowerMsg.includes(' ' + dest.toLowerCase() + ' ') || 
                lowerMsg.startsWith(dest.toLowerCase() + ' ') ||
                lowerMsg.endsWith(' ' + dest.toLowerCase()) ||
                lowerMsg === dest.toLowerCase()) {
                return dest;
            }
        }
        
        // إذا لم توجد مطابقة مباشرة، ابحث عن أي وجود
        for (const dest of destinations) {
            if (lowerMsg.includes(dest.toLowerCase())) {
                return dest;
            }
        }
        
        return null;
    }

    /**
     * باقي الدوال تبقى كما هي مع بعض التحسينات الطفيفة
     */
    // ... [بقية الدوال تبقى كما هي مع التحسينات المذكورة سابقاً] ...
}

// بدء النظام
document.addEventListener('DOMContentLoaded', function() {
    window.skylynxAI = new SkyLynxAIAssistant();
});
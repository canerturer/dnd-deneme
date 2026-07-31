/**
 * D&D 5e Nexus - Subclasses Database (2024 PHB)
 * Subclass definitions starting with Barbarian (Barbar).
 */
window.DnDNexus = window.DnDNexus || {};

window.DnDNexus.SUBCLASSES_DATA = {
  barbarian: {
    className: "Barbar (Barbarian)",
    classKey: "barbarian",
    subclasses: [
      {
        id: "path-of-the-berserker",
        name: "Path of the Berserker (Berserker Yolu)",
        shortDesc: "Saf öfke, şiddetli saldırılar ve durdurulamaz bir savaş hırsına odaklanan klasik Barbar yolu.",
        icon: "🪓",
        features: [
          {
            level: 3,
            name: "Frenzy (Gözü Dönmüşlük)",
            desc: "Rage aktifken bir turda Reckless Attack kullanarak ilk başarılı vuruşunuzu yaptığınızda ekstra Frenzy hasarı verirsiniz. Bu ekstra hasar Frenzy zarı kadardır (Level 3: +1d6, Level 9: +2d6, Level 16: +3d6 Force Damage)."
          },
          {
            level: 6,
            name: "Mindless Rage (Bilinçsiz Öfke)",
            desc: "Rage modundayken Charm (Büyülenme) ve Frightened (Korkma) durumlarına karşı bağışıklık kazanırsınız. Eğer Rage başladığında bu durumlardan birinin altındaysanız, etki Rage süresince askıya alınır."
          },
          {
            level: 10,
            name: "Retaliating Strike (Misilleme Vuruşu)",
            desc: "Sizden 5 feet mesafe içindeki bir düşman size hasar verdiğinde, Reaksiyonunuzu (Reaction) kullanarak o düşmana bir yakın dövüş saldırısı yapabilirsiniz."
          },
          {
            level: 14,
            name: "Intimidating Presence (Korkutucu Varlık)",
            desc: "Bonus Action ile 30 feet etrafınızdaki yaratıkları korkutabilirsiniz. Düşmanlar Wisdom Saving Throw (DC = 8 + PB + STR Mod) başarısız olursa 1 dakika boyunca Frightened durumuna girer."
          }
        ]
      },
      {
        id: "path-of-the-wild-heart",
        name: "Path of the Wild Heart (Yaban Kalbi Yolu / Totem)",
        shortDesc: "Doğa ruhları ve koruyucu hayvanların kadim güçleriyle bezenmiş ruhani Barbar yolu.",
        icon: "🐻",
        features: [
          {
            level: 3,
            name: "Rage of the Wilds (Yabanıl Öfke Biçimleri)",
            desc: "Rage açtığınızda 3 hayvandan birinin ruhunu seçersiniz:\n• Bear (Ayı): Psychic hariç TÜM hasar türlerine direnç kazanırsınız.\n• Eagle (Kartal): Bonus Action ile Dash ve Disengage yapabilirsiniz.\n• Wolf (Kurt): 5 feet yakınındaki düşmanlara müttefikleriniz Advantage ile saldırır."
          },
          {
            level: 6,
            name: "Aspect of the Beast (Hayvan Görünümü)",
            desc: "Ruhani bir yetenek kazanırsınız:\n• Elephant: İtme ve düşürme efektlerine karşı Advantage ve taşıma kapasitesi 2 katı.\n• Owl: 60 feet Darkvision (Karanlıkta Görme).\n• Spider: Tırmanma hızı yürüyüş hızınıza eşitlenir."
          },
          {
            level: 10,
            name: "Nature Speaker (Doğa Konuşucusu)",
            desc: "Commune with Nature büyüsünü Ritüel olarak büyü slotu harcamadan atabilirsiniz."
          },
          {
            level: 14,
            name: "Power of the Wilds (Yabanın Gücü)",
            desc: "Rage sırasında ek bir koruyucu ruh gücü kazanırsınız:\n• Falcon: Turunuz sırasında süzülerek kısa süreli uçuş hızı kazanırsınız.\n• Lion: Etrafınızdaki düşmanların size yapacağı yakın dövüş dışı saldırılar Disadvantage alır."
          }
        ]
      },
      {
        id: "path-of-the-world-tree",
        name: "Path of the World Tree (Dünya Ağacı Yolu)",
        shortDesc: "Yggdrasil ve kozmik ağacın köklerinden yaşam gücü ve ışınlanma gücü alan yeni 2024 Barbar yolu.",
        icon: "🌲",
        features: [
          {
            level: 3,
            name: "Vitality of the Tree (Ağacın Canlılığı)",
            desc: "Rage açtığınızda Barbar seviyeniz kadar Geçici Can (Temp HP) kazanırsınız. Ayrıca turlarınızın başında yakındaki bir müttefiğinize Temp HP aktarabilirsiniz."
          },
          {
            level: 3,
            name: "Branches of the Tree (Ağacın Dalları)",
            desc: "Reaksiyonunuzu kullanarak 30 feet içindeki bir yaratığı köklerle yakalayıp yanınıza veya 5 feet uzağınıza ışınlayabilirsiniz (DC = 8 + PB + STR Mod)."
          },
          {
            level: 6,
            name: "Battering Roots (Yıkıcı Kökler)",
            desc: "Heavy veya Versatile silahlarla saldırdığınızda silahınızın menzili +10 feet artar ve Push/Topple mastery özelliklerini ücretsiz kullanabilirsiniz."
          },
          {
            level: 10,
            name: "Travel Along the Tree (Ağaç Yoluyla Seyahat)",
            desc: "Rage açtığınızda ve tur başında Bonus Action ile 60 feet mesafeye anında ışınlanabilirsiniz."
          },
          {
            level: 14,
            name: "Branches of the World Tree (Dünya Ağacının Dalları)",
            desc: "Rage sırasında devasa kökler etrafınızı sarar. 30 feet etrafınızdaki düşmanlar zorlu araziye (Difficult Terrain) girer ve vurulduğunda yere serilir."
          }
        ]
      },
      {
        id: "path-of-the-zealot",
        name: "Path of the Zealot (Fanatik Yolu)",
        shortDesc: "Tanrıların ilahi gazabı ve yok edilemez inançla hedefleri küle çeviren kutsal Barbar yolu.",
        icon: "⚡",
        features: [
          {
            level: 3,
            name: "Divine Fury (İlahi Gazap)",
            desc: "Rage modundayken her turdaki ilk başarılı silah saldırınız ekstra 1d6 + (Barbar Seviyesi / 2) Necrotic veya Radiant hasar verir."
          },
          {
            level: 3,
            name: "Warrior of the Gods (Tanrıların Savaşçısı)",
            desc: "Sizi ölümden geri getirecek büyüler (Revivify, Raise Dead vb.) malzeme bileşeni (Elmas vb.) gerektirmez."
          },
          {
            level: 6,
            name: "Fanatical Focus (Fanatik Odaklanma)",
            desc: "Rage modundayken başarısız olduğunuz bir Kurtarma Zarını (Saving Throw) Rage başına 1 kez tekrar atabilirsiniz."
          },
          {
            level: 10,
            name: "Zealous Presence (Fanatik Varlık)",
            desc: "Bonus Action ile 60 feet içindeki en fazla 10 müttefiğinize 1 tur boyunca saldırı ve kurtarma zarlarında Advantage kazandırırsınız."
          },
          {
            level: 14,
            name: "Rage Beyond Death (Ölümün Ötesinde Öfke)",
            desc: "Canınız 0 HP'ye düşse dahi bilincinizi kaybetmezsiniz. Death Saving Throw başarısızlıkları birikse bile Rage bitene kadar savaşmaya devam edersiniz."
          }
        ]
      }
    ]
  },
  bard: {
    className: "Ozan (Bard)",
    classKey: "bard",
    subclasses: [
      {
        id: "college-of-dance",
        name: "College of Dance (Dans Koleji)",
        shortDesc: "Büyü, ritmik hareketler ve silahsız zarif dövüş sanatlarını birleştiren kıvrak Ozan yolu.",
        icon: "💃",
        features: [
          {
            level: 3,
            name: "Dazzling Footwork (Göz Alıcı Adımlar)",
            desc: "Zırhsız Savunma kazanırsınız (AC = 10 + DEX Mod + CHA Mod). Silahsız vuruşlarınız Bardic Inspiration zarı kadar (1d6/1d8/1d10/1d12) Bludgeoning hasar verir. Bardic Inspiration harcadığınızda Fırsat Saldırısı (Opportunity Attack) yemeden hareket edebilirsiniz."
          },
          {
            level: 6,
            name: "Inspiring Movement (İlham Veren Hareket)",
            desc: "5 feet yakınınızda bir düşman turunu bitirdiğinde, Reaksiyon ile hızınızın yarısı kadar hareket edebilir ve yakınınızdaki 1 müttefiğinize de hareket hakkı tanıyabilirsiniz."
          },
          {
            level: 6,
            name: "Tandem Footwork (Birlikte İnisiyatif)",
            desc: "İnisiyatif zarı atıldığında 1 Bardic Inspiration harcayarak kendinize ve 60 feet içindeki müttefiklerinize Bardic Inspiration zarı kadar +İnisiyatif bonusu eklersiniz!"
          },
          {
            level: 14,
            name: "Leading Evasion (Lider Kaçınma)",
            desc: "DEX Saving Throw atan büyü/alan efektlerinde Evasion kazanırsınız (Başarılı olursa 0 hasar, başarısız olursa yarım hasar). 5 feet yakınınızdaki müttefikler de bu Evasion etkisinden yararlanır."
          }
        ]
      },
      {
        id: "college-of-glamour",
        name: "College of Glamour (Cazibe Koleji)",
        shortDesc: "Feywild elflerinin büyüleyici, hipnotize edici ve karşı konulmaz büyü sanatlarına odaklanan Ozan yolu.",
        icon: "🎭",
        features: [
          {
            level: 3,
            name: "Beguiling Magic (Büyüleyici Büyü)",
            desc: "Charm Person ve Mirror Image büyüleri her zaman hazırlanmıştır. Herhangi bir Enchantment veya Illusion büyüsü attığınızda 60 feet içindeki bir yaratığı Wisdom Saving Throw atarak Büyüleyebilir (Charm) veya Korkutabilirsiniz (Frighten)."
          },
          {
            level: 3,
            name: "Mantle of Inspiration (İlham Pelerini)",
            desc: "Bonus Action ile 1 Bardic Inspiration harcayarak 60 feet içindeki müttefiklerinize Bardic Inspiration zarının 2 katı + CHA Mod kadar Geçici Can (Temp HP) verirsiniz ve Fırsat Saldırısı yemeden anında hareket etmelerini sağlarsınız."
          },
          {
            level: 6,
            name: "Mantle of Majesty (Haşmet Pelerini)",
            desc: "Bonus Action ile 1 dakika boyunca büyü slotu harcamadan her tur Command büyüsü atabilirsiniz."
          },
          {
            level: 14,
            name: "Unbreakable Majesty (Yıkılmaz Haşmet)",
            desc: "Bonus Action ile 1 dakika boyunca büyüleyici bir görünüme bürünürsünüz. Size saldıran düşmanlar Charisma Saving Throw atamazsa saldırı ıskalar."
          }
        ]
      },
      {
        id: "college-of-lore",
        name: "College of Lore (Bilgelik Koleji)",
        shortDesc: "Kadim bilgi, çok yönlü yetenekler ve diğer sınıfların gizli büyülerini ustaca kullanan bilgi uzmanı Ozan.",
        icon: "📖",
        features: [
          {
            level: 3,
            name: "Bonus Proficiencies (Ek Yetenekler)",
            desc: "İstediğiniz 3 farklı Skill (Yetenek) üzerinde anında Proficiency kazanırsınız."
          },
          {
            level: 3,
            name: "Cutting Words (Keskin Sözler)",
            desc: "60 feet içindeki bir düşman Saldırı Zarı, Yetenek Kontrolü veya Hasar Zarı attığında Reaksiyonunuz ile 1 Bardic Inspiration harcayıp zar sonucundan Bardic Inspiration zarını düşürürsünüz!"
          },
          {
            level: 6,
            name: "Magical Secrets (Büyülü Sırlar)",
            desc: "TÜM sınıfların (Wizard, Cleric, Druid vb.) büyü listelerinden istediğiniz 2 büyüyü öğrenirsiniz!"
          },
          {
            level: 14,
            name: "Peerless Skill (Eşsiz Yetenek)",
            desc: "Bir Yetenek Kontrolü (Ability Check) veya Saldırı Zarı attığınızda başarısız olursanız 1 Bardic Inspiration harcayıp zarı sonuca eklersiniz."
          }
        ]
      },
      {
        id: "college-of-valor",
        name: "College of Valor (Yiğitlik Koleji)",
        shortDesc: "Zırh, kalkan ve savaş silahları kullanarak ön saflarda müttefiklerini coşturan kahraman savaşçı Ozan.",
        icon: "⚔️",
        features: [
          {
            level: 3,
            name: "Bonus Proficiencies (Savaş Yeterlilikleri)",
            desc: "Medium Armor (Orta Zırh), Shields (Kalkanlar) ve Martial Weapons (Savaş Silahları) üzerinde yetkinlik kazanırsınız."
          },
          {
            level: 3,
            name: "Combat Inspiration (Savaşçıl İlham)",
            desc: "Verdiğiniz Bardic Inspiration müttefikler tarafından ek Silah Hasarı zarı olarak eklenebilir veya düşman vuruşunda Reaksiyon olarak AC (Zırh Sınıfı) bonusu olarak kullanılabilir!"
          },
          {
            level: 6,
            name: "Extra Attack (Ekstra Saldırı)",
            desc: "Saldırı aksiyonu yaptığınızda turda 2 kez saldırabilirsiniz. İsterseniz bu vuruşlardan birinin yerine bir Cantrip (Seviyesiz Büyü) atabilirsiniz!"
          },
          {
            level: 14,
            name: "Battle Magic (Savaş Büyüsü)",
            desc: "Aksiyonunuzla 1 Bard büyüsü attığınızda, Bonus Action ile anında 1 silah saldırısı yapabilirsiniz."
          }
        ]
      }
    ]
  },
  cleric: {
    className: "Ruhban (Cleric)",
    classKey: "cleric",
    subclasses: [
      {
        id: "life-domain",
        name: "Life Domain (Yaşam Etki Alanı)",
        shortDesc: "Kutsal iyileştirme, yaşam enerjisi ve mucizevi şifa büyülerinde uzmanlaşmış koruyucu Ruhban.",
        icon: "☀️",
        features: [
          {
            level: 3,
            name: "Disciple of Life (Yaşam Müriti)",
            desc: "1. Seviye veya daha yüksek bir iyileştirme büyüsü attığınızda, hedef fazladan (2 + Büyü Seviyesi) kadar ekstra HP kazanır."
          },
          {
            level: 3,
            name: "Preserve Life (Yaşamı Koru - Channel Divinity)",
            desc: "Channel Divinity harcayarak 30 feet etrafınızdaki yaratıklara toplam (5 x Ruhban Seviyeniz) kadar HP dağıtabilirsiniz (Maximum HP'lerinin yarısına kadar)."
          },
          {
            level: 6,
            name: "Blessed Healer (Kutsanmış Şifacı)",
            desc: "Başka bir yaratığa iyileştirme büyüsü attığınızda kendinizi de (2 + Büyü Seviyesi) kadar otomatik iyileştirirsiniz."
          },
          {
            level: 17,
            name: "Supreme Healing (Yüce Şifa)",
            desc: "Büyü veya Channel Divinity ile birini iyileştirirken zar atmazsınız; tüm şifa zarları doğrudan MAKSİMUM değerini verir!"
          }
        ]
      },
      {
        id: "light-domain",
        name: "Light Domain (Işık Etki Alanı)",
        shortDesc: "Güneşin ateşi, arındırıcı ışık ve ilahi alevlerle karanlığı yok eden ışık Ruhbanı.",
        icon: "🛡️",
        features: [
          {
            level: 3,
            name: "Warding Flare (Koruyucu Parlama)",
            desc: "30 feet içindeki bir düşman size veya bir müttefiğinize saldırdığında Reaksiyon atarak düşmana Disadvantage (Dezavantaj) verdirebilirsiniz (Wisdom Mod kadar / Long Rest)."
          },
          {
            level: 3,
            name: "Radiance of the Dawn (Şafak Işıması - Channel Divinity)",
            desc: "Channel Divinity ile 30 feet etraftaki büyülü karanlığı dağıtır ve tüm düşmanlara 2d10 + Ruhban Seviyeniz kadar Radiant (İlahi) hasar verirsiniz (Constitution Save DC = 8 + PB + WIS Mod ile yarım hasar)."
          },
          {
            level: 6,
            name: "Improved Flare (Gelişmiş Parlama)",
            desc: "Warding Flare yeteneğini 30 feet içindeki bir MÜTTEFİĞİNİZ saldırmaya uğradığında da Reaksiyon ile kullanabilirsiniz."
          },
          {
            level: 17,
            name: "Corona of Light (Işık Halesi)",
            desc: "Aksiyon ile 1 dakika boyunca 60 feet alana güneş ışığı saçarsınız. Alandaki düşmanlar Ateş ve İlahi (Radiant) hasar büyülerinize karşı Saving Throw'larda Disadvantage alır."
          }
        ]
      },
      {
        id: "trickery-domain",
        name: "Trickery Domain (Hilekarlık / Düzenbazlık Etki Alanı)",
        shortDesc: "İllüzyonlar, kurnazlık, gizlilik ve şaşırtmacalarla rakiplerini alt eden düzenbaz Ruhban.",
        icon: "🔮",
        features: [
          {
            level: 3,
            name: "Blessing of the Trickster (Hilekarın Kutsaması)",
            desc: "Aksiyon ile dokunduğunuz 1 yaratığa bir sonraki Long Rest'e kadar Stealth (Gizlilik) zarlarında Advantage kazandırırsınız."
          },
          {
            level: 3,
            name: "Invoke Duplicity (Kopya İllüzyonu - Channel Divinity)",
            desc: "Channel Divinity ile 30 feet uzakta illüzyondan bir kopyanızı oluşturursunuz. Büyülerinizi bu kopyanın konumundan atabilir ve kopyanın 5 feet yakınındaki düşmanlara Advantage ile saldırabilirsiniz."
          },
          {
            level: 6,
            name: "Trickster's Transposition (Hilekarın Yer Değiştirmesi)",
            desc: "Kopyanızı hareket ettirdiğinizde (Bonus Action), anında kopyanızla yer değiştirebilirsiniz (Teleport)."
          },
          {
            level: 17,
            name: "Improved Duplicity (Gelişmiş İllüzyon Kopya)",
            desc: "Aynı anda 4 farklı kopyanızı oluşturabilirsiniz. Kopyaların yakınındaki müttefikler Advantage kazanır."
          }
        ]
      },
      {
        id: "war-domain",
        name: "War Domain (Savaş Etki Alanı)",
        shortDesc: "Ağır zırhlar, kalkanlar ve savaş silahlarıyla savaş alanına ilahi zafer getiren komutan Ruhban.",
        icon: "⚡",
        features: [
          {
            level: 3,
            name: "Bonus Proficiencies (Savaş Yeterlilikleri)",
            desc: "Heavy Armor (Ağır Zırh) ve Martial Weapons (Savaş Silahları) üzerinde yetkinlik kazanırsınız."
          },
          {
            level: 3,
            name: "War Priest (Savaş Rahibi)",
            desc: "Saldırı Aksiyonu yaptığınızda Bonus Action ile fazladan 1 silah saldırısı yapabilirsiniz (Wisdom Mod kadar / Long Rest)."
          },
          {
            level: 3,
            name: "Guided Strike (Rehber Vuruş - Channel Divinity)",
            desc: "Siz veya 30 feet içindeki bir müttefik Saldırı Zarı attığında Channel Divinity harcayarak zara ANINDA +10 İsabet Bonusu eklersiniz!"
          },
          {
            level: 6,
            name: "War God's Blessing (Savaş Tanrısı Kutsaması)",
            desc: "Guided Strike yeteneğinizi 30 feet içindeki müttefikleriniz saldırdığında Reaksiyon olarak da verebilirsiniz."
          },
          {
            level: 17,
            name: "Avatar of Battle (Savaş Avatarı)",
            desc: "Büyülü olmayan fiziksel vuruşlara karşı Bludgeoning, Piercing ve Slashing Hasar Direnci (Half Damage) kazanırsınız."
          }
        ]
      }
    ]
  },
  druid: {
    className: "Druid (Doğa Rahibi)",
    classKey: "druid",
    subclasses: [
      {
        id: "circle-of-the-moon",
        name: "Circle of the Moon (Ay Çemberi)",
        shortDesc: "Vahşi canavar dönüşümleri (Wild Shape), elemental vuruşlar ve ay büyücülüğünde uzmanlaşmış savaşçı Druid.",
        icon: "🌕",
        features: [
          {
            level: 3,
            name: "Combat Wild Shape (Savaşıl Canavar Dönüşümü)",
            desc: "Bonus Action ile bir canavara dönüşebilirsiniz (Wild Shape). Dönüştüğünüzde (3 x Druid Seviyeniz) kadar Geçici Can (Temp HP) kazanırsınız. Zırh Sınıfınız (AC) canavarın AC'sinden yüksekse (13 + WIS Mod) olur!"
          },
          {
            level: 3,
            name: "Circle Spells (Çember Büyüleri)",
            desc: "Cure Wounds, Moonbeam, Starry Wisp gibi büyüler her zaman hazırlanmıştır."
          },
          {
            level: 6,
            name: "Improved Elemental Strikes (Gelişmiş Elemental Vuruşlar)",
            desc: "Canavar formundayken vuruşlarınız fazladan +1d6 Radiant (İlahi) veya Cold (Soğuk) hasarı verir."
          },
          {
            level: 10,
            name: "Moonlight Step (Ay Işığı Adımı)",
            desc: "Bonus Action ile 30 feet uzağa ışınlanabilir (WIS Mod / Long Rest) ve bir sonraki saldırınıza Advantage kazandırabilirsiniz."
          },
          {
            level: 14,
            name: "Lunar Form (Ay Biçimi)",
            desc: "Canavar formundayken Radiant hasar bonusunuz +2d6'ya çıkar ve müttefiklerinize Temp HP sağlarsınız."
          }
        ]
      },
      {
        id: "circle-of-the-land",
        name: "Circle of the Land (Diyar Çemberi)",
        shortDesc: "Biyomların (Kutup, Çöl, Orman, Dağ) elemental büyüleri ve doğadan büyü slotu yenileme ustası Druid.",
        icon: "🏔️",
        features: [
          {
            level: 3,
            name: "Land Biome Choice (Biyom Seçimi)",
            desc: "Long Rest tamamladığınızda bir Biyom seçersiniz (Arid, Polar, Temperate, Tropical). O biyoma özel Fireball, Haste, Ice Storm, Invisibility gibi güçlü büyüler hazır olur."
          },
          {
            level: 3,
            name: "Natural Recovery (Doğal İyileşme)",
            desc: "Short Rest sırasında Druid seviyenizin yarısına kadar harcanmış Büyü Slotlarını geri kazanırsınız (1/Long Rest)."
          },
          {
            level: 6,
            name: "Land's Stride (Diyar Adımı)",
            desc: "Büyülü olmayan zorlu arazilerde (Difficult Terrain) hız kaybetmeden hareket edersiniz. Sarmaşık ve bitki büyülerine karşı Advantage."
          },
          {
            level: 10,
            name: "Nature's Ward (Doğanın Muhafazası)",
            desc: "Zehirlenmeye (Poisoned) ve Hastalıklara karşı bağışıklık kazanırsınız."
          },
          {
            level: 14,
            name: "Nature's Sanctuary (Doğanın Sığınağı)",
            desc: "Canavarlar ve bitki yaratıkları size saldırmadan önce Wisdom Saving Throw (DC = 8 + PB + WIS Mod) atamazsa saldıramaz!"
          }
        ]
      },
      {
        id: "circle-of-the-sea",
        name: "Circle of the Sea (Deniz Çemberi)",
        shortDesc: "Okyanus fırtınaları, şimşekler ve su elemental aurasıyla düşmanları savuran deniz Druidi.",
        icon: "🌊",
        features: [
          {
            level: 3,
            name: "Wrath of the Sea (Denizin Gazabı)",
            desc: "1 Wild Shape harcayarak 10 dakika boyunca 10 feetlik fırtına aurası açarsınız. Her tur Bonus Action ile 10 feet içindeki düşmana d6'lık Cold/Lightning hasarı verip (Lvl 3: 1d6, Lvl 6: 2d6, Lvl 10: 3d6, Lvl 14: 4d6) 15 feet geriye itebilirsiniz (CON Save DC = 8 + PB + WIS Mod)."
          },
          {
            level: 6,
            name: "Aquatic Adaptation (Sucul Uyum)",
            desc: "Yüzme hızı (Swim Speed) kazanırsınız, su altında nefes alabilirsiniz ve Cold (Soğuk) Hasar Direnci kazanırsınız."
          },
          {
            level: 10,
            name: "Stormborn (Fırtınaduran)",
            desc: "Wrath of the Sea aura çapı 15 feete çıkar ve uçma hızı kazanırsınız."
          },
          {
            level: 14,
            name: "Oceanic Form (Okyanus Biçimi)",
            desc: "Wrath of the Sea aktifken fiziksel hasarlara (Bludgeoning, Piercing, Slashing) karşı Direnç kazanırsınız."
          }
        ]
      },
      {
        id: "circle-of-stars",
        name: "Circle of Stars (Yıldızlar Çemberi)",
        shortDesc: "Takımyıldızların gücü, ışık okları ve kehanet haritalarıyla müttefiklerine yol gösteren göksel Druid.",
        icon: "🌸",
        features: [
          {
            level: 3,
            name: "Star Map (Yıldız Haritası)",
            desc: "Guidance cantrip'i ve Guiding Bolt büyüsünü slot harcamadan atabilirsiniz (PB kadar / Long Rest)."
          },
          {
            level: 3,
            name: "Starry Form (Yıldızlı Biçim)",
            desc: "1 Wild Shape harcayarak 10 dakika boyunca ışıldayan 3 takımyıldız formundan birine bürünürsünüz:\n• 🏹 Archer (Okçu): Bonus Action ile 60 ft uzaktaki düşmana 1d8 + WIS Mod Radiant Hasar atışı.\n• 🏺 Chalice (Kadeh): İyileştirme büyüsü atınca müttefiğinize ekstra +1d8 + WIS Mod HP şifa.\n• 🐉 Dragon (Ejderha): Konsantrasyon (CON/WIS/INT) zarlarında 9 ve altı zarları 10 sayarsınız!"
          },
          {
            level: 6,
            name: "Cosmic Omen (Kozmik Kehanet)",
            desc: "Long Rest sonrası 1d6 atarsınız: Çift ise Weal (Müttefiğe +1d6 zar bonusu), Tek ise Woe (Düşmana -1d6 zar cezası) Reaksiyon atabilirsiniz."
          },
          {
            level: 10,
            name: "Twinkling Constellations (Işıldayan Takımyıldızlar)",
            desc: "Starry Form zarları 2d8'e yükselir ve her tur başında form değiştirebilirsiniz!"
          },
          {
            level: 14,
            name: "Starry Flare (Yıldız Parlaması)",
            desc: "Starry Form aktifken fiziksel hasarlara (Bludgeoning, Piercing, Slashing) karşı Hasar Direnci kazanırsınız."
          }
        ]
      }
    ]
  },
  fighter: {
    className: "Savaşçı (Fighter)",
    classKey: "fighter",
    subclasses: [
      {
        id: "battle-master",
        name: "Battle Master (Dövüş Ustası)",
        shortDesc: "Üstünlük zarları (Superiority Dice) ve zengin taktik manevralarla savaş alanına hükmeden usta Savaşçı.",
        icon: "🛡️",
        features: [
          {
            level: 3,
            name: "Combat Superiority (Savaş Üstünlüğü)",
            desc: "4 adet Superiority Zarı (d8/d10/d12) kazanırsınız (Short/Long Rest'te yenilenir). 3 Manevra öğrenirsiniz (Precision Attack, Trip Attack, Riposte, Commander's Strike, Menacing Attack vb.). Manevra Save DC = 8 + PB + STR/DEX Mod."
          },
          {
            level: 3,
            name: "Student of War (Savaş Öğrencisi)",
            desc: "1 adet zanaatkar aleti (Artisan's Tool) üzerinde yetkinlik kazanırsınız."
          },
          {
            level: 7,
            name: "Know Your Enemy (Düşmanını Tanı)",
            desc: "Bonus Action ile 30 feet içindeki bir düşmanın AC, Save bonusları veya Dirençlerini analiz edersiniz."
          },
          {
            level: 10,
            name: "Improved Superiority (Gelişmiş Üstünlük Zarı)",
            desc: "Superiority zarlarınız d10 seviyesine yükselir ve ekstra 1 zar daha kazanırsınız."
          },
          {
            level: 15,
            name: "Relentless (Yılmayan)",
            desc: "Turda 1 kez hiç Superiority zarınız kalmadığında harcamadan 1d8 Manevra zarı atabilirsiniz!"
          }
        ]
      },
      {
        id: "eldritch-knight",
        name: "Eldritch Knight (Büyülü Şövalye)",
        shortDesc: "Silah ustalığı ile koruma (Abjuration) ve yıkıcı alan büyülerini (Evocation) birleştiren büyücü Savaşçı.",
        icon: "🔮",
        features: [
          {
            level: 3,
            name: "Spellcasting (Büyücülük)",
            desc: "Abjuration ve Evocation oklarından büyü atarsınız (INT tabanlı). Shield, Absorb Elements, Misty Step, Fireball gibi büyüler öğrenebilirsiniz."
          },
          {
            level: 3,
            name: "Weapon Bond (Silah Bağı)",
            desc: "2 silah ile bağ kurarsınız. Bonus Action ile aynı düzlemin neresinde olursa olsun silahı anında elinize ışınlayabilirsiniz; silah elinizden düşürülemez."
          },
          {
            level: 7,
            name: "War Magic (Savaş Büyüsü)",
            desc: "Saldırı aksiyonu yaptığınızda vuruşlarınızdan birinin yerine bir Cantrip (Seviyesiz Büyü) atabilirsiniz!"
          },
          {
            level: 10,
            name: "Eldritch Strike (Büyülü Vuruş)",
            desc: "Bir yaratığı silahla vurduğunuzda, o yaratık sonraki turunuzun sonuna kadar büyülerinize karşı atacağı Saving Throw'larda Disadvantage alır!"
          },
          {
            level: 15,
            name: "Arcane Charge (Büyülü Hücum)",
            desc: "Action Surge kullandığınızda anında 30 feet uzağa ışınlanabilirsiniz (Teleport)."
          }
        ]
      },
      {
        id: "champion",
        name: "Champion (Şampiyon)",
        shortDesc: "Saf fiziksel mükemmellik, yıkıcı Kritik Vuruşlar ve durdurulamaz atletik direnç sahibi Şampiyon.",
        icon: "👑",
        features: [
          {
            level: 3,
            name: "Improved Critical (Gelişmiş Kritik Vuruş)",
            desc: "Saldırı zarlarınızda Kritik Vuruş aralığı genişler; 19 veya 20 attığınızda KRİTİK VURURSUNUZ!"
          },
          {
            level: 3,
            name: "Remarkable Athlete (Kayda Değer Atlet)",
            desc: "Athletics yetenek zarlarında ve İnisiyatif (Initiative) zarlarında Advantage kazanırsınız!"
          },
          {
            level: 7,
            name: "Additional Fighting Style (Ekstra Dövüş Stili)",
            desc: "İkinci bir Dövüş Stili Feat'i seçebilirsiniz (Archery, Defense, Dueling, Great Weapon Fighting vb.)."
          },
          {
            level: 10,
            name: "Heroic Warrior (Kahraman Savaşçı)",
            desc: "Turunuzun başında Heroic Inspiration hakkınız yoksa anında bedava Heroic Inspiration kazanırsınız!"
          },
          {
            level: 15,
            name: "Survivor (Hayatta Kalan)",
            desc: "Turunuzun başında HP'niz yarıdan azsa anında 5 + CON Mod kadar HP yenilersiniz (Regeneration)!"
          }
        ]
      },
      {
        id: "psi-warrior",
        name: "Psi Warrior (Zihinsel Savaşçı)",
        shortDesc: "Telekinetik zihin gücü, psi kalkanları ve psionik darbelerle savaşan zihinsel savaşçı.",
        icon: "🗡️",
        features: [
          {
            level: 3,
            name: "Psionic Power (Psionik Güç)",
            desc: "2 x PB adet Psionic Energy zarı kazanırsınız (d6/d8/d10/d12):\n• 🛡️ Protective Field: Reaksiyon ile müttefiğin aldığı hasarı (1d6/d8/d10/d12 + INT Mod) düşürürsünüz.\n• 🗡️ Psionic Strike: Vuruşta fazladan (1d6/d8/d10/d12 + INT Mod) Force Damage eklersiniz.\n• 🌀 Telekinetic Movement: 30 ft içindeki nesne veya müttefiği hareket ettirirsiniz."
          },
          {
            level: 7,
            name: "Telekinetic Leap (Telekinetik Sıçrama)",
            desc: "Bonus Action ile tur sonuna kadar yürüme hızınızın 2 katı kadar Uçma Hızı (Fly Speed) kazanırsınız."
          },
          {
            level: 10,
            name: "Telekinetic Shield (Telekinetik Kalkan)",
            desc: "Reaksiyon ile kendinize veya 30 ft içindeki müttefiğinize Half Cover (+2 AC) sağlarsınız."
          },
          {
            level: 15,
            name: "Bulwark of Force (Zihin Kalkanı)",
            desc: "Aksiyon ile 30 feet içindeki müttefiklerinize 1 dakika boyunca Half Cover (+2 AC ve DEX Save) verirsiniz!"
          }
        ]
      }
    ]
  },
  monk: {
    className: "Keşiş (Monk)",
    subclasses: [
      {
        id: "warrior-of-mercy",
        name: "Warrior of Mercy (Merhamet Savaşçısı)",
        shortDesc: "Şifa ve zehir sanatlarını birleştirerek yaşam veren ve alan kutsal keşiş.",
        icon: "☯️",
        features: [
          {
            level: 3,
            name: "Implements of Mercy (Merhamet Aletleri)",
            desc: "Insight (Sezi) ve Medicine (Tıp) yeteneklerinde uzmanlık (Proficiency) ve Herbalism Kit kazanırsınız."
          },
          {
            level: 3,
            name: "Hand of Healing & Harm (Şifa ve Hasar Eli)",
            desc: "• 💚 Hand of Healing: 1 Focus Point harcayarak (veya Flurry of Blows sırasında 1 vuruş yerine) dokunduğunuz birine (Martial Arts Zarı + WIS Mod) HP iyileştirirsiniz.\n• 💀 Hand of Harm: Turda 1 kez Unarmed Strike vurduğunuzda 1 Focus Point harcayıp fazladan (Martial Arts Zarı + WIS Mod) Necrotic hasar verir ve hedefi sonraki tur sonuna kadar Poisoned (Zehirlenmiş) yaparsınız."
          },
          {
            level: 6,
            name: "Physician's Touch (Hekim Dokunuşu)",
            desc: "Hand of Healing uyguladığınızda hedefin Körlük, Sağırlık, Felç, Zehirlenme veya Sersemleme (Stunned) durumunu temizlersiniz! Hand of Harm zarsız otomatik zehirler!"
          },
          {
            level: 11,
            name: "Flurry of Healing and Harm (Şifa ve Hasar Kasırgası)",
            desc: "Flurry of Blows kullandığınızda Unarmed Strike vuruşlarınızdan bazılarını Hand of Healing veya Hand of Harm ile ekstra Focus Point harcamadan birleştirebilirsiniz!"
          },
          {
            level: 17,
            name: "Hand of Ultimate Mercy (Yüce Merhamet Eli)",
            desc: "Aksiyon ile 5 Focus Point harcayarak son 24 saat içinde ölmüş bir canlıyı 0 altın malzeme harcamadan anında full HP ile hayata döndürürsünüz!"
          }
        ]
      },
      {
        id: "warrior-of-shadow",
        name: "Warrior of Shadow (Gölge Savaşçısı)",
        shortDesc: "Gölgelerin içinden ışınlanan, karanlığı silah olarak kullanan ninja keşiş.",
        icon: "🥷",
        features: [
          {
            level: 3,
            name: "Shadow Arts (Gölge Sanatları)",
            desc: "• 🌑 Darkness Büyüsü: 1 Focus Point ile Darkness atabilirsiniz. Kendi yaptığınız karanlığın içini net bir şekilde görebilirsiniz!\n• 👁️ Darkvision: 60 ft Karanlıkta Görme (zaten varsa +60 ft).\n• 🎭 Minor Illusion Cantrip."
          },
          {
            level: 6,
            name: "Shadow Step (Gölge Adımı)",
            desc: "Bonus Action ile Alacakaranlık/Karanlık alandan 60 ft içindeki başka bir karanlık alana ışınlanırsınız ve ilk Unarmed Strike zarına Advantage kazanırsınız!"
          },
          {
            level: 11,
            name: "Improved Shadow Step (Gelişmiş Gölge Adımı)",
            desc: "Shadow Step kullandıktan hemen sonra 1 Focus Point harcayarak bedava 1 Unarmed Strike vurabilirsiniz!"
          },
          {
            level: 17,
            name: "Shadow Form (Gölge Biçimi)",
            desc: "3 Focus Point harcayarak 1 dakika boyunca gölge biçimine girersiniz: Tüm fiziksel ve elemental hasarlara karşı Direnç kazanırsınız ve nesnelerin içinden geçebilirsiniz!"
          }
        ]
      },
      {
        id: "warrior-of-the-elements",
        name: "Warrior of the Elements (Elemental Savaşçı)",
        shortDesc: "Ateş, Buz, Yıldırım ve Asit elementlerini vücuduna aktaran element ustası.",
        icon: "🐉",
        features: [
          {
            level: 3,
            name: "Elemental Attunement (Elemental Uyum)",
            desc: "Bonus Action ile 1 Focus Point harcayıp 10 dakika boyunca Elemental Harez kazanırsınız:\n• 🤛 Reach & Damage: Silahsız vuruşlarınız +10 ft menzil kazanır ve Asit, Buz, Ateş, Yıldırım veya Gürleme hasarı verir.\n• 🌀 Push/Pull: Turda 1 kez vuruşta hedef Güç Save atamazsa (DC = 8 + PB + WIS Mod) 10 ft itilir veya çekilir."
          },
          {
            level: 6,
            name: "Environmental Stride (Çevresel Adım)",
            desc: "Elemental Attunement aktifken Yüzme ve Uçma Hızınız (Swim/Fly Speed) Yürüme Hızınıza eşit olur!"
          },
          {
            level: 11,
            name: "Stride of the Elements (Elementlerin Adımı)",
            desc: "Elemental Attunement açıkken uçma hızınız 20 feet daha artar ve zorlu arazilerden etkilenmezsiniz."
          },
          {
            level: 17,
            name: "Avatar of the Elements (Elementlerin Avatarı)",
            desc: "Elemental Attunement aktifken Asit, Buz, Ateş, Yıldırım ve Gürleme hasarlarına karşı tam Direnç (Resistance) kazanırsınız!"
          }
        ]
      },
      {
        id: "warrior-of-the-open-hand",
        name: "Warrior of the Open Hand (Açık El Savaşçısı)",
        shortDesc: "Saf dövüş sanatları, titretici vuruşlar ve beden bütünlüğü ustası geleneksel keşiş.",
        icon: "👊",
        features: [
          {
            level: 3,
            name: "Open Hand Technique (Açık El Tekniği)",
            desc: "Flurry of Blows ile Unarmed Strike vurduğunuzda hedefe şu 3 etkiden birini uygularsınız:\n• 🌀 Knockdown: DEX Save (DC = 8 + PB + WIS Mod) atamazsa Yere Düşer (Prone).\n• 💥 Push: STR Save (DC = 8 + PB + WIS Mod) atamazsa 15 ft Uzağa İtilir.\n• 🚫 No Reactions: Sonraki tur sonuna kadar Reaksiyon kullanamaz."
          },
          {
            level: 6,
            name: "Wholeness of Body (Beden Bütünlüğü)",
            desc: "Bonus Action ile (WIS Mod kadar / Long Rest) anında (Martial Arts Zarı + WIS Mod) HP iyileştirir ve 1 harcanmış Focus Point geri kazanırsınız!"
          },
          {
            level: 11,
            name: "Fleet Step (Hızlı Adım)",
            desc: "Bonus Action kullanmadan Step of the Wind kullanarak hareket edebilirsiniz."
          },
          {
            level: 17,
            name: "Quivering Palm (Titreşimli Avuç)",
            desc: "4 Focus Point harcayarak hedefin bedenine gizli titreşimler yerleştirirsiniz. Aksiyon ile titreşimi patlatırsınız: CON Save (DC = 8 + PB + WIS Mod) atamazsa ANINDA 0 HP'ye DÜŞER! Başarılı olursa 10d12 Force Damage alır!"
          }
        ]
      }
    ]
  },
  paladin: {
    className: "Şövalye (Paladin)",
    subclasses: [
      {
        id: "oath-of-devotion",
        name: "Oath of Devotion (Adanmışlık Yemini)",
        shortDesc: "Adalet, erdem ve parlak ışıkla şövalyelik yemininin en saf temsilcisi.",
        icon: "🛡️",
        features: [
          {
            level: 3,
            name: "Sacred Weapon (Kutsal Silah - Channel Divinity)",
            desc: "Bonus Action ile 1 Channel Divinity harcayarak 10 dakika boyunca silahınıza CHA Mod kadar İsabet Bonusu eklersiniz ve silah 20 ft Parlak Işık saçar."
          },
          {
            level: 3,
            name: "Oath Spells (Yemin Büyüleri)",
            desc: "Protection from Evil and Good, Shield of Faith, Zone of Truth, Beacon of Hope büyüleri her zaman hazırlanmıştır."
          },
          {
            level: 6,
            name: "Aura of Devotion (Adanmışlık Halesi)",
            desc: "Siz ve 10 ft etrafınızdaki müttefikleriniz Charmed (Büyülenme) durumuna karşı tam bağışıklık kazanırsınız."
          },
          {
            level: 10,
            name: "Smite of Protection (Koruyucu Vuruş)",
            desc: "Divine Smite attığınızda kendinize ve 10 ft etrafınızdaki müttefiklerinize 1 sonraki tur başına kadar Half Cover (+2 AC & DEX Save) kazandırırsınız!"
          },
          {
            level: 14,
            name: "Holy Nimbus (Kutsal Hale)",
            desc: "Aksiyon ile (1 dk): 30 ft etraftaki düşmanlara tur başlarında (5 + CHA Mod) Radiant damage verirsiniz ve Fiend/Undead zarlarına karşı Advantage kazanırsınız!"
          }
        ]
      },
      {
        id: "oath-of-glory",
        name: "Oath of Glory (Zafer Yemini)",
        shortDesc: "Atletik mükemmellik, ilham verici zaferler ve efsanevi kahramanlık yemini eden Şövalye.",
        icon: "👑",
        features: [
          {
            level: 3,
            name: "Peerless Athlete & Inspiring Smite (Channel Divinity)",
            desc: "• 🏃 Peerless Athlete: 10 dk boyunca Athletics/Acrobatics Advantage & 2x Taşıma Kapasitesi.\n• 🌟 Inspiring Smite: Divine Smite sonrası 30 ft etrafınızdaki müttefiklerinize toplam (2d8 + Paladin Lvl) Temp HP dağıtırsınız."
          },
          {
            level: 6,
            name: "Aura of Alacrity (Çeviklik Halesi)",
            desc: "Hızınız +10 ft artar. Tur başında 10 ft yakınınızdaki müttefikler de +10 ft hareket hızı kazanır."
          },
          {
            level: 10,
            name: "Glorious Defense (Görkemli Savunma)",
            desc: "Siz veya 10 ft yakınınızdaki müttefik vurulduğunda Reaksiyon ile (1d8 + CHA Mod) AC ekleyebilirsiniz. Iskalarsa anında 1 silah saldırısı yaparsınız!"
          },
          {
            level: 14,
            name: "Living Legend (Yaşayan Efsane)",
            desc: "Bonus Action (1 dk): Charisma zarlarına Advantage, turda 1 kez ıskalayan vuruşu isabete çevirme ve Reaksiyon ile başarısız Save'i tekrar atma!"
          }
        ]
      },
      {
        id: "oath-of-the-ancients",
        name: "Oath of the Ancients (Kadimler Yemini)",
        shortDesc: "Doğayı, neşeyi ve yaşamın ışığını korumaya ant içmiş sarmaşık ve fırtına Şövalyesi.",
        icon: "🌿",
        features: [
          {
            level: 3,
            name: "Nature's Wrath (Doğanın Gazabı - Channel Divinity)",
            desc: "Aksiyon ile 15 ft içindeki düşmanları köklerle bağlarsınız (STR/DEX Save DC = 8 + PB + CHA Mod atamazsa Restrained)."
          },
          {
            level: 6,
            name: "Aura of Warding (Muhafaza Halesi)",
            desc: "Siz ve 10 ft etrafınızdaki müttefikleriniz BÜYÜ HASARLARINA (Spell Damage) karşı tam Direnç (Resistance - Yarım Hasar) kazanırsınız!"
          },
          {
            level: 10,
            name: "Undying Sentinel (Ölümsüz Nöbetçi)",
            desc: "HP 0'a düştüğünde ölmek yerine 1 HP ile ayakta kalırsınız (1/Long Rest) ve yaşlanma etkilerinden etkilenmezsiniz."
          },
          {
            level: 14,
            name: "Elder Champion (Kadim Şampiyon)",
            desc: "Aksiyon (1 dk): Her tur başında 10 HP iyileşirsiniz, Paladin büyülerini Bonus Action olarak atarsınız ve 10 ft düşmanlar büyülerinize karşı Disadvantage alır!"
          }
        ]
      },
      {
        id: "oath-of-vengeance",
        name: "Oath of Vengeance (İntikam Yemini)",
        shortDesc: "Kötülüğü kökünden kazımak için intikam yemini eden, acımasız avcı Şövalye.",
        icon: "💀",
        features: [
          {
            level: 3,
            name: "Vow of Enmity (Düşmanlık Yemini - Channel Divinity)",
            desc: "Bonus Action ile 30 ft içindeki 1 hedefi işaretlersiniz: 1 dakika boyunca o hedefe karşı tüm vuruşlarınız ADVANTAGE kazanır! Target ölürse yemini başkasına aktarabilirsiniz."
          },
          {
            level: 6,
            name: "Relentless Avenger (Yılmaz İntikamcı)",
            desc: "Fırsat Saldırısı vurduğunuzda Reaksiyonunuzun parçası olarak hızınızın yarısı kadar Fırsat Saldırısı yemeden hareket edebilirsiniz."
          },
          {
            level: 10,
            name: "Soul of Vengeance (İntikam Ruhu)",
            desc: "Vow of Enmity hedefiniz saldırdığında Reaksiyon ile o hedefe anında 1 yakın dövüş silah saldırısı yaparsınız!"
          },
          {
            level: 14,
            name: "Avenging Angel (İntikam Meleği)",
            desc: "Aksiyon (1 dk): 60 ft Uçma Hızı (Fly Speed) ve 30 ft Korku Halesi (Frightening Aura) kazanırsınız!"
          }
        ]
      }
    ]
  },
  ranger: {
    className: "Korucu (Ranger)",
    subclasses: [
      {
        id: "beast-master",
        name: "Beast Master (Canavar Ustası)",
        shortDesc: "Ruhani ve ilkel bir canavarla sarsılmaz bir bağ kuran usta avcı.",
        icon: "🦅",
        features: [
          {
            level: 3,
            name: "Primal Companion (İlkel Yoldaş)",
            desc: "Karada (Land), Denizde (Sea) veya Gökte (Sky) yaşayan ilkel bir canavar çağırırsınız (AC = 13 + PB, HP = 5 + 5x Ranger Lvl). Saldırı aksiyonunuzdaki 1 vuruş yerine canavarınıza vuruş yaptırabilirsiniz!"
          },
          {
            level: 6,
            name: "Exceptional Training (Olağanüstü Eğitim)",
            desc: "Bonus Action ile canavarınıza Dash, Disengage, Dodge veya Help emri verebilirsiniz. Canavarınızın vuruşları istenirse Force Damage verir."
          },
          {
            level: 10,
            name: "Bestial Fury (Vahşi Öfke)",
            desc: "Canavarınıza saldırma emri verdiğinizde 1 yerine 2 Saldırı (Extra Attack) yapar!"
          },
          {
            level: 14,
            name: "Share Spells (Büyü Paylaşımı)",
            desc: "Kendinize attığınız büyü 30 ft yakınınızdaki ilkel yoldaşınızı da aynı anda etkiler!"
          }
        ]
      },
      {
        id: "fey-wanderer",
        name: "Fey Wanderer (Perili Gezgin)",
        shortDesc: "Peri diyarının (Feywild) sihri, neşesi ve illüzyonlarıyla bezenmiş büyüleyici Korucu.",
        icon: "🌿",
        features: [
          {
            level: 3,
            name: "Dreadful Strikes & Otherworldly Glamour",
            desc: "• 🗡️ Dreadful Strikes: Turda 1 kez vurduğunuz hedefe +1d4 Psychic Damage (Level 11'de 1d6).\n• ✨ Otherworldly Glamour: Tüm Charisma zarlarınıza WIS Mod eklersiniz!"
          },
          {
            level: 6,
            name: "Beguiling Twist (Büyüleyici Bükülme)",
            desc: "Charm ve Frighten Save zarlarınız Advantage kazanır. Siz veya 120 ft yakınınızdaki canlı Charm/Fear Save başarınca Reaction ile 120 ft içindeki düşmana WIS Save (DC = 8 + PB + WIS Mod) veya Charm/Frighten attırırsınız!"
          },
          {
            level: 10,
            name: "Fey Reinforcements (Peri Takviyesi)",
            desc: "Summon Fey büyüsünü $0 malzeme ile ve Konsantrasyon GEREKTİRMEDEN 1 dakika boyunca atabilirsiniz (1/Long Rest veya 3.+ Lvl Slot)!"
          },
          {
            level: 14,
            name: "Misty Wanderer (Sisli Gezgin)",
            desc: "Misty Step büyüsünü slot harcamadan (WIS Mod / Long Rest) atabilir ve yanınızda 5 ft içindeki 1 müttefiği de ışınlayabilirsiniz!"
          }
        ]
      },
      {
        id: "gloom-stalker",
        name: "Gloom Stalker (Karanlık Takipçi)",
        shortDesc: "Zifiri karanlıklarda ve Underdark derinliklerinde görünmezlik ve ölümcül pusu ustası.",
        icon: "🏹",
        features: [
          {
            level: 3,
            name: "Dread Ambusher & Umbral Sight",
            desc: "• ⚡ Dread Ambusher: İnisiyatife WIS Mod ekleyin. Savaşın ilk turunda +10 ft Hız & 1 Ekstra Saldırı (+1d8 Cold/Fire/Psychic/Radiant Dmg).\n• 👁️ Umbral Sight: 60 ft Darkvision & Karanlıkta Darkvision kullanan yaratıklara karşı GÖRÜNMEZ olursunuz!"
          },
          {
            level: 6,
            name: "Iron Mind (Demir Zihin)",
            desc: "Wisdom Saving Throw yetkinliği kazanırsınız (zaten varsa INT veya CHA Save yetkinliği)."
          },
          {
            level: 10,
            name: "Stalker's Flurry (Pusu Kasırgası)",
            desc: "Turda 1 kez silah ıskaladığınızda anında 1 ek vuruş yapabilirsiniz VEYA Dread Ambusher vuruşunda 10 ft yakındaki 2. hedefe ekstra hasar sekersiniz!"
          },
          {
            level: 14,
            name: "Shadowy Dodge (Gölgesel Kaçınma)",
            desc: "Düşman size vururken Reaction ile Disadvantage verirsiniz. Düşman ıskalarsa anında 30 ft uzağa ışınlanırsınız (Teleport)!"
          }
        ]
      },
      {
        id: "hunter",
        name: "Hunter (Avcı)",
        shortDesc: "Devasa canavarlarla ve kalabalık düşman gruplarıyla savaşmak için uzmanlaşmış av ustası.",
        icon: "🗡️",
        features: [
          {
            level: 3,
            name: "Hunter's Prey & Hunter's Lore",
            desc: "• 🎯 Hunter's Prey: Colossus Slayer (Canı tam olmayan hedefe +1d8), Goliath Slayer (Büyük yaratığa +1d8) veya Horde Breaker (5 ft içindeki 2. hedefe ekstra vuruş).\n• 📜 Hunter's Lore: Hunter's Mark attığınız hedefin tüm Direnç (Resistance), Bağışıklık (Immunity) ve Zayıflıklarını (Vulnerability) anında öğrenirsiniz!"
          },
          {
            level: 6,
            name: "Defensive Tactics (Savunma Taktikleri)",
            desc: "Escape the Horde (Fırsat saldırılarına Disadvantage), Multiattack Defense (Hedef vurduktan sonra tur sonuna kadar +4 AC) veya Steel Will (Fear Save Advantage)."
          },
          {
            level: 10,
            name: "Superior Hunter's Prey (Üstün Avcı Gazabı)",
            desc: "Hunter's Mark büyüsünü vurduğunuzda etkisini ve fazladan hasarını 30 ft yakındaki 2. bir yaratığa da aynı anda uygularsınız!"
          },
          {
            level: 14,
            name: "Superior Hunter's Defense (Üstün Avcı Savunması)",
            desc: "Vurulduğunuzda Reaction ile Yarım Hasar alırsınız VEYA gelen saldırıyı 5 ft yakındaki başka bir yaratığa saptırırsınız!"
          }
        ]
      }
    ]
  },
  rogue: {
    className: "Hırsız (Rogue)",
    subclasses: [
      {
        id: "arcane-trickster",
        name: "Arcane Trickster (Büyülü Düzenbaz)",
        shortDesc: "İllüzyon ve büyücülük sanatını hırsızlık yetenekleriyle harmanlayan zeki düzenbaz.",
        icon: "🗡️",
        features: [
          {
            level: 3,
            name: "Spellcasting & Mage Hand Legerdemain",
            desc: "Wizard büyü listesinden büyü kullanırsınız (INT temelli). Görünmez Mage Hand ile uzaktan kilit açabilir, tuzak bozabilir ve ceplerden eşya çalabilirsiniz!"
          },
          {
            level: 6,
            name: "Magical Ambush (Büyülü Pusu)",
            desc: "Bir yaratıktan saklanıyorken (Hidden) ona büyü attığınızda, o yaratık büyünün Saving Throw zarına DISADVANTAGE alır!"
          },
          {
            level: 10,
            name: "Versatile Trickster (Çok Yönlü Düzenbaz)",
            desc: "Bonus Action ile Mage Hand'i düşmanın 5 ft yakınında şaşırtmaca için kullanırsınız: Tur sonuna kadar o hedefe vuruşlarınız ADVANTAGE kazanır!"
          },
          {
            level: 14,
            name: "Spell Thief (Büyü Hırsızı)",
            desc: "Reaction: Size büyü atıldığında Save attırırsınız (DC = 8 + PB + INT Mod). Başarısız olursa büyünün etkisini engeller ve 8 saatliğine o büyüyü ÇALARSINIZ!"
          }
        ]
      },
      {
        id: "assassin",
        name: "Assassin (Suikastçı)",
        shortDesc: "Pusu, zehir ve ilk turda tek vuruşla ölümcül infaz konusunda uzmanlaşmış katil.",
        icon: "🩸",
        features: [
          {
            level: 3,
            name: "Assassinate & Bonus Proficiencies",
            desc: "• 🩸 Assassinate: İnisiyatife Advantage! Savaşın 1. turunda henüz oynamamış düşmanlara karşı tüm vuruşlar ADVANTAGE kazanır ve vurursa +Rogue Level ekstra hasar verir!\n• 🧪 Kit Yetkinlikleri: Disguise Kit & Poisoner's Kit kazanır."
          },
          {
            level: 6,
            name: "Infiltration Expertise (Sızma Uzmanlığı)",
            desc: "Kılık değiştirme, kimlik taklidi ve deception zarlarında Advantage kazanırsınız. Kusursuz sahte kimlikler oluşturabilirsiniz."
          },
          {
            level: 10,
            name: "Envenom Weapons (Zehirli Silahlar)",
            desc: "Bonus Action ile silaha zehir sürersiniz. Sneak Attack hasarınız Zehir Hasarına (Poison Damage) dönüşebilir ve düşmanın Zehir Direncini (Poison Resistance) yok sayar!"
          },
          {
            level: 14,
            name: "Death Strike (Ölüm Vuruşu)",
            desc: "Savaşın 1. turunda Assassinate ile vurduğunuz hedef CON Save atar (DC = 8 + PB + DEX Mod). Elenirse verdiğiniz TOPLAM HASAR 2'YE KATLANIR (Double Damage)!"
          }
        ]
      },
      {
        id: "soulknife",
        name: "Soulknife (Ruh Bıçağı)",
        shortDesc: "Zihninin psişik gücünü ölümcül psi-bıçaklara dönüştüren zihinsel suikastçı.",
        icon: "🃏",
        features: [
          {
            level: 3,
            name: "Psionic Power & Psychic Blades",
            desc: "• 🧠 Psi zarları (2x PB adet d6/d8/d10/d12). Başarısız yetenek zarında zarı ekle (yalnızca başarıya ulaşırsa harcanır!).\n• 🔮 Psychic Whispers: Zihinsel telepati.\n• ⚔️ Psychic Blades: Ellerinizde oluşan psişik bıçaklar (1d6 Psychic Dmg, 60 ft fırlatma, Bonus Action 1d4 bıçak saldırısı)!"
          },
          {
            level: 6,
            name: "Soul Blades (Ruh Bıçakları)",
            desc: "• 🎯 Homing Strikes: Psi-bıçak ıskalarsa Psi Zarı ekle (yalnızca ıska vurursa harcanır!).\n• 🌀 Psychic Teleportation: Bonus Action ile fırlatılan bıçağın konumuna ışınlan (Psi Zarı x10 ft uzaklık)."
          },
          {
            level: 10,
            name: "Psychic Veil (Psişik Peçe)",
            desc: "Aksiyon ile 1 saat boyunca GÖRÜNMEZ olursunuz (1/Long Rest veya Psi Zarı harcayarak)!"
          },
          {
            level: 14,
            name: "Rend Mind (Zihin Parçalama)",
            desc: "Psychic Blade ile Sneak Attack vurduğunuzda hedef WIS Save atar (DC = 8 + PB + DEX Mod). Elenirse 1 dakika boyunca STUNNED (Sersemlemiş) olur!"
          }
        ]
      },
      {
        id: "thief",
        name: "Thief (Hırsız)",
        shortDesc: "Çabuk elleri, tırmanış çevikliği ve sihirli eşyaları kural tanımadan kullanmasıyla tanınan usta hırsız.",
        icon: "🔑",
        features: [
          {
            level: 3,
            name: "Fast Hands & Second-Story Work",
            desc: "• 🖐️ Fast Hands: Bonus Action ile kilit açma, tuzak bozma veya iksir/sihirli eşya kullanma (Utilize Action).\n• 🏃 Second-Story Work: Tırmanma Hızı = Normal Hız & Zıplama mesafesine +DEX Mod."
          },
          {
            level: 6,
            name: "Supreme Sneak (Üstün Gizlilik)",
            desc: "Cunning Strike seçeneği (Stealthy Attack): Sneak Attack zarından 1d6 düşürerek saldırsanız bile GİZLİ (Hidden) kalmaya devam edersiniz!"
          },
          {
            level: 10,
            name: "Use Magic Device (Sihirli Eşya Kullanımı)",
            desc: "4. Sihirli Eşya Uyum (Attunement) slotu kazanırsınız! Sınıf kısıtlaması olmadan her türlü büyü parşömenini (Scroll) okuyabilirsiniz."
          },
          {
            level: 14,
            name: "Thief's Reflexes (Hırsız Refleksleri)",
            desc: "Savaşın ilk turunda TAM 2 DEFA TUR ALIRSINIZ! (1. tur inisiyatifinizde, 2. tur inisiyatifiniz - 10 seviyesinde)."
          }
        ]
      }
    ]
  },
  sorcerer: {
    className: "Soysoylu (Sorcerer)",
    subclasses: [
      {
        id: "aberrant-sorcery",
        name: "Aberrant Sorcery (Sapqın / Astral Soysoylu)",
        shortDesc: "Kozmik derinliklerden ve uzay ötesi varlıklardan psişik güçler alan büyücü.",
        icon: "⚡",
        features: [
          {
            level: 3,
            name: "Psionic Spells & Telepathic Speech",
            desc: "10 köken büyüsü otomatik bilinir. Bonus Action ile 30 ft içindeki canlıyla zihinsel telepati kurarsınız (Sorcerer Lvl dakika sürer)."
          },
          {
            level: 6,
            name: "Psionic Sorcery & Psychic Defenses",
            desc: "• 🧠 Psionic Sorcery: Köken büyülerini seviyesi kadar Sorcery Point harcayarak Sözel (V), Somatik (S) ve Malzeme (M) bileşeni OLMADAN atabilirsiniz!\n• 🛡️ Psychic Defenses: Psychic Hasar Direnci & Charm/Fear Save zarlarına Advantage."
          },
          {
            level: 10,
            name: "Revelation in Flesh (Beden Vahyi)",
            desc: "Bonus Action: 1 Sorcery Point harcayarak 10 dakika boyunca 1 form kazanın: Görünmezlik Görme, Uçma Hızı, Suda Yüzme/Nefes Alma veya 1 inçlik aralıklardan geçebilme!"
          },
          {
            level: 14,
            name: "Warping Implosion (Uzam İç çöküşü)",
            desc: "Action: 120 ft uzağa ışınlanırsınız; eski konumunuzun 30 ft etrafındaki herkes STR Save atar (DC = 8 + PB + CHA Mod). Elenenler 3d10 Force Hasarı alır ve eski konumunuza çekilir!"
          }
        ]
      },
      {
        id: "clockwork-sorcery",
        name: "Clockwork Sorcery (Çarklı / Mekanik Soysoylu)",
        shortDesc: "Mechanus diyarının mutlak düzen, çark ve denge sihrini damarlarında taşıyan büyücü.",
        icon: "✨",
        features: [
          {
            level: 3,
            name: "Clockwork Spells & Restore Balance",
            desc: "10 köken büyüsü otomatik bilinir. Reaction: 60 ft yakında Advantage veya Disadvantage atan canlıya bunu yok saydırırsınız (PB / Long Rest)."
          },
          {
            level: 6,
            name: "Bastion of Law (Kanun Siperi)",
            desc: "Action: 1-5 Sorcery Point harcayarak kendinize veya 30 ft müttefiğe d8 koruma zarları verirsiniz. Hasar alındığında d8 harcanarak alınan hasar düşürülür!"
          },
          {
            level: 10,
            name: "Trance of Order (Düzen Transı)",
            desc: "Bonus Action (1 dk): 2 Sorcery Point harcarsınız: Size karşı yapılan vuruşlar Advantage ALAMAZ ve attığınız d20 zarları 9 ve altı gelse bile 10 SAYILIR!"
          },
          {
            level: 14,
            name: "Clockwork Cavalcade (Mekanik Alay)",
            desc: "Action: 30 ft alanda mekanik ruhlar çağırırsınız (1/Long Rest veya 5 Sorcery Point): 100 HP iyileşme dağıtılır, eşyalar tamir edilir ve 6. seviyeye kadar büyüler bozulur!"
          }
        ]
      },
      {
        id: "draconic-sorcery",
        name: "Draconic Sorcery (Ejderha Soysoylusu)",
        shortDesc: "Kadim ejderhaların kanını ve yıkıcı element nefesini damarlarında taşıyan soylu büyücü.",
        icon: "🐉",
        features: [
          {
            level: 3,
            name: "Draconic Resilience & Draconic Spells",
            desc: "• 🛡️ Zırhsız AC = 13 + DEX Mod. Her Sorcerer seviyesinde +1 Max HP kazanırsınız!\n• 📜 Draconic Spells: 10 ejderha büyüsü otomatik bilinir. Ejderha Dili konuşursunuz."
          },
          {
            level: 6,
            name: "Elemental Affinity (Elementel Uyum)",
            desc: "Ejderha soyunuzun elementinde (Asit, Soğuk, Ateş, Yıldırım, Zehir) büyü attığınızda hasar zarına +CHA Mod eklersiniz. 1 Sorcery Point ile 1 saatliğine o elemente Direnç (Resistance) kazanırsınız!"
          },
          {
            level: 10,
            name: "Dragon Wings (Ejderha Kanatları)",
            desc: "Bonus Action ile sırtınızdan hayaletimsi ejderha kanatları çıkararak Hareket Hızınız kadar Uçma Hızı (Fly Speed) kazanırsınız!"
          },
          {
            level: 14,
            name: "Dragon Companion (Ejderha Yoldaşı)",
            desc: "Action (1/Long Rest veya 7 Sorcery Point): Yanınızda size itaat eden 7. seviye gücünde bir Ejderha Yoldaşı çağırırsınız!"
          }
        ]
      },
      {
        id: "wild-magic-sorcery",
        name: "Wild Magic Sorcery (Vahşi Büyü Soysoylusu)",
        shortDesc: "Kötürüm kaosun ve öngörülemez vahşi sihrin dalgalarını kontrol eden büyücü.",
        icon: "🌀",
        features: [
          {
            level: 3,
            name: "Wild Magic Surge & Tides of Chaos",
            desc: "• 🎲 Wild Magic Surge: 1.+ Lvl büyü atıldığında d20 atılır, 20 gelirse veya Kaos Kaidesinde Vahşi Büyü Tablosu tetiklenir!\n• 🌊 Tides of Chaos: 1 d20 zarına bedava ADVANTAGE alırsınız (Wild Magic Surge ile yenilenir)."
          },
          {
            level: 6,
            name: "Bend Luck (Kaderi Bükme)",
            desc: "Reaction: 60 ft yakındaki bir canlı zar atarken 2 Sorcery Point harcayarak onun zarına +1d4 ekler veya -1d4 düşürürsünüz!"
          },
          {
            level: 10,
            name: "Controlled Chaos (Kontrollü Kaos)",
            desc: "Vahşi Büyü Tablosunda zar atarken 2 defa zar atıp istediğiniz sonucu seçersiniz!"
          },
          {
            level: 14,
            name: "Tamed Surge (Ehlileştirilmiş Kaos)",
            desc: "Vahşi Büyü Surge tetiklendiğinde zar atmak yerine tablodan istediğiniz etkiyi BİZZAT SEÇERSİNİZ!"
          }
        ]
      }
    ]
  },
  warlock: {
    className: "Efsunbaz (Warlock)",
    subclasses: [
      {
        id: "archfey-patron",
        name: "Archfey Patron (Peri Beyi Efendisi)",
        shortDesc: "Peri diyarının (Feywild) büyüleyici ve aldatıcı varlıklarıyla anlaşma yapmış efsunbaz.",
        icon: "🏛️",
        features: [
          {
            level: 3,
            name: "Steps of the Fey & Archfey Spells",
            desc: "10 efendi büyüsü otomatik bilinir. Misty Step attığınızda ek etki kazanırsınız (Disappearing Act, Frightening Taunt, Misty Escape, Refreshing Step, Taunting Step) (CHA Mod / Long Rest)!"
          },
          {
            level: 6,
            name: "Misty Escape (Sisli Kaçış)",
            desc: "Reaction: Hasar aldığınızda slot harcamadan anında Misty Step atarsınız (1/Long Rest veya Warlock slotu harcayarak)!"
          },
          {
            level: 10,
            name: "Beguiling Defenses (Büyüleyici Savunma)",
            desc: "Charm (Büyülenme) durumuna BAĞIŞIKLIK kazanırsınız. Bir canlı sizi Charm etmeye çalıştığında Reaction ile büyüyü O CANLIYA YANSITIRSINIZ!"
          },
          {
            level: 14,
            name: "Bewitching Movement (Büyülü Hareket)",
            desc: "Misty Step her attığınızda ekstra +30 ft ışınlanma mesafesi kazanırsınız!"
          }
        ]
      },
      {
        id: "celestial-patron",
        name: "Celestial Patron (Semavi Efendisi)",
        shortDesc: "Üst alemlerin melekleri, koatl'ları veya ilahi varlıklarıyla ışık anlaşması yapan efsunbaz.",
        icon: "🪐",
        features: [
          {
            level: 3,
            name: "Healing Light & Celestial Spells",
            desc: "• 🌟 Healing Light: Warlock Lvl + 1 adet d6 havuzunuz olur. Bonus Action (60 ft): CHA Mod kadar d6 harcayıp müttefiği iyileştirin!\n• 📜 Celestial Spells: 10 semavi büyüsü otomatik bilinir."
          },
          {
            level: 6,
            name: "Radiant Soul (Işıltılı Ruh)",
            desc: "Radiant Hasar Direnci kazanırsınız. Radiant veya Ateş (Fire) hasarı veren büyülerinizin 1 hasar zarına +CHA Mod ekleyebilirsiniz!"
          },
          {
            level: 10,
            name: "Celestial Resilience (Semavi Dayanıklılık)",
            desc: "Dinlenme sonunda kendinize Warlock Lvl + CHA Mod Temp HP, 5 müttefiğinize Yarım Warlock Lvl + CHA Mod Temp HP verirsiniz!"
          },
          {
            level: 14,
            name: "Searing Vengeance (Yakıcı İntikam)",
            desc: "Death Save atarken zar atmak yerine yarı canla ayağa kalkarsınız, 30 ft içindeki tüm düşmanlara 2d8 + CHA Mod Radiant Hasar verir ve onları Kör (Blind) edersiniz (1/Long Rest)!"
          }
        ]
      },
      {
        id: "fiend-patron",
        name: "Fiend Patron (İblis Efendisi)",
        shortDesc: "Alt alemlerin şeytanları ve iblisleriyle ruh karşılığı güç anlaşması yapan yakıcı efsunbaz.",
        icon: "👿",
        features: [
          {
            level: 3,
            name: "Dark One's Blessing & Fiend Spells",
            desc: "• 🩸 Dark One's Blessing: 0 HP'ye düşürdüğünüz her düşmanda CHA Mod + Warlock Level kadar Geçici Can (Temp HP) kazanırsınız!\n• 📜 Fiend Spells: 10 iblis büyüsü otomatik bilinir."
          },
          {
            level: 6,
            name: "Dark One's Own Luck (Karanlık Şans)",
            desc: "Yetenek veya Save zarı atarken zaranıza +1d6 (2024 PHB'de +1d10) eklersiniz (CHA Mod / Long Rest)!"
          },
          {
            level: 10,
            name: "Fiendish Resilience (İblis Dayanıklılığı)",
            desc: "Dinlenme sonunda 1 hasar tipi seçip o hasar tipine Direnç (Resistance) kazanırsınız!"
          },
          {
            level: 14,
            name: "Hurl Through Hell (Cehenneme Fırlatma)",
            desc: "Vurduğunuz düşmanı tur sonuna kadar alt alemlere sürgün edersiniz! Geri döndüğünde 10d10 Psychic Hasarı alır! (1/Long Rest veya Warlock slotu)."
          }
        ]
      },
      {
        id: "great-old-one-patron",
        name: "Great Old One Patron (Kadim Varoluk Efendisi)",
        shortDesc: "Yıldız ötesi Cthulhu ve uzay boşluğunun zihinsel varlıklarıyla karanlık bağ kuran efsunbaz.",
        icon: "🐙",
        features: [
          {
            level: 3,
            name: "Awakened Mind & Psionic Spells",
            desc: "10 kadim büyü bilinir. 30 ft Zihinsel Telepati. Büyü attığınızda hasar tipini Psychic Hasara dönüştürebilirsiniz!"
          },
          {
            level: 6,
            name: "Psychic Spells & Entropic Ward",
            desc: "• 🧠 Büyülerinizi V veya S bileşeni olmadan atabilirsiniz.\n• 🛡️ Entropic Ward: Reaction ile gelen saldırıya Disadvantage verirsiniz. Iskalarsa sonraki vuruşunuz Advantage kazanır!"
          },
          {
            level: 10,
            name: "Thought Shield (Zihin Kalkanı)",
            desc: "Zihniniz okunamaz! Psychic Hasar Direnci kazanırsınız ve biri size Psychic Hasar verirse AYNI HASARI ALIR!"
          },
          {
            level: 14,
            name: "Create Thrall (Köle Yaratma)",
            desc: "Psychic Hasar verdiğiniz veya büyü attığınız hedef WIS Save atar (DC = 8 + PB + CHA Mod). Elenirse sonraki Long Rest'e kadar size Büyülenir (Charmed)!"
          }
        ]
      }
    ]
  },
  wizard: {
    className: "Büyücü (Wizard)",
    subclasses: [
      {
        id: "abjurer",
        name: "Abjurer (Koruyucu / Savunma Büyücüsü)",
        shortDesc: "Koruma zırhları, büyü engelleme ve kalkan sihirleri konusunda ustalaşmış bilge.",
        icon: "🛡️",
        features: [
          {
            level: 3,
            name: "Abjuration Savant & Arcane Ward",
            desc: "• 📜 Abjuration Savant: 2 Abjuration büyüsü bedava eklenir. Kopyalama yarı masraf/süre.\n• 🛡️ Arcane Ward: 1.+ Lvl Abjuration büyü atınca kalkan oluşur (HP Kapasitesi = 2x Wizard Lvl + INT Mod). Hasar aldığınızda önce kalkan hasarı emer!"
          },
          {
            level: 6,
            name: "Projected Ward (Yansıtılmış Kalkan)",
            desc: "Reaction: 30 ft içindeki müttefiğiniz hasar aldığında Arcane Ward kalkanınız araya girip hasarı o müttefik yerine emer!"
          },
          {
            level: 10,
            name: "Spell Breaker (Büyü Kırıcı)",
            desc: "Counterspell veya Dispanel Magic atarken zarınıza +PB ekleyin. Counterspell atıp başarısız olsanız bile BÜYÜ SLOTUNUZ HARCANMAZ!"
          },
          {
            level: 14,
            name: "Spell Resistance (Büyü Direnci)",
            desc: "Tüm büyülere karşı Saving Throw zarlarınız ADVANTAGE kazanır ve büyülerden aldığınız tüm hasarlara DİRENÇ (Resistance) kazanırsınız!"
          }
        ]
      },
      {
        id: "diviner",
        name: "Diviner (Kahin / Kehanet Büyücüsü)",
        shortDesc: "Zamanın ve kaderin iplerini görerek gelecekteki zarları önceden belirleyen kahin.",
        icon: "🔮",
        features: [
          {
            level: 3,
            name: "Divination Savant & Portent",
            desc: "• 📜 Divination Savant: 2 Divination büyüsü bedava. Kopyalama yarı masraf/süre.\n• 🎲 Portent: Dinlenme sonunda 2x d20 atıp kaydedin. Turda 1 kez siz veya gördüğünüz bir canlı zar atmadan önce zarı Portent zarlarından biriyle DEĞİŞTİRİN!"
          },
          {
            level: 6,
            name: "Expert Divination (Uzman Kehanet)",
            desc: "2.+ Lvl Divination büyüsü attığınızda attığınız büyüden daha düşük seviyeli harcanmış 1 büyü slotunu GERİ KAZANIRSINIZ (5. seviyeye kadar)!"
          },
          {
            level: 10,
            name: "The Third Eye (Üçüncü Göz)",
            desc: "Action (1/Rest): 60 ft Darkvision, 60 ft Ethereal Görme, Her Dili Okuma veya 10 ft Görünmezlik Görme duyularından 1 tanesini açarsınız!"
          },
          {
            level: 14,
            name: "Greater Portent (Üstün Kehanet)",
            desc: "Portent yeteneğiniz için artık 2 yerine TAM 3 ADET d20 ZARI atıp kaydedersiniz!"
          }
        ]
      },
      {
        id: "evoker",
        name: "Evoker (Yıkım / Çağırım Büyücüsü)",
        shortDesc: "Ateş, yıldırım ve yıkıcı element patlamalarını dostlarına zarar vermeden yönlendiren yıkım ustası.",
        icon: "🔥",
        features: [
          {
            level: 3,
            name: "Evocation Savant & Sculpt Spells",
            desc: "• 📜 Evocation Savant: 2 Evocation büyüsü bedava. Kopyalama yarı masraf/süre.\n• 🛡️ Sculpt Spells: Alan büyüsü (Fireball vb.) attığınızda 1 + Büyü Seviyesi kadar müttefiği seçersiniz: Müttefikler otomatik BAŞARILI olur ve HİÇ HASAR ALMAZ!"
          },
          {
            level: 6,
            name: "Potent Cantrip (Güçlü Büyücük)",
            desc: "Düşman Cantrip büyünüze karşı Save başarsa bile YARIM HASAR almaya devam eder (0 yerine yarım hasar)!"
          },
          {
            level: 10,
            name: "Empowered Evocation (Güçlendirilmiş Yıkım)",
            desc: "Evocation büyülerinizin 1 hasar zarına +INT Mod ekleyebilirsiniz!"
          },
          {
            level: 14,
            name: "Overchannel (Aşırı Yükleme)",
            desc: "1.-5. seviye arası hasar büyüsü attığınızda zar atmak yerine MAKSİMUM HASAR vurursunuz! (1/Long Rest; tekrar kullanımda kendinize Necrotic hasar verirsiniz)."
          }
        ]
      },
      {
        id: "illusionist",
        name: "Illusionist (İllüzyonist / Yanılsama Büyücüsü)",
        shortDesc: "Göz yanılmaları, gölgeler ve sahte gerçekliklerle zihinleri kandıran illüzyon ustası.",
        icon: "🎭",
        features: [
          {
            level: 3,
            name: "Illusion Savant & Improved Minor Illusion",
            desc: "• 📜 Illusion Savant: 2 Illusion büyüsü bedava. Kopyalama yarı masraf/süre.\n• 🎭 Improved Minor Illusion: Minor Illusion cantrip'i bedava. Tek atışta HEM SES HEM GÖRÜNTÜ oluşturabilir ve Bonus Action ile atabilirsiniz!"
          },
          {
            level: 6,
            name: "Phantasmal Creatures (Hayali Yaratıklar)",
            desc: "Summon Fey ve Summon Shadowspawn büyüleri büyü kitabınıza eklenir. Onları Illusion büyüsü olarak atabilir ve hasar tiplerini değiştirebilirsiniz."
          },
          {
            level: 10,
            name: "Illusory Self (Yanılsamalı Benlik)",
            desc: "Reaction: Bir düşman size saldırdığında illüzyonel kopyanız oluşur; gelen saldırı OTOMATİK İSKALAR ve kopya yok olur! (1/Short or Long Rest veya 2.+ Lvl slot)."
          },
          {
            level: 14,
            name: "Illusory Reality (Yanılsamalı Gerçeklik)",
            desc: "Bonus Action (1.+ Lvl Illusion büyü attığınızda): İllüzyonunuzun parçası olan sihirli olmayan 1 nesneyi 1 dakika boyunca GERÇEK NESNEYE dönüştürürsünüz!"
          }
        ]
      }
    ]
  }
};

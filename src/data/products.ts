import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Atelier Relaxed Linen Blazer',
    category: 'Clothes',
    subCategory: 'Jackets & Blazers',
    price: 115000,
    originalPrice: 135000,
    rating: 4.9,
    reviewCount: 48,
    image: 'https://i.ibb.co/cK5PsVDL/Whats-App-Image-2026-09-26-at-5-51-06-PM.jpg',
    alternateImages: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An effortlessly refined single-breasted blazer cut from breathable European washed linen. Designed with a gentle drop shoulder, horn buttons, and an unstructured silhouette that exudes Mediterranean nonchalance.',
    details: [
      '100% Normandy washed flax linen',
      'Unstructured relaxed fit with soft interior binding',
      'Dual patch pockets and interior chest pocket',
      'Natural corozo buttons',
      'Dry clean or delicate cold hand wash'
    ],
    fabricCare: '100% Linen. Dry clean or gentle hand wash cold with mild detergent; dry flat in shade.',
    tags: ['linen', 'blazer', 'quiet-luxury', 'summer', 'minimalist', 'tailored'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Oatmeal Sand', hex: '#D7CEBE' },
      { name: 'Midnight Black', hex: '#1C1C1E' },
      { name: 'Espresso Brown', hex: '#4A3B32' }
    ],
    aesthetic: 'Quiet Luxury',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Indigo Contrast-Stitch Flared Denim Maxi Skirt',
    category: 'Clothes',
    subCategory: 'Skirts & Bottoms',
    price: 90000,
    originalPrice: 110000,
    rating: 4.88,
    reviewCount: 42,
    image: 'https://i.ibb.co/4nDzpk7d/Whats-App-Image-2026-09-26-at-6-10-59-PM.jpg',
    alternateImages: [
      'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A striking floor-sweeping maxi skirt tailored in a rich, deep indigo-blue structured denim twill. Features crisp white contrast topstitching, utilitarian front patch pockets, an asymmetric waistline accent, and a dramatic flared A-line drape.',
    details: [
      '100% Premium rigid cotton denim twill',
      'Modest flared A-line floor-length maxi silhouette',
      'Artisanal white contrast topstitching and vertical paneling',
      'Dual deep utilitarian front patch pockets and waistband detailing',
      'High-waisted fit with concealed side zip and belt loops'
    ],
    fabricCare: '100% Cotton Denim. Machine wash cold inside out with dark colors; line dry in shade to preserve deep indigo hue.',
    tags: ['denim', 'maxi-skirt', 'indigo', 'contrast-stitch', 'casual-luxury', 'modest', 'statement'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Deep Indigo Blue', hex: '#1C2938' },
      { name: 'Midnight Raw Denim', hex: '#121B24' }
    ],
    aesthetic: 'Modern Streetwear',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Sienna Relaxed Linen-Cotton Tunic Dress',
    category: 'Clothes',
    subCategory: 'Dresses',
    price: 125000,
    originalPrice: 150000,
    rating: 4.95,
    reviewCount: 62,
    image: 'https://i.ibb.co/Wpdr1WRB/Whats-App-Image-2026-09-26-at-5-51-06-PM.jpg',
    alternateImages: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=80',
      'https://i.ibb.co/1xT65TH/Whats-App-Image-2026-09-26-at-6-10-59-PM.jpg'
    ],
    description: 'An elegant longline modest tunic dress in soft pastel butter yellow cut from breathable textured linen-cotton. Features a minimalist high round neckline, relaxed straight-cut sleeves, and graceful high side slits designed for effortless layering over wide-leg trousers or denim.',
    details: [
      'Breathable lightweight textured linen-cotton weave',
      'Relaxed modest longline silhouette with fluid side slits',
      'Minimalist high round neckline & wide drape sleeves',
      'Perfect for effortless tonal layering and golden hour occasions'
    ],
    fabricCare: '70% Linen, 30% Cotton. Gentle machine wash cold with like colors; dry flat in shade.',
    tags: ['dress', 'tunic', 'butter-yellow', 'modest-fashion', 'minimalist', 'quiet-luxury'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Butter Yellow', hex: '#F9E8A2' },
      { name: 'Champagne Pearl', hex: '#EBE2D5' },
      { name: 'Black Onyx', hex: '#111111' }
    ],
    aesthetic: 'Quiet Luxury',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Riviera Cropped Poplin Button-Down',
    category: 'Clothes',
    subCategory: 'Shirts & Tops',
    price: 60000,
    rating: 4.7,
    reviewCount: 29,
    image: 'https://i.ibb.co/HTZ4v9J3/Whats-App-Image-2026-09-26-at-5-51-05-PM.jpg',
    alternateImages: [
      'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crisp organic cotton poplin crafted with an architectural boxy cut, pointed collar, and mother-of-pearl buttons. Pairs impeccably with high-waisted linen trousers or layered under fine knitwear.',
    details: [
      '100% GOTS-certified Organic Cotton Poplin',
      'Boxy modern silhouette with drop shoulders',
      'Reinforced French collar and cuff plackets',
      'Genuine mother-of-pearl buttons'
    ],
    fabricCare: '100% Organic Cotton. Machine wash warm; iron on cotton setting for a crisp finish.',
    tags: ['cotton', 'poplin', 'shirt', 'casual', 'minimalist', 'summer'],
    sizes: ['S', 'M', 'L'],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Sky Stripe Blue', hex: '#C2D7EC' }
    ],
    aesthetic: 'Minimalist',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Capri Hand-Woven Italian Leather Loafers',
    category: 'Shoes',
    subCategory: 'Loafers & Flats',
    price: 145000,
    originalPrice: 170000,
    rating: 4.9,
    reviewCount: 54,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Artisanal horsebit loafers hand-finished in Tuscany from supple glove calf leather. Featuring an ultra-flexible leather sole, cushioned memory foam insole, and brushed brass hardware.',
    details: [
      'Full-grain Italian calf leather upper & lining',
      'Brushed gold horsebit hardware with anti-tarnish finish',
      'Hand-stitched apron toe',
      'Cushioned footbed with ergonomic arch support'
    ],
    fabricCare: 'Apply neutral leather conditioner biannually; protect with water-repellent spray.',
    tags: ['leather', 'loafers', 'shoes', 'old-money', 'handcrafted', 'italian'],
    sizes: ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU', '41 EU'],
    colors: [
      { name: 'Cognac Caramel', hex: '#8B4513' },
      { name: 'Gloss Noir', hex: '#1A1A1A' }
    ],
    aesthetic: 'Old Money',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Marais Strappy Kitten-Heel Mules',
    category: 'Shoes',
    subCategory: 'Heels & Sandals',
    price: 95000,
    rating: 4.75,
    reviewCount: 31,
    image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=1000&q=80',
    description: 'Chic 45mm sculptural kitten heels designed for Parisian elegance and all-day comfort. Features delicate crossover tubular leather straps and a modern squared open toe.',
    details: [
      'Nappa lambskin leather straps with soft microfiber backing',
      '45mm (1.8 inch) architectural kitten heel',
      'Square open toe design',
      'Non-slip rubber heel cap'
    ],
    fabricCare: 'Wipe clean with a damp microfiber cloth; store in protective dust bag.',
    tags: ['heels', 'mules', 'kitten-heel', 'shoes', 'cocktail', 'parisian-chic'],
    sizes: ['36 EU', '37 EU', '38 EU', '39 EU', '40 EU'],
    colors: [
      { name: 'Bone Ivory', hex: '#F3EFEA' },
      { name: 'Espresso Suede', hex: '#3E2E25' }
    ],
    aesthetic: 'Parisian Chic',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Soho Minimalist Leather Court Sneaker',
    category: 'Shoes',
    subCategory: 'Sneakers',
    price: 80000,
    rating: 4.85,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80',
    description: 'Clean, unbranded low-profile sneakers meticulously crafted from buttery full-grain white leather with an off-white vulcanized rubber sole. The ultimate luxury casual staple.',
    details: [
      'Full-grain buttery white calfskin',
      'Organic wax-coated cotton laces',
      'Removable antimicrobial leather insole',
      'Durable vulcanized cupsole'
    ],
    fabricCare: 'Clean leather upper with specialized sneaker foam; avoid machine washing.',
    tags: ['sneakers', 'shoes', 'white-sneaker', 'minimalist', 'everyday', 'casual'],
    sizes: ['37 EU', '38 EU', '39 EU', '40 EU', '41 EU', '42 EU'],
    colors: [
      { name: 'Pristine White / Off-White', hex: '#FDFBF7' }
    ],
    aesthetic: 'Minimalist',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Palermo Half-Moon Shoulder Bag',
    category: 'Bags',
    subCategory: 'Shoulder Bags',
    price: 165000,
    originalPrice: 195000,
    rating: 4.95,
    reviewCount: 73,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    alternateImages: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sculptural crescent silhouette handcrafted from smooth vegetable-tanned Italian calf leather. Features an adjustable strap for shoulder or tuck-in-arm carry, with a magnetic top flap.',
    details: [
      '100% Vegetable-Tanned Italian Calf Leather',
      'Suede-lined interior with card slot and zip pocket',
      'Custom gold-plated geometric hardware',
      'Dimensions: 28cm W x 16cm H x 7cm D'
    ],
    fabricCare: 'Store in provided canvas dust bag; condition with beeswax leather cream.',
    tags: ['bag', 'shoulder-bag', 'leather', 'quiet-luxury', 'handbag', 'minimalist'],
    colors: [
      { name: 'Rich Chestnut', hex: '#633A18' },
      { name: 'Warm Taupe', hex: '#B5A593' },
      { name: 'Caviar Black', hex: '#191919' }
    ],
    aesthetic: 'Quiet Luxury',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-9',
    name: 'Cote d’Azur Woven Raffia Market Tote',
    category: 'Bags',
    subCategory: 'Totes & Baskets',
    price: 75000,
    rating: 4.65,
    reviewCount: 22,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80',
    description: 'Artisanal hand-crocheted Madagascar raffia tote trimmed with smooth tan bridle leather handles. Effortlessly holds a beach towel, paperback, and sunglasses for seaside afternoons or farmer market strolls.',
    details: [
      '100% Sustainably Harvested Madagascar Raffia',
      'Genuine saddlery tan leather top handles',
      'Reinforced woven base for stability',
      'Unlined open-top interior'
    ],
    fabricCare: 'Spot clean raffia with mild soapy cold water; avoid prolonged soaking.',
    tags: ['bag', 'tote', 'raffia', 'summer', 'resort', 'vacation', 'casual'],
    colors: [
      { name: 'Natural Sand / Tan', hex: '#D2B48C' }
    ],
    aesthetic: 'Quiet Luxury',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-10',
    name: 'Vendôme Structured Mini Top-Handle Bag',
    category: 'Bags',
    subCategory: 'Crossbody & Mini Bags',
    price: 140000,
    rating: 4.9,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    description: 'Architectural lady-like top handle bag cut from structured palmellato leather with clean geometric lines. Comes with a detachable leather crossbody strap for hands-free versatility.',
    details: [
      'Palmellato scratch-resistant grain leather',
      'Dual magnetic lock flap closure',
      'Removable & adjustable shoulder strap',
      'Dimensions: 22cm W x 15cm H x 9cm D'
    ],
    fabricCare: 'Wipe with damp cloth; keep away from excessive heat and direct sunlight.',
    tags: ['bag', 'top-handle', 'crossbody', 'old-money', 'evening', 'leather'],
    colors: [
      { name: 'Alabaster Ivory', hex: '#F4EFE6' },
      { name: 'Midnight Forest', hex: '#1E2F23' }
    ],
    aesthetic: 'Old Money',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-11',
    name: '18K Gold-Vermeil Sculptural Chunky Hoops',
    category: 'Accessories',
    subCategory: 'Jewellery',
    price: 50000,
    originalPrice: 62000,
    rating: 4.9,
    reviewCount: 114,
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
    description: 'Feather-light hollow hoops electroplated in 2.5 microns of 18-karat yellow gold over recycled 925 sterling silver. The essential statement accessory that instantly polishes any outfit.',
    details: [
      '18k Yellow Gold Vermeil (2.5 micron thick coating)',
      'Recycled 925 Sterling Silver core',
      'Hollow core for featherlight, all-day ear comfort',
      'Secure click-latch closure; hypoallergenic & nickel-free'
    ],
    fabricCare: 'Remove before swimming or applying perfume; buff with the included microfiber jewelry cloth.',
    tags: ['jewellery', 'gold', 'earrings', 'hoops', 'accessories', 'minimalist'],
    colors: [
      { name: '18K Yellow Gold', hex: '#D4AF37' },
      { name: 'Rhodium Silver', hex: '#C0C0C0' }
    ],
    aesthetic: 'Minimalist',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-12',
    name: 'Saint-Germain Acetate Cat-Eye Sunglasses',
    category: 'Accessories',
    subCategory: 'Eyewear',
    price: 70000,
    rating: 4.8,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80',
    description: 'Vintage-inspired thick bevelled cat-eye sunglasses handmade from organic Italian Mazzucchelli acetate. Fitted with 100% UVA/UVB category 3 dark grey tinted lenses.',
    details: [
      'Handcrafted Mazzucchelli bio-acetate frame',
      'Category 3 UV400 anti-reflective lenses',
      'Durable 5-barrel custom wire-core hinges',
      'Includes faux-leather case and lens cleaning cloth'
    ],
    fabricCare: 'Rinse with lukewarm water to remove grit; clean using the provided microfiber cloth.',
    tags: ['sunglasses', 'accessories', 'eyewear', 'vintage', 'old-money', 'summer'],
    colors: [
      { name: 'Tortoiseshell Amber', hex: '#58361C' },
      { name: 'Gloss Black', hex: '#111111' }
    ],
    aesthetic: 'Old Money',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-13',
    name: 'Firenze Italian Leather Waist Belt with Brass Buckle',
    category: 'Accessories',
    subCategory: 'Belts',
    price: 42000,
    rating: 4.7,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    description: 'A 2.5cm classic belt cut from vegetable-tanned bridle leather with burnished bevelled edges and a soft rounded solid brass buckle. Beautifully cinches blazers, knitwear, and denim.',
    details: [
      'Vegetable-tanned full-grain leather that patinas beautifully',
      'Solid antique-finish brass buckle',
      'Edge-painted and hand-burnished finishing',
      'Width: 25mm (1 inch)'
    ],
    fabricCare: 'Condition occasionally with leather balm.',
    tags: ['belt', 'leather', 'accessories', 'brass', 'quiet-luxury'],
    sizes: ['S (75cm)', 'M (85cm)', 'L (95cm)'],
    colors: [
      { name: 'Warm Saddle Tan', hex: '#A0522D' },
      { name: 'Midnight Black', hex: '#1A1A1A' }
    ],
    aesthetic: 'Quiet Luxury',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-14',
    name: 'Como Floral Mulberry Silk Twill Square Scarf',
    category: 'Accessories',
    subCategory: 'Scarves',
    price: 55000,
    rating: 4.88,
    reviewCount: 36,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1000&q=80',
    description: 'Luxurious 70cm x 70cm pure silk twill carré printed in Lake Como with a vintage equestrian motif. Finished with delicate hand-rolled and hand-stitched edges. Tie around your neck, bag handle, or hair.',
    details: [
      '100% Silk Twill (16 Momme)',
      'Hand-rolled and hand-sewn edges',
      'Printed with non-toxic OEKO-TEX certified Italian inks',
      'Size: 70cm x 70cm (27.5" x 27.5")'
    ],
    fabricCare: 'Dry clean only or cold hand wash with silk detergent; iron on low on reverse.',
    tags: ['scarf', 'silk', 'accessories', 'parisian-chic', 'old-money', 'print'],
    colors: [
      { name: 'Heritage Navy & Gold', hex: '#1E3A5F' }
    ],
    aesthetic: 'Parisian Chic',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-15',
    name: 'Oslo Ribbed Merino Cashmere Knit Crew',
    category: 'Clothes',
    subCategory: 'Knitwear',
    price: 110000,
    originalPrice: 130000,
    rating: 4.92,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1000&q=80',
    description: 'Spun from an exquisite 70% extrafine Merino wool and 30% Mongolian cashmere blend. Features a relaxed body, tactile fisherman rib knit, and raglan sleeves for an effortlessly cozy yet tailored drape.',
    details: [
      '70% Extrafine Merino Wool, 30% Grade-A Mongolian Cashmere',
      'Heavy 7-gauge fisherman rib knit structure',
      'Comfortable crew neckline with reinforced ribbing',
      'Ribbed hem and cuffs designed to hold shape'
    ],
    fabricCare: 'Hand wash cold inside out with wool shampoo; dry flat on a towel.',
    tags: ['cashmere', 'merino', 'knitwear', 'minimalist', 'quiet-luxury', 'sweater'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Heather Oatmeal', hex: '#DCD4C4' },
      { name: 'Cloud Grey', hex: '#B8B9B7' }
    ],
    aesthetic: 'Minimalist',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-16',
    name: 'Chelsea Chunky Lug-Sole Leather Boots',
    category: 'Shoes',
    subCategory: 'Boots',
    price: 130000,
    rating: 4.86,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80',
    description: 'Modern Chelsea boots constructed with oiled Italian calfskin leather and a lightweight, shock-absorbing Vibram lug sole. Features elasticated side gussets and dual woven pull tabs.',
    details: [
      'Oiled waterproof calfskin leather upper',
      'Lightweight Vibram rubber lug tread',
      'Elasticated side gore for easy slip-on fit',
      'Shaft height: 16cm'
    ],
    fabricCare: 'Apply waterproof wax balm before wearing in wet conditions.',
    tags: ['boots', 'chelsea-boots', 'shoes', 'leather', 'modern-streetwear', 'fall'],
    sizes: ['37 EU', '38 EU', '39 EU', '40 EU', '41 EU'],
    colors: [
      { name: 'Matte Onyx Black', hex: '#191919' }
    ],
    aesthetic: 'Modern Streetwear',
    featured: false,
    inStock: true
  }
];

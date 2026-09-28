import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI client (using gemini-api guidelines)
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Helper for fallback AI styling when API key is missing or calls fail
function getFallbackSuggestions(product: any) {
  const name = product?.name || 'this item';
  const category = product?.category || 'Clothes';
  
  return {
    aesthetic: 'Contemporary Chic & Timeless Sophistication',
    headline: `Editorial Styling & Color Fit Guide for ${name}`,
    summary: `Elevate ${name} by playing with intentional color harmony, complementary textures, and skin-flattering undertones. Perfect for day-to-evening transitions in modern luxury fashion.`,
    outfits: [
      {
        title: 'Look 1: Effortless Daywear & Brunch',
        occasion: 'Weekend Brunch, Art Gallery, or City Stroll',
        description: `Pair with relaxed silhouettes, warm neutrals, and artisanal accessories for an understated quiet-luxury feel.`,
        pieces: [
          name,
          category === 'Clothes' ? 'Tailored Wide-Leg Trousers in Warm Cream (₦85,000)' : 'Crisp Poplin Button-Down Shirt (₦60,000)',
          'Soft Leather Loafers or Minimalist White Court Sneakers (₦80,000)',
          'Palermo Half-Moon Shoulder Bag (₦165,000)',
          'Dainty 18K Gold Sculptural Hoops (₦50,000)'
        ],
        stylingTip: 'Roll the cuffs slightly and tuck just the front hem to create an effortless, elongated silhouette.'
      },
      {
        title: 'Look 2: Elevated Business & Smart Casual',
        occasion: 'Creative Office, Client Lunch, or Presentation',
        description: `Structure meets comfort: balance relaxed ease with sharp tailoring and rich tone-on-tone depth.`,
        pieces: [
          name,
          'Unstructured Oversized Wool-Blend Blazer in Camel or Charcoal',
          'Tailored Straight-Leg Slacks in Cream or Black (₦85,000)',
          'Pointed-Toe Kitten Heels or Sleek Leather Loafers (₦145,000)',
          'Architectural Crossbody Bag in Smooth Calfskin (₦140,000)',
          'Firenze Italian Leather Waist Belt (₦42,000)'
        ],
        stylingTip: 'Drape the blazer over your shoulders for modern editorial flair.'
      },
      {
        title: 'Look 3: Sunset Cocktails & Evening Soirée',
        occasion: 'Rooftop Lounge, Dinner Date, or Gallery Opening',
        description: `Transition into dusk with contrasting silk and leather textures, statement metallic touches, and a sultry shoe.`,
        pieces: [
          name,
          'Sienna Bias-Cut Mulberry Silk Slip Dress (₦125,000)',
          'Strappy Kitten-Heel Mules in Bone Ivory (₦95,000)',
          'Sculptural Gold Statement Clutch',
          'Chunky 18K Gold Sculptural Hoops (₦50,000)'
        ],
        stylingTip: 'A luminous skin finish, warm nude-terracotta lip, and sleek hair complete this high-fashion evening ensemble.'
      }
    ],
    colorHarmonies: [
      'Warm Alabaster (#EDE8DF)',
      'Oatmeal Taupe (#D7CEBE)',
      'Deep Espresso (#4A3B32)',
      'Burnished Brass Gold (#D4AF37)',
      'Rich Terracotta (#A0522D)'
    ],
    footwearAdvice: 'Choose footwear with clean lines and minimal hardware to keep the focal point on the primary garment.'
  };
}

// API Route: AI Outfit Suggestions for a specific product
app.post('/api/stylist/outfit-suggestions', async (req: Request, res: Response) => {
  try {
    const { product, catalogueContext } = req.body;

    if (!product) {
      return res.status(400).json({ error: 'Product data is required.' });
    }

    if (!ai || !apiKey) {
      console.log('No GEMINI_API_KEY detected, using premium fallback styling engine.');
      return res.json(getFallbackSuggestions(product));
    }

    const prompt = `You are an elite high-fashion stylist and color consultant for StyleAI.
A customer is viewing the following product:
- Name: ${product.name}
- Category: ${product.category}
- Price: ₦${product.price.toLocaleString()}
- Style Tags: ${product.tags?.join(', ') || 'chic, modern'}
- Description: ${product.description || ''}
- Aesthetic: ${product.aesthetic || 'Luxury'}

Available catalogue items for pairing context (with prices in Nigerian Naira ₦):
${JSON.stringify(catalogueContext || [], null, 2)}

Provide high-end editorial styling recommendations and color analysis in valid JSON format:
1. Recommend 3 complete outfits using catalogue pieces and standard fashion pairings, stating prices in ₦ (Nigerian Naira).
2. Specifically analyze COLORS THAT FIT: suggest a dedicated color palette of 4-5 shades that flatter this item's specific material and tones, complementing diverse skin tones (warm golden, deep melanin, cool neutral) with high-contrast or harmonious accents.

Return ONLY valid JSON with this exact structure:
{
  "aesthetic": "short style name (e.g. Parisian Chic, Quiet Luxury, Old Money)",
  "headline": "Catchy editorial title with color focus",
  "summary": "2-3 sentences overview of how to style this garment and the ideal color palette that fits it",
  "outfits": [
    {
      "title": "Look 1: Name",
      "occasion": "Target occasion",
      "description": "How the look works together and why colors harmonize",
      "pieces": ["item 1 with ₦ price", "item 2 with ₦ price", "item 3", "item 4"],
      "stylingTip": "Pro-tip from a celebrity colorist and fashion stylist"
    },
    {
      "title": "Look 2: Name",
      "occasion": "Target occasion",
      "description": "How the look works together and why colors harmonize",
      "pieces": ["item 1 with ₦ price", "item 2 with ₦ price", "item 3", "item 4"],
      "stylingTip": "Pro-tip"
    },
    {
      "title": "Look 3: Name",
      "occasion": "Target occasion",
      "description": "How the look works together and why colors harmonize",
      "pieces": ["item 1 with ₦ price", "item 2 with ₦ price", "item 3", "item 4"],
      "stylingTip": "Pro-tip"
    }
  ],
  "colorHarmonies": ["Color 1 with Hex/Tone", "Color 2 with Hex/Tone", "Color 3", "Color 4", "Color 5"],
  "footwearAdvice": "Specific shoes and color choice that ground the silhouette"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are StyleAI, an elite fashion and color consultant. All prices must be in Nigerian Naira (₦). Ensure colors that fit are carefully calibrated for skin tones and garment textures. Always return strictly valid JSON matching the requested schema. Never output markdown ticks around the json.',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      // Clean possible markdown code fences if any
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return res.json(parsed);
    }
  } catch (error: any) {
    console.error('Error generating outfit suggestions:', error);
    // Graceful fallback so user experience is smooth
    return res.json(getFallbackSuggestions(req.body.product));
  }
});

// API Route: AI Fashion Stylist Chat Consultation
app.post('/api/stylist/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userPreferences } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (!ai || !apiKey) {
      // Intelligent fallback fashion responses in Naira
      const fallbackResponses = [
        `For an elevated and effortless look, start with a hero piece like our Palazzo Pleated Trousers (₦85,000) or Atelier Linen Blazer (₦115,000). When choosing colors that fit, neutral tones like warm sand, rich espresso, and olive compliment deeper and golden skin tones remarkably well. Ground with 18K gold sculptural hoops (₦50,000) for subtle luminosity.`,
        `Monochrome tonal dressing is your secret weapon. Mixing varying shades of cream (₦EDE8DF), camel, and warm ivory creates an instantly luxurious silhouette. Balance relaxed wide-leg trousers (₦85,000) with tailored leather loafers (₦145,000).`,
        `To transition any daytime ensemble into evening, swap your woven raffia tote (₦75,000) for a structured half-moon leather bag (₦165,000), apply a warm terracotta or berry lip, and slip into our kitten-heel mules (₦95,000).`
      ];
      const reply = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      return res.json({ reply, suggestedFollowUps: ['What color palette fits my skin tone best?', 'How do I style wide-leg trousers under ₦100,000?', 'Recommend an Old Money capsule wardrobe in ₦'] });
    }

    // Build chat context
    const conversationHistory = messages.map(m => `${m.role === 'user' ? 'Customer' : 'StyleAI'}: ${m.content}`).join('\n');
    const prompt = `You are StyleAI, an expert luxury fashion stylist and color consultant.
Currency: Always use Nigerian Naira (₦) for prices.
Customer Preferences: ${JSON.stringify(userPreferences || {})}
Conversation History:
${conversationHistory}

Reply to the customer's latest query with warmth, sophisticated fashion expertise, actionable wardrobe pairings, silhouette guidance, and specific color palettes that fit their skin undertones and aesthetic.
Keep response concise, conversational yet inspiring (2-3 paragraphs max). End with 2 or 3 brief follow-up questions or suggestions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are StyleAI, an elite personal fashion and color consultant. Always quote prices in Nigerian Naira (₦). Offer concrete styling tips and colors that fit each skin tone and season.',
      },
    });

    const reply = response.text || 'Fashion is about expressing your unique personality with confidence and balance!';
    
    // Extract suggested follow-ups
    const followUps = [
      'What colors fit best with this outfit?',
      'How to transition this look from day to evening?',
      'Which footwear under ₦100,000 completes this ensemble?'
    ];

    return res.json({ reply, suggestedFollowUps: followUps });
  } catch (error: any) {
    console.error('Error in stylist chat:', error);
    return res.json({
      reply: 'A great outfit is built on balanced silhouettes and quality textures. Pair structured tailoring with soft knits or fluid silks, and ground your look with classic leather footwear. Colors like oatmeal, espresso, and warm gold create an impeccably luxurious finish.',
      suggestedFollowUps: ['Show me outfit ideas for dinner in ₦', 'What colors fit best for warm undertones?']
    });
  }
});

// API Route: Virtual Outfit Builder Rate & Review
app.post('/api/stylist/rate-fit', async (req: Request, res: Response) => {
  try {
    const { outfitItems, occasion } = req.body;

    if (!outfitItems || !Array.isArray(outfitItems) || outfitItems.length === 0) {
      return res.status(400).json({ error: 'Outfit items are required.' });
    }

    if (!ai || !apiKey) {
      return res.json({
        score: 9.4,
        verdict: 'Impeccable Color Harmony & Proportions',
        review: `This combination strikes a beautiful balance between effortless sophistication and modern tailoring. The neutral tones and rich leather textures complement each other seamlessly for ${occasion || 'a stylish day out'}.`,
        strengths: ['Harmonious earth-tone color palette', 'Strong focal point with tailored lines', 'Flattering silhouette balance across items'],
        improvements: ['Consider adding 18K gold chunky hoops (₦50,000) to frame the neckline', 'A structured leather belt (₦42,000) will further cinch the waist'],
        suggestedOccasions: ['Rooftop Drinks', 'Casual Client Lunch', 'Weekend Gallery Visit']
      });
    }

    const itemsSummary = outfitItems.map((item: any) => `${item.category}: ${item.name} (₦${item.price.toLocaleString()})`).join(', ');

    const prompt = `Review this customer's outfit combination:
Occasion: ${occasion || 'General Everyday Style'}
Items chosen:
${itemsSummary}

Provide a styling critique, color fit evaluation, and score in valid JSON format:
{
  "score": 9.2,
  "verdict": "Short punchy summary phrase",
  "review": "2-3 sentences evaluating the proportions, textures, colors that fit, and aesthetic coherence",
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Styling tip or color tweak 1", "Styling tip 2"],
  "suggestedOccasions": ["Occasion 1", "Occasion 2"]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        systemInstruction: 'You are a high-fashion editor and color critic. Prices in ₦. Return strictly valid JSON.',
      },
    });

    const text = response.text || '';
    try {
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch {
      const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
      return res.json(JSON.parse(cleaned));
    }
  } catch (error: any) {
    console.error('Error rating outfit:', error);
    return res.json({
      score: 9.1,
      verdict: 'Classic, Balanced & Modern',
      review: 'Great coordination of silhouettes. The clean lines and timeless appeal make this outfit effortless.',
      strengths: ['Versatile pairing', 'Clean silhouette and complementary color palette'],
      improvements: ['Accentuate with warm metallic accessories'],
      suggestedOccasions: ['Smart Casual Work', 'Dinner Date']
    });
  }
});

// Serve frontend in dev (via Vite middleware) or in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`StyleAI full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

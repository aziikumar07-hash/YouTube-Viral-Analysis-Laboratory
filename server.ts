import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client as recommended
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("Warning: GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// ==========================================
// API ENDPOINTS
// ==========================================

// Endpoint 1: Analyze a video concept idea
app.post("/api/analyze-concept", async (req: Request, res: Response) => {
  try {
    const { concept, niche, targetLength = 15 } = req.body;
    if (!concept) {
      return res.status(400).json({ error: "Concept is required" });
    }

    const ai = getGeminiClient();
    const prompt = `Analyze a YouTube video concept for the 2026 "Satisfaction Economy" and "Bering/TV Leanback" algorithm.
    Concept: "${concept}"
    Niche: "${niche || "General"}"
    Estimated length: ${targetLength} minutes

    Provide a precise, structured analysis in JSON and return it exactly mapping the schema. Specify:
    1. A virality rating (0-100) and concise critique.
    2. Core Hook blueprint (opening sequence structure matching Promise, Proof, Motion, Curiosity Gap).
    3. Pacing breakdown (recommend cut rates for sections: Hook 0-30s, Early Mid 30s-180s, Mid 3-10m, and End Binge-loop).
    4. Ideal structure showing timestamps and what retention actions to take.
    5. Emotional validation midpoint trigger.
    6. Suggested YouTube Title and Thumbnail visual designs (A, B, and C variants) optimizing for Watch-Time Share.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["viralityScore", "critique", "hookBlueprint", "pacingBreakdown", "milestones", "emotionalMidpoint", "packagingVariants"],
          properties: {
            viralityScore: { type: Type.INTEGER, description: "Virality potential between 0 and 100" },
            critique: { type: Type.STRING, description: "Honest feedback grounded in 2026 audience behavioral trends" },
            hookBlueprint: {
              type: Type.OBJECT,
              required: ["promise", "proof", "motion", "curiosityGap"],
              properties: {
                promise: { type: Type.STRING, description: "The high-stakes or high-value promise" },
                proof: { type: Type.STRING, description: "The immediate visual or proof beat" },
                motion: { type: Type.STRING, description: "Physical motion reset or B-roll sequence" },
                curiosityGap: { type: Type.STRING, description: "The unanswered question anchoring the viewer" }
              }
            },
            pacingBreakdown: {
              type: Type.OBJECT,
              required: ["hookPacing", "midPacing", "latePacing", "endPacing"],
              properties: {
                hookPacing: { type: Type.STRING, description: "Opening pacing profile (0-30s) including cut-rates" },
                midPacing: { type: Type.STRING, description: "Middle pacing profile including pattern interrupts" },
                latePacing: { type: Type.STRING, description: "Late pacing profile and emotional validation moment" },
                endPacing: { type: Type.STRING, description: "End pacing profile ensuring sessions loop or binge" }
              }
            },
            milestones: {
              type: Type.ARRAY,
              description: "Optimal retention milestones for a timeline chart",
              items: {
                type: Type.OBJECT,
                required: ["timestamp", "sectionName", "strategy", "predictedRetention"],
                properties: {
                  timestamp: { type: Type.STRING, description: "e.g. '0:00' or '5:30'" },
                  sectionName: { type: Type.STRING },
                  strategy: { type: Type.STRING, description: "Retention action or interrupt strategy" },
                  predictedRetention: { type: Type.INTEGER, description: "Predicted baseline percentage (e.g. 95)" }
                }
              }
            },
            emotionalMidpoint: { type: Type.STRING, description: "Specific strategy for emotional validation moment at 45-55% mark" },
            packagingVariants: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["title", "thumbnailConcept", "whyItWorks"],
                properties: {
                  title: { type: Type.STRING },
                  thumbnailConcept: { type: Type.STRING, description: "Visual description limiting text to 2-3 words, single focal point" },
                  whyItWorks: { type: Type.STRING, description: "Why it maximizes Watch Time Share over clickbait" }
                }
              }
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error analyzing concept:", error);
    res.status(500).json({ error: error.message || "Failed to analyze concept" });
  }
});

// Endpoint 2: Optimize & Score an opening Hook script
app.post("/api/analyze-hook", async (req: Request, res: Response) => {
  try {
    const { hookScript } = req.body;
    if (!hookScript) {
      return res.status(400).json({ error: "Hook script is required" });
    }

    const ai = getGeminiClient();
    const prompt = `Grade the following opening 30-second video hook script based on the critical 2026 YouTube 4-Beat Hook Formula.
    The four beats MUST occur sequentially: Promise, Proof, Motion, Curiosity Gap. Average cut rate target is 1.6s.
    Script:
    "${hookScript}"

    Provide a JSON response strictly matching the schema:
    1. Individual scores and analysis for each of the 4 beats.
    2. Overall score (0-100).
    3. An engineered, fully rewritten "Viral Overhaul" script demonstrating premium pacing, visual prompts, and narrator instructions.
    4. Pacing annotations (where to place cuts/sound effects).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["overallScore", "promiseGrade", "proofGrade", "motionGrade", "curiosityGapGrade", "viralOverhaul", "annotations"],
          properties: {
            overallScore: { type: Type.INTEGER },
            promiseGrade: {
              type: Type.OBJECT,
              required: ["score", "critique"],
              properties: { score: { type: Type.INTEGER }, critique: { type: Type.STRING } }
            },
            proofGrade: {
              type: Type.OBJECT,
              required: ["score", "critique"],
              properties: { score: { type: Type.INTEGER }, critique: { type: Type.STRING } }
            },
            motionGrade: {
              type: Type.OBJECT,
              required: ["score", "critique"],
              properties: { score: { type: Type.INTEGER }, critique: { type: Type.STRING } }
            },
            curiosityGapGrade: {
              type: Type.OBJECT,
              required: ["score", "critique"],
              properties: { score: { type: Type.INTEGER }, critique: { type: Type.STRING } }
            },
            viralOverhaul: {
              type: Type.STRING,
              description: "The rewritten, masterfully edited script with visual directives [Visual: ...] and sound cue directives [Audio: ...]"
            },
            annotations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key timing tips or pattern interrupt placements"
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error analyzing hook:", error);
    res.status(500).json({ error: error.message || "Failed to analyze hook" });
  }
});

// Endpoint 3: Dynamic Strategy Simulator for standard/custom niches
app.post("/api/niche-strategy", async (req: Request, res: Response) => {
  try {
    const { nicheName } = req.body;
    if (!nicheName) {
      return res.status(400).json({ error: "Niche name is required" });
    }

    const ai = getGeminiClient();
    const prompt = `Provide an exhaustive viral implementation strategy for an emerging creator in the "${nicheName}" YouTube niche in 2026.
    Incorporate the latest trends (satisfaction economy, hybrid format flow, Connected TV audiences).
    Include estimated Search-to-Supply coefficients, monthly demand trends, exact CPM ranges, structural secrets, content pillars, and high-CTR hooks.
    Return a detailed JSON responding exactly to the schema specified.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["searchDemand", "competitionLevel", "estimatedCPM", "strategicPillars", "shortsFunnelStrategy", "longFormAnchors", "growthHacks"],
          properties: {
            searchDemand: { type: Type.STRING, description: "Massive / High / Moderate" },
            competitionLevel: { type: Type.STRING, description: "Low / Moderate / High" },
            estimatedCPM: { type: Type.STRING, description: "CPM Range in USD, e.g. '$10-$15'" },
            strategicPillars: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["pillar", "whyWorks", "exampleIdea"],
                properties: {
                  pillar: { type: Type.STRING },
                  whyWorks: { type: Type.STRING },
                  exampleIdea: { type: Type.STRING }
                }
              }
            },
            shortsFunnelStrategy: { type: Type.STRING, description: "Exact formula to drive subscriptions using Shorts in this niche" },
            longFormAnchors: { type: Type.STRING, description: "Strategic 20+ min content formats that keep viewers on television screens" },
            growthHacks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2026 community, collaborative, or A/B test hacks"
            }
          }
        }
      }
    });

    res.json(JSON.parse(response.text || "{}"));
  } catch (error: any) {
    console.error("Error generating niche strategy:", error);
    res.status(500).json({ error: error.message || "Failed to generate niche strategy" });
  }
});

// Endpoint 4: Get trending market data details
app.get("/api/market-trends", (req: Request, res: Response) => {
  // Hardcoded highly searched 2026 niches with current industry metrics
  res.json([
    {
      id: "ai-tutorials",
      name: "AI & Technology Tutorials",
      demand: "Extremely High",
      competition: "Very Low",
      growth: "+18x YoY",
      cpm: "$15 - $22",
      description: "Automations, workflow integrations, and leveraging new AI systems for businesses.",
      secretWeapon: "Side-by-side terminal logs with real-time audio transcript highlighting."
    },
    {
      id: "sleep-ambient",
      name: "Sleep & Ambient Soundscapes",
      demand: "Massive (Evergreen)",
      competition: "Low",
      growth: "+24% MoM",
      cpm: "$4 - $8",
      description: "8+ hour looped rain, café white noise, celestial ambient space frequencies.",
      secretWeapon: "Connected TV autoplay and high Average View Duration yields disproportionate algorithmic weight."
    },
    {
      id: "historical-recipes",
      name: "Historical Recipe Reconstructions",
      demand: "High",
      competition: "Very Low",
      growth: "+19% MoM",
      cpm: "$8 - $12",
      description: "Rebuilding authentic culinary dishes from ancient Rome, medieval Europe, or Viking eras.",
      secretWeapon: "High sensory Foley audio & aesthetic documentary-level grading."
    },
    {
      id: "streamer-lore",
      name: "Streamer Lore Mockumentaries",
      demand: "High",
      competition: "Low",
      growth: "+16% MoM",
      cpm: "$6 - $10",
      description: "Dramatic retrospective essays documenting creator groups, beefs, and historical gaming moments.",
      secretWeapon: "Shows rapid growth via leveraging existing fan bases search queries."
    },
    {
      id: "finance-sidehustles",
      name: "Smart passive income reviews",
      demand: "High",
      competition: "Moderate",
      growth: "+12% MoM",
      cpm: "$18 - $25",
      description: "Analyzing genuine passive income channels without clickbait hype, emphasizing spreadsheet proof.",
      secretWeapon: "Deep audience engagement with pinned free downloadable resources."
    }
  ]);
});

// ==========================================
// VITE OR STATIC FILE MIDDLEWARE
// ==========================================
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Integratred Vite Middleware (Development Mode)");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving static production files from dist folder");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://0.0.0.0:${PORT}`);
  });
}

setupViteOrStatic().catch((err) => {
  console.error("Failed to boot Express + Vite Server:", err);
});

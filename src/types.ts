export interface ConceptAnalysis {
  viralityScore: number;
  critique: string;
  hookBlueprint: {
    promise: string;
    proof: string;
    motion: string;
    curiosityGap: string;
  };
  pacingBreakdown: {
    hookPacing: string;
    midPacing: string;
    latePacing: string;
    endPacing: string;
  };
  milestones: {
    timestamp: string;
    sectionName: string;
    strategy: string;
    predictedRetention: number;
  }[];
  emotionalMidpoint: string;
  packagingVariants: {
    title: string;
    thumbnailConcept: string;
    whyItWorks: string;
  }[];
}

export interface BeatGrade {
  score: number;
  critique: string;
}

export interface HookGradeResult {
  overallScore: number;
  promiseGrade: BeatGrade;
  proofGrade: BeatGrade;
  motionGrade: BeatGrade;
  curiosityGapGrade: BeatGrade;
  viralOverhaul: string;
  annotations: string[];
}

export interface NicheStrategy {
  searchDemand: string;
  competitionLevel: string;
  estimatedCPM: string;
  strategicPillars: {
    pillar: string;
    whyWorks: string;
    exampleIdea: string;
  }[];
  shortsFunnelStrategy: string;
  longFormAnchors: string;
  growthHacks: string[];
}

export interface MarketTrend {
  id: string;
  name: string;
  demand: string;
  competition: string;
  growth: string;
  cpm: string;
  description: string;
  secretWeapon: string;
}

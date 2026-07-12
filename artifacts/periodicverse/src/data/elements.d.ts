export interface ElementData {
  atomicNumber: number;
  symbol: string;
  name: string;
  atomicMass: number;
  category: string;
  categoryLabel: string;
  period: number;
  group: number | null;
  block: string;
  electronConfiguration: string;
  state: string;
  meltingPoint: number | null;
  boilingPoint: number | null;
  density: number;
  electronegativity: number | null;
  oxidationStates: string;
  discoverer: string;
  yearDiscovered: string;
  atomicRadius: number | null;
  description: string;
  uses: string[];
  facts: string[];
  occurrence: string;
  applications: string;
  industrialUses: string;
  biologicalImportance: string;
  ncertRelevance: string;
  relatedElements: string[];
}

export const ELEMENTS: ElementData[];
export const CATEGORY_LABELS: Record<string, string>;

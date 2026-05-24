export interface RichParagraph {
  id: string
  text: string
}

export interface Challenge {
  id: string
  title: string
  body: string
}

export interface ContentSection {
  id: string
  label: string // → Notion heading block
  paragraphs: RichParagraph[]
}

export interface CaseStudyMeta {
  company: string // → Notion select property
  period: string // → Notion text property
  role: string // → Notion text property
  scope: string // → Notion text property
  stack: string[] // → Notion multi-select property
}

export interface CaseStudy {
  slug: string
  tag: string // e.g. "Tesla · 2023 – 2026"
  title: string // → Notion page title
  lead: string // → Notion description/summary property
  meta: CaseStudyMeta
  sections: ContentSection[]
  challenges: Challenge[]
  retrospective: RichParagraph[]
}

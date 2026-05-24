export interface RichParagraph {
  id: string
  text: string
}

export interface PostSection {
  id: string
  heading?: string // → Notion heading_2 block (optional)
  paragraphs: RichParagraph[]
  pull?: string // → Notion quote block, injected after first paragraph
  pullAfter?: string // id of the paragraph after which the pull appears
}

export interface Post {
  slug: string
  title: string // → Notion page title
  date: string // → Notion date property  e.g. "October 2024"
  readingTime: string // → Notion text property  e.g. "8 min read"
  tags: string[] // → Notion multi-select property
  intro: string // → Notion callout/quote block (displayed larger)
  sections: PostSection[]
}

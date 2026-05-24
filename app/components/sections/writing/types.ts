// Notion mapping:
//   Each PostSummary = one Notion page in a "Writing" database
//   slug, title, date, readingTime, tags, excerpt → page properties
//   When wired: loader queries the DB, returns PostSummary[]
//
//   Future loader:
//     export async function loader() {
//       return fetchAllPosts(); // returns PostSummary[]
//     }

export interface PostSummary {
  slug: string
  title: string // → Notion page title
  date: string // → Notion date property  e.g. "Oct 2024"
  readingTime?: string | null // → Notion text property  e.g. "8 min"
  tags: string[] // → Notion multi-select property
  excerpt: string // → Notion text property (first sentence / summary)
  published: boolean // → Notion checkbox property — false = "Coming soon"
}

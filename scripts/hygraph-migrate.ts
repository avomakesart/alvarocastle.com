import { Client, SimpleFieldType } from '@hygraph/management-sdk'

const DRY_RUN = process.env.DRY_RUN === 'true'

const authToken = process.env.HYGRAPH_AUTH_TOKEN
const endpoint = process.env.HYGRAPH_CONTENT_ENDPOINT

if (!authToken || !endpoint) {
  console.error(
    'Missing HYGRAPH_AUTH_TOKEN or HYGRAPH_ENDPOINT in environment.'
  )
  process.exit(1)
}

const client = new Client({
  authToken,
  endpoint,
  name: 'portfolio-schema-v2',
})

// Campo de texto localizable (en + es)
function localizedfield(
  parentApiId: string,
  apiId: string,
  displayName: string,
  type: SimpleFieldType,
  opts: {
    isRequired?: boolean
    isTitle?: boolean
    isUnique?: boolean
    isList?: boolean
    description?: string
  } = {}
) {
  client.createSimpleField({
    parentApiId,
    apiId,
    displayName,
    type,
    isLocalized: true,
    ...opts,
  })
}

// Campo NO localizable (URLs, booleans, números — iguales en todos los locales)
function field(
  parentApiId: string,
  apiId: string,
  displayName: string,
  type: SimpleFieldType,
  opts: {
    isRequired?: boolean
    isTitle?: boolean
    isUnique?: boolean
    isList?: boolean
    description?: string
  } = {}
) {
  client.createSimpleField({
    parentApiId,
    apiId,
    displayName,
    type,
    isLocalized: false,
    ...opts,
  })
}

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIG  (singleton — un solo registro)
// Globals compartidos entre todas las páginas.
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'SiteConfig',
  apiIdPlural: 'SiteConfigs',
  displayName: 'Site Config',
  description: 'Global settings shared across all pages.',
})
localizedfield(
  'SiteConfig',
  'siteTitle',
  'Site Title',
  SimpleFieldType.String,
  { isRequired: true, isTitle: true }
)
localizedfield('SiteConfig', 'footer', 'Footer', SimpleFieldType.String, {
  isRequired: true,
})
// URL — not localized
field('SiteConfig', 'cvUrl', 'CV URL', SimpleFieldType.String)

// ─────────────────────────────────────────────────────────────────────────────
// HOME  (singleton)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'Home',
  apiIdPlural: 'Homes',
  displayName: 'Home',
  description: 'Home page content.',
})

// Hero
localizedfield(
  'Home',
  'pageTag',
  'Page Tag, ex. Home',
  SimpleFieldType.String,
  { isRequired: false }
)
localizedfield('Home', 'heroTitle', 'Hero — Title', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
localizedfield(
  'Home',
  'heroSubtitle',
  'Hero — Subtitle',
  SimpleFieldType.String,
  { isRequired: true }
)
localizedfield(
  'Home',
  'heroDescription',
  'Hero — Description',
  SimpleFieldType.String,
  { isRequired: true }
)

// Hero social links — stored as plain strings, rendered as links in the component
field('Home', 'githubUrl', 'GitHub URL', SimpleFieldType.String)
field('Home', 'twitterUrl', 'Twitter URL', SimpleFieldType.String)
field('Home', 'linkedinUrl', 'LinkedIn URL', SimpleFieldType.String)

// Experience section
localizedfield(
  'Home',
  'experienceSectionTitle',
  'Experience — Section Title',
  SimpleFieldType.String,
  { description: '"EXPERIENCE"' }
)

// Experience entries — stored as a JSON list of objects
// Shape per entry: { company, role, dateRange }
// Hygraph doesn't have a native repeater on the free tier, so we store
// each property as a parallel list and zip them in the loader.
// Alternatively, move this to a separate ExperienceEntry model (see note below).
field(
  'Home',
  'experienceCompanies',
  'Experience — Companies',
  SimpleFieldType.String,
  { isList: true, description: 'e.g. [Tesla Energy]' }
)
localizedfield(
  'Home',
  'experienceRoles',
  'Experience — Roles',
  SimpleFieldType.String,
  { isList: true, description: 'e.g. [Senior Software Development Engineer]' }
)
field(
  'Home',
  'experienceDateRanges',
  'Experience — Date Ranges',
  SimpleFieldType.String,
  { isList: true, description: 'e.g. [2025 – 2026]' }
)

// Selected Work section
localizedfield(
  'Home',
  'workSectionTitle',
  'Work — Section Title',
  SimpleFieldType.String,
  { description: '"SELECTED WORK"' }
)
field('Home', 'workSectionUrl', 'Work — Section URL', SimpleFieldType.String, {
  description: '"all projects" link target, e.g. /work',
})
// The actual projects come from the Work collection — filtered by `order` in the loader (first 2 published).

// Writing section
localizedfield(
  'Home',
  'writingSectionTitle',
  'Writing — Section Title',
  SimpleFieldType.String,
  { description: '"WRITING"' }
)
field(
  'Home',
  'writingSectionUrl',
  'Writing — Section URL',
  SimpleFieldType.String,
  { description: '"all entries" link target, e.g. /writing' }
)
// The actual posts come from the Writing collection — sorted by date desc, first 2 published.

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT  (singleton)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'About',
  apiIdPlural: 'Abouts',
  displayName: 'About',
  description: 'About page content.',
})
localizedfield('About', 'headline', 'Headline', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
  description: '"Engineer, tinkerer, Guadalajara → Utrecht."',
})
localizedfield('About', 'lead', 'Lead paragraph', SimpleFieldType.String, {
  isRequired: true,
})
localizedfield(
  'About',
  'pageTag',
  'Page Tag, ex. About',
  SimpleFieldType.String,
  { isRequired: true }
)
localizedfield(
  'About',
  'howIWorkSectionTitle',
  'How I Work — Section Title',
  SimpleFieldType.String,
  {
    isRequired: true,
  }
)
localizedfield(
  'About',
  'howIWork',
  'How I Work — Body',
  SimpleFieldType.Richtext,
  { description: 'Body paragraphs for the How I Work section.' }
)
localizedfield('About', 'stackSectionTitle', 'Stack', SimpleFieldType.String, {
  isRequired: true,
})
field('About', 'stackDaily', 'Stack — Day to Day', SimpleFieldType.String, {
  isList: true,
})
field('About', 'stackAlso', 'Stack — Also', SimpleFieldType.String, {
  isList: true,
})
localizedfield(
  'About',
  'outsideWorkSectionTitle',
  'Outside Work — Section Title',
  SimpleFieldType.String,
  {
    isRequired: true,
  }
)
localizedfield(
  'About',
  'outsideWork',
  'Outside Work — Body',
  SimpleFieldType.String,
  { description: 'Short paragraph for the Outside Work section.' }
)
localizedfield('About', 'linksSectionTitle', 'Links', SimpleFieldType.String, {
  isRequired: true,
})
field('About', 'githubUrl', 'GitHub URL', SimpleFieldType.String)
field('About', 'linkedinUrl', 'LinkedIn URL', SimpleFieldType.String)
field('About', 'twitterUrl', 'Twitter URL', SimpleFieldType.String)
field('About', 'cvUrl', 'CV URL', SimpleFieldType.String)

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT  (singleton)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'Contact',
  apiIdPlural: 'Contacts',
  displayName: 'Contact',
  description: 'Contact page content and social links.',
})
localizedfield(
  'Contact',
  'pageTag',
  'Page Tag, ex. Contact',
  SimpleFieldType.String,
  { isRequired: false }
)
localizedfield('Contact', 'headline', 'Headline', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
localizedfield('Contact', 'subtext', 'Subtext', SimpleFieldType.String)
localizedfield(
  'Contact',
  'replyTime',
  'Reply time hint',
  SimpleFieldType.String,
  { description: '"Usually replies within a day."' }
)
field('Contact', 'email', 'Email', SimpleFieldType.String, { isRequired: true })
field('Contact', 'githubUrl', 'GitHub URL', SimpleFieldType.String)
field('Contact', 'linkedinUrl', 'LinkedIn URL', SimpleFieldType.String)
field('Contact', 'twitterUrl', 'Twitter / X URL', SimpleFieldType.String)
field('Contact', 'cvUrl', 'CV URL', SimpleFieldType.String)

// ─────────────────────────────────────────────────────────────────────────────
// WORK  (singleton)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'Work',
  apiIdPlural: 'Works',
  displayName: 'Work',
  description: 'Work page content.',
})
localizedfield(
  'Work',
  'pageTag',
  'Page Tag, ex. Work',
  SimpleFieldType.String,
  { isRequired: false }
)
localizedfield('Work', 'headline', 'Headline', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
localizedfield('Work', 'subtext', 'Subtext', SimpleFieldType.String)

// ─────────────────────────────────────────────────────────────────────────────
// WORK  (collection — one entry per case study)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'WorkEntry',
  apiIdPlural: 'WorkEntries',
  displayName: 'WorkEntry',
  description: 'Portfolio case studies.',
})
localizedfield('WorkEntry', 'title', 'Title', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
field('WorkEntry', 'slug', 'Slug', SimpleFieldType.String, {
  isRequired: true,
  isUnique: true,
})
localizedfield('WorkEntry', 'tag', 'Tag', SimpleFieldType.String, {
  description: '"Tesla · 2023 – 2026"',
})
field('WorkEntry', 'company', 'Company', SimpleFieldType.String, {
  isRequired: true,
})
field('WorkEntry', 'date', 'Date', SimpleFieldType.String, {
  description: 'Displayed date range, e.g. "2025 – 2026"',
})
localizedfield('WorkEntry', 'role', 'Role', SimpleFieldType.String)
localizedfield('WorkEntry', 'scope', 'Scope', SimpleFieldType.String)
localizedfield('WorkEntry', 'lead', 'Lead', SimpleFieldType.String, {
  isRequired: true,
  description: 'Short description shown in /work list and case study hero.',
})
field('WorkEntry', 'stack', 'Stack', SimpleFieldType.String, { isList: true })
localizedfield('WorkEntry', 'body', 'Body', SimpleFieldType.Richtext, {
  isRequired: true,
  description:
    'H2 = section label, H3 = challenge title, blockquote = pull quote.',
})
field('WorkEntry', 'order', 'Order', SimpleFieldType.Boolean, {
  description:
    'Display order in /work and Home featured section. Lower = first.',
})
field('WorkEntry', 'published', 'Published', SimpleFieldType.Boolean, {
  isRequired: true,
})

// ─────────────────────────────────────────────────────────────────────────────
// WRITING  (singleton)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'Writing',
  apiIdPlural: 'Writings',
  displayName: 'Writing',
  description: 'Writing page content.',
})
localizedfield(
  'Writing',
  'pageTag',
  'Page Tag, ex. Writing',
  SimpleFieldType.String,
  { isRequired: false }
)
localizedfield('Writing', 'headline', 'Headline', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
localizedfield('Writing', 'subtext', 'Subtext', SimpleFieldType.String)

// ─────────────────────────────────────────────────────────────────────────────
// WRITING  (collection — one entry per post)
// ─────────────────────────────────────────────────────────────────────────────
client.createModel({
  apiId: 'WritingEntry',
  apiIdPlural: 'WritingEntries',
  displayName: 'WritingEntry',
  description: 'Blog posts.',
})
localizedfield('WritingEntry', 'title', 'Title', SimpleFieldType.String, {
  isRequired: true,
  isTitle: true,
})
field('WritingEntry', 'slug', 'Slug', SimpleFieldType.String, {
  isRequired: true,
  isUnique: true,
})
field('WritingEntry', 'date', 'Date', SimpleFieldType.Date, {
  isRequired: true,
})
localizedfield(
  'WritingEntry',
  'readingTime',
  'Reading Time',
  SimpleFieldType.String,
  { description: '"8 min"' }
)
localizedfield('WritingEntry', 'tags', 'Tags', SimpleFieldType.String, {
  isList: true,
})
localizedfield('WritingEntry', 'excerpt', 'Excerpt', SimpleFieldType.String, {
  isRequired: true,
  description: 'First sentence shown in /writing list and Home preview.',
})
localizedfield('WritingEntry', 'intro', 'Intro', SimpleFieldType.String, {
  description: 'Large italic paragraph shown before the body.',
})
localizedfield('WritingEntry', 'body', 'Body', SimpleFieldType.Richtext, {
  isRequired: true,
  description: 'H2 = section heading, blockquote = pull quote.',
})
field('WritingEntry', 'published', 'Published', SimpleFieldType.Boolean, {
  isRequired: true,
})

// ─────────────────────────────────────────────────────────────────────────────
// EJECUTAR
// ─────────────────────────────────────────────────────────────────────────────
async function run() {
  console.log(
    `\n🚀 Hygraph schema migration — ${DRY_RUN ? 'DRY RUN' : 'LIVE'}\n`
  )
  console.log(
    '📋 Singletons → SiteConfig, Home, About, WorkPage, WritingPage, Contact'
  )
  console.log('📋 Collections → WorkEntry, WritingEntry')
  console.log('🌐 Locales — en (default) + es\n')
  console.log("⚠️  Asegúrate de haber agregado el locale 'es' en:")
  console.log('   Hygraph → Project Settings → Localization\n')

  if (DRY_RUN) {
    const changes = client.dryRun()
    console.log(JSON.stringify(changes, null, 2))
    console.log('\n⚠️  Dry run — sin cambios aplicados.')
    return
  }

  const result = await client.run(true)

  if (result.errors) {
    console.error('❌ Migration failed:\n', result.errors)
    process.exit(1)
  }

  console.log(`✅ Finished at: ${result.finishedAt}`)
  console.log('\n📌 Next steps:')
  console.log('   1. Hygraph → Schema → verifica los 8 modelos')
  console.log(
    "   2. Hygraph → Project Settings → Localization → agrega 'es' si no lo hiciste"
  )
  console.log(
    '   3. Crea un Permanent Auth Token read-only para la Content API'
  )
  console.log('   4. Agrega HYGRAPH_CONTENT_ENDPOINT + HYGRAPH_TOKEN a tu .env')
  console.log(
    '   5. Llena los singletons: SiteConfig, Home, About, WorkPage, WritingPage, Contact'
  )
  console.log('   6. Crea los primeros WorkEntry y WritingEntry')
}

run().catch((err) => {
  console.error('💥 Error inesperado:', err)
  process.exit(1)
})

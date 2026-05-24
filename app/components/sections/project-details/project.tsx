import {
  RichText,
  type RichTextProps,
} from '@graphcms/rich-text-react-renderer'
import { extractCodeContent, type CustomEmbeds } from '~/lib/richtext'
import { DiagramIllustration } from './diagram-illustration'
import { MetadataMobile } from './metadata-mobile'
import { Sidebar } from './sidebar'
import type { CaseStudy } from './types'

const CUSTOM_EMBEDS: CustomEmbeds = {
  'diagram:system': <DiagramIllustration />,
}

export const Project = ({
  caseStudy,
}: {
  caseStudy: Pick<CaseStudy, 'meta'> & { body: RichTextProps['content'] }
}) => {
  const { meta, body } = caseStudy

  return (
    <div className="grid border-t border-b md:grid-cols-[1fr_200px]">
      <main className="space-y-12 py-12 md:border-r md:pr-10">
        {body && (
          <RichText
            content={body}
            renderers={{
              code_block: ({ children }) => {
                const content = extractCodeContent(children)
                if (content in CUSTOM_EMBEDS) return CUSTOM_EMBEDS[content]
                return (
                  <pre className="overflow-x-auto rounded bg-[--bg2] p-4 text-xs">
                    <code>{children}</code>
                  </pre>
                )
              },
              p: ({ children }) => (
                <p className="mb-4 pt-4 text-base last:mb-4">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="mb-2.5 list-disc pl-6 text-base">{children}</ul>
              ),
              h2: (props) => (
                <h2
                  className="mb-2.5 border-b pt-4 pb-4 font-heading text-lg font-medium first:pt-0 last:border-0 last:pb-0"
                  {...props}
                />
              ),
              h3: (props) => (
                <h3
                  className="mb-0 pt-2.5 font-heading text-base font-medium"
                  {...props}
                />
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-7 border-l-2 border-[rgba(26,24,20,0.2)] py-1 pl-5 text-[15px] leading-[1.7] text-[--text] italic">
                  {children}
                </blockquote>
              ),
            }}
          />
        )}
      </main>
      <MetadataMobile meta={meta} />
      <Sidebar meta={meta} />
    </div>
  )
}

import {
  RichText,
  type RichTextProps,
} from '@graphcms/rich-text-react-renderer'

export function PostSectionBlock({ body }: { body: RichTextProps['content'] }) {
  return (
    <section>
      <div className="space-y-4">
        <RichText
          content={body}
          renderers={{
            code_block: ({ children }) => {
              return (
                <pre className="overflow-x-auto rounded bg-[--bg2] p-4 text-xs">
                  <code>{children}</code>
                </pre>
              )
            },
            p: ({ children }) => (
              <p className="text-base last:mb-4">{children}</p>
            ),
            h2: (props) => (
              <h2
                className="m-0 py-4 font-heading text-2xl font-medium first:pt-0 last:pb-0"
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
              <blockquote className="my-7 border-l-2 border-[rgba(26,24,20,0.2)] py-1 pl-5 text-base italic">
                {children}
              </blockquote>
            ),
          }}
        />
      </div>
    </section>
  )
}

interface HygraphCodeChild {
  props: {
    content: Array<{ text: string }>
  }
}

function isHygraphCodeChild(children: unknown): children is HygraphCodeChild {
  return (
    typeof children === 'object' &&
    children !== null &&
    'props' in children &&
    typeof (children as HygraphCodeChild).props?.content !== 'undefined' &&
    Array.isArray((children as HygraphCodeChild).props.content)
  )
}

export function extractCodeContent(children: unknown): string {
  if (!isHygraphCodeChild(children)) return ''
  return children.props.content
    .map((c) => c.text)
    .join('')
    .trim()
}

export type CustomEmbeds = Record<string, React.ReactNode>

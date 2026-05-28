import {
  type RouteConfig,
  index,
  prefix,
  route,
} from '@react-router/dev/routes'

export default [
  ...prefix(':lang', [
    index('routes/home.tsx'),
    route('about', 'routes/about.tsx'),
    route('work', 'routes/work.tsx'),
    route('work/:projectId', 'routes/project-details.tsx'),
    route('writing', 'routes/writing.tsx'),
    route('writing/:postId', 'routes/writing-details.tsx'),
    route('contact', 'routes/contact.tsx'),
  ]),
  route('/api/likes/:slug', 'routes/api.like.$slug.ts'),
] satisfies RouteConfig

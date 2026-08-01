import type { MetadataRoute } from 'next'

import { routePaths, siteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return routePaths.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}

import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: "uraj.dev // docs",
    titleTemplate: ":title",
    description: "Centralized documentation for all my projects.",
    appearance: 'dark',
    
    // Favicon injection
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
    ],

    // This cleans up URLs to remove .html extensions
    cleanUrls: true,

    themeConfig: {
      logo: '/logo.svg',
      siteTitle: false, // Hides the text next to the logo in the navbar
      
      nav: [
        { text: 'Home', link: '/' },
        { 
          text: 'Projects', 
          items: [
            { text: '2ndBrain', link: '/2ndbrain/' },
            { text: 'VERTO', link: '/verto/' },
            { text: 'do.it', link: '/doit/' },
            { text: 'do.it (MERN)', link: '/doit-mern/' }
          ]
        }
      ],

      // Multi-sidebar configuration based on the URL path
      sidebar: {
        // When the user is anywhere inside the /2ndbrain/ path, show this sidebar
        '/2ndbrain/': [
          {
            text: 'Overview',
            items: [
              { text: 'Setup & Deployment', link: '/2ndbrain/setup-and-deployment' }
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'Auth & State Routing', link: '/2ndbrain/architecture/auth-routing' },
              { text: 'Firestore Schema', link: '/2ndbrain/architecture/database-schema' },
              { text: 'Canvas Physics Engine', link: '/2ndbrain/architecture/physics-engine' }
            ]
          },
          {
            text: 'Components & Logic',
            items: [
              { text: 'Neural Copilot (AI)', link: '/2ndbrain/components/ai-copilot' },
              { text: 'Auto-Synapse Engine (NLP)', link: '/2ndbrain/components/auto-synapse' },
              { text: 'BlockNote Integration', link: '/2ndbrain/components/blocknote-integration' },
              { text: 'Bi-Directional Linking', link: '/2ndbrain/components/editor-linking' },
              { text: 'RPG Gamification', link: '/2ndbrain/components/gamification' },
              { text: 'Directory System', link: '/2ndbrain/components/directory-system' }
            ]
          },
          {
            text: 'Design System',
            items: [
              { text: 'Typography & Colors', link: '/2ndbrain/design/typography-and-colors' },
              { text: 'UI / UX Flow', link: '/2ndbrain/design/ui-ux-flow' }
            ]
          }
        ],
        '/verto/': [
          {
            text: 'Overview',
            items: [
              { text: 'Architecture', link: '/verto/architecture' },
              { text: 'Setup & Deployment', link: '/verto/setup-and-deployment' }
            ]
          },
          {
            text: 'Technical Details',
            items: [
              { text: 'Features Deep Dive', link: '/verto/features' },
              { text: 'Database Schema', link: '/verto/database' },
              { text: 'Component Breakdown', link: '/verto/components' }
            ]
          }
        ],
        '/doit/': [
          {
            text: 'Overview',
            items: [
              { text: 'Architecture', link: '/doit/architecture' },
              { text: 'Setup & Deployment', link: '/doit/setup-and-deployment' }
            ]
          },
          {
            text: 'Technical Details',
            items: [
              { text: 'Features Deep Dive', link: '/doit/features' },
              { text: 'Database Schema', link: '/doit/database' },
              { text: 'Component Breakdown', link: '/doit/components' }
            ]
          }
        ],
        '/doit-mern/': [
          {
            text: 'Overview',
            items: [
              { text: 'Architecture', link: '/doit-mern/architecture' },
              { text: 'Setup & Deployment', link: '/doit-mern/setup-and-deployment' }
            ]
          },
          {
            text: 'Technical Details',
            items: [
              { text: 'Express Backend API', link: '/doit-mern/backend-api' },
              { text: 'Authentication Flow', link: '/doit-mern/authentication-flow' },
              { text: 'Features Deep Dive', link: '/doit-mern/features' },
              { text: 'Database Schema', link: '/doit-mern/database' },
              { text: 'Component Breakdown', link: '/doit-mern/components' }
            ]
          }
        ]
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/yuvrajshrirame' }
      ]
    }
  })
)

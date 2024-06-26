import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import supersub from 'remark-supersub';
import remarkTextr from 'remark-textr';
import remarkToc from 'remark-toc';
import rehypeKatex from 'rehype-katex';
import rehypeMathJaxSvg from 'rehype-mathjax';
import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './remark-reading-time.mjs';
// import vercel from '@astrojs/vercel/serverless';

import netlify from '@astrojs/netlify';
// import netlify from '@astrojs/netlify/edge-functions';

import sitemap from '@astrojs/sitemap';
import vue from "@astrojs/vue";


// https://astro.build/config
export default defineConfig({
  site: 'https://feyiyang.github.io',
  integrations: [mdx({
    rehypePlugins: [rehypeKatex]
  }), sitemap(), vue()],
  output: 'hybrid',
  adapter: netlify(),
  markdown: {
    remarkPlugins: [remarkMath, supersub, remarkTextr, remarkToc, remarkReadingTime],
    rehypePlugins: [rehypeMathJaxSvg]
  }
});

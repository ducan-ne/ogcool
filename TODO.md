- Editor
  - Url sync format: ?templateId=tpl_xxx&d=base64({modifications,...})
  - Preview
    - Template gallery
      - [x] Load from templates.json
      - [x] Draggable to scroll
      - [x] Scroll horizontally
      - [x] Stack for ref: scroll-snap, @use-gesture/react
    - Preview image
      - [x] Show skeleton when loading
    - Footer: show source, reference, not needed for this phase.
  - Form
    - [x] Load modification from templates.json 
    - [x] Edit should update to preview image, debounce 2e3
    - [x] Stack for ref: RAC, <Form onInput={debounce(2e3, updatePreview)} />
    - [x] Copy button (image url), Copy editor button, Preview button (link to https://dub.co/tools/metatags?url=https%3A%2F%2Fog.cool%2Fnytimes.com%2F2023%2F08%2F23%2Fclimate%2Focean-warming-fish.html)
  - Connect popup
    - [x] Show install sdk instruction to npm, yarn, pnpm, bun
    - [x] Connect by using SDK
    - [x] Syntax highlight use https://shiki.style
    - [ ] Code boilerplate for Next.js, Remix,
  - Sdk
    - [x] Build a simple sdk for ogcool
    - [x] Sdk just returns exact url for the template 
    - [x] Should be friendly for Advanced template: for example template like Epic React (has background)
    - [x] Nice to have: Typesafe for templates modifications
    - [x] Stacks: tsup
    - [x] A ./playground folder for testing
- Promote/Marketing
  - Launch on Producthunt
  - Domain: ogcool.vercel.app
  - Up to Twitter
  - README.md content
    - Introduction
    - Usage
    - References: https://github.com/steven-tey/og, https://github.com/dubinc/dub
  - Contributions guide: not now
  - Tracking: use https://tracking.graph.vn
- Templates sources
  - https://opengraphexamples.com/
  - https://ogimage.org/inspiration
  - https://www.opengraph.xyz/inspiration
  - https://fullstackheroes.com/resources/vercel-og-templates/
  - Github og image
  - https://github.com/wei/socialify
  - Kentcdodds Blog: https://res.cloudinary.com/kentcdodds-com/image/upload/$th_1256,$tw_2400,$gw_$tw_div_24,$gh_$th_div_12/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_14,h_$gh,x_$gw_mul_1.5,y_$gh_mul_1.3,l_text:kentcdodds.com:Matter-Regular.woff2_50:Check%2520out%2520this%2520article/co_white,c_fit,g_north_west,w_$gw_mul_13.5,h_$gh_mul_7,x_$gw_mul_1.5,y_$gh_mul_2.3,l_text:kentcdodds.com:Matter-Regular.woff2_110:Get%2520a%2520catch%2520block%2520error%2520message%2520with%2520TypeScript/c_fit,g_north_west,r_max,w_$gw_mul_4,h_$gh_mul_3,x_$gw,y_$gh_mul_8,l_kent:profile-transparent/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,h_$gh_mul_4,x_$gw_mul_4.5,y_$gh_mul_9,l_text:kentcdodds.com:Matter-Regular.woff2_70:Kent%20C.%20Dodds/co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_9,x_$gw_mul_4.5,y_$gh_mul_9.8,l_text:kentcdodds.com:Matter-Regular.woff2_40:kentcdodds.com%252Fblog%252Fget-a-catch-block-error-message-with-typescript/c_fill,ar_3:4,r_12,g_east,h_$gh_mul_10,x_$gw,l_unsplash:photo-1525785967371-87ba44b3e6cf/c_fill,w_$tw,h_$th/kentcdodds.com/social-background.png
  - Epic React: https://epicreact.dev/improve-the-performance-of-your-react-forms
  - https://twitter.com/scalar/status/1778837462858838474
  - https://supabase.com/images/blog/beta-update-december-2023/monthly-update-december-2023.jpg
  - https://twitter.com/joshenlimek/status/1775923854449463668 supabase ticket
  - https://twitter.com/supabase/status/1778439509585068461
  - https://nextjs.org/conf/registration next conf ticket
- templates.json structure
  - think about a mapper for friendly api for layers, for example "Text 2" + "Image 2" api become { author: { name: "Text 2", image: "Image 2" } }
  - form friendly for advanced modification (for example text can edit both of font size and color, and text)
  - zed.dev
```json
[
  {
    "id": "tpl_jNvsOYr0cr",
    "name": "XXXX",
    "modifications": [
      {
        "label": "Title",
        "name": "title",
        "default": "Default value for input"
      }
    ]
  }
]
```
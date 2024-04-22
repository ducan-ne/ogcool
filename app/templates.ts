export type Modification = {
  name: string
  // default "text"
  type?: 'text' | 'url'
  defaultValue: string
  // default true
  visible?: boolean
  meta?: {
    textarea?: boolean
  }
}

export type Template = {
  id: string
  name: string
  modifications: Modification[]
}

export const templates: Template[] = [
  {
    id: 'tpl_jNvsOYr0cr',
    name: 'UnJS',
    modifications: [
      {
        name: 'Text',
        defaultValue: 'Package',
      },
      {
        name: 'Name',
        defaultValue: 'unjs/automd',
      },
      {
        name: 'Description',
        defaultValue: 'Automated markdown maintainer',
        meta: {
          textarea: true,
        }
      },
      {
        name: 'Logo 1',
        type: 'url',
        defaultValue: 'https://unjs.io/assets/logos/automd.svg',
      },
      {
        name: 'Logo 2',
        type: 'url',
        defaultValue: 'https://unjs.io/favicon.svg',
      },
    ],
  },
  {
    id: 'tpl_0ybILPlWHj',
    name: 'EPICREACT.DEV',
    modifications: [
      {
        name: 'Website',
        defaultValue: 'EPICREACT.DEV',
      },
      {
        name: 'Description',
        defaultValue: 'Improve the\nPerformance of\nyour React Forms',
        meta: {
          textarea: true,
        },
      },
      {
        name: 'Author name',
        defaultValue: 'Kent Doods',
      },
      {
        name: 'Author avatar',
        type: 'url',
        defaultValue:
          'https://res.cloudinary.com/kentcdodds-com/image/upload/w_256,q_auto,f_auto/kent/profile-transparent',
      },
    ],
  },
  {
    id: 'tpl_G6uGICG0L8',
    name: 'Github',
    modifications: [
      {
        name: 'Image 1',
        type: 'url',
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/vclsgioZ43lLOcuNtdbVo---file',
      },
      {
        name: 'Logo',
        type: 'url',
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/LIs6RARa-kk0TFmCNaocL---file',
      },
      {
        name: 'Bottom image',
        type: 'url',
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/DlDMz4VSQPqX-mcMg-U-T---file',
      },
      {
        name: 'Logo 2',
        type: 'url',
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/yT1CmC-YjGGp1zeOxx5KF---github.svg',
      },
      { name: 'Org', type: 'text', defaultValue: 'facebook/' },
      { name: 'Repo', type: 'text', defaultValue: 'react' },
      {
        name: 'Description',
        type: 'text',
        defaultValue: 'The library for web and native user interfaces.',
        meta: {
          textarea: true,
        },
      },
      { name: 'Text 4', type: 'text', defaultValue: 'Used by' },
      { name: 'Text 2', type: 'text', defaultValue: 'Contributions' },
      { name: 'Text 3', type: 'text', defaultValue: '21m' },
      { name: 'Text 1', type: 'text', defaultValue: '2k' },
      { name: 'Text 7', type: 'text', defaultValue: '41k' },
      { name: 'Text 6', type: 'text', defaultValue: 'Stars' },
      { name: 'Text 8', type: 'text', defaultValue: 'Forks' },
      { name: 'Text 5', type: 'text', defaultValue: '221k' },
    ],
  },
  {
    id: 'tpl_8hrHbL8jTM',
    name: 'Mojo',
    modifications: [
      {
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/xKGmeNF9RVL2hnCau-mIx---file',
        type: 'url',
        name: 'Logo',
      },
      {
        defaultValue: 'Get it on',
        type: 'text',
        name: 'Text',
      },
      {
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/xKGmeNF9RVL2hnCau-mIx---file',
        type: 'url',
        name: 'Logo',
      },
      {
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/Br0etEVr9m8JZtTnEsUSd---file',
        type: 'url',
        name: 'Image',
      },
      {
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/ffp9dIEEfTzKdsEx1KH3T---file',
        type: 'url',
        name: 'Image 1',
      },
      {
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/Bzj54Rq6J-1-BdCM03tT1---file',
        type: 'url',
        name: 'Image 2',
      },
    ],
  },
  {
    id: 'tpl_Im2qA9QSvt',
    name: 'Branded logo',
    modifications: [
      {
        name: 'Logo',
        type: 'url',
        defaultValue:
          'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/BlA46GIwmds-Yrxgp5OqL---logo.svg',
      },
      {
        name: 'Text',
        defaultValue: 'Nuxt vs. Next: Which Should You\nChoose for Your Project？',
        meta: {
          textarea: true,
        },
      },
    ],
  },
  {
    id: 'tpl_TnllPg0CkP',
    name: 'Wave',
    modifications: [{
      name: 'Text',
      type: 'text',
      defaultValue: `Everything you need to know
about the Active Model
Serializer gem`,
      meta: {
        textarea: true,
      },
    }]
  },
  {
    id: 'tpl_yIru886ppx',
    name: 'Beta update',
    modifications: [{
      name: 'Image',
      type: 'url',
      defaultValue: 'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/XYh4xSkKOw8BH61qCrOw----file',
    }, {
      name: 'Text',
      type: 'text',
      defaultValue: 'Beta update',
    }, {
      name: 'Text 1',
      type: 'text',
      defaultValue: 'December 2023',
    }]
  },
  {
    id: 'tpl_6UGcrEz3o3',
    name: 'Supabase meetup',
    modifications: [{
      name: 'Text',
      defaultValue: 'Berlin Meetup'
    }, {
      name: 'Text 2',
      defaultValue: 'APR 17/ 7PM'
    }, {
      name: 'Brand',
      defaultValue: 'Supabase'
    }, {
      name: 'Text 3',
      defaultValue: 'Community meetup'
    }]
  },
  {
    id: 'tpl_V42NBJ7A8I',
    name: 'Branding 5',
    modifications: [{
      name: 'Text',
      defaultValue: 'Branding 5'
    }, {
      name: 'Image',
      type: 'url',
      defaultValue: 'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/RyiCfDYT9B8DD4QbvHbn1---file'
    }]
  },
  {
    id: 'tpl_Ungw707duC',
    name: 'IdeaGenius',
    modifications: [{
      name: 'Text',
      defaultValue: 'IdeaGenius.xyz'
    }, {
      name: 'Text 1',
      defaultValue: 'Niche Business Idea\nGenerator',
      meta: {
        textarea: true
      }
    }, {
      name: 'Image',
      type: 'url',
      defaultValue: 'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/rfA4DoT5p-xDsIsIzIlk3---file'
    }]
  },
  {
    id: 'tpl_nrj2p9AQ3Z',
    name: 'Uneed',
    modifications: [{
      name: 'Text',
      defaultValue: 'A launch platform for your\nproducts.',
      meta: {
        textarea: true
      }
    }, {
      name: 'Image',
      type: 'url',
      defaultValue: 'https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/-Oe9liXlS-d0FmjxxBPB----CleanShot-2024-04-21-at-10.54.06-2x-removebg-preview.png'
    }]
  },
  {
    id: 'tpl_JZqTL6ySAf',
    name: 'IndexPlease',
    modifications: [{
      name: 'Icon',
      defaultValue: '🙏',
    }, {
      name: 'Text',
      defaultValue: 'IndexPlease',
    }, {
      name: 'Text 2',
      defaultValue: 'Get your pages\nindexed in 48 hours',
      meta: {
        textarea: true
      }
    }]
  }
]
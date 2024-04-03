type Template = {
  id: string
  name: string
  modifications: {
    name: string
    // default "text"
    type?: "text" | "url"
    defaultValue: string
    // default true
    visible?: boolean
  }[]
}

export const templates: Template[] = [
  {
    id: "tpl_jNvsOYr0cr",
    name: "UnJS",
    modifications: [
      {
        name: "Text",
        defaultValue: "Package",
      },
      {
        name: "Name",
        defaultValue: "unjs/automd",
      },
      {
        name: "Description",
        defaultValue: "Automated markdown maintainer",
      },
      {
        name: "Logo 1",
        type: "url",
        defaultValue: "https://unjs.io/assets/logos/automd.svg",
      },
      {
        name: "Logo 2",
        type: "url",
        defaultValue: "https://unjs.io/favicon.svg",
      },
    ],
  },
  {
    id: "tpl_0ybILPlWHj",
    name: "EPICREACT.DEV",
    modifications: [
      {
        name: "Website",
        defaultValue: "EPICREACT.DEV",
      },
      {
        name: "Description",
        defaultValue: "Improve the\nPerformance of\nyour React Forms",
      },
      {
        name: "Author name",
        defaultValue: "Kent Doods",
      },
      {
        name: "Author avatar",
        type: "url",
        defaultValue:
          "https://res.cloudinary.com/kentcdodds-com/image/upload/w_256,q_auto,f_auto/kent/profile-transparent",
      },
    ],
  },
  {
    id: "tpl_G6uGICG0L8",
    name: "Github",
    modifications: [
      {
        name: "Image 1",
        type: "url",
        defaultValue:
          "https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/vclsgioZ43lLOcuNtdbVo---file",
      },
      {
        name: "Logo",
        type: "url",
        defaultValue:
          "https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/LIs6RARa-kk0TFmCNaocL---file",
      },
      {
        name: "Bottom image",
        type: "url",
        defaultValue:
          "https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/DlDMz4VSQPqX-mcMg-U-T---file",
      },
      {
        name: "Logo 2",
        type: "url",
        defaultValue:
          "https://celwszfgcmidbdbinqaz.supabase.co/storage/v1/object/public/assets/org_2eaLD3Yj0x6axnxHEI8RWqWQWBC/yT1CmC-YjGGp1zeOxx5KF---github.svg",
      },
      { name: "Org", type: "text", defaultValue: "facebook/" },
      { name: "Repo", type: "text", defaultValue: "react" },
      {
        name: "Description",
        type: "text",
        defaultValue: "The library for web and native user interfaces.",
      },
      { name: "Text 4", type: "text", defaultValue: "Used by" },
      { name: "Text 2", type: "text", defaultValue: "Contributions" },
      { name: "Text 3", type: "text", defaultValue: "21m" },
      { name: "Text 1", type: "text", defaultValue: "2k" },
      { name: "Text 7", type: "text", defaultValue: "41k" },
      { name: "Text 6", type: "text", defaultValue: "Stars" },
      { name: "Text 8", type: "text", defaultValue: "Forks" },
      { name: "Text 5", type: "text", defaultValue: "221k" },
    ],
  },
]

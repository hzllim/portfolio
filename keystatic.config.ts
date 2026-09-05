import { config, fields, collection, singleton } from "@keystatic/core";

const isProd =
  typeof import.meta !== "undefined" && Boolean(import.meta.env?.PROD)
    ? true
    : typeof process !== "undefined" && process.env?.NODE_ENV === "production";

export default config({
  // In development, Keystatic writes directly to local files.
  // In production (e.g. GitHub Pages), it connects via Keystatic Cloud.
  storage: isProd
    ? {
        kind: "cloud",
      }
    : {
        kind: "local",
      },
  cloud: {
    // When you register on https://keystatic.cloud, enter your "user/repo" here
    project: "your-github-username/your-repo-name",
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({
          label: "Summary / Short Description",
          multiline: true,
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        date: fields.date({
          label: "Project Date",
          defaultValue: { kind: "today" },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Branding & Identity", value: "branding" },
            { label: "UI / UX Design", value: "ui-ux" },
            { label: "Photography", value: "photography" },
            { label: "Web Design", value: "web-design" },
            { label: "Graphic Design", value: "graphic-design" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "branding",
        }),
        role: fields.text({
          label: "Role",
          description:
            "Project-specific role/title for this stint (e.g. Lead Product Designer)",
        }),
        featured: fields.checkbox({
          label: "Feature on Home Page",
          defaultValue: true,
        }),
        published: fields.checkbox({
          label: "Published (visible on site)",
          defaultValue: true,
        }),
        content: fields.markdoc({
          label: "Case Study / Details",
          options: {
            image: {
              directory: "public/images/projects",
              publicPath: "/images/projects/",
            },
          },
        }),
      },
    }),
  },
  singletons: {
    about: singleton({
      label: "About Me",
      path: "src/content/about/index",
      format: { contentField: "bio" },
      schema: {
        name: fields.text({ label: "Your Full Name" }),
        tagline: fields.text({ label: "Tagline / One-liner" }),
        bio: fields.markdoc({ label: "Biography" }),
        avatar: fields.image({
          label: "Profile Photo",
          directory: "public/images/about",
          publicPath: "/images/about/",
        }),
        email: fields.text({ label: "Contact Email" }),
        location: fields.text({ label: "Location (e.g. City, Country)" }),
        socialLinks: fields.array(
          fields.object({
            platform: fields.text({
              label:
                "Platform (e.g. LinkedIn, Dribbble, Behance, Figma, GitHub, X, Instagram)",
            }),
            url: fields.text({
              label: "Profile URL",
              description: "Paste link (works with or without https://)",
            }),
          }),
          {
            label: "Social Links",
            itemLabel: (props) =>
              props.fields.platform.value
                ? `${props.fields.platform.value} (${props.fields.url.value || "no link"})`
                : "Social Link",
          },
        ),
      },
    }),
  },
});

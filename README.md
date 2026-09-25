# PlantOPS Mintlify documentation template

Mintlify port of `PlantOPS_Document_Template.docx`.

```
docs.json                          Site config (PlantOPS navy #0E3A5F, logo, favicon, navigation)
index.mdx                          Home page
templates/document-template.mdx    <- COPY THIS for every new document
how-to-use.mdx                     Authoring steps + Word -> Mintlify mapping (remove before production)
style-guide.mdx                    All building blocks: callouts, code, tables, figures (remove before production)
logo/light.png, logo/dark.png      Logo for light / dark mode
favicon.png, images/               Favicon and page images
```

Preview: `npm i -g mint && mint dev`  ·  Check: `mint validate && mint broken-links`

Deploy: push this folder to the GitHub repo connected to your Mintlify dashboard (docs.json must be at the repo root, or set the monorepo path in the dashboard).

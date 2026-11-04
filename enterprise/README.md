# GLab Enterprise Asset Library

The official, root-level asset collection for **GLab Enterprise**. This is the canonical home for corporate identity, stationery, digital assets, marketing, editable source files, and asset records.

## Directory map

```text
enterprise/
├── identity/
│   ├── logos/
│   ├── qr-codes/
│   ├── brand-guidelines/
│   └── color-system/
├── stationery/
│   ├── business-cards/{print,digital,mockups}/
│   ├── letterheads/{print,editable,previews}/
│   ├── envelopes/
│   ├── email-signatures/
│   └── business-documents/{invoices,quotations,proposals,presentations}/
├── digital/
│   ├── website/{favicons,banners,backgrounds,ui-graphics}/
│   └── social-media/{profile,covers,posts,stories}/
├── marketing/{mockups,promotional-graphics,presentations,photography}/
├── icons/{interface,social}/
├── illustrations/{brand,nature,technology}/
├── source/{vector,raster,design-files,editable-documents}/
├── metadata/{asset-register,third-party-licenses,releases}/
└── archive/{drafts,superseded}/
```

## Common destinations

| Asset | Destination |
|---|---|
| Approved Enterprise logos | `identity/logos/` |
| Verified QR artwork and destination record | `identity/qr-codes/` |
| Enterprise identity guide and palette | `identity/brand-guidelines/`, `identity/color-system/` |
| Business card print PDF | `stationery/business-cards/print/` |
| Business card digital export | `stationery/business-cards/digital/` |
| Business card mockups | `stationery/business-cards/mockups/` |
| Letterhead print PDF | `stationery/letterheads/print/` |
| Editable letterhead DOCX | `stationery/letterheads/editable/` |
| Letterhead previews | `stationery/letterheads/previews/` |
| Website and social graphics | `digital/` |
| Presentations and promotional mockups | `marketing/` |
| Editable original artwork | `source/` |
| Asset inventory, version and license records | `metadata/` |

## Naming and approvals

Use lowercase kebab-case filenames with asset, variant/purpose, and version, for example:

```text
glab-ent-business-card-burgundy-print-v1.0.pdf
glab-ent-business-card-burgundy-preview-v1.0.png
glab-ent-letterhead-modern-editable-v1.0.docx
glab-ent-letterhead-modern-print-v1.0.pdf
glab-ent-logo-primary-transparent-v1.0.svg
```

See [asset versioning](metadata/ASSET-VERSIONING.md) and the [asset register](metadata/ASSET-REGISTER.md). Only files marked `approved` in the register should be used as official production assets. Keep working drafts and replaced versions in `archive/`.

## Production and rights

PDF is preferred for print delivery, SVG for scalable logos/icons, and transparent PNG for raster logo exports. Keep editable masters in `source/`; staged mockups are not print masters. Verify QR destinations after export and before printing.

The repository's [GLab Brand Assets License](../BRAND-ASSETS-LICENSE.md) applies to proprietary GLab assets. Third-party material remains subject to its own license. Record creator, source, permission, and attribution details. Never store confidential customer data, credentials, or private records.

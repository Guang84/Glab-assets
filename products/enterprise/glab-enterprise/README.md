# GLab Enterprise Asset Library

The official product-level asset collection for **GLab Enterprise**. Use this folder for its corporate identity, business stationery, digital graphics, marketing, editable masters, and asset records.

## Directory map

```text
glab-enterprise/
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
├── marketing/
│   ├── mockups/
│   ├── promotional-graphics/
│   ├── presentations/
│   └── photography/
├── icons/{interface,social}/
├── illustrations/{brand,nature,technology}/
├── source/{vector,raster,design-files,editable-documents}/
├── metadata/{asset-register,third-party-licenses,releases}/
└── archive/{drafts,superseded}/
```

## Asset destinations

| Asset | Destination |
|---|---|
| Approved logos | `identity/logos/` |
| Verified QR artwork and destination record | `identity/qr-codes/` |
| Brand guide and palette tokens | `identity/brand-guidelines/`, `identity/color-system/` |
| Business card print PDF | `stationery/business-cards/print/` |
| Business card digital export | `stationery/business-cards/digital/` |
| Business card presentation mockup | `stationery/business-cards/mockups/` |
| Letterhead PDF | `stationery/letterheads/print/` |
| Editable letterhead DOCX | `stationery/letterheads/editable/` |
| Letterhead previews | `stationery/letterheads/previews/` |
| Website/social artwork | `digital/` |
| Promotional mockups and slides | `marketing/` |
| Editable master artwork | `source/` |
| Inventory, license and release notes | `metadata/` |

## Naming and versioning

Use lowercase kebab-case and include brand, asset, variant/purpose, and version:

```text
glab-ent-business-card-burgundy-print-v1.0.pdf
glab-ent-business-card-burgundy-preview-v1.0.png
glab-ent-letterhead-modern-editable-v1.0.docx
glab-ent-letterhead-modern-print-v1.0.pdf
glab-ent-logo-primary-transparent-v1.0.svg
```

Avoid ambiguous names such as `final-final`, `new`, or `latest`. See [ASSET-VERSIONING.md](metadata/ASSET-VERSIONING.md).

## Export and approval rules

- PDF is preferred for print delivery; SVG for scalable logos/icons; transparent PNG where raster artwork is needed.
- Use WebP/JPG for photographic or web delivery where appropriate.
- Keep editable source files in `source/`; a staged mockup is not a print master.
- Verify QR destinations after export and before printing.
- Use asset statuses `draft`, `review`, `approved`, `superseded`, or `archived` in the asset register. Only approved assets are official production assets.

## Rights and confidentiality

The repository's [GLab Brand Assets License](../../../BRAND-ASSETS-LICENSE.md) applies to proprietary GLab assets. Third-party material remains subject to its own license. Record creator, source, permission, and attribution details where relevant. Do not store confidential customer material, credentials, or private records.

# Asset Naming and Versioning

## Filename convention

```text
glab-ent-<asset>-<variant>-<purpose>-v<major>.<minor>.<ext>
```

Example: `glab-ent-business-card-burgundy-print-v1.0.pdf`.

## Version rules

- Major version (`v2.0`): material redesign, changed content, or changed specification.
- Minor version (`v1.1`): small correction or compatible refinement.
- Track `draft`, `review`, and `approved` in the asset register, not in place of version numbers.
- Avoid ambiguous names such as `final`, `final2`, `latest`, or `new`.

Keep current approved files in production folders. Move retained older versions to `archive/superseded/` and update the register. Store editable masters in `source/` and link them to their production exports.

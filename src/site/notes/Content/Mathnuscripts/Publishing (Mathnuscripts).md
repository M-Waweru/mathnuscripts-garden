---
{"dg-publish":true,"permalink":"/content/mathnuscripts/publishing-mathnuscripts/","noteIcon":"2"}
---

# Publishing (Mathnuscripts)

Centralised view of publishing across Markbase and a custom site.

## Current
- Markbase: `https://mathnuscripts.markbase.xyz/Home`
- Obsidian Digital Garden plugin for hosting

## Target Architecture
```mermaid
flowchart TB
  subgraph Authoring
    O[Obsidian Vault]
    J[Handwritten → OCR]
  end
  subgraph Build & Index
    P[Parser + Frontmatter]
    I[Search Index + Embeddings]
  end
  subgraph Delivery
    M[Markbase]
    C[Custom Site]
    A[Ask Mathenge]
  end
  O --> P --> I --> C
  O --> M
  I --> A
  J --> O
```

## Links
- [[Fleeting Notes/Publishing My Second Brain\|Publishing My Second Brain]]
- [[Content/Projects/Mathnuscripts\|Mathnuscripts]]
- [[Content/Home\|Home]]



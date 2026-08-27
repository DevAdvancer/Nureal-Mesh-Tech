import re

def process():
    with open('data/projects.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # First, undo the previous addition to start fresh
    content = re.sub(r'\s*// image: "/images/projects/[^"]+\.png",\n?', '\n', content)
    content = re.sub(r'\s*/\* image: "/images/projects/[^"]+\.png" \*/', '', content)

    out = []
    slug = None
    
    for line in content.split('\n'):
        m = re.search(r'^\s*slug:\s*\"(.*?)\",', line)
        if m:
            slug = m.group(1)
            out.append(line)
            # Add image right after slug
            out.append(f'    image: "", // e.g. "/images/projects/{slug}/hero.png"')
            continue
            
        if 'gallery: [' in line:
            gallery_count = 1
            out.append(line)
            continue
            
        # Match gallery items: { grad: ..., caption: ..., kind: ... }
        if slug and 'grad:' in line and 'caption:' in line and '}' in line:
            line = re.sub(r'(})\s*,?\s*$', f', image: "" /* e.g. "/images/projects/{slug}/gallery-{gallery_count}.png" */ \\1,', line)
            gallery_count += 1
            out.append(line)
            continue

        out.append(line)

    with open('data/projects.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))

process()

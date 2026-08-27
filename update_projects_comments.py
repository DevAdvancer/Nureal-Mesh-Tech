import re

def process():
    with open('data/projects.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # First, undo the previous addition to start fresh
    content = re.sub(r'\s+image: "/images/projects/[^"]+\.png",\n?', '\n', content)
    content = re.sub(r',\s*image: "/images/projects/[^"]+\.png"', '', content)

    out = []
    slug = None
    gallery_count = 1
    
    for line in content.split('\n'):
        m = re.search(r'^\s*slug:\s*\"(.*?)\",', line)
        if m:
            slug = m.group(1)
            out.append(line)
            # Add commented image right after slug
            out.append(f'    // image: "/images/projects/{slug}/hero.png",')
            continue
            
        if 'gallery: [' in line:
            gallery_count = 1
            out.append(line)
            continue
            
        # Match gallery items: { grad: ..., caption: ..., kind: ... }
        if slug and 'grad:' in line and 'caption:' in line and '}' in line:
            line = re.sub(r'(})\s*,?\s*$', f' /* image: "/images/projects/{slug}/gallery-{gallery_count}.png" */ \\1,', line)
            gallery_count += 1
            out.append(line)
            continue

        out.append(line)

    with open('data/projects.ts', 'w', encoding='utf-8') as f:
        f.write('\n'.join(out))

process()

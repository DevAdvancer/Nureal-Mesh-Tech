import re

def process():
    with open('data/projects.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # We previously wrote: `    image: "", // e.g. "/images/projects/flowdesk/hero.png"`
    # Let's replace it with `    image: "/images/projects/flowdesk/hero.svg",`
    
    # We also wrote: `... kind: "board" , image: "" /* e.g. "/images/projects/flowdesk/gallery-1.png" */ },`
    # Let's replace it with `... kind: "board", image: "/images/projects/flowdesk/gallery-1.svg" },`

    content = re.sub(
        r'image:\s*\"\",\s*//\s*e\.g\.\s*\"/images/projects/([^/]+)/hero\.png\"',
        r'image: "/images/projects/\1/hero.svg",',
        content
    )

    content = re.sub(
        r'image:\s*\"\"\s*/\*\s*e\.g\.\s*\"/images/projects/([^/]+)/(gallery-\d)\.png\"\s*\*/',
        r'image: "/images/projects/\1/\2.svg"',
        content
    )

    with open('data/projects.ts', 'w', encoding='utf-8') as f:
        f.write(content)

process()

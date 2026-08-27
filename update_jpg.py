import re

with open('data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'image: "/images/projects/([^/]+)/hero\.svg"', r'image: "/images/projects/\1/hero.jpg"', content)

with open('data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)

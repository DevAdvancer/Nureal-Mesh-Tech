import re

with open('data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Current format for gallery images is `.svg` since we applied it previously.
# e.g., image: "/images/projects/flowdesk/gallery-1.svg"
content = re.sub(
    r'image:\s*"/images/projects/([^/]+)/(gallery-\d)\.svg"', 
    r'image: "/images/projects/\1/\2.jpg"', 
    content
)

with open('data/projects.ts', 'w', encoding='utf-8') as f:
    f.write(content)

import re
import json

out = []
with open('data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

for project_match in re.finditer(r'slug:\s*\"(.*?)\".*?gallery:\s*\[(.*?)\]', content, re.DOTALL):
    slug = project_match.group(1)
    gallery_block = project_match.group(2)
    
    captions = re.findall(r'caption:\s*\"(.*?)\"', gallery_block)
    out.append({'slug': slug, 'captions': captions})

print(json.dumps(out))

import os
files = ['app/layout.tsx', 'app/services/[slug]/page.tsx', 'app/services/page.tsx', 'app/work/[slug]/page.tsx']
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        data = file.read()
    data = data.replace('"/og-image.png"', '"/icon.png"')
    data = data.replace('"summary_large_image"', '"summary"')
    with open(f, 'w', encoding='utf-8') as file:
        file.write(data)

import os
import json
import re

# Read projects
with open('data/projects.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# We'll generate simple but modern abstract SVGs based on project slug and colors
projects = []
for line in content.split('\n'):
    m = re.search(r'^\s*slug:\s*\"(.*?)\",', line)
    if m:
        projects.append(m.group(1))

# Also extract the gradient string for each project to use as a background
gradients = {}
current_slug = None
for line in content.split('\n'):
    m = re.search(r'^\s*slug:\s*\"(.*?)\",', line)
    if m:
        current_slug = m.group(1)
    
    gm = re.search(r'grad:\s*\"linear-gradient\((.*?)\)\"', line)
    if gm and current_slug and current_slug not in gradients:
        gradients[current_slug] = gm.group(1)

def generate_svg(title, subtitle, grad_str, width=800, height=450):
    # Parse the gradient string to get colors
    # format is usually "135deg, #7B2FFF 0%, #FF4D6D 100%"
    colors = re.findall(r'#[0-9a-fA-F]{6}', grad_str)
    if len(colors) >= 2:
        c1, c2 = colors[0], colors[1]
    else:
        c1, c2 = "#1C1A26", "#7B2FFF"
    
    svg = f"""<svg width="100%" height="100%" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="{c1}" />
            <stop offset="100%" stop-color="{c2}" />
        </linearGradient>
        <filter id="glass" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
        </filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    
    <!-- Abstract decorative shapes -->
    <circle cx="{width*0.8}" cy="{height*0.2}" r="{height*0.4}" fill="white" fill-opacity="0.05" />
    <circle cx="{width*0.1}" cy="{height*0.9}" r="{height*0.3}" fill="black" fill-opacity="0.1" />
    <rect x="{width*0.6}" y="{height*0.6}" width="{width*0.3}" height="{height*0.5}" rx="20" fill="white" fill-opacity="0.08" transform="rotate(-15 {width*0.6} {height*0.6})" />
    
    <!-- Glassmorphic card -->
    <rect x="{width*0.1}" y="{height*0.3}" width="{width*0.8}" height="{height*0.4}" rx="24" fill="white" fill-opacity="0.15" stroke="white" stroke-width="1.5" stroke-opacity="0.3" filter="url(#glass)" />
    
    <text x="{width*0.5}" y="{height*0.48}" font-family="sans-serif" font-size="42" font-weight="bold" fill="white" text-anchor="middle" letter-spacing="2">{title}</text>
    <text x="{width*0.5}" y="{height*0.58}" font-family="monospace" font-size="18" fill="rgba(255,255,255,0.8)" text-anchor="middle" letter-spacing="4">{subtitle}</text>
</svg>"""
    return svg

for slug in projects:
    grad = gradients.get(slug, "135deg, #1C1A26 0%, #7B2FFF 100%")
    
    folder = f'public/images/projects/{slug}'
    os.makedirs(folder, exist_ok=True)
    
    # Hero
    with open(f'{folder}/hero.svg', 'w', encoding='utf-8') as f:
        f.write(generate_svg(slug.upper(), "CASE STUDY", grad))
        
    # Gallery
    with open(f'{folder}/gallery-1.svg', 'w', encoding='utf-8') as f:
        f.write(generate_svg("GALLERY", "SCENE 01", grad, 800, 600))
    with open(f'{folder}/gallery-2.svg', 'w', encoding='utf-8') as f:
        f.write(generate_svg("GALLERY", "SCENE 02", grad, 800, 600))
    with open(f'{folder}/gallery-3.svg', 'w', encoding='utf-8') as f:
        f.write(generate_svg("GALLERY", "SCENE 03", grad, 800, 600))

print("Created SVGs for all projects")

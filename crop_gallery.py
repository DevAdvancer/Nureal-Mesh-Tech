import os
import glob
from PIL import Image

def generate_crops():
    base_dir = r'public/images/projects'
    
    # We want 3 crops of size 800x600 from a 1024x1024 image
    # Crop 1: Center focus (112, 212, 912, 812) -> size 800x600
    # Crop 2: Top-left focus (0, 0, 800, 600)
    # Crop 3: Bottom-right focus (224, 424, 1024, 1024)
    
    crop_boxes = [
        (112, 212, 912, 812),
        (0, 50, 800, 650),
        (224, 300, 1024, 900)
    ]
    
    for slug_dir in glob.glob(os.path.join(base_dir, '*')):
        if not os.path.isdir(slug_dir):
            continue
            
        hero_path = os.path.join(slug_dir, 'hero.jpg')
        if not os.path.exists(hero_path):
            continue
            
        try:
            with Image.open(hero_path) as img:
                for i, box in enumerate(crop_boxes):
                    gallery_path = os.path.join(slug_dir, f'gallery-{i+1}.jpg')
                    cropped = img.crop(box)
                    cropped.save(gallery_path, quality=90)
                    print(f'Created {gallery_path}')
        except Exception as e:
            print(f'Error processing {hero_path}: {e}')

if __name__ == '__main__':
    generate_crops()

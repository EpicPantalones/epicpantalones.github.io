#!/usr/bin/env python3
"""
Auto-rename images in the scrolling folder to photo1, photo2, etc.
Converts all images to JPG format and resizes to common height to save space.
Also generates a photos.json manifest file for the photo-scroll.js to read.
Usage: python _rename_photos.py

Requires: pip install Pillow
"""

import os
import re
import json
from pathlib import Path
from PIL import Image

# Get the directory where this script is located
script_dir = Path(__file__).parent

# Common image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}

# Target height for all images (maintains aspect ratio)
TARGET_HEIGHT = 400


def update_js_photo_count(count):
    """Update the photo-scroll.js file with the actual photo count."""
    # Navigate up from images/scrolling to the repo root, then to assets/js
    js_file = script_dir.parent.parent / 'assets' / 'js' / 'photo-scroll.js'

    if not js_file.exists():
        print(f"Warning: Could not find {js_file}")
        return

    # Read the file
    content = js_file.read_text(encoding='utf-8')

    # Replace the num_photos line
    updated_content = re.sub(
        r'const num_photos = \d+;.*',
        f'const num_photos = {count}; // Auto-updated by _rename_photos.py',
        content
    )

    # Write back
    js_file.write_text(updated_content, encoding='utf-8')
    print(f"Updated {js_file.name} with photo count: {count}")


def generate_photos_manifest(total_count):
    """Generate a photos.json manifest file for the photo-scroll.js to read."""
    manifest = {
        "count": total_count,
        "photos": [f"photo{i}.jpg" for i in range(1, total_count + 1)]
    }
    
    manifest_file = script_dir / 'photos.json'
    manifest_file.write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print(f"Generated {manifest_file.name} with {total_count} photos")


def rename_photos():
    # Get all image files
    image_files = []
    already_formatted = []
    for file in script_dir.iterdir():
        if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS:
            # Check if file already matches the format photoN.jpg
            if re.match(r'^photo(\d+)\.jpg$', file.name, re.IGNORECASE):
                already_formatted.append(file)
            else:
                image_files.append(file)

    # Sort by name for consistent ordering
    image_files.sort()

    if not image_files and len(already_formatted) == 0:
        print("No image files found!")
        return

    # Find the highest photo number already in use
    highest_photo_num = 0
    for photo_file in already_formatted:
        match = re.match(r'^photo(\d+)\.jpg$', photo_file.name, re.IGNORECASE)
        if match:
            num = int(match.group(1))
            highest_photo_num = max(highest_photo_num, num)

    if already_formatted:
        print(f"Skipping {len(already_formatted)} file(s) already in correct format")
        print(f"Highest photo number found: photo{highest_photo_num}.jpg")

    print(f"Found {len(image_files)} image(s) to process")

    # First pass: rename all to temporary names to avoid conflicts
    temp_files = []
    for i, old_file in enumerate(image_files):
        temp_name = f"__temp_{i}__{old_file.suffix}"
        temp_path = script_dir / temp_name
        old_file.rename(temp_path)
        temp_files.append((temp_path, old_file.name))

    # Second pass: resize, convert to JPG, and rename to final names
    # Start numbering from highest_photo_num + 1
    for i, (temp_file, original_name) in enumerate(temp_files, start=highest_photo_num + 1):
        new_name = f"photo{i}.jpg"
        new_path = script_dir / new_name

        try:
            with Image.open(temp_file) as img:
                # Calculate new width to maintain aspect ratio
                aspect_ratio = img.width / img.height
                new_width = int(TARGET_HEIGHT * aspect_ratio)

                # Resize image
                img = img.resize((new_width, TARGET_HEIGHT),
                                 Image.Resampling.LANCZOS)

                # Convert RGBA to RGB (for PNGs with transparency)
                if img.mode in ('RGBA', 'LA', 'P'):
                    rgb_img = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    rgb_img.paste(img, mask=img.split()
                                  [-1] if img.mode in ('RGBA', 'LA') else None)
                    img = rgb_img
                elif img.mode != 'RGB':
                    img = img.convert('RGB')

                # Save as JPG with high quality
                img.save(new_path, 'JPEG', quality=90, optimize=True)

            # Delete the temp file
            temp_file.unlink()
            print(
                f"  Resized & converted: {original_name} -> {new_name} ({new_width}x{TARGET_HEIGHT})")
        except Exception as e:
            print(f"  Error processing {original_name}: {e}")
            # Fall back to just renaming
            if temp_file.exists():
                temp_file.rename(new_path)

    print(f"\nDone! All images resized to {TARGET_HEIGHT}px height.")

    # Generate the photos manifest JSON file for photo-scroll.js to read
    # Total count is highest photo number (since they're numbered sequentially)
    total_photo_count = highest_photo_num + len(temp_files)
    generate_photos_manifest(total_photo_count)


if __name__ == "__main__":
    rename_photos()

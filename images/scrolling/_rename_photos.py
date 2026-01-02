#!/usr/bin/env python3
"""
Auto-rename images in the scrolling folder to photo1, photo2, etc.
Converts all images to JPG format and resizes to common height to save space.
Usage: python _rename_photos.py

Requires: pip install Pillow
"""

import os
from pathlib import Path
from PIL import Image

# Get the directory where this script is located
script_dir = Path(__file__).parent

# Common image extensions
IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'}

# Target height for all images (maintains aspect ratio)
TARGET_HEIGHT = 400


def rename_photos():
    # Get all image files
    image_files = []
    for file in script_dir.iterdir():
        if file.is_file() and file.suffix.lower() in IMAGE_EXTENSIONS:
            image_files.append(file)

    # Sort by name for consistent ordering
    image_files.sort()

    if not image_files:
        print("No image files found!")
        return

    print(f"Found {len(image_files)} image(s)")

    # First pass: rename all to temporary names to avoid conflicts
    temp_files = []
    for i, old_file in enumerate(image_files):
        temp_name = f"__temp_{i}__{old_file.suffix}"
        temp_path = script_dir / temp_name
        old_file.rename(temp_path)
        temp_files.append((temp_path, old_file.name))

    # Second pass: resize, convert to JPG, and rename to final names
    for i, (temp_file, original_name) in enumerate(temp_files, start=1):
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


if __name__ == "__main__":
    rename_photos()

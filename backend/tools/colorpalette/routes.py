"""
ColorPalette - Generate color palettes from images
"""

from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from PIL import Image
import io
from typing import List, Optional
from collections import Counter
import colorsys
import random
import math

router = APIRouter()

class PaletteRequest(BaseModel):
    num_colors: int = 5
    method: str = 'kmeans'  # 'kmeans', 'dominant', 'vibrant'

class RandomPaletteRequest(BaseModel):
    harmony: str = 'random'  # 'random', 'complementary', 'triadic', 'analogous', 'monochromatic', 'tetradic'
    num_colors: int = 5
    saturation: float = 0.7
    lightness: float = 0.5

class ShadesRequest(BaseModel):
    hex_color: str
    num_shades: int = 10

class ContrastRequest(BaseModel):
    color1: str
    color2: str

@router.post("/generate")
async def generate_palette(
    file: UploadFile = File(...),
    num_colors: int = 5,
    method: str = 'dominant'
):
    """Generate color palette from uploaded image"""
    try:
        # Validate image
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to RGB if needed
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Resize for faster processing
        image.thumbnail((300, 300))
        
        # Generate palette based on method
        if method == 'dominant':
            colors = extract_dominant_colors(image, num_colors)
        elif method == 'vibrant':
            colors = extract_vibrant_colors(image, num_colors)
        else:
            colors = extract_dominant_colors(image, num_colors)
        
        return {
            "success": True,
            "colors": colors,
            "method": method,
            "num_colors": len(colors)
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating palette: {str(e)}")

@router.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    """Analyze image and return color information"""
    try:
        if not file.content_type or not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Get image dimensions
        width, height = image.size
        
        # Extract colors
        pixels = list(image.getdata())
        total_pixels = len(pixels)
        
        # Get dominant colors
        dominant_colors = extract_dominant_colors(image, 5)
        
        # Calculate average color
        avg_r = sum(p[0] for p in pixels) // total_pixels
        avg_g = sum(p[1] for p in pixels) // total_pixels
        avg_b = sum(p[2] for p in pixels) // total_pixels
        average_color = {
            "hex": f"#{avg_r:02x}{avg_g:02x}{avg_b:02x}",
            "rgb": [avg_r, avg_g, avg_b]
        }
        
        return {
            "success": True,
            "dimensions": {"width": width, "height": height},
            "total_pixels": total_pixels,
            "average_color": average_color,
            "dominant_colors": dominant_colors
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing image: {str(e)}")

def extract_dominant_colors(image: Image.Image, num_colors: int) -> List[dict]:
    """Extract dominant colors from image"""
    # Resize for faster processing
    image = image.copy()
    image.thumbnail((150, 150))
    
    # Get all pixels
    pixels = list(image.getdata())
    
    # Count color frequencies
    color_counts = Counter(pixels)
    
    # Get most common colors
    most_common = color_counts.most_common(num_colors)
    
    colors = []
    for rgb, count in most_common:
        r, g, b = rgb
        hex_color = f"#{r:02x}{g:02x}{b:02x}"
        
        # Convert to HSL for better color analysis
        h, s, l = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
        
        colors.append({
            "hex": hex_color,
            "rgb": [r, g, b],
            "hsl": [int(h*360), int(s*100), int(l*100)],
            "frequency": count,
            "percentage": round((count / len(pixels)) * 100, 2)
        })
    
    return colors

def extract_vibrant_colors(image: Image.Image, num_colors: int) -> List[dict]:
    """Extract vibrant/saturated colors from image"""
    image = image.copy()
    image.thumbnail((150, 150))
    
    pixels = list(image.getdata())
    
    # Filter for vibrant colors (high saturation)
    vibrant_pixels = []
    for rgb in pixels:
        r, g, b = rgb
        h, s, l = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
        # Keep colors with saturation > 30% and lightness between 20-80%
        if s > 0.3 and 0.2 < l < 0.8:
            vibrant_pixels.append((rgb, s))
    
    if not vibrant_pixels:
        # Fallback to dominant colors if no vibrant colors found
        return extract_dominant_colors(image, num_colors)
    
    # Sort by saturation and take top colors
    vibrant_pixels.sort(key=lambda x: x[1], reverse=True)
    
    # Group similar colors
    colors = []
    seen_colors = set()
    
    for rgb, saturation in vibrant_pixels:
        if len(colors) >= num_colors:
            break
        
        r, g, b = rgb
        hex_color = f"#{r:02x}{g:02x}{b:02x}"
        
        # Skip if too similar to existing color
        too_similar = False
        for existing in seen_colors:
            er, eg, eb = existing
            distance = ((r - er)**2 + (g - eg)**2 + (b - eb)**2)**0.5
            if distance < 30:  # Threshold for similarity
                too_similar = True
                break
        
        if not too_similar:
            h, s, l = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
            colors.append({
                "hex": hex_color,
                "rgb": [r, g, b],
                "hsl": [int(h*360), int(s*100), int(l*100)],
                "saturation": round(saturation * 100, 2)
            })
            seen_colors.add(rgb)
    
    # Fill remaining slots with dominant colors if needed
    if len(colors) < num_colors:
        dominant = extract_dominant_colors(image, num_colors - len(colors))
        colors.extend(dominant)
    
    return colors[:num_colors]

@router.post("/random")
async def generate_random_palette(request: RandomPaletteRequest):
    """Generate random color palette with harmony rules"""
    try:
        colors = generate_harmony_palette(
            request.harmony,
            request.num_colors,
            request.saturation,
            request.lightness
        )
        return {
            "success": True,
            "colors": colors,
            "harmony": request.harmony,
            "num_colors": len(colors)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating palette: {str(e)}")

@router.post("/shades")
async def generate_shades(request: ShadesRequest):
    """Generate shades and tints from a base color"""
    try:
        hex_color = request.hex_color.lstrip('#')
        if len(hex_color) != 6:
            raise HTTPException(status_code=400, detail="Invalid hex color")
        
        r = int(hex_color[0:2], 16)
        g = int(hex_color[2:4], 16)
        b = int(hex_color[4:6], 16)
        
        shades = generate_color_shades(r, g, b, request.num_shades)
        return {
            "success": True,
            "shades": shades,
            "base_color": request.hex_color
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating shades: {str(e)}")

@router.post("/contrast")
async def check_contrast(request: ContrastRequest):
    """Check contrast ratio between two colors"""
    try:
        def hex_to_rgb(hex_color):
            hex_color = hex_color.lstrip('#')
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        
        def get_luminance(rgb):
            r, g, b = [x / 255.0 for x in rgb]
            r = r / 12.92 if r <= 0.03928 else ((r + 0.055) / 1.055) ** 2.4
            g = g / 12.92 if g <= 0.03928 else ((g + 0.055) / 1.055) ** 2.4
            b = b / 12.92 if b <= 0.03928 else ((b + 0.055) / 1.055) ** 2.4
            return 0.2126 * r + 0.7152 * g + 0.0722 * b
        
        rgb1 = hex_to_rgb(request.color1)
        rgb2 = hex_to_rgb(request.color2)
        
        lum1 = get_luminance(rgb1)
        lum2 = get_luminance(rgb2)
        
        lighter = max(lum1, lum2)
        darker = min(lum1, lum2)
        
        contrast_ratio = (lighter + 0.05) / (darker + 0.05)
        
        # WCAG guidelines
        aa_normal = contrast_ratio >= 4.5
        aa_large = contrast_ratio >= 3.0
        aaa_normal = contrast_ratio >= 7.0
        aaa_large = contrast_ratio >= 4.5
        
        return {
            "success": True,
            "contrast_ratio": round(contrast_ratio, 2),
            "wcag": {
                "aa_normal": aa_normal,
                "aa_large": aa_large,
                "aaa_normal": aaa_normal,
                "aaa_large": aaa_large
            },
            "rating": get_contrast_rating(contrast_ratio)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error checking contrast: {str(e)}")

def generate_harmony_palette(harmony: str, num_colors: int, saturation: float, lightness: float) -> List[dict]:
    """Generate color palette based on harmony rules"""
    colors = []
    
    if harmony == 'random':
        for _ in range(num_colors):
            h = random.uniform(0, 360)
            s = random.uniform(0.3, 1.0) * saturation
            l = random.uniform(0.2, 0.8) * lightness
            r, g, b = colorsys.hls_to_rgb(h/360, l, s)
            colors.append(create_color_dict(r, g, b))
    
    elif harmony == 'complementary':
        base_h = random.uniform(0, 360)
        colors.append(create_color_from_hsl(base_h, saturation, lightness))
        colors.append(create_color_from_hsl((base_h + 180) % 360, saturation, lightness))
        # Add variations
        for i in range(num_colors - 2):
            h = (base_h + random.uniform(-30, 30)) % 360
            l = lightness + random.uniform(-0.2, 0.2)
            colors.append(create_color_from_hsl(h, saturation, max(0.1, min(0.9, l))))
    
    elif harmony == 'triadic':
        base_h = random.uniform(0, 360)
        for i in range(3):
            h = (base_h + i * 120) % 360
            colors.append(create_color_from_hsl(h, saturation, lightness))
        # Fill remaining with variations
        for _ in range(num_colors - 3):
            h = (base_h + random.uniform(-60, 60)) % 360
            l = lightness + random.uniform(-0.15, 0.15)
            colors.append(create_color_from_hsl(h, saturation, max(0.1, min(0.9, l))))
    
    elif harmony == 'analogous':
        base_h = random.uniform(0, 360)
        for i in range(num_colors):
            h = (base_h + i * 30) % 360
            l = lightness + random.uniform(-0.1, 0.1)
            colors.append(create_color_from_hsl(h, saturation, max(0.2, min(0.8, l))))
    
    elif harmony == 'monochromatic':
        base_h = random.uniform(0, 360)
        for i in range(num_colors):
            l = 0.2 + (i / (num_colors - 1)) * 0.6 if num_colors > 1 else 0.5
            s = saturation * (0.7 + random.uniform(-0.2, 0.2))
            colors.append(create_color_from_hsl(base_h, max(0.3, min(1.0, s)), l))
    
    elif harmony == 'tetradic':
        base_h = random.uniform(0, 360)
        for i in range(4):
            h = (base_h + i * 90) % 360
            colors.append(create_color_from_hsl(h, saturation, lightness))
        # Fill remaining
        for _ in range(num_colors - 4):
            h = (base_h + random.uniform(-45, 45)) % 360
            l = lightness + random.uniform(-0.15, 0.15)
            colors.append(create_color_from_hsl(h, saturation, max(0.1, min(0.9, l))))
    
    return colors[:num_colors]

def create_color_from_hsl(h: float, s: float, l: float) -> dict:
    """Create color dict from HSL values"""
    r, g, b = colorsys.hls_to_rgb(h/360, l, s)
    return create_color_dict(r, g, b)

def create_color_dict(r: float, g: float, b: float) -> dict:
    """Create color dictionary from RGB values (0-1)"""
    r_int = int(r * 255)
    g_int = int(g * 255)
    b_int = int(b * 255)
    hex_color = f"#{r_int:02x}{g_int:02x}{b_int:02x}"
    h, s, l = colorsys.rgb_to_hls(r, g, b)
    return {
        "hex": hex_color,
        "rgb": [r_int, g_int, b_int],
        "hsl": [int(h*360), int(s*100), int(l*100)]
    }

def generate_color_shades(r: int, g: int, b: int, num_shades: int) -> List[dict]:
    """Generate shades and tints from base color"""
    shades = []
    base_h, base_s, base_l = colorsys.rgb_to_hls(r/255.0, g/255.0, b/255.0)
    
    for i in range(num_shades):
        # Create gradient from dark to light
        l = i / (num_shades - 1) if num_shades > 1 else 0.5
        r_new, g_new, b_new = colorsys.hls_to_rgb(base_h, l, base_s)
        shades.append(create_color_dict(r_new, g_new, b_new))
    
    return shades

def get_contrast_rating(ratio: float) -> str:
    """Get human-readable contrast rating"""
    if ratio >= 7.0:
        return "Excellent (AAA)"
    elif ratio >= 4.5:
        return "Good (AA)"
    elif ratio >= 3.0:
        return "Fair (AA Large)"
    else:
        return "Poor"


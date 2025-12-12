"""
DataValidator - Validate and convert JSON, XML, YAML, CSV, TOML
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import yaml
import xml.etree.ElementTree as ET
from xml.dom import minidom
import csv
import io
from typing import Optional, Literal

router = APIRouter()

# Try to import toml
try:
    import tomli as toml
    TOML_AVAILABLE = True
except ImportError:
    try:
        import tomllib as toml
        TOML_AVAILABLE = True
    except ImportError:
        try:
            import tomli_w as toml
            TOML_AVAILABLE = True
        except ImportError:
            TOML_AVAILABLE = False

class ValidateRequest(BaseModel):
    content: str
    format: Literal['json', 'xml', 'yaml', 'csv', 'toml']

class ConvertRequest(BaseModel):
    content: str
    from_format: Literal['json', 'xml', 'yaml', 'csv', 'toml']
    to_format: Literal['json', 'xml', 'yaml', 'csv', 'toml']
    options: Optional[dict] = None

class FormatRequest(BaseModel):
    content: str
    format: Literal['json', 'xml', 'yaml']
    indent: Optional[int] = 2

@router.get("/status")
async def status():
    """Check available formats"""
    return {
        "formats": {
            "json": True,
            "xml": True,
            "yaml": True,
            "csv": True,
            "toml": TOML_AVAILABLE
        }
    }

@router.post("/validate")
async def validate(request: ValidateRequest):
    """Validate content in specified format"""
    try:
        if request.format == 'json':
            json.loads(request.content)
            return {"valid": True, "format": "json"}
        
        elif request.format == 'xml':
            ET.fromstring(request.content)
            return {"valid": True, "format": "xml"}
        
        elif request.format == 'yaml':
            yaml.safe_load(request.content)
            return {"valid": True, "format": "yaml"}
        
        elif request.format == 'csv':
            # Validate CSV by trying to parse it
            csv_reader = csv.reader(io.StringIO(request.content))
            list(csv_reader)  # Try to read all rows
            return {"valid": True, "format": "csv"}
        
        elif request.format == 'toml':
            if not TOML_AVAILABLE:
                raise HTTPException(status_code=400, detail="TOML support not available. Install 'tomli' package.")
            toml.loads(request.content)
            return {"valid": True, "format": "toml"}
        
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {request.format}")
    
    except json.JSONDecodeError as e:
        return {"valid": False, "format": "json", "error": str(e)}
    except ET.ParseError as e:
        return {"valid": False, "format": "xml", "error": str(e)}
    except yaml.YAMLError as e:
        return {"valid": False, "format": "yaml", "error": str(e)}
    except Exception as e:
        return {"valid": False, "format": request.format, "error": str(e)}

@router.post("/convert")
async def convert(request: ConvertRequest):
    """Convert content from one format to another"""
    try:
        # Parse input
        if request.from_format == 'json':
            data = json.loads(request.content)
        elif request.from_format == 'xml':
            root = ET.fromstring(request.content)
            data = xml_to_dict(root)
        elif request.from_format == 'yaml':
            data = yaml.safe_load(request.content)
        elif request.from_format == 'csv':
            data = csv_to_dict(request.content)
        elif request.from_format == 'toml':
            if not TOML_AVAILABLE:
                raise HTTPException(status_code=400, detail="TOML support not available")
            data = toml.loads(request.content)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported from_format: {request.from_format}")
        
        # Convert to output format
        if request.to_format == 'json':
            indent = request.options.get('indent', 2) if request.options else 2
            output = json.dumps(data, indent=indent, ensure_ascii=False)
        elif request.to_format == 'xml':
            output = dict_to_xml(data)
        elif request.to_format == 'yaml':
            indent = request.options.get('indent', 2) if request.options else 2
            output = yaml.dump(data, default_flow_style=False, indent=indent)
        elif request.to_format == 'csv':
            output = dict_to_csv(data)
        elif request.to_format == 'toml':
            if not TOML_AVAILABLE:
                raise HTTPException(status_code=400, detail="TOML support not available")
            try:
                # tomli doesn't have dumps, use tomli_w if available
                import tomli_w
                output = tomli_w.dumps(data)
            except ImportError:
                raise HTTPException(status_code=400, detail="TOML writing not available. Install 'tomli-w' package.")
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported to_format: {request.to_format}")
        
        return {
            "success": True,
            "output": output,
            "from_format": request.from_format,
            "to_format": request.to_format
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Conversion failed: {str(e)}")

@router.post("/format")
async def format(request: FormatRequest):
    """Format/beautify content"""
    try:
        if request.format == 'json':
            data = json.loads(request.content)
            indent = request.indent or 2
            formatted = json.dumps(data, indent=indent, ensure_ascii=False)
        elif request.format == 'xml':
            root = ET.fromstring(request.content)
            formatted = prettify_xml(root)
        elif request.format == 'yaml':
            data = yaml.safe_load(request.content)
            indent = request.indent or 2
            formatted = yaml.dump(data, default_flow_style=False, indent=indent)
        else:
            raise HTTPException(status_code=400, detail=f"Unsupported format: {request.format}")
        
        return {
            "success": True,
            "formatted": formatted
        }
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Formatting failed: {str(e)}")

@router.post("/minify")
async def minify(request: FormatRequest):
    """Minify JSON content"""
    try:
        if request.format == 'json':
            data = json.loads(request.content)
            minified = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
            return {"success": True, "minified": minified}
        else:
            raise HTTPException(status_code=400, detail="Minify only supports JSON")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Minification failed: {str(e)}")

# Helper functions
def xml_to_dict(element):
    """Convert XML element to dictionary"""
    result = {}
    if element.text and element.text.strip():
        result['_text'] = element.text.strip()
    
    for child in element:
        child_data = xml_to_dict(child)
        if child.tag in result:
            if not isinstance(result[child.tag], list):
                result[child.tag] = [result[child.tag]]
            result[child.tag].append(child_data)
        else:
            result[child.tag] = child_data
    
    # Add attributes
    if element.attrib:
        result['_attributes'] = element.attrib
    
    return result

def dict_to_xml(data, root_name='root'):
    """Convert dictionary to XML string"""
    def build_xml(d, parent):
        if isinstance(d, dict):
            for key, value in d.items():
                if key == '_text':
                    parent.text = str(value)
                elif key == '_attributes':
                    parent.attrib.update(value)
                else:
                    elem = ET.SubElement(parent, key)
                    build_xml(value, elem)
        elif isinstance(d, list):
            for item in d:
                build_xml(item, parent)
        else:
            parent.text = str(d)
    
    root = ET.Element(root_name)
    build_xml(data, root)
    return prettify_xml(root)

def prettify_xml(elem):
    """Return a pretty-printed XML string"""
    rough_string = ET.tostring(elem, 'unicode')
    reparsed = minidom.parseString(rough_string)
    return reparsed.toprettyxml(indent="  ")

def csv_to_dict(csv_content):
    """Convert CSV to dictionary"""
    reader = csv.DictReader(io.StringIO(csv_content))
    return list(reader)

def dict_to_csv(data):
    """Convert dictionary/list to CSV"""
    if not data:
        return ""
    
    if isinstance(data, list) and len(data) > 0:
        if isinstance(data[0], dict):
            output = io.StringIO()
            writer = csv.DictWriter(output, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
            return output.getvalue()
    
    # Single dict or simple list
    output = io.StringIO()
    if isinstance(data, dict):
        writer = csv.DictWriter(output, fieldnames=data.keys())
        writer.writeheader()
        writer.writerow(data)
    else:
        writer = csv.writer(output)
        writer.writerow(data)
    
    return output.getvalue()


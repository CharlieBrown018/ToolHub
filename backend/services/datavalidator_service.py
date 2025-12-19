"""
DataValidator Service Layer
Business logic for data validation and conversion
"""

import json
import yaml
import xml.etree.ElementTree as ET
import csv
import io
from typing import Optional, Literal, Dict, Any
from fastapi import HTTPException
from backend.utils.logging import get_logger
from backend.utils.messages import MessageCode, error_response

logger = get_logger(__name__)

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
            logger.warning("TOML support not available. Install 'tomli' or 'tomli-w' package.")

# Try to import xmltodict and dicttoxml for better XML/JSON conversion
try:
    import xmltodict
    XMLTODICT_AVAILABLE = True
except ImportError:
    XMLTODICT_AVAILABLE = False
    logger.warning("xmltodict not available. Install 'xmltodict' package for better XML conversion.")

try:
    from dicttoxml import dicttoxml
    DICTTOXML_AVAILABLE = True
except ImportError:
    DICTTOXML_AVAILABLE = False
    logger.warning("dicttoxml not available. Install 'dicttoxml' package for better XML conversion.")


FormatType = Literal['json', 'xml', 'yaml', 'csv', 'toml']

# Export TOML_AVAILABLE for routes
TOML_AVAILABLE = TOML_AVAILABLE


class DataValidatorService:
    """Service for data validation and conversion operations"""
    
    @staticmethod
    def validate(content: str, format: FormatType) -> Dict[str, Any]:
        """
        Validate content in specified format
        
        Args:
            content: Content to validate
            format: Format type (json, xml, yaml, csv, toml)
        
        Returns:
            Validation result with valid flag and error if invalid
        """
        logger.info(f"Validating {format.upper()} content (length: {len(content)})")
        
        if not content.strip():
            logger.warning("Empty content provided for validation")
            raise error_response(MessageCode.MISSING_CONTENT)
        
        try:
            if format == 'json':
                json.loads(content)
                logger.debug("JSON validation successful")
                return {"valid": True, "format": "json", "error": None}
            
            elif format == 'xml':
                ET.fromstring(content)
                logger.debug("XML validation successful")
                return {"valid": True, "format": "xml", "error": None}
            
            elif format == 'yaml':
                yaml.safe_load(content)
                logger.debug("YAML validation successful")
                return {"valid": True, "format": "yaml", "error": None}
            
            elif format == 'csv':
                csv_reader = csv.reader(io.StringIO(content))
                list(csv_reader)  # Try to read all rows
                logger.debug("CSV validation successful")
                return {"valid": True, "format": "csv", "error": None}
            
            elif format == 'toml':
                if not TOML_AVAILABLE:
                    logger.error("TOML support not available")
                    raise error_response(MessageCode.OCR_NOT_AVAILABLE, error="TOML support not available. Install 'tomli' package.")
                toml.loads(content)
                logger.debug("TOML validation successful")
                return {"valid": True, "format": "toml", "error": None}
            
            else:
                logger.error(f"Unsupported format: {format}")
                raise error_response(MessageCode.INVALID_FORMAT, format=format)
        
        except json.JSONDecodeError as e:
            logger.warning(f"JSON validation failed: {str(e)}")
            return {"valid": False, "format": "json", "error": str(e)}
        except ET.ParseError as e:
            logger.warning(f"XML validation failed: {str(e)}")
            return {"valid": False, "format": "xml", "error": str(e)}
        except yaml.YAMLError as e:
            logger.warning(f"YAML validation failed: {str(e)}")
            return {"valid": False, "format": "yaml", "error": str(e)}
        except Exception as e:
            logger.error(f"Validation error for {format}: {str(e)}", exc_info=True)
            return {"valid": False, "format": format, "error": str(e)}
    
    @staticmethod
    def convert(
        content: str,
        from_format: FormatType,
        to_format: FormatType,
        options: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Convert content from one format to another
        
        Args:
            content: Content to convert
            from_format: Source format
            to_format: Target format
            options: Conversion options (e.g., indent)
        
        Returns:
            Converted content and metadata
        """
        logger.info(f"Converting from {from_format.upper()} to {to_format.upper()}")
        
        try:
            # Parse input
            data = DataValidatorService._parse_input(content, from_format)
            
            # Convert to output format
            output = DataValidatorService._format_output(data, to_format, options or {})
            
            logger.info(f"Conversion successful: {len(output)} characters")
            return {
                "converted": output,  # Changed from "output" to "converted" for consistency
                "from_format": from_format,
                "to_format": to_format
            }
        
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Conversion error: {str(e)}", exc_info=True)
            raise error_response(MessageCode.CONVERSION_ERROR, error=str(e))
    
    @staticmethod
    def format_content(content: str, format: FormatType, indent: int = 2) -> Dict[str, Any]:
        """
        Format/beautify content
        
        Args:
            content: Content to format
            format: Format type
            indent: Indentation level
        
        Returns:
            Formatted content
        """
        logger.info(f"Formatting {format.upper()} content")
        
        try:
            if format == 'json':
                data = json.loads(content)
                formatted = json.dumps(data, indent=indent, ensure_ascii=False)
            elif format == 'xml':
                root = ET.fromstring(content)
                formatted = DataValidatorService._prettify_xml(root)
            elif format == 'yaml':
                data = yaml.safe_load(content)
                formatted = yaml.dump(data, default_flow_style=False, indent=indent)
            else:
                logger.error(f"Unsupported format for formatting: {format}")
                raise error_response(MessageCode.INVALID_FORMAT, format=format)
            
            logger.info(f"Formatting successful: {len(formatted)} characters")
            return {
                "formatted": formatted
            }
        
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Formatting error: {str(e)}", exc_info=True)
            raise error_response(MessageCode.FORMAT_ERROR, error=str(e))
    
    @staticmethod
    def minify(content: str) -> Dict[str, Any]:
        """
        Minify JSON content
        
        Args:
            content: JSON content to minify
        
        Returns:
            Minified content
        """
        logger.info("Minifying JSON content")
        
        try:
            data = json.loads(content)
            minified = json.dumps(data, separators=(',', ':'), ensure_ascii=False)
            
            logger.info(f"Minification successful: {len(content)} -> {len(minified)} characters")
            return {
                "minified": minified
            }
        except json.JSONDecodeError as e:
            logger.error(f"JSON minification error: {str(e)}")
            raise error_response(MessageCode.MINIFY_ERROR, error=str(e))
        except Exception as e:
            logger.error(f"Minification error: {str(e)}", exc_info=True)
            raise error_response(MessageCode.MINIFY_ERROR, error=str(e))
    
    # Private helper methods
    @staticmethod
    def _parse_input(content: str, format: FormatType) -> Any:
        """Parse input content based on format"""
        if format == 'json':
            return json.loads(content)
        elif format == 'xml':
            if XMLTODICT_AVAILABLE:
                # Use xmltodict library for cleaner conversion
                parsed = xmltodict.parse(content, process_namespaces=False, attr_prefix='', cdata_key='')
                # xmltodict wraps root element, unwrap it for cleaner output
                if isinstance(parsed, dict) and len(parsed) == 1:
                    root_key = list(parsed.keys())[0]
                    return parsed[root_key]
                return parsed
            else:
                # Fallback to manual conversion
                root = ET.fromstring(content)
                parsed = DataValidatorService._xml_to_dict(root)
                if isinstance(parsed, dict):
                    if len(root) > 0:
                        return parsed
                    if '_text' in parsed and len(parsed) == 1:
                        return parsed['_text']
                return parsed
        elif format == 'yaml':
            return yaml.safe_load(content)
        elif format == 'csv':
            return DataValidatorService._csv_to_dict(content)
        elif format == 'toml':
            if not TOML_AVAILABLE:
                raise error_response(MessageCode.OCR_NOT_AVAILABLE, error="TOML support not available")
            return toml.loads(content)
        else:
            raise error_response(MessageCode.INVALID_FORMAT, format=format)
    
    @staticmethod
    def _format_output(data: Any, format: FormatType, options: Dict[str, Any]) -> str:
        """Format output data based on format"""
        if format == 'json':
            indent = options.get('indent', 2)
            return json.dumps(data, indent=indent, ensure_ascii=False)
        elif format == 'xml':
            if DICTTOXML_AVAILABLE:
                # Use dicttoxml library for better conversion
                # Preprocess data to sanitize invalid XML element names
                sanitized_data = DataValidatorService._sanitize_dict_keys(data)
                root_name = options.get('root_name', 'root')
                xml_bytes = dicttoxml(
                    sanitized_data,
                    root=False,  # Don't add root wrapper (we'll add it manually)
                    custom_root=root_name,
                    attr_type=False,  # Don't add type attributes
                )
                xml_str = xml_bytes.decode('utf-8')
                # Pretty print the XML
                root = ET.fromstring(xml_str)
                return DataValidatorService._prettify_xml(root)
            else:
                # Fallback to manual conversion
                return DataValidatorService._dict_to_xml(data)
        elif format == 'yaml':
            indent = options.get('indent', 2)
            return yaml.dump(data, default_flow_style=False, indent=indent)
        elif format == 'csv':
            return DataValidatorService._dict_to_csv(data)
        elif format == 'toml':
            if not TOML_AVAILABLE:
                raise error_response(MessageCode.OCR_NOT_AVAILABLE, error="TOML support not available")
            try:
                import tomli_w
                return tomli_w.dumps(data)
            except ImportError:
                raise error_response(MessageCode.OCR_NOT_AVAILABLE, error="TOML writing not available. Install 'tomli-w' package.")
        else:
            raise error_response(MessageCode.INVALID_FORMAT, format=format)
    
    @staticmethod
    def _xml_to_dict(element: ET.Element) -> Dict:
        """Convert XML element to dictionary with cleaner structure"""
        # Check if element has children
        has_children = len(element) > 0
        has_text = element.text and element.text.strip()
        has_attributes = bool(element.attrib)
        
        # If element only has text and no children, return simplified structure
        if not has_children and has_text and not has_attributes:
            # Unescape XML entities in text
            text = element.text.strip()
            text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&apos;', "'")
            return text
        
        # Build result dictionary
        result = {}
        
        # Handle text content
        if has_text:
            text = element.text.strip()
            # Unescape XML entities
            text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').replace('&quot;', '"').replace('&apos;', "'")
            result['_text'] = text
        
        # Handle children
        for child in element:
            # Check for _original_name attribute BEFORE processing child
            original_name = child.attrib.get('_original_name')
            
            # Process child data
            child_data = DataValidatorService._xml_to_dict(child)
            
            # If child_data is a dict with _attributes containing _original_name, extract and clean it
            if isinstance(child_data, dict):
                # Remove _original_name from _attributes if it exists (we'll use it as key)
                if '_attributes' in child_data and '_original_name' in child_data['_attributes']:
                    child_data['_attributes'].pop('_original_name')
                    # Remove _attributes if it's now empty
                    if not child_data['_attributes']:
                        child_data.pop('_attributes')
                
                # Simplify: if only _text remains, extract it
                if len(child_data) == 1 and '_text' in child_data:
                    child_data = child_data['_text']
            
            # Use original name if available, otherwise use sanitized tag
            key = original_name if original_name else child.tag
            
            if key in result:
                if not isinstance(result[key], list):
                    result[key] = [result[key]]
                result[key].append(child_data)
            else:
                result[key] = child_data
        
        # Handle attributes (but exclude _original_name as we've already used it)
        if has_attributes:
            # Filter out _original_name as it's already used for key restoration
            filtered_attrs = {k: v for k, v in element.attrib.items() if k != '_original_name'}
            if filtered_attrs:
                result['_attributes'] = filtered_attrs
        
        # Simplify: if result only has _text and no other keys, return just the text
        if len(result) == 1 and '_text' in result:
            return result['_text']
        
        return result
    
    @staticmethod
    def _sanitize_dict_keys(data: Any) -> Any:
        """Recursively sanitize dictionary keys to be valid XML element names"""
        if isinstance(data, dict):
            sanitized = {}
            for key, value in data.items():
                sanitized_key = DataValidatorService._sanitize_xml_name(str(key))
                sanitized[sanitized_key] = DataValidatorService._sanitize_dict_keys(value)
            return sanitized
        elif isinstance(data, list):
            return [DataValidatorService._sanitize_dict_keys(item) for item in data]
        else:
            return data
    
    @staticmethod
    def _sanitize_xml_name(name: str) -> str:
        """Sanitize a string to be a valid XML element name
        
        XML element names must:
        - Start with a letter or underscore
        - Contain only letters, digits, hyphens, underscores, periods, and colons
        - Not contain certain characters like @, /, etc.
        """
        import re
        # Check if name starts with invalid character (@, /, number, etc.)
        original_name = str(name)
        if not original_name:
            return 'item'
        
        # Replace invalid characters with underscore
        # XML names can contain: letters, digits, hyphens, underscores, periods, colons
        sanitized = re.sub(r'[^a-zA-Z0-9_\-.:]', '_', original_name)
        
        # Ensure it doesn't start with a number or special char
        if sanitized and (sanitized[0].isdigit() or sanitized[0] in '@/-'):
            sanitized = 'item_' + sanitized
        
        # Remove leading/trailing underscores and dots
        sanitized = sanitized.strip('_').strip('.')
        
        # Ensure it's not empty
        if not sanitized:
            sanitized = 'item'
        
        return sanitized
    
    @staticmethod
    def _dict_to_xml(data: Dict, root_name: str = 'root') -> str:
        """Convert dictionary to XML string"""
        def build_xml(d, parent):
            if isinstance(d, dict):
                for key, value in d.items():
                    if key == '_text':
                        parent.text = str(value)
                    elif key == '_attributes':
                        parent.attrib.update(value)
                    else:
                        # Sanitize XML element name
                        sanitized_key = DataValidatorService._sanitize_xml_name(str(key))
                        elem = ET.SubElement(parent, sanitized_key)
                        # Store original key as attribute if it was sanitized
                        if sanitized_key != str(key):
                            elem.set('_original_name', str(key))
                        build_xml(value, elem)
            elif isinstance(d, list):
                for item in d:
                    build_xml(item, parent)
            else:
                # Escape XML special characters in text content
                text = str(d)
                # Replace XML special characters
                text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
                parent.text = text
        
        root = ET.Element(DataValidatorService._sanitize_xml_name(root_name))
        build_xml(data, root)
        return DataValidatorService._prettify_xml(root)
    
    @staticmethod
    def _prettify_xml(elem: ET.Element) -> str:
        """Return a pretty-printed XML string"""
        from xml.dom import minidom
        rough_string = ET.tostring(elem, 'unicode')
        reparsed = minidom.parseString(rough_string)
        return reparsed.toprettyxml(indent="  ")
    
    @staticmethod
    def _csv_to_dict(csv_content: str) -> list:
        """Convert CSV to dictionary"""
        reader = csv.DictReader(io.StringIO(csv_content))
        return list(reader)
    
    @staticmethod
    def _dict_to_csv(data: Any) -> str:
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
        
        output = io.StringIO()
        if isinstance(data, dict):
            writer = csv.DictWriter(output, fieldnames=data.keys())
            writer.writeheader()
            writer.writerow(data)
        else:
            writer = csv.writer(output)
            writer.writerow(data)
        
        return output.getvalue()


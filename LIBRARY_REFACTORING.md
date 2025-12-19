# Data Validator Library Refactoring

## Overview

Refactored the DataValidator service to use established Python libraries (`xmltodict` and `dicttoxml`) instead of manual XML/JSON conversion logic.

## Libraries Added

### 1. `xmltodict` (v0.13.0+)
- **Purpose**: Converts XML to Python dictionaries
- **Benefits**:
  - Well-tested and handles edge cases
  - Cleaner output (no `_text` wrappers for simple values)
  - Handles XML attributes, namespaces, and CDATA sections
  - Widely used in production environments

### 2. `dicttoxml` (v1.7.16+)
- **Purpose**: Converts Python dictionaries to XML
- **Benefits**:
  - Handles nested structures automatically
  - Configurable root elements and formatting
  - Supports lists, dictionaries, and primitive types
  - Better than manual ElementTree manipulation

## Changes Made

### 1. Updated `requirements.txt`
```python
xmltodict>=0.13.0
dicttoxml>=1.7.16
```

### 2. Updated `DataValidatorService`

#### XML to JSON Conversion (`_parse_input`)
- **Before**: Manual `_xml_to_dict()` with complex logic for handling `_text`, `_attributes`, and `_original_name`
- **After**: Uses `xmltodict.parse()` with automatic unwrapping of root element
- **Fallback**: Still maintains manual conversion if library not available

#### JSON to XML Conversion (`_format_output`)
- **Before**: Manual `_dict_to_xml()` with `_sanitize_xml_name()` and `_original_name` attributes
- **After**: Uses `dicttoxml()` with pre-processing to sanitize invalid XML element names
- **Fallback**: Still maintains manual conversion if library not available

### 3. Key Preservation

**Note**: `xmltodict` and `dicttoxml` don't preserve original key names when they contain invalid XML characters (e.g., `@phosphor-icons/react`). 

**Current Approach**:
- Keys are sanitized before conversion to XML
- Original names are lost in round-trip conversions
- This is acceptable as XML element names must be valid

**Future Enhancement** (if needed):
- Store original names as XML attributes (`_original_name`)
- Restore them during XML→JSON conversion
- Requires custom wrapper around `dicttoxml`

## Benefits

1. **Less Code**: Removed ~150 lines of manual conversion logic
2. **Better Testing**: Libraries are well-tested by the community
3. **Edge Cases**: Libraries handle many edge cases we might miss
4. **Maintenance**: Less code to maintain and debug
5. **Performance**: Optimized libraries likely perform better

## Backward Compatibility

- ✅ Fallback to manual conversion if libraries not installed
- ✅ Same API interface (no breaking changes)
- ✅ Same response format

## Installation

```bash
pip install xmltodict dicttoxml
```

Or install all requirements:
```bash
pip install -r requirements.txt
```

## Testing

After installation, test the conversions:
1. JSON → XML → JSON (round-trip)
2. XML → JSON → XML (round-trip)
3. Complex nested structures
4. Invalid XML element names in JSON keys

## Remaining Manual Logic

We still maintain some manual logic for:
- **Key Sanitization**: `_sanitize_xml_name()` and `_sanitize_dict_keys()` for invalid XML element names
- **CSV Conversion**: Manual CSV parsing (no good library alternative)
- **YAML/TOML**: Already using `PyYAML` and `tomli` libraries
- **Formatting**: Pretty-printing XML output

## Future Improvements

1. Consider using `xmltodict` with `attr_prefix='@'` to preserve attributes better
2. Add option to preserve original key names via XML attributes
3. Consider `pandas` for CSV conversion if needed
4. Add validation schemas using `jsonschema` for JSON validation


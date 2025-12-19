# Toast Architecture - Using Backend Messages

## Current Problem

**Components are manually creating toasts with custom messages** instead of using backend-provided messages and `toast_variant` metadata.

## Solution

### 1. Backend Provides Toast Metadata

All API responses include:
```json
{
  "code": "MESSAGE_CODE",
  "message": "Human-readable message from backend",
  "data": { /* response data */ },
  "toast_variant": "success|destructive|default"
}
```

### 2. API Client Exposes Metadata

The `apiRequest()` function now supports `showToast: true` option:
```typescript
const response = await apiRequest('/endpoint', { showToast: true });
// Returns: { data: T, message: string, code: string, toastVariant?: string }
```

### 3. Hooks Use Backend Messages

**✅ Updated: `useDataValidator`**
- Now uses `apiRequest` with `showToast: true`
- Extracts backend `message` and `toastVariant`
- Shows toasts using backend messages instead of custom ones

**Example:**
```typescript
// Before (custom message)
toast({
  title: 'Success',
  description: 'Content formatted',  // Custom message
  variant: 'success',
});

// After (backend message)
const response = await apiRequest('/endpoint', { showToast: true });
toast({
  title: 'Success',
  description: response.message,  // Backend message
  variant: response.toastVariant || 'success',
});
```

## Guidelines

### ✅ DO: Use Backend Messages

1. **For API responses**: Always use backend `message` and `toast_variant`
2. **In hooks**: Use `apiRequest` with `showToast: true` to get metadata
3. **Error handling**: Use `error.message` and `error.toastVariant` from API errors

### ❌ DON'T: Create Custom Messages for API Responses

1. **Don't hardcode messages** for API success/error responses
2. **Don't ignore** backend `toast_variant` metadata
3. **Don't create** custom toast logic in components for API calls

### ✅ DO: Custom Messages for UI Actions

Only use custom messages for **UI-only actions** that don't involve API calls:
- "Copied to clipboard"
- "File loaded" (local file selection)
- "Settings saved" (local state)

## Migration Status

### ✅ Completed
- `useDataValidator` hook - All methods now use backend messages

### ⚠️ Pending
- `FileDropzone` component - Still uses custom messages for browse/upload
- `ExtractTab`, `RandomTab`, `ShadesTab` - Still use custom messages
- `FileUpload`, `MarkdownEditor` - Still use custom messages

## Next Steps

1. Update `FileDropzone` to use backend messages for browse/upload
2. Update ColorPalette tabs to use backend messages
3. Update DocuMark components to use backend messages
4. Create a helper hook `useApiToast` for automatic toast handling

## Benefits

1. **Consistency**: All messages come from backend message system
2. **Maintainability**: Change messages in one place (backend)
3. **Internationalization**: Easy to add i18n later
4. **Type Safety**: Messages are typed and validated
5. **Less Code**: Components don't need custom toast logic


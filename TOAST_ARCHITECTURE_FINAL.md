# Toast Architecture - Final Design

## ✅ Primary Hook: `useApiToast`

**Use `useApiToast` for ALL API calls** - it automatically uses backend messages.

### API Calls (Primary Use Case)

```typescript
import { useApiToast } from '../hooks/useApiToast';

const { callApi } = useApiToast();

// Simple API call - toast automatically shown with backend message
const result = await callApi<ValidationResult>(
  '/api/tools/data-validator/validate',
  {
    method: 'POST',
    body: JSON.stringify({ content, format }),
  }
);
// ✅ Toast automatically shown with backend message!
```

### UI-Only Actions (Rare)

For actions that don't involve APIs (like "Copied to clipboard"), you can still access the base `toast` function:

```typescript
const { toast } = useApiToast();

// Only for UI-only actions (no API)
toast({
  title: 'Copied',
  description: 'Copied to clipboard',
});
```

---

## Architecture

```
useApiToast (Primary Hook)
├── callApi() - For all API calls (uses backend messages)
├── toast() - For UI-only actions (rare)
└── Uses useToast internally (base state management)
```

---

## Benefits

1. **✅ Single Source of Truth**: All API calls use backend messages
2. **✅ Less Code**: No manual message extraction
3. **✅ Consistent**: All toasts use same backend message system
4. **✅ Type Safe**: Full TypeScript support
5. **✅ Automatic**: Toast shown automatically on success/error

---

## Migration Guide

### Before (Manual)

```typescript
import { useToast } from '../hooks/useToast';
import { apiRequest } from '../services/api';

const { toast } = useToast();

const response = await apiRequest('/endpoint', { showToast: true });
const message = response.message;  // Manual extraction
const toastVariant = response.toastVariant;  // Manual extraction

toast({  // Manual toast
  title: 'Success',
  description: message,
  variant: toastVariant,
});
```

### After (Automatic)

```typescript
import { useApiToast } from '../hooks/useApiToast';

const { callApi } = useApiToast();

const result = await callApi('/endpoint', {
  method: 'POST',
  body: JSON.stringify(data),
});
// ✅ Toast automatically shown with backend message!
```

---

## Updated: useDataValidator

**Before**: Manual message extraction and toast display  
**After**: Uses `callApi` - automatic toast handling

```typescript
// Before: ~20 lines per function
const response = await apiRequest('/endpoint', { showToast: true });
const result = response.data || response;
const message = response.message;
const toastVariant = response.toastVariant || 'success';
toast({ title: 'Success', description: message, variant: toastVariant });

// After: ~5 lines per function
const result = await callApi('/endpoint', { method: 'POST', body: ... });
// Toast automatically shown!
```

---

## When to Use What

### ✅ Use `useApiToast().callApi()` for:
- All API calls
- Any backend interaction
- When you want backend messages

### ✅ Use `useApiToast().toast()` for:
- UI-only actions (no API)
- "Copied to clipboard"
- "File selected" (local file picker)
- "Settings saved" (local state)

### ❌ Don't Use `useToast` directly:
- Use `useApiToast` instead
- `useToast` is only used internally by `useApiToast`

---

## Summary

**`useApiToast` is now the PRIMARY hook** for all toast functionality:
- ✅ API calls → `callApi()` (automatic backend messages)
- ✅ UI actions → `toast()` (custom messages, rare)

**All components should use `useApiToast` instead of `useToast`.**


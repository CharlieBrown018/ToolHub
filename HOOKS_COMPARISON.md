# useToast vs useApiToast - Key Differences

## useToast (Base Hook)

**Purpose**: Low-level toast management hook

**What it does**:
- Manages toast state (add, update, dismiss, remove)
- Provides `toast()` function to manually show toasts
- Handles toast lifecycle (open/close, auto-dismiss)
- No API integration - just UI state management

**Usage**:
```typescript
const { toast } = useToast();

// Manual toast - you provide ALL content
toast({
  title: 'Success',
  description: 'Custom message here',  // You write this
  variant: 'success',                  // You decide this
});
```

**When to use**:
- ✅ UI-only actions (e.g., "Copied to clipboard")
- ✅ Custom messages not from API
- ✅ When you need full control over toast content

---

## useApiToast (API Integration Hook)

**Purpose**: High-level hook that automatically shows toasts from API responses

**What it does**:
- Wraps API calls with `apiRequest(..., { showToast: true })`
- **Automatically extracts** backend `message` and `toast_variant`
- **Automatically shows** toasts on success/error
- Uses `useToast` internally

**Usage**:
```typescript
const { callWithToast } = useApiToast();

// Automatic toast - backend provides message
const result = await callWithToast(
  () => apiRequest('/endpoint', { showToast: true }),
  { showSuccess: true }
);
// Toast automatically shown with backend message!
```

**When to use**:
- ✅ API calls that return standardized responses
- ✅ When you want to use backend messages automatically
- ✅ To reduce boilerplate code

---

## Comparison Table

| Feature | useToast | useApiToast |
|---------|----------|-------------|
| **Level** | Low-level (UI state) | High-level (API integration) |
| **Message Source** | You provide manually | Backend API response |
| **Toast Variant** | You decide | Backend `toast_variant` |
| **Automatic Display** | No - you call `toast()` | Yes - automatic on success/error |
| **API Integration** | None | Yes - wraps `apiRequest` |
| **Use Case** | UI actions, custom messages | API responses |

---

## Current Implementation in useDataValidator

**Current approach** (manual):
```typescript
const { toast } = useToast();

const response = await apiRequest('/endpoint', { showToast: true });
const message = response.message;  // Extract manually
const toastVariant = response.toastVariant;  // Extract manually

toast({  // Show manually
  title: 'Success',
  description: message,
  variant: toastVariant,
});
```

**Could be simplified with useApiToast**:
```typescript
const { callWithToast } = useApiToast();

const result = await callWithToast(
  () => apiRequest('/endpoint', { showToast: true })
);
// Toast automatically shown!
```

---

## Recommendation

### Use `useToast` for:
- ✅ "Copied to clipboard"
- ✅ "File loaded" (local file selection)
- ✅ "Settings saved" (local state)
- ✅ Any non-API action

### Use `useApiToast` for:
- ✅ All API calls
- ✅ When backend provides messages
- ✅ To reduce code duplication

### Current State:
- `useDataValidator` uses `useToast` manually (could be simplified with `useApiToast`)
- Other components still use `useToast` with custom messages (should migrate to `useApiToast`)

---

## Example: Refactoring useDataValidator

**Before** (manual):
```typescript
const { toast } = useToast();

const response = await apiRequest('/endpoint', { showToast: true });
const result = response.data || response;
const message = response.message;
const toastVariant = response.toastVariant || 'success';

toast({
  title: 'Success',
  description: message,
  variant: toastVariant,
});
```

**After** (with useApiToast):
```typescript
const { callWithToast } = useApiToast();

const result = await callWithToast(
  () => apiRequest('/endpoint', { showToast: true }),
  { showSuccess: true }
);
// Toast automatically shown with backend message!
```

**Benefits**:
- ✅ Less code
- ✅ Consistent toast handling
- ✅ Automatic error handling
- ✅ Uses backend messages automatically


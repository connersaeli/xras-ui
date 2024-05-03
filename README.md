# XRAS User Interface Components

User interface components for XRAS implemented in JavaScript using React.

## Resource Catalog

This component provides a user interface to browse available Resources and their features, with the ability to filter the list for easier browsing.

### Example

```html
<div id="resource-catalog-react"></div>
<script type="module">
  import { resourceCatalog } from "https://esm.sh/@xras/ui?exports=resourceCatalog";
  resourceCatalog({
    apiUrl: "/path/to/catalog.json",
    allowedCategories: [],
    allowedFilters: [],
    excludedCategories: [],
    excludedFilters: [],
    target: document.getElementById("resource-catalog-react"),
  });
</script>
```

### Options

| Option               | Values                                                                                                                 | Required  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------- |
| `apiUrl`             | The URL for your Resource Catalog                                                                                      | **True**  |
| `allowedCategories`  | A list of filter **categories** that you want displayed. Ex: `["Resource Type", "Specialized Hardware"]`               | **False** |
| `allowedFilters`     | A list of filters you want users to see. Ex: `["GPU Compute"]`                                                         | **False** |
| `excludedCategories` | A list of filter **categories** that you want hidden from users. Ex: `["Specialized Support", "Specialized Hardware"]` | **False** |
| `excludedFilters`    | A list of filters that you want hidden from users. Ex: `["ACCESS Allocated", "ACCESS OnDemand"]`                       | **False** |
| `target`             | The DOM element where the component will be rendered.                                                                  | **True**  |

Note: Avoid combining `allowedCategories` and `excludedCategories`, or `allowedFilters` and `excludedFilters`. If an invalid combination is found, it will default to what is specified in the `allowed*` options

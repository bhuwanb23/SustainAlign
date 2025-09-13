"""
Data Processor Tool for IBM WatsonX Orchestrate Sample
Processes and analyzes structured data
"""

import logging
import json
from typing import Dict, Any, List, Union
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def data_processor_tool(data, operation: str, **kwargs) -> Dict[str, Any]:
    """
    Process and analyze structured data
    
    Args:
        data: The data to process (dict, list, or JSON string)
        operation: The operation to perform (analyze, filter, sort, aggregate, etc.)
        **kwargs: Additional parameters for specific operations
    
    Returns:
        Dictionary containing the processing result and metadata
    """
    try:
        logger.info(f"Processing data with operation: {operation}")
        
        # Validate inputs
        if not data or not operation:
            return {
                "error": "Data and operation are required",
                "success": False
            }
        
        # Parse JSON string if needed
        if isinstance(data, str):
            try:
                data = json.loads(data)
            except json.JSONDecodeError as e:
                return {
                    "error": f"Invalid JSON data: {e}",
                    "success": False
                }
        
        # Perform the data processing based on operation
        result = _perform_data_operation(operation, data, **kwargs)
        
        return {
            "operation": operation,
            "input_data_type": type(data).__name__,
            "result": result,
            "success": True,
            "metadata": {
                "operation_type": operation,
                "data_size": len(data) if isinstance(data, (list, dict)) else 1
            }
        }
        
    except Exception as e:
        logger.error(f"Data processor error: {str(e)}")
        return {
            "error": f"Data processing failed: {str(e)}",
            "success": False
        }

def _perform_data_operation(operation: str, data: Union[Dict, List], **kwargs) -> Any:
    """Perform the actual data processing operation"""
    
    operation = operation.lower().strip()
    
    if operation in ['analyze', 'analysis']:
        return _analyze_data(data)
    
    elif operation in ['filter']:
        filter_key = kwargs.get('filter_key')
        filter_value = kwargs.get('filter_value')
        if not filter_key:
            raise ValueError("filter_key is required for filter operation")
        return _filter_data(data, filter_key, filter_value)
    
    elif operation in ['sort']:
        sort_key = kwargs.get('sort_key')
        reverse = kwargs.get('reverse', False)
        return _sort_data(data, sort_key, reverse)
    
    elif operation in ['aggregate', 'group']:
        group_key = kwargs.get('group_key')
        agg_function = kwargs.get('agg_function', 'count')
        return _aggregate_data(data, group_key, agg_function)
    
    elif operation in ['transform', 'map']:
        transform_function = kwargs.get('transform_function')
        if not transform_function:
            raise ValueError("transform_function is required for transform operation")
        return _transform_data(data, transform_function)
    
    elif operation in ['statistics', 'stats']:
        return _calculate_statistics(data)
    
    elif operation in ['find_duplicates', 'duplicates']:
        return _find_duplicates(data)
    
    elif operation in ['validate', 'validation']:
        return _validate_data(data)
    
    elif operation in ['convert_format', 'convert']:
        target_format = kwargs.get('target_format', 'json')
        return _convert_format(data, target_format)
    
    else:
        raise ValueError(f"Unsupported operation: {operation}")

def _analyze_data(data: Union[Dict, List]) -> Dict[str, Any]:
    """Analyze the structure and content of data"""
    
    if isinstance(data, list):
        if not data:
            return {"type": "empty_list", "length": 0}
        
        # Analyze list structure
        element_types = [type(item).__name__ for item in data]
        unique_types = list(set(element_types))
        
        analysis = {
            "type": "list",
            "length": len(data),
            "element_types": unique_types,
            "is_homogeneous": len(unique_types) == 1
        }
        
        # If it's a list of dictionaries, analyze the structure
        if all(isinstance(item, dict) for item in data):
            all_keys = set()
            for item in data:
                all_keys.update(item.keys())
            
            analysis.update({
                "is_list_of_dicts": True,
                "all_keys": list(all_keys),
                "key_consistency": _check_key_consistency(data, all_keys)
            })
        
        return analysis
    
    elif isinstance(data, dict):
        return {
            "type": "dict",
            "keys": list(data.keys()),
            "key_count": len(data.keys()),
            "nested_structure": _analyze_nested_structure(data)
        }
    
    else:
        return {
            "type": type(data).__name__,
            "value": str(data)[:100]  # Truncate long values
        }

def _filter_data(data: List[Dict], filter_key: str, filter_value: Any) -> List[Dict]:
    """Filter data based on key-value criteria"""
    
    if not isinstance(data, list):
        raise ValueError("Filter operation requires a list of dictionaries")
    
    filtered = []
    for item in data:
        if isinstance(item, dict) and item.get(filter_key) == filter_value:
            filtered.append(item)
    
    return filtered

def _sort_data(data: List[Dict], sort_key: str = None, reverse: bool = False) -> List[Dict]:
    """Sort data based on a key"""
    
    if not isinstance(data, list):
        raise ValueError("Sort operation requires a list")
    
    if sort_key:
        # Sort list of dictionaries by key
        if all(isinstance(item, dict) for item in data):
            return sorted(data, key=lambda x: x.get(sort_key, 0), reverse=reverse)
        else:
            raise ValueError("Sort by key requires a list of dictionaries")
    else:
        # Sort list of values
        return sorted(data, reverse=reverse)

def _aggregate_data(data: List[Dict], group_key: str, agg_function: str) -> Dict[str, Any]:
    """Aggregate data by grouping and applying aggregation function"""
    
    if not isinstance(data, list) or not all(isinstance(item, dict) for item in data):
        raise ValueError("Aggregate operation requires a list of dictionaries")
    
    # Group data by the specified key
    groups = {}
    for item in data:
        key_value = item.get(group_key)
        if key_value not in groups:
            groups[key_value] = []
        groups[key_value].append(item)
    
    # Apply aggregation function
    result = {}
    for group_key_value, group_items in groups.items():
        if agg_function == 'count':
            result[group_key_value] = len(group_items)
        elif agg_function == 'sum':
            # Sum all numeric values in the group
            numeric_values = []
            for item in group_items:
                for value in item.values():
                    if isinstance(value, (int, float)):
                        numeric_values.append(value)
            result[group_key_value] = sum(numeric_values)
        elif agg_function == 'avg':
            # Average all numeric values in the group
            numeric_values = []
            for item in group_items:
                for value in item.values():
                    if isinstance(value, (int, float)):
                        numeric_values.append(value)
            result[group_key_value] = sum(numeric_values) / len(numeric_values) if numeric_values else 0
        else:
            result[group_key_value] = group_items
    
    return result

def _transform_data(data: List[Dict], transform_function: str) -> List[Dict]:
    """Transform data using a specified function"""
    
    if not isinstance(data, list):
        raise ValueError("Transform operation requires a list")
    
    if transform_function == 'uppercase_keys':
        # Convert all keys to uppercase
        if all(isinstance(item, dict) for item in data):
            return [{k.upper(): v for k, v in item.items()} for item in data]
        else:
            raise ValueError("uppercase_keys transform requires a list of dictionaries")
    
    elif transform_function == 'add_id':
        # Add sequential ID to each item
        return [{"id": i, **item} if isinstance(item, dict) else {"id": i, "value": item} for i, item in enumerate(data)]
    
    else:
        raise ValueError(f"Unsupported transform function: {transform_function}")

def _calculate_statistics(data: List[Union[int, float]]) -> Dict[str, Any]:
    """Calculate basic statistics for numeric data"""
    
    if not isinstance(data, list):
        raise ValueError("Statistics operation requires a list")
    
    # Extract numeric values
    numeric_values = [item for item in data if isinstance(item, (int, float))]
    
    if not numeric_values:
        return {"error": "No numeric values found in data"}
    
    return {
        "count": len(numeric_values),
        "sum": sum(numeric_values),
        "mean": sum(numeric_values) / len(numeric_values),
        "min": min(numeric_values),
        "max": max(numeric_values),
        "range": max(numeric_values) - min(numeric_values)
    }

def _find_duplicates(data: List[Any]) -> Dict[str, Any]:
    """Find duplicate values in data"""
    
    if not isinstance(data, list):
        raise ValueError("Find duplicates operation requires a list")
    
    seen = {}
    duplicates = {}
    
    for i, item in enumerate(data):
        item_key = str(item)  # Convert to string for comparison
        if item_key in seen:
            if item_key not in duplicates:
                duplicates[item_key] = [seen[item_key]]
            duplicates[item_key].append(i)
        else:
            seen[item_key] = i
    
    return {
        "duplicate_count": len(duplicates),
        "duplicates": duplicates,
        "unique_count": len(data) - sum(len(indices) for indices in duplicates.values())
    }

def _validate_data(data: Union[Dict, List]) -> Dict[str, Any]:
    """Validate data structure and content"""
    
    validation_results = {
        "is_valid": True,
        "errors": [],
        "warnings": []
    }
    
    if isinstance(data, list):
        if not data:
            validation_results["warnings"].append("List is empty")
        
        # Check for consistent structure
        if all(isinstance(item, dict) for item in data):
            all_keys = set()
            for item in data:
                all_keys.update(item.keys())
            
            for item in data:
                missing_keys = all_keys - set(item.keys())
                if missing_keys:
                    validation_results["warnings"].append(f"Item missing keys: {missing_keys}")
    
    elif isinstance(data, dict):
        # Check for required keys (this could be configurable)
        required_keys = kwargs.get('required_keys', [])
        missing_required = [key for key in required_keys if key not in data]
        if missing_required:
            validation_results["errors"].append(f"Missing required keys: {missing_required}")
            validation_results["is_valid"] = False
    
    return validation_results

def _convert_format(data: Any, target_format: str) -> str:
    """Convert data to specified format"""
    
    if target_format.lower() == 'json':
        return json.dumps(data, indent=2)
    elif target_format.lower() == 'csv':
        # Simple CSV conversion for list of dictionaries
        if isinstance(data, list) and all(isinstance(item, dict) for item in data):
            if not data:
                return ""
            
            keys = list(data[0].keys())
            csv_lines = [','.join(keys)]  # Header
            
            for item in data:
                values = [str(item.get(key, '')) for key in keys]
                csv_lines.append(','.join(values))
            
            return '\n'.join(csv_lines)
        else:
            raise ValueError("CSV conversion requires a list of dictionaries")
    else:
        raise ValueError(f"Unsupported target format: {target_format}")

def _check_key_consistency(data: List[Dict], all_keys: set) -> Dict[str, Any]:
    """Check consistency of keys across list of dictionaries"""
    
    key_presence = {key: 0 for key in all_keys}
    
    for item in data:
        for key in item.keys():
            if key in key_presence:
                key_presence[key] += 1
    
    return {
        "total_items": len(data),
        "key_presence": key_presence,
        "fully_present_keys": [key for key, count in key_presence.items() if count == len(data)],
        "partially_present_keys": [key for key, count in key_presence.items() if 0 < count < len(data)]
    }

def _analyze_nested_structure(data: Dict, max_depth: int = 3) -> Dict[str, Any]:
    """Analyze nested structure of dictionary"""
    
    def _get_structure(obj, depth=0):
        if depth > max_depth:
            return "max_depth_reached"
        
        if isinstance(obj, dict):
            return {key: _get_structure(value, depth + 1) for key, value in obj.items()}
        elif isinstance(obj, list):
            if obj:
                return [_get_structure(obj[0], depth + 1)]
            else:
                return []
        else:
            return type(obj).__name__
    
    return _get_structure(data)

# Example usage and testing
if __name__ == "__main__":
    # Test the data processor tool
    sample_data = [
        {"name": "John", "age": 30, "city": "New York"},
        {"name": "Jane", "age": 25, "city": "Los Angeles"},
        {"name": "Bob", "age": 35, "city": "New York"},
        {"name": "Alice", "age": 28, "city": "Chicago"}
    ]
    
    test_cases = [
        {"data": sample_data, "operation": "analyze"},
        {"data": sample_data, "operation": "filter", "filter_key": "city", "filter_value": "New York"},
        {"data": sample_data, "operation": "sort", "sort_key": "age"},
        {"data": sample_data, "operation": "aggregate", "group_key": "city", "agg_function": "count"},
        {"data": [1, 2, 3, 4, 5, 2, 3, 1], "operation": "statistics"},
        {"data": [1, 2, 3, 4, 5, 2, 3, 1], "operation": "find_duplicates"},
    ]
    
    print("Testing Data Processor Tool:")
    print("=" * 50)
    
    for test in test_cases:
        result = data_processor_tool(**test)
        print(f"Operation: {test['operation']}")
        print(f"Result: {result.get('result', 'Error')}")
        print(f"Success: {result.get('success', False)}")
        print("-" * 50)

"""
Calculator Tool for IBM WatsonX Orchestrate Sample
Performs basic mathematical calculations
"""

import logging
import math
from typing import Dict, Any, Union

logger = logging.getLogger(__name__)

def calculator_tool(operation: str, numbers: list, **kwargs) -> Dict[str, Any]:
    """
    Perform basic mathematical calculations
    
    Args:
        operation: The mathematical operation to perform (add, subtract, multiply, divide, power, sqrt, etc.)
        numbers: List of numbers to perform the operation on
        **kwargs: Additional parameters for specific operations
    
    Returns:
        Dictionary containing the calculation result and metadata
    """
    try:
        logger.info(f"Performing calculation: {operation} with numbers: {numbers}")
        
        # Validate inputs
        if not operation or not numbers:
            return {
                "error": "Operation and numbers are required",
                "success": False
            }
        
        # Convert strings to numbers if needed
        try:
            numeric_numbers = [float(n) for n in numbers]
        except (ValueError, TypeError) as e:
            return {
                "error": f"Invalid numbers provided: {e}",
                "success": False
            }
        
        # Perform the calculation based on operation
        result = _perform_calculation(operation, numeric_numbers, **kwargs)
        
        return {
            "operation": operation,
            "input_numbers": numbers,
            "result": result,
            "success": True,
            "metadata": {
                "operation_type": operation,
                "number_count": len(numbers)
            }
        }
        
    except Exception as e:
        logger.error(f"Calculator error: {str(e)}")
        return {
            "error": f"Calculation failed: {str(e)}",
            "success": False
        }

def _perform_calculation(operation: str, numbers: list, **kwargs) -> Union[float, int]:
    """Perform the actual mathematical calculation"""
    
    operation = operation.lower().strip()
    
    if operation in ['add', 'addition', 'sum', '+']:
        return sum(numbers)
    
    elif operation in ['subtract', 'subtraction', 'minus', '-']:
        if len(numbers) < 2:
            raise ValueError("Subtraction requires at least 2 numbers")
        result = numbers[0]
        for num in numbers[1:]:
            result -= num
        return result
    
    elif operation in ['multiply', 'multiplication', 'times', '*', 'x']:
        result = 1
        for num in numbers:
            result *= num
        return result
    
    elif operation in ['divide', 'division', '/']:
        if len(numbers) < 2:
            raise ValueError("Division requires at least 2 numbers")
        result = numbers[0]
        for num in numbers[1:]:
            if num == 0:
                raise ValueError("Division by zero is not allowed")
            result /= num
        return result
    
    elif operation in ['power', 'exponent', '^', '**']:
        if len(numbers) < 2:
            raise ValueError("Power operation requires at least 2 numbers")
        result = numbers[0]
        for num in numbers[1:]:
            result = result ** num
        return result
    
    elif operation in ['sqrt', 'square_root', 'root']:
        if len(numbers) != 1:
            raise ValueError("Square root operation requires exactly 1 number")
        if numbers[0] < 0:
            raise ValueError("Cannot calculate square root of negative number")
        return math.sqrt(numbers[0])
    
    elif operation in ['abs', 'absolute']:
        if len(numbers) != 1:
            raise ValueError("Absolute value operation requires exactly 1 number")
        return abs(numbers[0])
    
    elif operation in ['max', 'maximum']:
        if not numbers:
            raise ValueError("Maximum operation requires at least 1 number")
        return max(numbers)
    
    elif operation in ['min', 'minimum']:
        if not numbers:
            raise ValueError("Minimum operation requires at least 1 number")
        return min(numbers)
    
    elif operation in ['avg', 'average', 'mean']:
        if not numbers:
            raise ValueError("Average operation requires at least 1 number")
        return sum(numbers) / len(numbers)
    
    elif operation in ['median']:
        if not numbers:
            raise ValueError("Median operation requires at least 1 number")
        sorted_numbers = sorted(numbers)
        n = len(sorted_numbers)
        if n % 2 == 0:
            return (sorted_numbers[n//2 - 1] + sorted_numbers[n//2]) / 2
        else:
            return sorted_numbers[n//2]
    
    elif operation in ['factorial', 'fact']:
        if len(numbers) != 1:
            raise ValueError("Factorial operation requires exactly 1 number")
        if not numbers[0].is_integer() or numbers[0] < 0:
            raise ValueError("Factorial requires a non-negative integer")
        return math.factorial(int(numbers[0]))
    
    elif operation in ['percentage', 'percent', '%']:
        if len(numbers) != 2:
            raise ValueError("Percentage operation requires exactly 2 numbers")
        return (numbers[0] / numbers[1]) * 100
    
    else:
        raise ValueError(f"Unsupported operation: {operation}")

# Example usage and testing
if __name__ == "__main__":
    # Test the calculator tool
    test_cases = [
        {"operation": "add", "numbers": [1, 2, 3, 4]},
        {"operation": "multiply", "numbers": [2, 3, 4]},
        {"operation": "divide", "numbers": [10, 2]},
        {"operation": "power", "numbers": [2, 3]},
        {"operation": "sqrt", "numbers": [16]},
        {"operation": "average", "numbers": [1, 2, 3, 4, 5]},
    ]
    
    print("Testing Calculator Tool:")
    print("=" * 40)
    
    for test in test_cases:
        result = calculator_tool(**test)
        print(f"Operation: {test['operation']}")
        print(f"Numbers: {test['numbers']}")
        print(f"Result: {result.get('result', 'Error')}")
        print(f"Success: {result.get('success', False)}")
        print("-" * 40)

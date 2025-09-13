"""
Text Processor Tool for IBM WatsonX Orchestrate Sample
Processes and analyzes text content
"""

import logging
import re
from typing import Dict, Any, List
from ibm_watsonx_orchestrate.agent_builder.tools import tool

logger = logging.getLogger(__name__)

@tool
def text_processor_tool(text: str, operation: str, **kwargs) -> Dict[str, Any]:
    """
    Process and analyze text content
    
    Args:
        text: The text to process
        operation: The operation to perform (count_words, count_chars, extract_emails, etc.)
        **kwargs: Additional parameters for specific operations
    
    Returns:
        Dictionary containing the processing result and metadata
    """
    try:
        logger.info(f"Processing text with operation: {operation}")
        
        # Validate inputs
        if not text or not operation:
            return {
                "error": "Text and operation are required",
                "success": False
            }
        
        # Perform the text processing based on operation
        result = _perform_text_operation(operation, text, **kwargs)
        
        return {
            "operation": operation,
            "input_text": text[:100] + "..." if len(text) > 100 else text,  # Truncate for display
            "result": result,
            "success": True,
            "metadata": {
                "operation_type": operation,
                "text_length": len(text)
            }
        }
        
    except Exception as e:
        logger.error(f"Text processor error: {str(e)}")
        return {
            "error": f"Text processing failed: {str(e)}",
            "success": False
        }

def _perform_text_operation(operation: str, text: str, **kwargs) -> Any:
    """Perform the actual text processing operation"""
    
    operation = operation.lower().strip()
    
    if operation in ['count_words', 'word_count']:
        words = text.split()
        return {
            "word_count": len(words),
            "unique_words": len(set(word.lower() for word in words))
        }
    
    elif operation in ['count_chars', 'character_count']:
        return {
            "total_characters": len(text),
            "characters_without_spaces": len(text.replace(" ", "")),
            "characters_without_spaces_and_punctuation": len(re.sub(r'[^\w]', '', text))
        }
    
    elif operation in ['count_lines', 'line_count']:
        lines = text.split('\n')
        return {
            "line_count": len(lines),
            "non_empty_lines": len([line for line in lines if line.strip()])
        }
    
    elif operation in ['extract_emails', 'find_emails']:
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, text)
        return {
            "emails_found": emails,
            "email_count": len(emails)
        }
    
    elif operation in ['extract_phones', 'find_phones']:
        phone_pattern = r'(\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})'
        phones = re.findall(phone_pattern, text)
        formatted_phones = [''.join(phone) for phone in phones]
        return {
            "phones_found": formatted_phones,
            "phone_count": len(formatted_phones)
        }
    
    elif operation in ['extract_urls', 'find_urls']:
        url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
        urls = re.findall(url_pattern, text)
        return {
            "urls_found": urls,
            "url_count": len(urls)
        }
    
    elif operation in ['to_uppercase', 'upper']:
        return text.upper()
    
    elif operation in ['to_lowercase', 'lower']:
        return text.lower()
    
    elif operation in ['capitalize']:
        return text.capitalize()
    
    elif operation in ['title_case', 'title']:
        return text.title()
    
    elif operation in ['reverse']:
        return text[::-1]
    
    elif operation in ['remove_spaces']:
        return text.replace(" ", "")
    
    elif operation in ['remove_punctuation']:
        return re.sub(r'[^\w\s]', '', text)
    
    elif operation in ['word_frequency']:
        words = re.findall(r'\b\w+\b', text.lower())
        word_freq = {}
        for word in words:
            word_freq[word] = word_freq.get(word, 0) + 1
        
        # Sort by frequency
        sorted_freq = sorted(word_freq.items(), key=lambda x: x[1], reverse=True)
        return {
            "word_frequencies": dict(sorted_freq[:10]),  # Top 10 most frequent words
            "total_unique_words": len(word_freq)
        }
    
    elif operation in ['sentiment_analysis', 'sentiment']:
        # Simple sentiment analysis based on positive/negative word lists
        positive_words = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'love', 'like', 'happy', 'joy']
        negative_words = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'dislike', 'sad', 'angry', 'frustrated', 'disappointed']
        
        words = re.findall(r'\b\w+\b', text.lower())
        positive_count = sum(1 for word in words if word in positive_words)
        negative_count = sum(1 for word in words if word in negative_words)
        
        if positive_count > negative_count:
            sentiment = "positive"
        elif negative_count > positive_count:
            sentiment = "negative"
        else:
            sentiment = "neutral"
        
        return {
            "sentiment": sentiment,
            "positive_words": positive_count,
            "negative_words": negative_count,
            "confidence": abs(positive_count - negative_count) / max(len(words), 1)
        }
    
    elif operation in ['summarize', 'summary']:
        # Simple extractive summarization (first few sentences)
        sentences = re.split(r'[.!?]+', text)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        # Take first 3 sentences or first 200 characters, whichever is shorter
        summary_sentences = sentences[:3]
        summary = '. '.join(summary_sentences)
        
        if len(summary) > 200:
            summary = summary[:200] + "..."
        
        return {
            "summary": summary,
            "original_length": len(text),
            "summary_length": len(summary),
            "compression_ratio": len(summary) / len(text) if text else 0
        }
    
    elif operation in ['find_keywords', 'keywords']:
        # Extract potential keywords (words that appear multiple times and are not common words)
        common_words = {'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they'}
        
        words = re.findall(r'\b\w+\b', text.lower())
        word_freq = {}
        for word in words:
            if word not in common_words and len(word) > 3:  # Skip common words and short words
                word_freq[word] = word_freq.get(word, 0) + 1
        
        # Get words that appear more than once
        keywords = {word: freq for word, freq in word_freq.items() if freq > 1}
        sorted_keywords = sorted(keywords.items(), key=lambda x: x[1], reverse=True)
        
        return {
            "keywords": dict(sorted_keywords[:10]),  # Top 10 keywords
            "keyword_count": len(keywords)
        }
    
    else:
        raise ValueError(f"Unsupported operation: {operation}")

# Example usage and testing
if __name__ == "__main__":
    # Test the text processor tool
    sample_text = """
    Hello! This is a sample text for testing the text processor tool.
    It contains multiple sentences and some punctuation.
    You can reach me at john.doe@example.com or call me at (555) 123-4567.
    Visit our website at https://www.example.com for more information.
    This is a great tool that I really love using!
    """
    
    test_cases = [
        {"text": sample_text, "operation": "count_words"},
        {"text": sample_text, "operation": "extract_emails"},
        {"text": sample_text, "operation": "extract_phones"},
        {"text": sample_text, "operation": "extract_urls"},
        {"text": sample_text, "operation": "sentiment_analysis"},
        {"text": sample_text, "operation": "summarize"},
        {"text": sample_text, "operation": "find_keywords"},
    ]
    
    print("Testing Text Processor Tool:")
    print("=" * 50)
    
    for test in test_cases:
        result = text_processor_tool(**test)
        print(f"Operation: {test['operation']}")
        print(f"Result: {result.get('result', 'Error')}")
        print(f"Success: {result.get('success', False)}")
        print("-" * 50)

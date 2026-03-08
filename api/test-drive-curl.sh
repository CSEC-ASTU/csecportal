#!/bin/bash

# Test Google Drive Upload using curl
# Usage: ./test-drive-curl.sh [path-to-file]

API_BASE="${API_URL:-http://localhost:5500}"
TEST_FILE="${1:-test-file.txt}"

echo "🧪 Testing Google Drive Upload with curl"
echo "========================================"
echo ""

# Create test file if it doesn't exist
if [ ! -f "$TEST_FILE" ]; then
    echo "📝 Creating test file: $TEST_FILE"
    echo "Test file created at $(date)" > "$TEST_FILE"
    echo "This is a test upload to Google Drive." >> "$TEST_FILE"
fi

if [ ! -f "$TEST_FILE" ]; then
    echo "❌ File not found: $TEST_FILE"
    exit 1
fi

echo "📤 Uploading file: $TEST_FILE"
echo "🔗 API endpoint: $API_BASE/api/drive/upload"
echo ""

# Perform the upload
RESPONSE=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -F "file=@$TEST_FILE" \
    "$API_BASE/api/drive/upload")

# Extract status code
HTTP_STATUS=$(echo "$RESPONSE" | grep "HTTP_STATUS:" | cut -d: -f2)
BODY=$(echo "$RESPONSE" | sed '$ d')

echo "📊 Status Code: $HTTP_STATUS"
echo ""

if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Upload successful!"
    echo "📋 Response:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
    
    # Extract URL if available
    FILE_LINK=$(echo "$BODY" | grep -o '"link":"[^"]*"' | cut -d'"' -f4)
    if [ -n "$FILE_LINK" ]; then
        echo ""
        echo "🔗 File URL: $FILE_LINK"
    fi
else
    echo "❌ Upload failed!"
    echo "📋 Error Response:"
    echo "$BODY" | python3 -m json.tool 2>/dev/null || echo "$BODY"
fi

echo ""
echo "✅ Test completed"

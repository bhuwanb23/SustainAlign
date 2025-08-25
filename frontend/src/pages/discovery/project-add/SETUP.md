# 🚀 Project Form Setup & Testing Guide

## Quick Start

### 1. Backend Setup
```bash
cd backend

# Create database tables
python migrate.py create

# Add sample data (optional)
python migrate.py sample

# Start Flask server
python app.py
```

### 2. Frontend Setup
```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### 3. Test the Connection

#### Option A: Use the Test Script
1. Open browser console on the project-add page
2. Import and run the test script:
```javascript
import('./test-connection.js').then(() => {
  testConnection.runAllTests();
});
```

#### Option B: Manual Testing
1. Navigate to `/discovery/project-add`
2. Fill out the form with test data
3. Submit and check browser console for API responses
4. Check backend terminal for request logs

## 🔧 Expected Behavior

### ✅ Success Indicators
- Form submits without errors
- Backend receives POST request to `/api/projects`
- Database shows new project record
- Success page displays with project details

### ❌ Common Issues & Solutions

#### 1. CORS Errors
**Problem**: `Access to fetch at '/api/projects' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solution**: Backend CORS is configured, ensure backend is running on correct port

#### 2. Authentication Errors
**Problem**: `401 Unauthorized` response

**Solution**: 
- Check if user is logged in
- Verify JWT token in localStorage
- Ensure backend auth middleware is working

#### 3. Database Connection Errors
**Problem**: `500 Internal Server Error` with database-related messages

**Solution**:
- Run `python migrate.py status` to check tables
- Verify database file exists in `backend/instance/`
- Check database permissions

#### 4. Form Validation Errors
**Problem**: `400 Bad Request` with validation messages

**Solution**:
- Review required fields in form
- Check data format (dates, numbers)
- Verify JSON field structure

## 📊 Testing Checklist

### Backend Health
- [ ] Flask server starts without errors
- [ ] Database tables created successfully
- [ ] API endpoints accessible
- [ ] CORS headers present

### Frontend Functionality
- [ ] Form loads without errors
- [ ] All form fields render correctly
- [ ] Step navigation works
- [ ] Form validation functions
- [ ] File uploads work (if implemented)

### API Integration
- [ ] Form submission sends correct data
- [ ] Backend receives and processes data
- [ ] Database record created
- [ ] Success response returned
- [ ] Frontend handles response correctly

### Data Flow
- [ ] Frontend form data → Backend API
- [ ] Backend validation → Database storage
- [ ] Database → API response
- [ ] API response → Frontend success page

## 🐛 Debug Commands

### Backend Debug
```bash
# Check database status
python migrate.py status

# Test API endpoints
python test_api.py

# Check Flask logs
python app.py --debug
```

### Frontend Debug
```bash
# Check build errors
npm run build

# Check linting
npm run lint

# Check dependencies
npm audit
```

### Browser Debug
```javascript
// Check API calls in Network tab
// Check console for errors
// Check localStorage for auth token
// Check Application tab for storage
```

## 📱 Testing on Different Devices

### Desktop
- Test all form steps
- Verify responsive design
- Check file uploads

### Mobile
- Test touch interactions
- Verify mobile layout
- Check form submission

### Tablet
- Test intermediate screen sizes
- Verify touch and mouse interactions

## 🔄 Continuous Testing

### During Development
- Test after each major change
- Verify API responses
- Check database integrity

### Before Deployment
- Run full test suite
- Test with production data
- Verify error handling

## 📚 Additional Resources

- **Backend Models**: `backend/models/projects.py`
- **API Routes**: `backend/routes/projects.py`
- **Frontend Hook**: `hooks/useProjectAdd.js`
- **API Utilities**: `lib/projectApi.js`
- **Test Script**: `test-connection.js`

---

## 🎯 Next Steps After Testing

1. **Verify Data Persistence**: Check database for created projects
2. **Test Error Scenarios**: Invalid data, network failures
3. **Performance Testing**: Large forms, multiple submissions
4. **User Experience**: Form validation, error messages
5. **Integration Testing**: End-to-end project creation flow

The project form is now fully connected and ready for comprehensive testing! 🎉

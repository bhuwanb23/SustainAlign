# Project Add Form

This component allows users to create new CSR projects with comprehensive information including basic details, thematic focus, financials, timeline, impact metrics, NGO credibility, and media files.

## 🚀 Features

- **7-Step Form Wizard**: Guided project creation process
- **Comprehensive Data Capture**: All required project fields from backend models
- **Real-time Validation**: Form validation and error handling
- **Backend Integration**: Connected to SustainAlign project API
- **Responsive Design**: Mobile-friendly interface with animations
- **File Upload Support**: Images, documents, and video links

## 🔗 Backend Connection

The form is now fully connected to the backend project models:

### **API Endpoints Used**
- `POST /api/projects` - Create new project
- `GET /api/projects` - List projects with filtering
- `GET /api/ngos` - List NGO profiles

### **Data Model Mapping**
The frontend form data is automatically transformed to match the backend `Project` model structure:

```javascript
// Frontend form data
{
  projectTitle: "Digital Literacy Program",
  shortDescription: "Computer education for rural students",
  ngoName: "EduCare Foundation",
  location: { city: "Bangalore", region: "Karnataka", country: "India" },
  sdgGoals: [4, 9, 10],
  csrFocusAreas: ["Education", "Technology"],
  totalProjectCost: 2500000,
  fundingRequired: 1500000,
  // ... other fields
}

// Transformed to backend model
{
  title: "Digital Literacy Program",
  short_description: "Computer education for rural students",
  ngo_name: "EduCare Foundation",
  location_city: "Bangalore",
  location_region: "Karnataka", 
  location_country: "India",
  sdg_goals: [4, 9, 10],
  csr_focus_areas: ["Education", "Technology"],
  total_project_cost: 2500000,
  funding_required: 1500000,
  // ... other fields
}
```

## 🧪 Testing the Connection

### **1. Start the Backend**
```bash
cd backend
python migrate.py create    # Create database tables
python migrate.py sample    # Add sample data
python app.py              # Start Flask server
```

### **2. Start the Frontend**
```bash
cd frontend
npm run dev                # Start Vite dev server
```

### **3. Test Project Creation**
1. Navigate to `/discovery/project-add`
2. Fill out the form with test data
3. Submit the form
4. Check backend logs for API calls
5. Verify data in database

### **4. Check API Response**
The form should receive a response like:
```json
{
  "message": "Project created successfully",
  "project": {
    "id": 1,
    "title": "Digital Literacy Program",
    "short_description": "Computer education for rural students",
    "ngo_name": "EduCare Foundation",
    "status": "draft",
    "created_at": "2024-01-01T00:00:00",
    // ... other fields
  }
}
```

## 📊 Form Structure

### **Step 1: Basic Information**
- Project title and description
- NGO name and location (city, region, country)

### **Step 2: Thematic Information**
- SDG goals selection (1-17)
- CSR focus areas
- Target beneficiaries

### **Step 3: Financial Information**
- Total project cost and funding required
- CSR eligibility (Schedule VII)
- Preferred contribution type

### **Step 4: Timeline & Milestones**
- Start and end dates
- Project duration calculation
- Milestone planning

### **Step 5: Impact Metrics**
- Expected outcomes
- Key performance indicators (KPIs)
- Past impact data

### **Step 6: NGO Credibility**
- Registration numbers
- 80G and FCRA status
- NGO rating and verification

### **Step 7: Media & Contact**
- Project images
- Proposal documents
- Video links
- Contact information

## 🔧 Technical Implementation

### **State Management**
- React hooks for form state
- Step-by-step navigation
- Form validation and error handling

### **API Integration**
- Custom `useProjectAdd` hook
- `projectApi.js` utility functions
- JWT authentication support

### **Data Transformation**
- Automatic field mapping
- JSON field handling
- Date formatting
- Number parsing

### **Error Handling**
- API error responses
- Validation errors
- Network error handling
- User-friendly error messages

## 🎯 Next Steps

### **Immediate**
- [x] Backend models created
- [x] API endpoints implemented
- [x] Frontend form connected
- [x] Data transformation working

### **Future Enhancements**
- [ ] File upload to cloud storage
- [ ] Rich text editor for descriptions
- [ ] Image preview and cropping
- [ ] Form auto-save functionality
- [ ] Project template system
- [ ] Bulk project import

## 🐛 Troubleshooting

### **Common Issues**

**1. Authentication Errors**
- Ensure user is logged in
- Check JWT token in localStorage
- Verify backend auth middleware

**2. API Connection Errors**
- Check backend server is running
- Verify API endpoint URLs
- Check CORS configuration

**3. Data Validation Errors**
- Review required fields
- Check data format (dates, numbers)
- Verify JSON field structure

**4. Database Errors**
- Run `python migrate.py status` to check tables
- Verify database connection
- Check model relationships

### **Debug Commands**
```bash
# Backend
python migrate.py status    # Check database status
python test_api.py         # Test API endpoints

# Frontend
npm run build              # Check for build errors
npm run lint               # Check code quality
```

## 📚 Related Files

- **Backend Models**: `backend/models/projects.py`
- **API Routes**: `backend/routes/projects.py`
- **Database Migration**: `backend/migrate.py`
- **Frontend Hook**: `hooks/useProjectAdd.js`
- **API Utilities**: `lib/projectApi.js`
- **Constants**: `constants/index.js`

---

The project form is now fully connected to the backend and ready for production use! 🎉

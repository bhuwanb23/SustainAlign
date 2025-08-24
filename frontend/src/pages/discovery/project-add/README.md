# Project Add Form

This component provides a comprehensive 7-step form for adding new projects to the SustainAlign platform. The form collects detailed information about projects to ensure proper matching with CSR initiatives and impact measurement.

## Form Structure

### Step 1: Basic Information
- **Project Title** * (required)
- **Short Description (2-3 lines)** * (required)
- **NGO/Implementing Partner Name** * (required)
- **Location (City/Region/Country)** * (required)

### Step 2: Thematic Information
- **SDG Goals (1-17)** * (required) - Select all that apply
- **CSR Focus Areas** * (required) - Select all that apply
- **Target Beneficiaries** * (required) - Select all that apply

### Step 3: Financial Information
- **Total Project Cost (USD)** * (required)
- **Funding Required (Remaining Gap)** * (required)
- **CSR Eligibility (Schedule VII in India)** * (required)
- **Preferred Contribution Type** * (required)

### Step 4: Timeline & Milestones
- **Start Date** * (required)
- **End Date** * (required)
- **Duration** (optional)
- **Key Milestones** (optional)

### Step 5: Impact Metrics
- **Expected Outcomes** * (required)
- **Key Performance Indicators (KPIs)** * (required)
- **Past Impact** (optional - for recurring projects)

### Step 6: NGO Credibility
- **Registration Number** * (required)
- **80G Status** (optional)
- **FCRA Status** (optional)
- **Past Projects Completed** (optional)
- **NGO Rating/Verification Badge** (optional)

### Step 7: Media & Contact Information
- **Project Images** (optional)
- **Proposal Document (PDF)** (optional)
- **Video Link** (optional)
- **Contact Email** * (required)
- **Website** (optional)

## Field Descriptions

### SDG Goals
All 17 Sustainable Development Goals are available for selection:
1. No Poverty
2. Zero Hunger
3. Good Health & Well-being
4. Quality Education
5. Gender Equality
6. Clean Water & Sanitation
7. Affordable & Clean Energy
8. Decent Work & Economic Growth
9. Industry, Innovation & Infrastructure
10. Reduced Inequalities
11. Sustainable Cities & Communities
12. Responsible Consumption & Production
13. Climate Action
14. Life Below Water
15. Life on Land
16. Peace, Justice & Strong Institutions
17. Partnerships for the Goals

### CSR Focus Areas
Comprehensive list including:
- Education, Healthcare, Environment
- Poverty Alleviation, Women Empowerment
- Clean Energy, Water & Sanitation
- Agriculture, Rural Development
- Skill Development, Digital Literacy
- Mental Health, Disaster Relief
- Cultural Preservation, Sports & Recreation
- Technology Access

### Target Beneficiaries
Diverse beneficiary groups:
- Children, Women, Rural Communities
- Urban Poor, Tribal Communities
- Senior Citizens, Persons with Disabilities
- Migrant Workers, Street Children
- Farmers, Artisans, Small Business Owners
- Students, Unemployed Youth

### Contribution Types
- Cash Donation
- In-kind Support
- Volunteer Hours
- Technical Expertise
- Equipment & Materials
- Training & Capacity Building
- Mentoring
- Partnership

### NGO Ratings
- Platinum (90-100%)
- Gold (80-89%)
- Silver (70-79%)
- Bronze (60-69%)
- Verified (50-59%)
- Under Review

## Validation

The form includes comprehensive validation for required fields and ensures data quality. All required fields must be completed before the project can be submitted.

## Data Flow

1. Form data is collected through the multi-step interface
2. Data is validated on submission
3. Project is created and stored via the `useProjectAdd` hook
4. Success page is displayed upon completion

## Technical Implementation

- Built with React and Framer Motion for smooth animations
- Uses a custom hook (`useProjectAdd`) for state management
- Constants are centralized in `constants/index.js`
- Responsive design with Tailwind CSS
- Form validation and error handling
- File upload support for images and documents

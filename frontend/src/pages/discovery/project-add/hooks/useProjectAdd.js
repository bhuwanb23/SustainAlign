import { useState } from 'react'
import { requiredFields } from '../constants/index.js'
import { createProject } from '../../../../lib/projectApi.js'

export default function useProjectAdd() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const addProject = async (projectData) => {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)
    
    try {
      // Validate required fields with robust empty checks
      const isEmpty = (value) => {
        if (value === undefined || value === null) return true
        if (typeof value === 'string' && value.trim() === '') return true
        if (Array.isArray(value) && value.length === 0) return true
        return false
      }

      const missingFields = requiredFields.filter((field) => isEmpty(projectData[field]))

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
      }
      
      // Transform frontend data to match backend model structure
      const transformedData = {
        // Basic Info
        title: projectData.projectTitle,
        short_description: projectData.shortDescription,
        ngo_name: projectData.ngoName,
        location_city: projectData.location?.city || projectData.location,
        location_region: projectData.location?.region || '',
        location_country: projectData.location?.country || 'India',
        
        // Thematic Info
        sdg_goals: projectData.sdgGoals.map(goal => goal.id || goal),
        csr_focus_areas: projectData.csrFocusAreas,
        target_beneficiaries: projectData.targetBeneficiaries,
        
        // Financials
        total_project_cost: parseFloat(projectData.totalProjectCost),
        funding_required: parseFloat(projectData.fundingRequired),
        currency: 'INR',
        csr_eligibility: projectData.csrEligibility === 'Yes',
        preferred_contribution_type: projectData.preferredContributionType,
        
        // Timeline
        start_date: projectData.startDate,
        end_date: projectData.endDate,
        
        // Impact Metrics
        expected_outcomes: projectData.expectedOutcomes,
        kpis: projectData.kpis,
        past_impact: projectData.pastImpact,
        
        // NGO Credibility
        ngo_registration_number: projectData.registrationNumber,
        ngo_80g_status: projectData.g80Status,
        ngo_fcra_status: projectData.fcraStatus,
        ngo_rating: projectData.ngoRating ? parseInt(projectData.ngoRating) : null,
        ngo_verification_badge: projectData.ngoRating ? 'Verified' : 'Pending',
        past_projects_completed: projectData.pastProjectsCompleted ? parseInt(projectData.pastProjectsCompleted) : 0,
        
        // Media & Supporting Files
        project_images: projectData.projectImages,
        proposal_document_url: projectData.proposalDocument,
        video_link: projectData.videoLink,
        
        // Status & Metadata
        status: 'draft',
        visibility: 'public'
      }
      
      // No authentication required for project creation
      // Additional numeric validation for financials
      if (Number.isNaN(transformedData.total_project_cost) || Number.isNaN(transformedData.funding_required)) {
        throw new Error('Financial fields must be valid numbers: totalProjectCost, fundingRequired')
      }
      if (transformedData.total_project_cost <= 0 || transformedData.funding_required < 0) {
        throw new Error('Financial fields must be positive: totalProjectCost (>0), fundingRequired (>=0)')
      }

      // Make API call to backend using the utility function (no auth)
      const newProject = await createProject(transformedData)
      
      // Store full details in localStorage so ProjectDetailsView has all fields
      const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
      const storedId = newProject.project.id || `created-${Date.now()}`
      const createdAt = newProject.project.created_at || new Date().toISOString()

      const fullRecord = {
        // Identity/metadata
        id: storedId,
        createdAt,
        status: projectData.status || 'draft',
        visibility: projectData.visibility || 'public',

        // Card fields
        projectName: projectData.projectTitle || newProject.project.title || 'Untitled Project',
        organization: projectData.ngoName || newProject.project.ngo_name || 'NGO',
        description: projectData.shortDescription || newProject.project.short_description || '',
        impactArea: 'Environment',
        location: projectData.location?.city || newProject.project.location_city || '',
        budget: Number(projectData.totalProjectCost) || Number(newProject.project.total_project_cost) || 0,
        timeline: `${projectData.startDate || ''} - ${projectData.endDate || ''}`,
        sdgs: projectData.sdgGoals || newProject.project.sdg_goals || [],

        // Details view fields (store the whole form data shape)
        projectTitle: projectData.projectTitle,
        shortDescription: projectData.shortDescription,
        ngoName: projectData.ngoName,
        locationObj: projectData.location, // keep original object separately
        location: projectData.location,    // for backwards compatibility
        sdgGoals: projectData.sdgGoals,
        csrFocusAreas: projectData.csrFocusAreas,
        targetBeneficiaries: projectData.targetBeneficiaries,
        totalProjectCost: Number(projectData.totalProjectCost) || 0,
        fundingRequired: Number(projectData.fundingRequired) || 0,
        currency: projectData.currency || 'INR',
        csrEligibility: projectData.csrEligibility,
        preferredContributionType: projectData.preferredContributionType,
        startDate: projectData.startDate,
        endDate: projectData.endDate,
        duration: projectData.duration,
        milestones: projectData.milestones,
        expectedOutcomes: projectData.expectedOutcomes,
        kpis: projectData.kpis,
        pastImpact: projectData.pastImpact,
        registrationNumber: projectData.registrationNumber,
        g80Status: projectData.g80Status,
        fcraStatus: projectData.fcraStatus,
        pastProjectsCompleted: projectData.pastProjectsCompleted,
        ngoRating: projectData.ngoRating,
        ngoVerificationBadge: projectData.ngoVerificationBadge,
        projectImages: projectData.projectImages,
        proposalDocument: projectData.proposalDocument,
        videoLink: projectData.videoLink,
        contactEmail: projectData.contactEmail,
        website: projectData.website
      }

      existingProjects.push(fullRecord)
      localStorage.setItem('projects', JSON.stringify(existingProjects))
      
      setSuccess(true)
      return newProject.project
    } catch (error) {
      console.error('Error adding project:', error)
      setError(error.message || 'Failed to add project. Please try again.')
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetState = () => {
    setError(null)
    setSuccess(false)
  }

  return {
    addProject,
    isSubmitting,
    error,
    success,
    resetState
  }
}

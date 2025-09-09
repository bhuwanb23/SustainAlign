import Header from './components/Header.jsx'
import PageHeader from './components/PageHeader.jsx'
import { ProjectOverview, SdgAlignment, CostBenefit, NgoCredibility } from './components/AnalysisPanels.jsx'
import { DecisionFactors, AiConfidence, RiskAssessment } from './components/SidebarWidgets.jsx'
import useRationale from './hooks/useRationale.js'

export default function RecommendationRationalePage() {
  const { 
    currentRationale, 
    loading, 
    error, 
    isGenerating,
    generateAIRationaleForCompany,
    resetAutoGeneration,
    refreshRationales
  } = useRationale()

  const handleGenerateAI = async () => {
    try {
      // If we already have a rationale, reset auto-generation state to allow refresh
      if (currentRationale) {
        resetAutoGeneration()
      }
      await generateAIRationaleForCompany()
      // Refresh the rationales list to show the latest data
      await refreshRationales()
    } catch (error) {
      console.error('Failed to generate AI rationale:', error)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PageHeader />
        
        {/* AI Generation Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-lg">🤖</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-800">AI-Powered Project Matching</h3>
                <p className="text-sm text-blue-600">
                  {isGenerating 
                    ? 'Automatically analyzing your company profile and available projects...'
                    : currentRationale 
                      ? 'AI analysis complete! Review your personalized project recommendations below.'
                      : 'Get intelligent project recommendations based on your company profile'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleGenerateAI}
              disabled={isGenerating}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isGenerating
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }`}
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="mr-2">✨</span>
                  {currentRationale ? 'Generate New Analysis' : 'Generate AI Analysis'}
                </div>
              )}
            </button>
          </div>
        </div>
        
        {/* AI Error Banner - Show when AI model fails */}
        {currentRationale?.error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <span className="text-amber-600 text-lg">⚠️</span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-amber-800 mb-2">
                  AI Model Temporarily Unavailable
                </h3>
                <div className="space-y-2">
                  <p className="text-sm text-amber-700">
                    <strong>Reason:</strong> {currentRationale.error.reason}
                  </p>
                  <p className="text-sm text-amber-600">
                    <strong>Details:</strong> {currentRationale.error.details}
                  </p>
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <p className="text-xs text-amber-800">
                      <strong>Note:</strong> You're currently viewing intelligent mock recommendations based on your company profile. 
                      These provide a good starting point while we resolve the AI service issue.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <span className="text-red-600 mr-2">⚠️</span>
              <span className="text-red-800">Error loading rationale data: {error}</span>
            </div>
          </div>
        )}

        {/* Initial Loading State */}
        {loading && !isGenerating && !currentRationale && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 mr-3"></div>
              <div>
                <h4 className="text-sm font-medium text-gray-800">Loading AI Matching System</h4>
                <p className="text-sm text-gray-600">Preparing to analyze your company profile...</p>
              </div>
            </div>
          </div>
        )}
        
        {/* AI Generation Status */}
        {isGenerating && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
              <div>
                <h4 className="text-sm font-medium text-blue-800">AI Analysis in Progress</h4>
                <p className="text-sm text-blue-600">
                  {!currentRationale 
                    ? 'Automatically analyzing your company profile and available projects...'
                    : 'Refreshing AI analysis with latest data...'
                  }
                </p>
                <p className="text-xs text-blue-500 mt-1">This may take a few moments</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Auto-Generation Success Message */}
        {!isGenerating && currentRationale && !loading && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 text-sm">✅</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-green-800">AI Analysis Complete!</h4>
                  <p className="text-sm text-green-600">
                    Your personalized project recommendations are ready. Review the analysis below.
                  </p>
                  {currentRationale.created_at && (
                    <p className="text-xs text-green-500 mt-1">
                      Generated on {new Date(currentRationale.created_at).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleGenerateAI}
                  className="text-xs text-green-600 hover:text-green-800 underline"
                >
                  Generate New Analysis
                </button>
                <button
                  onClick={refreshRationales}
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <ProjectOverview rationale={currentRationale} loading={loading} />
            <div className="space-y-6">
              <SdgAlignment rationale={currentRationale} loading={loading} />
              <CostBenefit rationale={currentRationale} loading={loading} />
              <NgoCredibility rationale={currentRationale} loading={loading} />
            </div>
          </div>
          <div className="col-span-4">
            <DecisionFactors rationale={currentRationale} loading={loading} />
            <AiConfidence rationale={currentRationale} />
            <RiskAssessment rationale={currentRationale} />
          </div>
        </div>

        {/* AI Analysis Summary */}
        {currentRationale && !loading && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Analysis Summary</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Confidence Score:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentRationale.confidenceScore >= 0.8 ? 'bg-green-100 text-green-800' :
                  currentRationale.confidenceScore >= 0.6 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {Math.round(currentRationale.confidenceScore * 100)}%
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Reasoning Steps */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Analysis Steps</h4>
                <div className="space-y-2">
                  {currentRationale.reasoningSteps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="text-xs text-gray-400 mt-1">{index + 1}.</span>
                      <p className="text-sm text-gray-600">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Score Breakdown */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Evaluation Criteria</h4>
                <div className="space-y-2">
                  {currentRationale.criteria && Object.entries(currentRationale.criteria).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${value * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{Math.round(value * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}



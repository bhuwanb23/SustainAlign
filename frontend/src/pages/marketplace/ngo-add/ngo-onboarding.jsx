import { useState } from 'react'
import { apiPost } from '../../../lib/api'

function Section({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

function Input({ label, value, onChange, ...props }) {
  return (
    <label className="block">
      <span className="block text-sm text-gray-700 mb-1">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-300"
        {...props}
      />
    </label>
  )
}

export default function NgoOnboardingPage() {
  const [form, setForm] = useState({
    // 1. Profile Basics
    name: '', registrationNumber: '', legalStatus: '', yearEstablished: '',
    about: '',
    // 2. Contact
    address: '', city: '', state: '', country: '', phone: '', email: '', website: '',
    // 3. Focus Areas
    primarySectors: '', sdgFocus: '', geographicFocus: '',
    // 4. Financials
    annualBudget: '', currency: 'INR', fundingSources: '',
    // 5. Compliance & Credibility
    pan: '', tan: '', gst: '', _80gStatus: '', fcraStatus: '', fcraNumber: '',
    rating: '', verificationBadge: 'Pending',
    // 6. Media & Documents
    logoUrl: '', profileImageUrl: '', documents: '',
  })

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }))

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      // Transform comma-separated inputs to arrays
      const payload = {
        name: form.name,
        registration_number: form.registrationNumber,
        legal_status: form.legalStatus,
        year_established: form.yearEstablished ? parseInt(form.yearEstablished, 10) : null,
        about: form.about,
        address: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        phone: form.phone,
        email: form.email,
        website: form.website,
        primary_sectors: form.primarySectors ? form.primarySectors.split(',').map(s => s.trim()) : [],
        sdg_focus: form.sdgFocus ? form.sdgFocus.split(',').map(s => s.trim()) : [],
        geographic_focus: form.geographicFocus ? form.geographicFocus.split(',').map(s => s.trim()) : [],
        annual_budget: form.annualBudget ? Number(form.annualBudget) : null,
        currency: form.currency || 'INR',
        funding_sources: form.fundingSources ? form.fundingSources.split(',').map(s => s.trim()) : [],
        pan_number: form.pan,
        tan_number: form.tan,
        gst_number: form.gst,
        _80g_status: form._80gStatus,
        fcra_status: form.fcraStatus,
        fcra_number: form.fcraNumber,
        rating: form.rating ? parseInt(form.rating, 10) : null,
        verification_badge: form.verificationBadge,
        logo_url: form.logoUrl,
        profile_image_url: form.profileImageUrl,
        documents: form.documents ? form.documents.split(',').map(s => s.trim()) : [],
      }
      const response = await apiPost('/api/profile/ngo-onboarding', payload)
      console.log('NGO Onboarding saved:', response)
      localStorage.setItem('ngoOnboardingComplete', 'true')
      window.location.href = '/dashboard'
    } catch (error) {
      console.error('Failed to save NGO onboarding:', error)
      alert('Failed to save NGO onboarding. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-700 to-emerald-500 text-transparent bg-clip-text">NGO Onboarding – Project Basics</h1>
          <p className="text-sm text-gray-600">Fill these details to activate your profile. You can edit later.</p>
          
          {/* Special message for new NGO users */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-blue-800">
              <span className="text-lg">🔒</span>
              <span className="font-medium">Complete this form to unlock access to SustainAlign</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">Your account is ready, but you need to set up your NGO profile first.</p>
          </div>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <Section title="1. NGO Profile Basics">
            <Input label="NGO Name" value={form.name} onChange={(v) => update('name', v)} placeholder="Your NGO name" />
            <Input label="Registration Number" value={form.registrationNumber} onChange={(v) => update('registrationNumber', v)} placeholder="e.g., 12-345-XYZ" />
            <Input label="Legal Status" value={form.legalStatus} onChange={(v) => update('legalStatus', v)} placeholder="Trust / Society / Section 8" />
            <Input label="Year Established" value={form.yearEstablished} onChange={(v) => update('yearEstablished', v)} type="number" min="1900" />
            <Input label="About (short)" value={form.about} onChange={(v) => update('about', v)} placeholder="One paragraph summary" />
          </Section>

          <Section title="2. Contact Information">
            <Input label="Address" value={form.address} onChange={(v) => update('address', v)} placeholder="Street, Area" />
            <Input label="City" value={form.city} onChange={(v) => update('city', v)} />
            <Input label="State" value={form.state} onChange={(v) => update('state', v)} />
            <Input label="Country" value={form.country} onChange={(v) => update('country', v)} />
            <Input label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
            <Input label="Email" value={form.email} onChange={(v) => update('email', v)} type="email" />
            <Input label="Website" value={form.website} onChange={(v) => update('website', v)} />
          </Section>

          <Section title="3. Focus Areas">
            <Input label="Primary Sectors (comma-separated)" value={form.primarySectors} onChange={(v) => update('primarySectors', v)} placeholder="Education, Health, Environment" />
            <Input label="SDG Focus (comma-separated numbers)" value={form.sdgFocus} onChange={(v) => update('sdgFocus', v)} placeholder="3,4,6,13" />
            <Input label="Geographic Focus (comma-separated)" value={form.geographicFocus} onChange={(v) => update('geographicFocus', v)} placeholder="Maharashtra, Karnataka" />
          </Section>

          <Section title="4. Financials">
            <Input label="Annual Budget" value={form.annualBudget} onChange={(v) => update('annualBudget', v)} placeholder="e.g., 2500000" />
            <Input label="Currency" value={form.currency} onChange={(v) => update('currency', v)} placeholder="INR / USD" />
            <Input label="Funding Sources (comma-separated)" value={form.fundingSources} onChange={(v) => update('fundingSources', v)} placeholder="CSR, Grants, Donations" />
          </Section>

          <Section title="5. Compliance & Credibility">
            <Input label="PAN" value={form.pan} onChange={(v) => update('pan', v)} />
            <Input label="TAN" value={form.tan} onChange={(v) => update('tan', v)} />
            <Input label="GST" value={form.gst} onChange={(v) => update('gst', v)} />
            <Input label="80G Status" value={form._80gStatus} onChange={(v) => update('_80gStatus', v)} placeholder="Valid / Expired / Not Available" />
            <Input label="FCRA Status" value={form.fcraStatus} onChange={(v) => update('fcraStatus', v)} placeholder="Valid / Expired / Not Required" />
            <Input label="FCRA Number" value={form.fcraNumber} onChange={(v) => update('fcraNumber', v)} />
            <Input label="Rating (1-5)" value={form.rating} onChange={(v) => update('rating', v)} type="number" min="1" max="5" />
            <Input label="Verification Badge" value={form.verificationBadge} onChange={(v) => update('verificationBadge', v)} placeholder="Verified / Pending / Unverified" />
          </Section>

          <Section title="6. Media & Documents">
            <Input label="Logo URL" value={form.logoUrl} onChange={(v) => update('logoUrl', v)} />
            <Input label="Profile Image URL" value={form.profileImageUrl} onChange={(v) => update('profileImageUrl', v)} />
            <Input label="Document Links (comma-separated)" value={form.documents} onChange={(v) => update('documents', v)} />
          </Section>

          <div className="flex items-center justify-end gap-2">
            <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-600 text-white shadow hover:bg-emerald-700">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}



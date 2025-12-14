'use client'

import { FormEvent, useState } from "react"

export default function NormalForm() {
  const [status, setStatus] = useState<string>('')
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name')
    console.log(`🚀 ~ handleSubmit ~ name:`, name)
    
    const response = await fetch('/api/normal-form', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    console.log(`🚀 ~ handleSubmit ~ response:`, response)
    
    const data = await response.json()
    console.log(`🚀 ~ handleSubmit ~ data:`, data)
    
    if (response.ok) {
      setStatus('Success!')
    } else {
      setStatus('Error submitting form')
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
      {status && <p className="text-center">{status}</p>}
    </form>
  )
}
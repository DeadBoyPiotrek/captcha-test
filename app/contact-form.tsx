'use client'

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useState, FormEvent } from 'react'

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!executeRecaptcha) {
      setStatus('reCAPTCHA not ready')
      return
    }

    const token = await executeRecaptcha('contact_form')

    // Use e.target instead of e.currentTarget and cast it properly
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        recaptchaToken: token,
      }),
    })

    if (response.ok) {
      setStatus('Success!')
      form.reset() // Optional: reset the form
    } else {
      setStatus('Error submitting form')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        name="name"
        placeholder="Name"
        required
        className="border p-2 rounded"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2 rounded"
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        className="border p-2 rounded min-h-[100px]"
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

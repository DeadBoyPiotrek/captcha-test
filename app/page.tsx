import ContactForm from './contact-form'
import NormalForm from './normal-form'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold">Normal Form</h1>
      <NormalForm />
      <h1 className="text-2xl font-bold">Contact Form</h1>
      <ContactForm />
    </div>
  )
}

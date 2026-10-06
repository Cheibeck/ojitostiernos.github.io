import Layout from "../../Components/Layout"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingContext } from "../../Context"

const Signin = () => {
  const context = useContext(ShoppingContext)
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await context.signIn(
        { name, email, password },
        isRegistering ? '/api/auth/register' : '/api/auth/login',
      )
      navigate('/MyAccount')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Layout>
        <section className="w-80">
          <h1 className="mb-6 text-center text-xl font-medium">
            {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
          </h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {isRegistering && (
              <label className="flex flex-col gap-1">
                Nombre
                <input
                  className="border p-2"
                  autoComplete="name"
                  maxLength={80}
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            )}
            <label className="flex flex-col gap-1">
              Correo electrónico
              <input
                className="border p-2"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              Contraseña
              <input
                className="border p-2"
                type="password"
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                minLength={isRegistering ? 10 : undefined}
                maxLength={128}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
            <button className="bg-black py-3 text-white disabled:opacity-50" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando…' : isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>
          <button
            className="mt-4 w-full underline"
            type="button"
            onClick={() => {
              setError('')
              setIsRegistering(!isRegistering)
            }}
          >
            {isRegistering ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
          </button>
        </section>
      </Layout>
    </>
  )
}

export default Signin

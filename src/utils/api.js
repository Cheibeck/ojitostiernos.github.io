const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '')

export const apiRequest = async (path, { method = 'GET', body, token } = {}) => {
  if (!API_URL) {
    throw new Error('Falta configurar VITE_API_URL con la URL de la API.')
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  const data = await response.json()
  if (!response.ok) {
    const error = new Error(data.error || 'No se pudo completar la solicitud.')
    error.status = response.status
    throw error
  }
  return data
}

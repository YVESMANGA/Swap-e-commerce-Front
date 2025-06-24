'use client'

import { useEffect, useState } from 'react'

// Définition du type Categorie
type Categorie = {
  id: number
  name: string
}

export default function Page() {
  const [categories, setCategories] = useState<Categorie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => {
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setCategories(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Erreur API:', err)
        setError('Impossible de charger les catégories')
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Catégories Laravel API</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <ul className="list-disc pl-6">
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
    </div>
  )
}

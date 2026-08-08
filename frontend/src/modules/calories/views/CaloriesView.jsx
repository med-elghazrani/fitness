import { useEffect, useState } from 'react'

function getToday() {
  var date = new Date()

  var year = date.getFullYear()
  var month = String(date.getMonth() + 1).padStart(2, '0')
  var day = String(date.getDate()).padStart(2, '0')

  return year + '-' + month + '-' + day
}

export default function CaloriesView() {
  const [athleteId, setAthleteId] = useState('')
  const [athlete, setAthlete] = useState(null)

  const [sessionDate, setSessionDate] = useState(getToday())

  const [muscleGroups, setMuscleGroups] = useState([])
  const [muscleGroup, setMuscleGroup] = useState('')

  const [exercises, setExercises] = useState([])
  const [exerciseId, setExerciseId] = useState('')

  const [intensity, setIntensity] = useState('MEDIUM')
  const [duration, setDuration] = useState(20)

  const [sessionExercises, setSessionExercises] = useState([])

  const [result, setResult] = useState(null)

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadMuscleGroups()
  }, [])

  async function loadMuscleGroups() {
    try {
      const response = await fetch('/api/calories/muscle-groups')

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      setMuscleGroups(data)
    } catch {
      setError('Imposible de charger les groupes musculaire')
    }
  }

  async function loadAthlete() {
    setError('')
    setMessage('')
    setResult(null)

    if (athleteId === '') {
      setError('Saisir un ID athlete')
      return
    }

    try {
      const response = await fetch('/api/athletes/' + athleteId)

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      

      setAthlete(data)

      localStorage.setItem('selectedAthleteId', String(data.id)) // memorisation 
    } catch {
      setAthlete(null)
      setError('Athlete introuvable')
    }
  }

  async function changeMuscleGroup(event) {
    const value = event.target.value

    setMuscleGroup(value)
    setExerciseId('')
    setExercises([])

    if (value === '') {
      return
    }

    try {
      const response = await fetch(
        '/api/calories/exercises?muscleGroup=' +
          encodeURIComponent(value)
      )

      if (!response.ok) {
        throw new Error()
      }

      const data = await response.json()

      setExercises(data)
    } catch {
      setError('Impossible de charger les exercices')
    }
  }

  function addExercise() {
    setError('')
    setMessage('')
    setResult(null)

    if (exerciseId === '') {
      setError('Choisir un exercice')
      return
    }

    if (Number(duration) <= 0) {
      setError('La duree doit etre superieure a 0')
      return
    }

    const exercise = exercises.find(
      (item) => String(item.id) === String(exerciseId)
    )

    if (!exercise) {
      return
    }

    const newExercise = {
      exerciseId: exercise.id,
      name: exercise.name,
      metBase: exercise.metBase,
      muscleGroup: muscleGroup,
      intensity: intensity,
      durationMinutes: Number(duration),
    }

    setSessionExercises([
      ...sessionExercises,
      newExercise,
    ])
  }

  function removeExercise(index) {
    const newList = sessionExercises.filter(
      (_, currentIndex) => currentIndex !== index
    )

    setSessionExercises(newList)
    setResult(null)
  }

  async function calculateAndSave() {
    setError('')
    setMessage('')

    if (!athlete) {
      setError('Charger un athlète')
      return
    }

    if (sessionExercises.length === 0) {
      setError('Ajouter au moins un exercice')
      return
    }

    const exercisesToSend = sessionExercises.map((exercise) => {
      return {
        exerciseId: exercise.exerciseId,
        intensity: exercise.intensity,
        durationMinutes: exercise.durationMinutes,
      }
    })

    const body = {
      athleteId: athlete.id,
      sessionDate: sessionDate,
      exercises: exercisesToSend,
    }

    try {
      const response = await fetch('/api/calories/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur')
      }

      setResult(data)

      setMessage(
        'Seance #' + data.sessionId + ' enregistree avec succes !'
      )
    } catch (err) {
      setError(err.message)
    }
  }

  function handleAthleteKeyDown(event) {
    if (event.key === 'Enter') {
      loadAthlete()
    }
  }

  return (
    <div className="space-y-6">

      

      {message !== '' && (
        <div className="bg-green-100 border p-4 rounded text-black">
          {message}
        </div>
      )}

      {error !== '' && (
        <div className="bg-red-100 border p-4 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded shadow text-black">

        <h2 className="text-2xl font-semibold mb-5">
          Athlète
        </h2>

        <div className="max-w-sm">

          <label className="block mb-2">
            Athlete ID
          </label>

          <input
            type="number"
            value={athleteId}
            onChange={(event) => setAthleteId(event.target.value)}
            onKeyDown={handleAthleteKeyDown}
            className="border rounded p-2 w-full text-black"
            placeholder="Exemple : 1"
          />

          <p className="text-gray-600 mb-4">
            Appuie sur Enter pour charger.
          </p>

          <button
            onClick={loadAthlete}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Charger
          </button>
        </div>

        {athlete && (
          <div className="mt-4 text-blue-600 font-medium">
            Athlète: #{athlete.id} — {athlete.fullName}
            {' '}
            (Poids: {athlete.weightKg} kg)
          </div>
        )}

      </div>

      {athlete && (
        <div className="bg-white p-6 rounded shadow text-black">

          <h2 className="text-2xl font-semibold mb-5">
            Séance
          </h2>

          <div className="mb-6 max-w-xs">

            <label className="block mb-2">
              Date de séance
            </label>

            <input
              type="date"
              value={sessionDate}
              onChange={(event) =>
                setSessionDate(event.target.value)
              }
              className="border rounded p-2 w-full text-black"
            />

          </div>

          <h3 className="text-xl font-semibold mb-4">
            Choisir Muscle → Exercice → Intensité → Durée
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">

            <div>
              <label className="block mb-2">
                Muscle
              </label>

              <select
                value={muscleGroup}
                onChange={changeMuscleGroup}
                className="border rounded p-2 w-full text-black"
              >
                <option value="">
                  -- choisir muscle --
                </option>

                {muscleGroups.map((group) => (
                  <option
                    key={group.id}
                    value={group.name}
                  >
                    {group.name}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="block mb-2">
                Exercice
              </label>

              <select
                value={exerciseId}
                onChange={(event) =>
                  setExerciseId(event.target.value)
                }
                disabled={muscleGroup === ''}
                className="border rounded p-2 w-full text-black"
              >
                <option value="">
                  -- choisir exercice --
                </option>

                {exercises.map((exercise) => (
                  <option
                    key={exercise.id}
                    value={exercise.id}
                  >
                    {exercise.name}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="block mb-2">
                Intensité
              </label>

              <select
                value={intensity}
                onChange={(event) =>
                  setIntensity(event.target.value)
                }
                className="border rounded p-2 w-full text-black"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Durée (minutes)
              </label>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(event) =>
                  setDuration(event.target.value)
                }
                className="border rounded p-2 w-full text-black"
              />
            </div>

          </div>

          <button
            onClick={addExercise}
            disabled={exerciseId === ''}
            className="bg-gray-700 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Ajouter à la séance
          </button>

          <h3 className="text-xl font-semibold mt-6 mb-4">
            Exercices ajoutés
          </h3>

          {sessionExercises.length === 0 && (
            <p className="text-gray-600">
              Aucun exercice ajouté.
            </p>
          )}

          {sessionExercises.length > 0 && (
            <div className="overflow-x-auto">

              <table className="w-full border-collapse border">

                <thead>
                  <tr>
                    <th className="border p-3 text-left">
                      Exercice
                    </th>

                    <th className="border p-3 text-left">
                      Muscle
                    </th>

                    <th className="border p-3 text-left">
                      Durée
                    </th>

                    <th className="border p-3 text-left">
                      Intensité
                    </th>

                    <th className="border p-3">
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {sessionExercises.map((exercise, index) => (
                    <tr key={index}>

                      <td className="border p-3">
                        {exercise.name}
                      </td>

                      <td className="border p-3">
                        {exercise.muscleGroup}
                      </td>

                      <td className="border p-3">
                        {exercise.durationMinutes} min
                      </td>

                      <td className="border p-3">
                        {exercise.intensity}
                      </td>

                      <td className="border p-3 text-center">

                        <button
                          onClick={() => removeExercise(index)}
                          className="bg-red-600 text-white px-3 py-2 rounded"
                        >
                          Supprimer
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

          <button
            onClick={calculateAndSave}
            disabled={sessionExercises.length === 0}
            className="mt-5 bg-blue-600 text-white px-5 py-2 rounded disabled:bg-gray-400"
          >
            Enregistrer la séance + Calculer calories brûlées
          </button>

        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded shadow text-black">

          <h2 className="text-2xl font-semibold mb-5">
            Résultat calories brûlées
          </h2>

          <div className="text-blue-600 mb-4 font-medium">
            Séance #{result.sessionId}
            {' — '}
            Date: {result.sessionDate}
          </div>

          <div className="mb-4">
            Athlète: {result.athleteName}
            {' — '}
            Poids: {result.weightKg} kg
          </div>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse border">

              <thead>
                <tr>
                  <th className="border p-3 text-left">
                    Exercice
                  </th>

                  <th className="border p-3 text-left">
                    Durée
                  </th>

                  <th className="border p-3 text-left">
                    Intensité
                  </th>

                  <th className="border p-3 text-left">
                    Calories
                  </th>
                </tr>
              </thead>

              <tbody>

                {result.exercises.map((exercise, index) => (
                  <tr key={index}>

                    <td className="border p-3">
                      {exercise.name}
                    </td>

                    <td className="border p-3">
                      {exercise.durationMinutes} min
                    </td>

                    <td className="border p-3">
                      {exercise.intensity}
                    </td>

                    <td className="border p-3">
                      {exercise.calories} kcal
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="mt-5 text-xl font-semibold">
            Total calories brûlées pendant cette séance :
            {' '}
            {result.totalCalories} kcal
          </div>

          <div className="mt-2">
            Durée totale : {result.totalDuration} minutes
          </div>

        </div>
      )}

    </div>
  )
}
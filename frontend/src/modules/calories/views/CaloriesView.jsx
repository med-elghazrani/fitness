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
    <div className="space-y-6 text-slate-900">

      

      {message !== '' && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-blue-800">
          {message}
        </div>
      )}

      {error !== '' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-900">

        <h2 className="text-xl font-semibold mb-5 text-slate-900">
          Athlète
        </h2>

        <div className="max-w-md">

          <label className="block mb-2 text-sm font-medium text-slate-700">
            Athlete ID
          </label>

          <input
            type="number"
            value={athleteId}
            onChange={(event) => setAthleteId(event.target.value)}
            onKeyDown={handleAthleteKeyDown}
            className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Exemple : 1"
          />

          <p className="text-sm text-slate-500 mb-4 mt-1">
            Appuie sur Enter pour charger.
          </p>

          <button
            onClick={loadAthlete}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Charger
          </button>
        </div>

        {athlete && (
          <div className="mt-5 border-t border-slate-100 pt-4 text-slate-700 font-medium">
            Athlète: #{athlete.id} — {athlete.fullName}
            {' '}
            (Poids: {athlete.weightKg} kg)
          </div>
        )}

      </div>

      {athlete && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-900">

          <h2 className="text-xl font-semibold mb-5 text-slate-900">
            Séance
          </h2>

          <div className="mb-6 max-w-sm">

            <label className="block mb-2 text-sm font-medium text-slate-700">
              Date de séance
            </label>

            <input
              type="date"
              value={sessionDate}
              onChange={(event) =>
                setSessionDate(event.target.value)
              }
              className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

          <h3 className="text-base font-semibold mb-4 text-slate-800">
            Choisir Muscle → Exercice → Intensité → Durée
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Muscle
              </label>

              <select
                value={muscleGroup}
                onChange={changeMuscleGroup}
                className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Exercice
              </label>

              <select
                value={exerciseId}
                onChange={(event) =>
                  setExerciseId(event.target.value)
                }
                disabled={muscleGroup === ''}
                className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Intensité
              </label>

              <select
                value={intensity}
                onChange={(event) =>
                  setIntensity(event.target.value)
                }
                className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Durée (minutes)
              </label>

              <input
                type="number"
                min="1"
                value={duration}
                onChange={(event) =>
                  setDuration(event.target.value)
                }
                className="border border-slate-300 rounded-lg px-3 py-2.5 w-full text-slate-900 bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

          </div>

          <button
            onClick={addExercise}
            disabled={exerciseId === ''}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Ajouter à la séance
          </button>

          <h3 className="text-lg font-semibold mt-7 mb-4 text-slate-900">
            Exercices ajoutés
          </h3>

          {sessionExercises.length === 0 && (
            <p className="text-sm text-slate-500">
              Aucun exercice ajouté.
            </p>
          )}

          {sessionExercises.length > 0 && (
            <div className="overflow-x-auto rounded-lg border border-slate-200">

              <table className="w-full border-collapse text-sm">

                <thead>
                  <tr>
                    <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                      Exercice
                    </th>

                    <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                      Muscle
                    </th>

                    <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                      Durée
                    </th>

                    <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                      Intensité
                    </th>

                    <th className="border-b border-slate-100 p-3 text-slate-700">
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {sessionExercises.map((exercise, index) => (
                    <tr key={index}>

                      <td className="border-b border-slate-100 p-3 text-slate-700">
                        {exercise.name}
                      </td>

                      <td className="border-b border-slate-100 p-3 text-slate-700">
                        {exercise.muscleGroup}
                      </td>

                      <td className="border-b border-slate-100 p-3 text-slate-700">
                        {exercise.durationMinutes} min
                      </td>

                      <td className="border-b border-slate-100 p-3 text-slate-700">
                        {exercise.intensity}
                      </td>

                      <td className="border-b border-slate-100 p-3 text-center">

                        <button
                          onClick={() => removeExercise(index)}
                          className="border border-slate-300 bg-white text-slate-600 px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-red-600 transition-colors"
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
            className="mt-5 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Enregistrer la séance + Calculer calories brûlées
          </button>

        </div>
      )}

      {result && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-slate-900">

          <h2 className="text-xl font-semibold mb-5 text-slate-900">
            Résultat calories brûlées
          </h2>

          <div className="text-slate-600 mb-4 font-medium">
            Séance #{result.sessionId}
            {' — '}
            Date: {result.sessionDate}
          </div>

          <div className="mb-4 text-slate-600">
            Athlète: {result.athleteName}
            {' — '}
            Poids: {result.weightKg} kg
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200">

            <table className="w-full border-collapse text-sm">

              <thead>
                <tr>
                  <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                    Exercice
                  </th>

                  <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                    Durée
                  </th>

                  <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                    Intensité
                  </th>

                  <th className="border-b border-slate-200 bg-slate-50 p-3 text-left font-medium text-slate-700">
                    Calories
                  </th>
                </tr>
              </thead>

              <tbody>

                {result.exercises.map((exercise, index) => (
                  <tr key={index}>

                    <td className="border-b border-slate-100 p-3 text-slate-700">
                      {exercise.name}
                    </td>

                    <td className="border-b border-slate-100 p-3 text-slate-700">
                      {exercise.durationMinutes} min
                    </td>

                    <td className="border-b border-slate-100 p-3 text-slate-700">
                      {exercise.intensity}
                    </td>

                    <td className="border-b border-slate-100 p-3 text-slate-700">
                      {exercise.calories} kcal
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="mt-5 text-xl font-semibold text-slate-900">
            Total calories brûlées pendant cette séance :
            {' '}
            {result.totalCalories} kcal
          </div>

          <div className="mt-2 text-slate-600">
            Durée totale : {result.totalDuration} minutes
          </div>

        </div>
      )}

    </div>
  )
}
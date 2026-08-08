import { useEffect, useState } from 'react'

import {
  getAthlete,
  getAthleteSessions,
  getSessionExercises,
  getNextRecommendation,
  getCustomRecommendation,
} from '../api/recommendationApi.js'

export default function RecommendationView() {

  const [athleteId, setAthleteId] = useState(null)
  const [athlete, setAthlete] = useState(null)

  const [sessions, setSessions] = useState([])
  const [selectedSessionId, setSelectedSessionId] = useState(null)
  const [sessionExercises, setSessionExercises] = useState([])

  const [rec, setRec] = useState(null)

  const [showCustomForm, setShowCustomForm] = useState(false)

  const [customGoal, setCustomGoal] = useState('')
  const [customLevel, setCustomLevel] = useState('')
  const [customEquipment, setCustomEquipment] = useState('')
  const [customAvailableMinutes, setCustomAvailableMinutes] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  //                      atlete loading automatic

  useEffect(() => { loadSelectedAthlete() }, [])

  async function loadSelectedAthlete() {

    const savedAthleteId = localStorage.getItem('selectedAthleteId')

    if ( !savedAthleteId) {
      setError( 'No athlete selected. load an athlete first from the Calorie Burned page')
      return
    }

    const id = Number(savedAthleteId)

    setLoading(true)
    setError('')

    try {

              // ath info 
      const athleteData = await getAthlete(id)

      //history
      const sessionsData =   await getAthleteSessions(id)

      setAthleteId(id)
      setAthlete(athleteData)
      setSessions(sessionsData)

    } catch (e) {

      setAthleteId(null)
      setAthlete(null)
      setSessions([])

      setError('Unable to retrieve athlete information')

    }

    setLoading(false)
  }

  function athleteName(a) {

    if (!a) {
      return ''
    }

    if (a.fullName) {
      return a.fullName
    }

    if (a.name) {
      return a.name
    }

    return (
      (a.firstName || '') + ' ' + (a.lastName || '')
    )
  }


  // previous sesion

  async function openSession(sessionId) {

    setSelectedSessionId(sessionId)
    setSessionExercises([])
    setError('')

    try {

      const exercises =await getSessionExercises(sessionId)

      setSessionExercises(exercises)

    } catch (e) {

      setError( 'unable to load session exe')
    }
  }


  // recom

  async function onRecommend() {

    if (athleteId == null) {
      setError('No athlete selected')
      return
    }

    setLoading(true)
    setError('')
    setRec(null)

    try {

      const recommendation = await getNextRecommendation(athleteId)

      setRec(recommendation)

    } catch (e) {

      console.error(e)

      setError(  'unable to generate recommendation' )
    }

    setLoading(false)
  }
// Custom recom

  async function CustomRecommend() {

    if (athleteId == null) {
      return
    }

    setLoading(true)
    setError('')

    try {

      const recommendation = await getCustomRecommendation({

          athleteId: athleteId,

          goal: customGoal,

          level: customLevel,

          equipment: customEquipment,

          availableMinutes:
            customAvailableMinutes
              ? Number(customAvailableMinutes)
              : null,
        })

      setRec(recommendation)

      setShowCustomForm(false)

    } catch (e) {

      setError(
        ' unable to generate    '
      )
    }

    setLoading(false)
  }


  return (

    <div className="space-y-5 text-black">

      <h1 className="text-2xl font-semibold">
        Recommendation
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 p-3 rounded">
          Loading...
        </div>
      )}


      

      {athlete && (

        <div className="bg-white p-5 rounded shadow">

          <div className="text-lg font-semibold">
            Selected athlete
          </div>

          <div className="mt-2 text-blue-600 font-medium">

            #{athlete.id}
            {' — '}
            {athleteName(athlete)}

          </div>

        </div>
      )}


      

      {athlete && (

        <div className="bg-white p-5 rounded shadow space-y-4">

          <h2 className="text-xl font-semibold">
            Next training session
          </h2>

          <p className="text-gray-600">
            The recommendation automatic use the athlete goal, level, equipment, available time and training history
          </p>

          <div className="flex gap-3 flex-wrap">

            <button
              className="bg-green-600 text-white px-5 py-2 rounded disabled:opacity-50"
              onClick={onRecommend}
              disabled={loading}
            >

              {loading
                ? 'Calculating...'
                : 'Recommend next training sesion'}

            </button>

            <button
              className="bg-purple-600 text-white px-5 py-2 rounded"
              onClick={() =>
                setShowCustomForm(!showCustomForm)
              }
              disabled={loading}
            >

              Custom recommendation

            </button>

          </div>


          

          {showCustomForm && (


  <div className="border rounded p-4 bg-gray-50 space-y-4">


    <h3 className="font-semibold text-lg">Custom recommendation</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <select value={customGoal} onChange={(e) => setCustomGoal(e.target.value)} className="border rounded p-2 text-black">
        <option value="">-- Select goal --</option>
        <option value="ENDURANCE">Endurance</option>
        <option value="STRENGTH">Strength</option>
        <option value="MUSCLE_GAIN">Muscle gain</option>
        <option value="WEIGHT_LOSS">Weight loss</option>
      </select>

      <select value={customLevel} onChange={(e) => setCustomLevel(e.target.value)} className="border rounded p-2 text-black">
        <option value="">-- Select level --</option>
        <option value="BEGINNER">Beginner</option>
        <option value="INTERMEDIATE">Intermediate</option>
        <option value="ADVANCED">Advanced</option>
      </select>

      <select value={customEquipment} onChange={(e) => setCustomEquipment(e.target.value)} className="border rounded p-2 text-black">
        <option value="">-- Select equipment --</option>
        <option value="HOME">Home</option>
        <option value="DUMBBELLS">Dumbbells</option>
        <option value="GYM">Gym</option>
      </select>

      <select value={customAvailableMinutes} onChange={(e) => setCustomAvailableMinutes(e.target.value)} className="border rounded p-2 text-black">
        <option value="">-- Select duration --</option>
        <option value="15">15 minutes</option>
        <option value="30">30 minutes</option>
        <option value="45">45 minutes</option>
        <option value="60">60 minutes</option>
        <option value="90">90 minutes</option>
      </select>
    </div>

    <button
      onClick={CustomRecommend}
      disabled={loading || !customGoal || !customLevel || !customEquipment || !customAvailableMinutes}
      className="bg-purple-600 text-white px-5 py-2 rounded disabled:opacity-50"
    >
      {loading ? 'Generating...' : 'Generate recommendation'}
    </button>
  </div>
)}

        </div>
      )}


      

      {rec && (

        <div className="bg-white p-5 rounded shadow space-y-4">

          <h2 className="text-xl font-semibold">
            Recommended training session
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="border rounded p-3">

              <div className="font-semibold">
                Muscle group
              </div>

              <div>
                {rec.focusMuscleGroup}
              </div>

            </div>

            <div className="border rounded p-3">

              <div className="font-semibold">
                Intensity
              </div>

              <div>
                {rec.intensity}
              </div>

            </div>

            <div className="border rounded p-3">

              <div className="font-semibold">
                Duration
              </div>

              <div>
                {rec.availableMinutes} min
              </div>

            </div>

          </div>

          <div>

            <h3 className="font-semibold text-lg mb-3">
              Recommended exercise
            </h3>

            {(!rec.exercises ||
              rec.exercises.length === 0) && (

              <div>
                No exercises found.
              </div>
            )}

            <div className="space-y-2">

              {(rec.exercises || []).map(
                (exercise) => (

                  <div
                    key={exercise.id}
                    className="border rounded p-3"
                  >

                    <div className="font-semibold">
                      {exercise.name}
                    </div>

                    <div>
                      Muscle:
                      {' '}
                      {exercise.muscleGroup}
                    </div>

                    {exercise.difficulty && (
                      <div>
                        Difficulty:
                        {' '}
                        {exercise.difficulty}
                      </div>
                    )}

                    {exercise.durationMinutes && (
                      <div>
                        Duration:
                        {' '}
                        {exercise.durationMinutes}
                        {' '}min
                      </div>
                    )}

                    {exercise.score != null && (
                      <div>
                        Score:
                        {' '}
                        {exercise.score}
                      </div>
                    )}

                  </div>
                )
              )}

            </div>

          </div>


          

          {rec.reasons &&
            rec.reasons.length > 0 && (

              <div>

                <h3 className="font-semibold text-lg mb-2">
                  Why this recommendation?
                </h3>

                <ul className="list-disc ml-6">

                  {rec.reasons.map(
                    (reason, index) => (

                      <li key={index}>
                        {reason}
                      </li>

                    )
                  )}

                </ul>

              </div>
            )}

        </div>
      )}


      

      {athlete && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="bg-white p-5 rounded shadow">

            <h2 className="font-semibold text-lg mb-3">
              Training session history
            </h2>

            {sessions.length === 0 && (
              <div>
                No training sessions
              </div>
            )}

            <div className="flex flex-col gap-2">

              {sessions.map((session) => (

                <button
                  key={session.id}
                  onClick={() =>
                    openSession(session.id)
                  }
                  className={
                    'text-left border rounded p-3 ' +
                    (
                      selectedSessionId === session.id
                        ? 'bg-gray-100'
                        : ''
                    )
                  }
                >

                  <div>
                    Date: {session.sessionDate}
                  </div>

                  <div>
                    Calories:
                    {' '}
                    {session.totalCalories}
                  </div>

                  <div>
                    Duration:
                    {' '}
                    {session.durationMinutes}
                    {' '}min
                  </div>

                  <div>
                    Intensity:
                    {' '}
                    {session.sessionIntensity}
                  </div>

                </button>

              ))}

            </div>

          </div>


          

          <div className="bg-white p-5 rounded shadow">

            <h2 className="font-semibold text-lg mb-3">
              Session exercises
            </h2>

            {selectedSessionId == null && (
              <div>
                Click on a training session
              </div>
            )}

            {selectedSessionId != null && (

              <div className="space-y-2">

                {sessionExercises.map(
                  (sessionExercise) => {

                    const exercise =
                      sessionExercise.exercise

                    return (

                      <div
                        key={sessionExercise.id}
                        className="border rounded p-3"
                      >

                        <div className="font-semibold">

                          {exercise
                            ? exercise.name
                            : ''}

                        </div>

                        <div>
                          Muscle:
                          {' '}
                          {exercise &&
                          exercise.muscleGroup
                            ? exercise
                                .muscleGroup
                                .name
                            : ''}
                        </div>

                        <div>
                          Duration:
                          {' '}
                          {
                            sessionExercise
                              .durationMinutes
                          }
                          {' '}min
                        </div>

                        <div>
                          Intensity:
                          {' '}
                          {
                            sessionExercise
                              .intensity
                          }
                        </div>

                        <div>
                          Calories:
                          {' '}
                          {
                            sessionExercise
                              .caloriesBurned
                          }
                        </div>

                      </div>
                    )
                  }
                )}

                {sessionExercises.length ===
                  0 && (

                  <div>
                    No exercises
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      )}

    </div>
  )
}
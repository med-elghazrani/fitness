export async function getAthlete(athleteId) {
  const res = await fetch(`/api/athletes/${athleteId}`)
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

export async function getAthleteSessions(athleteId) {
  const res = await fetch(`/api/athletes/${athleteId}/sessions`)
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

export async function getSessionExercises(sessionId) {
  const res = await fetch(`/api/sessions/${sessionId}/exercises`)
  if (!res.ok) throw new Error('Failed')
  return res.json()
}

export async function getNextRecommendation(athleteId) {
  const res = await fetch(`/api/recommendations/next?athleteId=${athleteId}`)
  if (!res.ok) throw new Error('Failed')
  return res.json()
}
export async function getCustomRecommendation(payload) {
  const res = await fetch(`/api/recommendations/custom`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error('Failed')
  return res.json()
}

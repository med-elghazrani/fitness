async function getJson(path) {
  const res = await fetch(`/api${path}`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export function fetchAthletes() {
  return getJson('/athletes')
}

export function fetchAthlete(id) {
  return getJson(`/athletes/${id}`)
}

export function fetchSessions(athleteId) {
  return getJson(`/athletes/${athleteId}/sessions`)
}

export function fetchSessionExercises(sessionId) {
  return getJson(`/sessions/${sessionId}/exercises`)
}

export function fetchRecommendation(athleteId) {
  return getJson(`/recommendations/next?athleteId=${athleteId}`)
}

// This file is no longer used as chat functionality has been moved to ResultsChat component
// using AIResultEnhancer directly

export async function handleApiRequest(_request: Request) {
  return new Response(
    JSON.stringify({ error: 'API endpoints have been deprecated' }),
    { 
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

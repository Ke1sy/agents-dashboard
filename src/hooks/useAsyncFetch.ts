import { useReducer, useEffect, useState } from 'react'
import type { LoadingState } from '../types'

interface AsyncFetchResult<T> {
  data: T | null
  status: LoadingState
  errorMsg: string
  retry: () => void
}

type State<T> = { data: T | null; status: LoadingState; errorMsg: string }

type Action<T> =
  | { type: 'start' }
  | { type: 'success'; data: T }
  | { type: 'error'; message: string }

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'start':
      return { ...state, status: 'loading', errorMsg: '' }
    case 'success':
      return { data: action.data, status: 'success', errorMsg: '' }
    case 'error':
      return { ...state, status: 'error', errorMsg: action.message }
    default:
      return state
  }
}

/**
 * Handles async fetch lifecycle: loading → success | error, with retry support.
 * Pass extra `deps` to re-fetch when they change (e.g. a `simulateError` flag).
 */
export function useAsyncFetch<T>(
  fetchFn: () => Promise<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: readonly any[] = []
): AsyncFetchResult<T> {
  const [state, dispatch] = useReducer(
    reducer as unknown as typeof reducer<T>,
    {
      data: null,
      status: 'loading',
      errorMsg: '',
    } as State<T>
  )
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    dispatch({ type: 'start' })
    fetchFn()
      .then((d) => {
        if (!cancelled) dispatch({ type: 'success', data: d })
      })
      .catch((err: Error) => {
        if (!cancelled) dispatch({ type: 'error', message: err.message })
      })
    return () => {
      cancelled = true
    }
    // fetchKey and caller-supplied deps are the intended triggers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchKey, ...deps])

  const retry = () => setFetchKey((k) => k + 1)

  return { data: state.data, status: state.status, errorMsg: state.errorMsg, retry }
}

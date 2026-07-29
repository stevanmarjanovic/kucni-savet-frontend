import router from '@/router'
import type {Chore, User} from './models'

/**
 * BASE INFO
 */
const url = import.meta.env.VITE_BACKEND_URL
const apiUrl = `${url}/api`
const tokenKey = 'accessToken'
const bearerToken = () => `Bearer ${getAccessToken()}`

async function request<T>(
  path: string,
  method: string = 'GET',
  body: object = {},
  authorize: boolean = true,
): Promise<T> {
  path = path.startsWith('/') ? path : `/${path}`

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Accept', 'application/json')

  const options: RequestInit = {
    headers,
    method,
  }

  if (authorize && options.headers) {
    headers.append('Authorization', bearerToken())
  }

  if (method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  const res = await fetch(`${apiUrl}${path}`, options)

  if (res.status === 200) return res.json() as Promise<T>
  else if (res.status === 401) throw new Error(`UNAUTHORIZED ${path}`)
  else if (res.status === 404) throw new Error(`NOTFOUND ${path}`)
  else throw new Error(`ERROR ${path}`)
}

function setAccessToken(accessToken: string) {
  localStorage.setItem(tokenKey, accessToken)
}

function getAccessToken() {
  return localStorage.getItem(tokenKey)
}

function removeAccessToken() {
  localStorage.removeItem(tokenKey)
}

/**
 * AUTH CONTROLLER
 */
export interface LoginResponse {
  token: string
}

export async function login(facebookAccessToken: string) {
  const response = await request<LoginResponse>('auth/login', 'POST', {
    facebookAccessToken,
  })

  setAccessToken(response.token)

  return response
}

export async function logout() {
  removeAccessToken()

  return true
}

/**
 * USER CONTROLLER
 */
export async function currentUser() {
  return request<User>('/user')
}

export async function updateUser(user: User) {
  return request<User>('/user', 'PUT', user)
}

export async function householdUsers() {
  return request<User[]>('/user/household')
}

/**
 * CHORE CONTROLLER
 */
export async function getAllChores() {
  return await request<Chore[]>("chore/household")
}

export async function createChore(chore: Chore) {
  console.log("Creating chore", chore)
  return await request<Chore>('chore', 'POST', chore)
}

export async function assignChore(choreId: string, assigneeId: string) {
  return await request<Chore>(`chore/${choreId}/assign/${assigneeId}`, 'PATCH')
}

export async function updateChoreAssignees(choreId: string, assignees: User[]) {
  return await request<Chore>(`chore/${choreId}/assignees`, 'PATCH', {assignees})
}

export async function markChoreAsDone(choreId: string) {
  return await request<Chore>(`chore/${choreId}/mark-done`, 'PATCH')
}

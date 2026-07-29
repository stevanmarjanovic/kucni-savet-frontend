export interface Household {
  id: string
  name: string
}

export interface User {
  id: string
  name: string
  image: string
  household: Household
  onboardingStep: string
}

export interface Chore {
  id: string,
  name: string,
  frequency: 1 | 7 | 14 | 30 | null,
  lastDone: DateTime | null,
  toDo: boolean,
  householdId: string | null,
  assignees: User[]
}

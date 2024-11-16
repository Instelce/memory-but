
export type Competence = {
    number: number,
    name: string,
    detail: string,
    fields: CompetenceFields
}

export type CompetenceFields = {
    expectations: string,
    goal: string,
    projects: string[],
    technologies: string[]
}

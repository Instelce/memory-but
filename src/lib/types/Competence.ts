
export type Competence = {
    number: number,
    name: string,
    detail: string,
    technologies: string[],
    goal: string,
    fields: CompetenceFields
}

export type CompetenceFields = {
    expectations: string[],
    projects: string[],
}

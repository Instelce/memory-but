
export type Competence = {
    number: number,
    name: string,
    detail: string,
    technologies: string[],
    fields: CompetenceFields
}

export type CompetenceFields = {
    expectations: string[],
    goal: string,
    projects: string[],
}

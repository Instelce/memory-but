import type { Competence } from "./Competence";

export type CardData = {
    isCompetenceName: boolean,
    content: string,
    competence: Competence,
    revealed: boolean;
}
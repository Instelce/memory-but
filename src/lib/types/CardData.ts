import type { Competence } from "./Competence";

export type CardData = {
    content: string,
    competence: Competence,
    revealed: boolean;
}
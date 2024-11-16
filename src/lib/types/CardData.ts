import type { Competence } from "./Competence";

export type CardData = {
    data: string,
    competence: Competence,
    isTechno: boolean,
    revealed: boolean;
}
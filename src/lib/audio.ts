import {Howl} from 'howler';

export const sounds = {
    applause: new Howl({
        src: ['./sounds/applause1.mp3'],
        volume: 0.5
    }),
    cardFlip: new Howl({
        src: ['./sounds/cardFlip.mp3'],
        volume: 0.5
    }),
    success: new Howl({
        src: ['./sounds/success1.mp3'],
        volume: 0.1
    }),
    click: new Howl({
        src: ['./sounds/click1.mp3'],
        volume: 1
    }),
}
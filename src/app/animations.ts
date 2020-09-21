import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fade', [
  transition('void => *', [
    style({ opacity: 0 }),
    animate('.5s ease-out', style({ opacity: 1 })),
  ]),
  transition('* => void', [animate('.5s ease-out', style({ opacity: 0 }))]),
]);

export const bounce = trigger('bounce', [
  transition('void => *', [
    animate(
      '.5s ease-in-out',
      keyframes([
        style({
          transform: 'translate3d(0, -40px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0,
        }),
        style({
          transform: 'translate3d(0, -20px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.6,
        }),
        style({
          transform: 'translate3d(0, 10px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.75,
        }),
        style({
          transform: 'translate3d(0, -5px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 0.9,
        }),
        style({
          transform: 'translate3d(0, -5px, 0)',
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          offset: 1,
        }),
      ])
    ),
  ]),
]);

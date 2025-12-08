# SEESAW CASE EXPLANATION

Seesaw simulation, objects reposition the seesaw based on their weights and their distance from the center point. Built using vanilla **JavaScript**, **CSS**, and **HTML**.


## Process & Decisions

Initially, I planned to study the animations on W3Schools https://www.w3schools.com/graphics/game_canvas.asp
 and build it using canvas, but later I decided to do it with CSS and HTML instead. 

Using HTML and CSS, I created the basic structures such as the seesaw, pivot, seesaw area, and the responsive layout. After that, I prepared the calculation logic where I applied basic physics rules. In the final stages, I implemented the animation methods.

> **Not:** Since I’ve been working mostly on backend-heavy tasks for about a year, I haven’t written much CSS in a long time. Because of that, my project unfortunately isn’t perfect, and there are some responsive issues. Please overlook these and don’t eliminate me during the task stage — at least give me a chance for one meeting :D efore switching to backend-focused work, I built various designs using mostly CSS, and they’re all available in my repository

## Trade-Offs OR Limitations

Definitely the part that challenged me the most — and the part that directly required AI assistance — was trying to correctly place the created objects onto the seesaw along the Y-axis.


## AI Assist

Can be found in script.js:
```
 - updateBoxPositions
 - updateFallingBoxes
```
I had to get AI assistance while writing these functions. I had a really hard time writing them on my own.

## Live Demo: https://scorpq.github.io/seesaw-simulation-cansin-lale/
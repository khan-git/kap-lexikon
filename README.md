# kap-lexikon

This project is a tool to keep track of your pocket comic books, specifically the swedish Kalle Ankas Pocket.

## Features
It uses hammerjs for swipe gestures:
* left - right, up and down the list of pockets
* up - down, change owner list

Arrows control the same as left and right swipe.

Clicking on an item will open a modal with a bigger picture of the pocket.

Currently there are two default owners, A and B.
If the edit icon is clicked, a pocket can be marked as "owned" when viewing an owners list.
The image will the be clear.

The double icon is used to mark a pocket as a double-edition.

The save icon will show the configuration json for development purposes.

## Setup

assets/sorted.json should contain a list of pockets with the format:
```
[
    {
        "nr": 1,
        "large": ["images_large/1-343x500.jpg"],
        "small": ["images_small/1-110x130.jpg"]
    },
    {
        "nr": 2,
        "large": ["images_large/2-343x500.jpg"],
        "small": ["images_small/2-110x130.jpg"]
      }
]
```
The arrays large and small are urls to images located under the assets-directory.

## Installation
```
nave use latest
npm install @angular/cli
npm link @angular/cli
npm install --save hammerjs
ng add @angular/material
```

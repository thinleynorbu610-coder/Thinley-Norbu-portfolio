# Project cover images

Project covers are shipped as static files and are not uploaded by visitors.
To update a cover, add the image to this folder, then open
[js/data.js](../../js/data.js) and set the project's `image` field to its
path, for example:

```js
{title:"QuickBite", ..., image:"images/projects/quickbite.png"}
```

Use a wide image where possible; project cards crop covers to a 16:9 frame.

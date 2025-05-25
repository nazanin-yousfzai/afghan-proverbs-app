# Afghan Proverbs & Sayings

This is a web application to view, add, edit, delete, and filter Afghan proverbs in Dari, Pashto, and English.

## Features

- List all proverbs
- Filter proverbs by category (Wisdom, Love, Friendship, etc.)
- Add new proverb
- Edit existing proverb
- Delete proverb

## How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/nazanin-yousfzai/afghan-proverbs-app.git

cd afghan-proverbs-app

npm install
node app.js
```

The project expects a backend API at http://localhost:3000 with the following endpoints:

GET /proverbs - get all proverbs

POST /proverbs - add a new proverb

GET /proverbs/:id - get proverb by id

PUT /proverbs/:id - update proverb by id

DELETE /proverbs/:id - delete proverb by id

# TOTP qr-code demo
Short demo on how to use TOTP to create short-lifetime qr-codes.

## Usage
`npm install`
`npm run build`
`npm start`

Then open the index.html file in the browser

Note that the frontend needs a qr-code generation library. Here it is `qrcode.js`

## Files of interest
- `index.ts`, simple express server to generate and validate keys
- `totp.ts`, (simple) TOTP implementation
- `index.html`, example to how generate qr-codes and use them

## Notes

### Generation

The backend works by generating a time-based key from current time and an event id.

A hash is created with joining eventId and key with a `-`.

TimeStep tells how many seconds one code is valid

### Validation
Validation splits the hash into eventId and key. Then checks if it matches with current time's totp key or the previous one's. We check the previous one in case the users scans the code at the exact same time the code changes.
# AUDIT BRIEF — DrivePatch

Audit `index.html` in this directory (single self-contained file, ~68KB). The
readable sources it is assembled from sit beside it: `qr.js`, `pets.js`,
`app.js`, `style.css`. Read those; `index.html` is generated from them.

**Report findings only. Do not modify any file.**

## What it is

A coordination tool for a community drive (toy drive / food drive), entered into
a judged competition, intended for a real non-profit that may run it live.

The board is a **quilt**. Each square is one household's unmet need. Squares
start cool and unsewn; a volunteer "stitches one in" with a chosen fabric and it
turns warm. The headline number is **how many households are still waiting**,
and it counts down to zero — the inversion of every competitor, which counts
what has been collected.

There is also a **shelter section**: foster a pet, book a walking slot, and the
supplies the shelter is short of.

## Runtime

- Static page on GitHub Pages. **No server, no backend, no database, no network
  calls at runtime.** Google Fonts is the only external request.
- All state is in-memory JavaScript. A refresh resets it. This is known and
  intended for the competition build; a Cloudflare Durable Object backend is the
  planned next step.
- Vanilla JS only. No framework, no bundler, no dependency.

## Roles

Four. Three get accounts, one deliberately does not.

| Role | Signs in with | Sees |
|---|---|---|
| volunteer | name + email, no password | tasks, where to go, check-in QR |
| provider | name + email, no password | pledges, drop-off window, drop-off QR |
| admin | email + password | the whole drive, real names, CSV export |
| household | **no account** — a two-word emblem ("The Winter Wren") | only their own request status |

## Threat model — what I most want attacked

1. **Address disclosure.** `SQUARES[i].addr` is the most sensitive field. It is
   meant to be visible ONLY to a signed-in user who has claimed that specific
   square. Signed-out users get a CSS-blurred placeholder. **Is the address
   recoverable by anyone who should not have it** — via the DOM, via
   `view-source`, via the CSS blur, via the console, via the CSV export, via the
   QR payload, or by setting `ME` in the console? I am aware the whole dataset
   is in the page source; tell me how bad that is and what the honest claim in
   the UI copy should be, because the page currently says *"not blurred in the
   browser — not sent at all"*, which I suspect is a **false claim** for a
   static page.
2. **XSS.** Household needs, volunteer names, emblem text and the "who is at
   home" tags are all user-supplied and rendered via `innerHTML`. `esc()` exists
   — is it applied everywhere it must be? Find any path where an attacker-typed
   string reaches `innerHTML` unescaped. Check `d.t` (need text) especially, which
   is deliberately NOT escaped because it contains `&middot;` entities.
3. **The QR encoder** (`qr.js`) is hand-written: byte mode, EC level M, versions
   1–10, Reed–Solomon over GF(256), all 8 masks scored. I verified 33×33 output,
   three correct finder patterns and a 51.6% dark ratio. **Attack the encoder**:
   version selection boundaries, the capacity check, block splitting when
   `total % nb != 0`, the interleave, format-bit placement, and any input length
   that would silently produce an unscannable code.

## Design decisions I want challenged, not just checked

- **Households are anonymous; animals get names.** A name is what gets a dog
  fostered, and anonymity is what lets a family ask without shame. Is that
  defensible or is it inconsistent?
- **No passwords for volunteers/providers.** A non-profit cannot staff a
  password-reset desk. Is a magic-link-shaped flow with no verification worse
  than nothing here?
- **The address gate is the product's main ethical claim.** Does the
  implementation actually earn the copy?

## Already verified by me

- JS parses clean (`node --check`).
- QR matrix structure (finders, dimensions, dark ratio).
- Renders correctly headless at 1150px; role views, pets, intake, dialogs.

## What I want back

Findings only, ranked by severity, each with the specific file and line and a
concrete way to reproduce it. Say explicitly which of my claims you could NOT
verify. Flag anything where the **UI copy makes a promise the code does not
keep** — that matters more to me than a style issue, because this touches real
people asking for help.

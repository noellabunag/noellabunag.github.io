# Noella Bunag — Portfolio Website

A static portfolio site (HTML, CSS and vanilla JavaScript — no build step, no frameworks) designed to be published on GitHub Pages at **https://noellabunag.github.io**.

---

## 1. What's in this folder

```text
noellabunag-portfolio/
├── index.html                  Homepage (all main sections)
├── 404.html                    "Page not found" page (used automatically by GitHub Pages)
├── .nojekyll                   Tells GitHub Pages to serve the files as-is
├── css/
│   └── styles.css              All styling. Colours and fonts are at the very top
├── js/
│   ├── main.js                 Navigation, mobile menu, animations, resume link
│   └── projects.js             Project filter buttons
├── projects/                   One case study page per featured project
│   ├── library-data-warehouse.html
│   ├── graduate-employment-analysis.html
│   ├── education-dashboard.html
│   ├── customer-segmentation.html
│   └── salary-analysis.html
└── assets/
    ├── icons/                  Favicon (browser tab icon)
    ├── images/
    │   ├── thumbs/             Project thumbnails (illustrative SVG graphics)
    │   ├── projects/           <- put your real project screenshots here
    │   ├── hackathons/         <- put hackathon photos here
    │   └── og-image.png        Preview image shown when the link is shared
    └── resume/                 <- put your resume PDF here
```

## 2. Preview the site on your own computer

Double-click `index.html` to open it in your browser. Everything works this way except the automatic resume check (see section 4), which needs a web server. To preview exactly as it will appear online, open a terminal in this folder and run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. Press `Ctrl + C` in the terminal to stop.

---

## 3. Before you publish — your to-do list

The site is complete and safe to publish as it is, but these steps will make it stronger.

### 3.1 Fill in the draft notes (most important)

Each case study contains **hidden notes** marking where real screenshots, code or confirmed details should go. Visitors never see them. To see them yourself, add `?draft` to the end of the page address:

```text
http://localhost:8000/projects/library-data-warehouse.html?draft
```

Purple dashed boxes will appear. Each one tells you what to add. In the HTML files you can find them all by searching for `[ADD` and `[CONFIRM` and `[REVIEW`.

| Label | What to do |
|---|---|
| `[ADD ACTUAL PROJECT SCREENSHOT]` | Replace with a real chart, dashboard or diagram |
| `[ADD VERIFIED ...]` | Add real details, code or findings from your project files |
| `[ADD DATA SOURCE DETAILS]` | Name the datasets and where they came from |
| `[CONFIRM INDIVIDUAL CONTRIBUTION]` | State exactly what you personally did |
| `[REVIEW KEY LEARNINGS]` | The learnings were drafted for you — rewrite them in your own words |
| `[ADD VERIFIED GITHUB REPOSITORY LINK]` | Add a link only when the real repository exists |

To fill one in, replace the whole `<div class="ph" ...>...</div>` block with your real content. To simply remove a note, delete that block.

### 3.2 Check the facts

Read every page once and confirm each number and claim matches your reports. In particular:

- The **skills list** includes MongoDB, JavaScript, Tableau and TensorFlow, which are not on your resume. Keep only tools you could comfortably discuss in an interview.
- The **Key Learnings / Lessons Learned** sections are drafts written on your behalf.
- The **Burger King** entry description and the short lines under each "value" in About Me are drafted wording — adjust to sound like you.

### 3.3 Add your resume (section 4) and real screenshots (section 6)

---

## 4. Resume

1. Export your resume as a PDF.
2. **Remove your phone number** from this public version (and never include a home address, NRIC or student ID).
3. Name the file exactly `Noella-Bunag-Resume.pdf`.
4. Put it in `assets/resume/`.

That's all. The site checks whether the file exists:

- **File missing** → buttons read "Request Resume" and open an email to you. No broken links.
- **File present** → buttons become "View Resume" (navigation) and "Download Resume" (hero).

To update your resume later, replace the PDF with a new one using the same file name. To use a different file name, change `resumeFile` at the top of `js/main.js`.

---

## 5. Customisation guide — where to edit what

Open the file in any text editor (VS Code is a good free choice). Inside `index.html`, search for the comment `EDIT:` to jump to each editable area.

| What you want to change | File | Where |
|---|---|---|
| Name in the logo | every `.html` file | search for `NOELLA<span>.</span>` |
| Hero headline and introduction | `index.html` | `<!-- ===== HERO ===== -->` |
| Internship availability | `index.html` | search `availability` (appears twice: hero and contact) |
| About Me text | `index.html` | `<!-- EDIT: About Me text -->` |
| CGPA and education dates | `index.html` | `<!-- EDIT: education details and CGPA -->` |
| Module distinctions | `index.html` | `<!-- EDIT: academic highlights -->` |
| Skills | `index.html` | `<!-- EDIT: skills -->` — each `<li class="tag">` is one skill |
| "Currently exploring" tools | `index.html` | un-comment the `skills__note` paragraph below the skills grid |
| Project cards | `index.html` | search `PROJECT 1`, `PROJECT 2`, ... |
| Case study content | `projects/*.html` | each section is a `<section class="cs-section">` |
| Hackathons, experience, leadership | `index.html` | marked with `<!-- ===== ... ===== -->` comments |
| Email, LinkedIn, GitHub links | every `.html` file | use Find & Replace across the folder |
| Colours and fonts | `css/styles.css` | section `01. DESIGN TOKENS` at the top |
| Page title and description (SEO) | every `.html` file | inside `<head>`: `<title>` and `<meta name="description">` |
| Copyright year | nothing to do | updates automatically |

### Adding a GitHub link to a project

In `index.html`, each project card contains a commented-out line:

```html
<!-- <a class="card-link card-link--secondary" href="[ADD VERIFIED GITHUB REPOSITORY LINK]" target="_blank" rel="noopener">GitHub ↗</a> -->
```

Remove the `<!--` and `-->` and replace the placeholder with the real repository address.

### Adding a new project

1. In `index.html`, copy one whole `<article class="project-card" ...> ... </article>` block and paste it after the last one.
2. Change the text, the image, and the link.
3. Set `data-category` to one or more of: `data-analytics`, `data-engineering`, `machine-learning`, `business-intelligence` (separate several with a space).
4. Copy an existing file in `projects/`, rename it, and edit the content. Update the "Next case study" link at the bottom of the previous page so the chain still loops.

### Adding a profile photo (optional)

In `index.html`, find `<div class="monogram" aria-hidden="true">NB</div>` and replace it with:

```html
<img class="monogram" src="assets/images/profile.jpg" alt="Portrait of Noella Bunag" width="58" height="58" style="object-fit:cover">
```

Save a square photo as `assets/images/profile.jpg`.

### Adding hackathon photos

In `index.html`, each hackathon card has a commented-out `<figure class="hack-card__photo">` block. Save your image in `assets/images/hackathons/`, remove the comment markers, and check the file name and `alt` text. Only use images you have permission to publish, and keep the "hackathon concept" labels so nothing reads as an official bank product.

---

## 6. Replacing project images

### Thumbnails (homepage cards and case study covers)

The current thumbnails are **illustrative graphics, not real project results**. To swap one for a real screenshot:

1. Save your image in `assets/images/thumbs/`, for example `education-dashboard.png`. A 16:9 shape (such as 1600 × 900) fits best.
2. In `index.html`, find the card and change the image path:

   ```html
   <img src="assets/images/thumbs/education-dashboard.png" ... alt="Power BI dashboard comparing institutions on education quality indicators">
   ```

3. Make the same change near the top of the matching file in `projects/` (the path there starts with `../assets/`), and update the caption below it.
4. Always rewrite the `alt` text to describe the real image.

### Screenshots inside case studies

Save the image in `assets/images/projects/` and paste this where you want it to appear:

```html
<figure class="cs-figure">
  <div class="cs-figure__frame">
    <img src="../assets/images/projects/your-file.png" alt="Describe what the image shows" loading="lazy">
  </div>
  <figcaption>One-line caption explaining the image.</figcaption>
</figure>
```

Before uploading any screenshot, check it doesn't show classmates' names, student IDs or anything your school wouldn't want public.

---

## 7. Publishing with GitHub Pages (step by step)

You only need a GitHub account and a web browser.

### Step 1 — Create the repository

1. Sign in at [github.com](https://github.com) as **noellabunag**.
2. Click the **+** at the top right → **New repository**.
3. **Repository name:** type exactly

   ```text
   noellabunag.github.io
   ```

   The name must be your username followed by `.github.io`. This special name is what makes the site appear at `https://noellabunag.github.io` with no extra path.
4. Set it to **Public**. Leave "Add a README" unticked.
5. Click **Create repository**.

### Step 2 — Upload the files

1. On the new repository page, click **uploading an existing file**.
2. Open the `noellabunag-portfolio` folder on your computer. Select **everything inside it** (not the folder itself) and drag it into the browser window. `index.html` must end up at the top level of the repository.
3. Wait for the upload to finish, type a message such as `Add portfolio website`, and click **Commit changes**.

> The `.nojekyll` file is hidden on some computers and may not upload by drag-and-drop. The site works without it, so this is not a problem.

### Step 3 — Turn on GitHub Pages

1. In the repository, go to **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to `/ (root)`, then click **Save**.

### Step 4 — Visit your site

Wait one to two minutes, then open **https://noellabunag.github.io**. The **Settings → Pages** screen shows a green confirmation with the link once it is live. If you see a 404 page, wait another minute and refresh.

### Step 5 — Updating the site later

**In the browser (simplest):** open the file on GitHub → click the pencil icon → make your change → **Commit changes**. To add or replace images or your resume, open the right folder → **Add file** → **Upload files**. Uploading a file with the same name replaces the old one.

**With Git (once you're comfortable):**

```bash
git clone https://github.com/noellabunag/noellabunag.github.io.git
```

```bash
git add .
```

```bash
git commit -m "Update projects"
```

```bash
git push
```

Each update takes a minute or two to appear. If you don't see the change, do a hard refresh (`Ctrl + Shift + R`, or `Cmd + Shift + R` on Mac).

### Step 6 — Test the published site

Go through this list after every significant update:

- [ ] Homepage loads at `https://noellabunag.github.io`
- [ ] Every navigation link scrolls to the right section
- [ ] All five "View Case Study" links open, and "Back to Projects" returns you
- [ ] Each filter button shows the right projects
- [ ] GitHub, LinkedIn and email links go to the correct places
- [ ] Resume button opens your PDF (after you've added it)
- [ ] The site looks right on your phone, and the menu opens and closes
- [ ] Add `?draft` to each case study address and confirm you're happy with what is still outstanding
- [ ] Paste the link into LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to check the preview card

---

## 8. How the site is built (for interviews and future you)

- **No frameworks.** Plain HTML, CSS and JavaScript keep the site fast and easy to maintain. The only external resource is Google Fonts.
- **Design tokens.** Colours, fonts, spacing and shadows are CSS custom properties at the top of `styles.css`, so a change in one place applies everywhere.
- **Accessibility.** Semantic landmarks and headings, a skip link, visible focus outlines, keyboard-operable menu and filters, `aria-pressed` on filters with a live announcement of results, and text colours checked against WCAG AA contrast. Two colours were adjusted for this: teal text on light backgrounds uses the deeper `#0F766E`, and secondary text uses `#526075`.
- **Motion.** Animations use only `transform` and `opacity`. Scroll reveals use `IntersectionObserver` and run once. Everything decorative switches off when the visitor has "reduce motion" enabled.
- **Works without JavaScript.** Content is only hidden for reveal animations when JavaScript is running, so nothing disappears if a script fails.
- **Privacy.** No phone number, address or ID numbers appear anywhere. There is no contact form and no tracking.

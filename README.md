# Aryan Rinayat — Portfolio

Personal portfolio of Aryan Rinayat, Artificial Intelligence & Data Science student at MMCOE, Pune.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4**, deployed on **Vercel**. Every page is statically prerendered; the only client-side JavaScript is for the nav, theme toggle, command menu (Ctrl/⌘ K), the live k-means demo, the GitHub repo list and the contact form.

## Updating content

Almost everything lives in **`lib/site.ts`**:

| To change… | Edit |
| --- | --- |
| Headline, intro, about text, interests | `hero`, `about` |
| Education (add dates, notes) | `education` |
| Projects | `projects` — add entries; the Projects cards appear automatically |
| Internships / clubs / volunteering | `experience` — section + nav link appear when non-empty |
| Certifications, hackathons, awards | `achievements` — same |
| Skills | `skills` — same (only list what you can discuss in an interview) |
| Email / links | `site` |

**Resume:** the source is `resume/resume.html` (one A4 page, ATS-friendly single column). Edit it, open it in Chrome/Edge, and *Print → Save as PDF* (A4, margins "Default") to `public/resume.pdf`. The public copy deliberately leaves out the phone number. Any PDF at `public/resume.pdf` works. The "Download Resume" button and command-menu action appear automatically on the next deploy.

**GitHub repos** are fetched live from `github.com/aryanrinayat2023ainds-pixel` (set by `site.githubUser`), so new public repositories show up without editing anything.

**Writing:** essays live in `lib/essays/` with a page under `app/writing/<slug>/`.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co) and delivers to the email in `site.email`. The **first** submission triggers a one-time activation email to that inbox — click the link in it and every later message is delivered.

## Develop & deploy

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Pushing to `main` redeploys automatically if the Vercel project is connected to this GitHub repo (Vercel → Project → Settings → Git). Otherwise run `npx vercel --prod` from this folder.

Set `NEXT_PUBLIC_SITE_URL` in Vercel if you add a custom domain, so canonical URLs and social previews use it.

# Deployment Checklist

## Pre-Deployment
- [ ] Update timeline data in `src/data/timeline.json`
- [ ] Update version in `src/data/version.json`
- [ ] Run TypeScript check: `npx tsc --noEmit`
- [ ] Test locally: `npm run dev`
- [ ] Build locally: `npm run build`

## Deployment Steps
- [ ] Commit changes: `git add -A && git commit -m "Update timeline"`
- [ ] Push to GitHub: `git push`
- [ ] Deploy to Cloudflare: `npm run deploy`
- [ ] Verify deployment at: https://ai-history-3n1.pages.dev

## Post-Deployment Verification
- [ ] Check live site loads correctly
- [ ] Verify timeline renders all events
- [ ] Test navigation links work
- [ ] Check mobile responsiveness
- [ ] Verify security headers: `curl -I https://ai-history-3n1.pages.dev`

## Performance Checks
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No console errors

## SEO Verification
- [ ] Meta tags present
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Structured data valid

## Monthly Maintenance
- [ ] Update timeline with new AI developments
- [ ] Review and update dependencies
- [ ] Check for security updates
- [ ] Backup repository
- [ ] Review analytics (if configured)

## Quick Commands Reference
```bash
# Local development
npm run dev

# Build project
npm run build

# Deploy to production
npm run deploy

# Update timeline version
npm run update

# Check TypeScript
npx tsc --noEmit

# View deployment logs
npx wrangler pages deployment tail
```

## Rollback Procedure
If issues occur after deployment:
1. View previous deployments: `npx wrangler pages deployment list --project ai-history`
2. Rollback via Cloudflare Dashboard → Pages → ai-history → Deployments
3. Click on previous successful deployment → "Rollback to this deployment"

## Contact for Issues
- GitHub Issues: https://github.com/franzenzenhofer/ai-history-timeline/issues
- Cloudflare Support: https://dash.cloudflare.com/support

---

*Last updated: January 27, 2025*
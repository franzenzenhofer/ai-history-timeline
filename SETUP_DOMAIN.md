# Setting Up Custom Domain: aihistory.franzai.com

## Quick Setup Steps

### 1. Access Cloudflare Dashboard
1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Navigate to **Pages** section

### 2. Configure Custom Domain
1. Select the **ai-history** project
2. Click on **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter: `aihistory.franzai.com`
5. Click **Continue**

### 3. DNS Configuration (Automatic)
Since `franzai.com` is already on Cloudflare, the DNS records will be automatically added:
- **CNAME**: `aihistory` → `ai-history-3n1.pages.dev`

### 4. Wait for Propagation
- DNS changes typically take 1-5 minutes on Cloudflare
- The custom domain will show as "Active" when ready

## Verification

Once configured, test the domain:
```bash
# Check DNS resolution
dig aihistory.franzai.com

# Test with curl
curl -I https://aihistory.franzai.com

# Or visit in browser
open https://aihistory.franzai.com
```

## Current Production URLs
- **Cloudflare Pages**: https://ai-history-3n1.pages.dev ✅ (Active)
- **Custom Domain**: https://aihistory.franzai.com ⏳ (Pending setup)

## SSL Certificate
SSL certificate will be automatically provisioned by Cloudflare within minutes of domain setup.

---

*Last updated: January 27, 2025*
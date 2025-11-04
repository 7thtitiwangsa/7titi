# 🚀 Deployment Checklist

Ikut langkah ni untuk deploy sistem dengan jayanya!

## ✅ Pre-Deployment

- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed (`git --version`)
- [ ] GitHub account ready
- [ ] Vercel account created (vercel.com)

## 📦 Step 1: Test Locally

```bash
cd pengakap-system
npm install --legacy-peer-deps
npm run dev
```

- [ ] Application runs at localhost:3000
- [ ] Login page loads properly
- [ ] Dashboard accessible after login
- [ ] Navigation works
- [ ] No console errors

## 🌐 Step 2: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Pengakap Leaders Portal"

# Create repo on GitHub first, then:
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

- [ ] Repository created on GitHub
- [ ] All files pushed successfully
- [ ] README visible on GitHub

## 🚀 Step 3: Deploy to Vercel

### Method 1: Via Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Settings will auto-detect Next.js
5. Click "Deploy"
6. Wait 2-3 minutes

- [ ] Project imported successfully
- [ ] Build completed without errors
- [ ] Deployment successful
- [ ] App accessible via Vercel URL

### Method 2: Via CLI

```bash
npm i -g vercel
vercel login
vercel
```

- [ ] CLI installed
- [ ] Logged in successfully
- [ ] Deployed successfully

## 🔧 Step 4: Verify Deployment

Visit your deployed URL and check:

- [ ] ✅ Login page loads
- [ ] ✅ Can login with any credentials
- [ ] ✅ Dashboard shows statistics
- [ ] ✅ Badge verification page works
- [ ] ✅ Scouts listing displays
- [ ] ✅ Navigation works smoothly
- [ ] ✅ Mobile view responsive
- [ ] ✅ No console errors

## 🔐 Step 5: Security (Optional but Recommended)

For production security:

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   - `NEXT_PUBLIC_NOCODB_URL`
   - `NEXT_PUBLIC_NOCODB_TOKEN`
3. Remove these from `next.config.js`
4. Redeploy

- [ ] Environment variables added
- [ ] Credentials removed from code
- [ ] App still works after redeploy

## 📱 Step 6: Share with Team

1. Copy your Vercel URL
2. Share with other leaders
3. Create login credentials (future: proper auth)

Share URL format:
```
https://pengakap-7-titiwangsa.vercel.app
```

- [ ] URL shared with team
- [ ] Leaders can access
- [ ] Demo credentials work

## 🎯 Step 7: Next Steps

After successful deployment:

- [ ] Customize branding (logo, colors)
- [ ] Add real authentication
- [ ] Complete remaining pages (Attendance, Payments, Events)
- [ ] Train leaders on system
- [ ] Collect feedback

## 🐛 Troubleshooting

### Build Failed
```bash
# Clear and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

### API Not Connecting
- Check NocoDB URL is accessible
- Verify API token is correct
- Check Railway deployment status

### Vercel Domain Issues
- Use Vercel's provided domain first
- Custom domain requires DNS configuration

## 📞 Need Help?

- Check README.md for detailed docs
- Review build logs on Vercel
- Test locally first before blaming deployment

## ✨ Success Indicators

You've successfully deployed when:

1. ✅ Vercel URL loads without errors
2. ✅ Can navigate all pages
3. ✅ Dashboard shows data (or mock data)
4. ✅ Mobile view works
5. ✅ Team members can access

## 🎉 Deployment Complete!

Congratulations! Your Pengakap Leaders Portal is now live!

**Live URL:** _________________

**Deployed on:** _________________

**Next Review:** _________________

---

**Share this checklist** with your team for reference!
